from flask import Blueprint, render_template, jsonify, request
import requests
import os

API_BASE_URL = 'https://univcert.com/api/v1'
API_KEY = os.environ.get('UNIV_KEY')
PASSWORD = os.environ.get('PASSWORD')

bp = Blueprint('admin', __name__, url_prefix='/admin')

@bp.route('/')
def index():
    return render_template('adminLogin.html')

@bp.route('/submit', methods=['POST'])
def submit():
    password = request.get_json()['password']
    if password == PASSWORD:
        return jsonify({
            "status": 200,
            "success": "true"
        })
    return jsonify({
        "status": 401,
        "success": "false"
    })

@bp.route('/control')
def control():
    return render_template('master.html')

@bp.route('/control/clear', methods=['POST'])
def clear():
    data = request.get_json()

    if data:
        email = data['email']
        response = requests.post(f'{API_BASE_URL}/clear/{email}', headers={
            'Content-Type': 'application/json'
        }, json=({
            'key': API_KEY,
        }))
    else:
        response = requests.post(f'{API_BASE_URL}/clear', headers={
            'Content-Type': 'application/json'
        }, json=({
            'key': API_KEY,
        }))
    result = response.json()
    return jsonify(result)

@bp.route('/control/certifiedList', methods=['POST'])
def certifiedList():
    response = requests.post(f'{API_BASE_URL}/certifiedlist', headers={
        'Content-Type': 'application/json'
    }, json=({
        'key': API_KEY,
    }))
    result = response.json()
    return jsonify(result)