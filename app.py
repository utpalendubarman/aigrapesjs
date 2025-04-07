import eventlet
eventlet.monkey_patch()
import os
import time 
from openai import OpenAI
from dotenv import load_dotenv
from flask_socketio import SocketIO, emit
from flask import Flask, render_template_string
from lib.boilerplate_code import boilerplate_code
import anthropic
from v2 import v2_apis
load_dotenv()
app = Flask(__name__)
socketio = SocketIO(app, cors_allowed_origins="*", path='/ws')
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

v2_apis(socketio)
@app.route('/')
def home():
    file_path = 'index.html'
    with open(file_path) as f:
        html = f.read()
    return render_template_string(html, title='My GrapesJS Studio')

@app.route('/chat')
def chat():
    file_path = 'chat.html'
    with open(file_path) as f:
        html = f.read()
    return render_template_string(html, title='Chat')

@socketio.on('analyse_requirement')
def handle_message(data):
    message=data['message']
    reference=data['reference']
    prompt=[
        {'role': 'system', 'content': 'You are a landing page components alignment planner, who assists in summarising the ideas into simple text points'},
        {'role': 'user', 'content': "Generate a short plan for landing page components alignment for the following command: '''"+message+"''', respond in 5 points each point should be a plain text in 1 line having section name and description."}
    ]
    if len(reference)!=0:
        prompt=[
            {'role': 'system', 'content': 'You are a web design requirements analyser, who assists summarises only the web design specific requirements in points from commands'},
            {'role': 'user', 'content': f"Edit the requirement report : {reference}. \n following command : '''{message}''' " }
        ]
    response = client.chat.completions.create(
        model='gpt-4o-mini',
        messages=prompt,
        temperature=0,
        stream=True 
    )
    for chunk in response:
        emit('understandings', {'response': f"{chunk.choices[0].delta.content}"})
    emit('done_understandings',{'response':'done'})


@socketio.on('fix')
def fix_code(data):
    element = data.get('element')
    canvas = data.get('canvas')
    prompt = data.get('prompt')

    role_instruction="You are a web design enhancer only reponds the full code without any text, with only html,css"
    # Build prompt
    formatted_command = f"Using code ```{canvas}``` modify element ```{element}``` following command : '''{prompt}''', your code should not impact any other elements. give the updated html element/component code with inline css inside style attribute"

    prompt = [
        {
            'role': 'developer',
            'content': role_instruction
        },
        {
            'role': 'user',
            'content': formatted_command
        }
    ]
    try:
        response = client.chat.completions.create(
            model='gpt-4o-mini',
            messages=prompt,
            temperature=0,
            stream=True
        )
        for chunk in response:
            content = chunk.choices[0].delta.content
            if content:
                print(content)
                emit('fixed', {'response': content})
        emit('fixing_done', {'response': 'done'})
    except Exception as e:
        emit('error', {'response': str(e)})

if __name__ == '__main__':
    socketio.run(app, debug=True)
