#import eventlet
#eventlet.monkey_patch()
import os
import time 
from openai import OpenAI
from dotenv import load_dotenv
from flask_socketio import SocketIO, emit
from flask import Flask, render_template_string
from lib.boilerplate_code import boilerplate_code
from v2 import v2_apis

load_dotenv()
app = Flask(__name__)
#socketio = SocketIO(app, cors_allowed_origins="*", path='/ws')
socketio = SocketIO(app, cors_allowed_origins="*", path='/ws', async_mode='threading')
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
    format="""
    [
    {
        "section":"hero",
        "description:"",
    },
    {
        "section":"about",
        "description:"",
    },{},
    {
        "section":"footer",
        "description:""
    }
    ]
    """
    prompt=[
        {"role": "system", "content": "You are webpage design planner who responds in json without any text and instructions"},
        {"role": "user", "content": f"Analyse the base ```json {format}``` and complete the json adding the UI planning for a website following command : '''{message}''', do not modify the format and structure of the provided json, you can add new sections and modify existing sections"},
    ]
    """
    if len(reference)!=0:
        prompt=[
            {'role': 'system', 'content': 'You are a web design requirements analyser, who assists summarises only the web design specific requirements in points from commands'},
            {'role': 'user', 'content': f"Edit the requirement report : {reference}. \n following command : '''{message}''' " }
        ]
    """

    completion = client.chat.completions.create(
        model='gpt-4o-mini',
        messages=prompt,
        temperature=0
    )

    emit('understandings', {'response': f"{completion.choices[0].message.content}"})

    #res="""[{"section":"hero","description":"Full-width banner with a headline (e.g., 'Learn Anything, Anytime'), subheading, call-to-action buttons (e.g., 'Browse Courses', 'Start Free Trial'), and a background image or video."},{"section":"featured-courses","description":"Grid or carousel of top-rated courses with course images, titles, instructors, ratings, and prices. Include a 'View All' button."},{"section":"categories","description":"Section displaying course categories (e.g., 'Programming', 'Design', 'Business') with icons and brief descriptions. Each category links to a dedicated page."},{"section":"testimonials","description":"User testimonials or success stories with profile pictures, names, and quotes. Optionally include a video testimonial."},{"section":"instructors","description":"Showcase featured instructors with photos, names, expertise, and links to their profiles or courses."},{"section":"pricing","description":"Pricing plans (e.g., 'Free', 'Monthly Subscription', 'Annual Subscription') with features, prices, and comparison tables."},{"section":"about","description":"Brief about the platform, mission statement, and key statistics (e.g., '10,000+ Students', '500+ Courses')."},{"section":"cta","description":"Call-to-action section with a prominent message (e.g., 'Ready to Start Learning?') and a button (e.g., 'Join Now')."},{"section":"footer","description":"Footer with links (e.g., 'About Us', 'Contact', 'Privacy Policy'), social media icons, newsletter subscription, and copyright information."}]"""
    #emit('understandings', {'response': res})
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
