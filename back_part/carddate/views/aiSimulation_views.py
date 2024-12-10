from flask import Blueprint, render_template, request, jsonify
import requests
import os

model = "gpt-3.5-turbo";
API_BASE_URL = 'https://api.openai.com/v1/chat/completions'

bp = Blueprint('chatbot', __name__, url_prefix='/chatbot')

@bp.route('/')
def index():
    return render_template('aiSimulation.html')

@bp.route('/chat', methods=['POST'])
def chat():
    API_KEY = os.environ.get('GPT_KEY')
    messages = request.get_json()
    response = requests.post(f'{API_BASE_URL}', headers={
        'Content-Type': 'application/json',
        'Authorization': f'Bearer {API_KEY}'
    }, json=({
        'model': model,
        'messages': [
            { 'role': 'system', 'content': messages['setting'] },
            { 'role': 'user', 'content': messages['message'] },
        ],
    }))
    result = response.json()
    return jsonify(result)
