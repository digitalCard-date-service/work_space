from flask import Blueprint, render_template, request, jsonify
import requests

model = "gpt-3.5-turbo";
API_BASE_URL = 'https://api.openai.com/v1/chat/completions'
API_KEY = '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'

bp = Blueprint('chatbot', __name__, url_prefix='/chatbot')

@bp.route('/')
def index():
    return render_template('aiSimulation.html')

@bp.route('/chat', methods=['POST'])
def chat():
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