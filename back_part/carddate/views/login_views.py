from flask import Blueprint, render_template, jsonify, request
import requests

API_BASE_URL = 'https://univcert.com/api/v1'
API_KEY = '3ff92442-2fa8-4115-9902-9454f05fcdb9'

bp = Blueprint('login', __name__, url_prefix='/login')

# 학교 인증 페이지
@bp.route('/')
def index():
    return render_template('login.html')

# 학교명 확인
@bp.route('/check', methods=['POST'])
def check():
    data = request.get_json()['univName']
    response = requests.post(f'{API_BASE_URL}/check', headers={
        'Content-Type': 'application/json'
    }, json=({
        'univName': data
    }))

    result = response.json()
    return jsonify(result)

@bp.route('/status', methods=['POST'])
def status():
    data = request.get_json()
    email = data['email']

    response = requests.post(f'{API_BASE_URL}/status', headers={
        'Content-Type': 'application/json'
    }, json=({
        'key': API_KEY,
        'email': email
    }))

    result = response.json()
    return jsonify(result)

@bp.route('certify', methods=['POST'])
def certify():
    data = request.get_json()
    email = data['email']
    univName = data['univName']
    univ_check = data['univ_check']

    response = requests.post(f'{API_BASE_URL}/certify', headers={
        'Content-Type': 'application/json'
    }, json=({
        'key': API_KEY,
        'email': email,
        'univName': univName,
        'univ_check': univ_check
    }))

    result = response.json()
    return jsonify(result)

@bp.route('certifycode', methods=['POST'])
def certifycode():
    data = request.get_json()
    email = data['email']
    univName = data['univName']
    code = data['code']

    response = requests.post(f'{API_BASE_URL}/certifycode', headers={
        'Content-Type': 'application/json'
    }, json=({
        'key': API_KEY,
        'email': email,
        'univName': univName,
        'code': code
    }))

    result = response.json()
    return jsonify(result)