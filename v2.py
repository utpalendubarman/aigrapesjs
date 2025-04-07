
import os
from flask import Flask, render_template
from flask_socketio import SocketIO, emit
from openai import OpenAI
import time
from template import template
load_dotenv()


def v2_apis(socketio):
    client = OpenAI(
        api_key=os.getenv("ANTHROPIC_API_KEY"),
        base_url="https://api.anthropic.com/v1/"
    )

    @socketio.on('v2/test')
    def test_v2(data):
        emit("v2/response", {'response': 'test response'})

    @socketio.on('v2/sandbox')
    def sandbox_v2(data):
        socketio.emit('v2/code', {'content': template})
        socketio.emit('v2/complete_code', {'content': template})

    @socketio.on('v2/generate')
    def handle_generate_v2(data):
        color = data.get('color', 'auto')
        instruction = data.get('instruction', '')
        language = data.get('language', 'English')
        command = data.get('command', '')
        
        # Format prompt
        nav = """<div class="navbar"><div data-gjs="navbar" class="navbar-container"><div class="nav-holder" style="flex:1"><a href="/" class="navbar-brand">MyBrand</a><div id="igbjv" class="navbar-burger"><div class="navbar-burger-line"></div><div class="navbar-burger-line"></div><div class="navbar-burger-line"></div></div></div><div data-gjs="navbar-items" class="navbar-items-c"><nav class="navbar-menu"><a href="#" class="navbar-menu-link">Home</a><a href="#" class="navbar-menu-link">About</a><a href="#" class="navbar-menu-link">Contact</a></nav></div></div></div>"""
        classes = '["hero-title","hero-subtitle","hero-button"]'
        query=f"Follow the instruction : '''{instruction}''' and generate a responsive website following command : '''{command}''', your response should only contain hypertext without any text details, you should use html : ```html {nav}``` and beautify with css for navbar and should use class names : {classes} where required"
        if language.lower() != "english":
            query=query+f", all text should be in language : {language}"
        if color.lower() != "auto":
            query=query+f", with theme of {color} color"

        prompt = [{'role': 'user', 'content': query}]
        try:
            response = client.chat.completions.create(
                model="claude-3-7-sonnet-20250219",
                max_tokens=8192,
                temperature=0,
                messages=prompt,
                stream=True
            )
            hypertext = ""
            for chunk in response:
                if not chunk or not chunk.choices:
                    continue
                delta = chunk.choices[0].delta
                content = getattr(delta, "content", None)
                if content:
                    hypertext+=content
                    print(content)
                    socketio.emit('v2/code', {'content': content})
                    time.sleep(0.02)  

            socketio.emit('v2/complete_code', {'content': hypertext})

        except Exception as e:
            socketio.emit('error', {'error': str(e)})

