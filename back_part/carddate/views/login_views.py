from flask import Blueprint, url_for, flash, request, session, render_template, session
import requests
from werkzeug.utils import redirect

API_BASE_URL = 'https://univcert.com/api/v1'
API_KEY = '3ff92442-2fa8-4115-9902-9454f05fcdb9'

bp = Blueprint('login', __name__, url_prefix='/login')

# 학교 인증 페이지
@bp.route('/')
def index():
    return render_template('login.html')

'''
# 학교명 확인
@bp.route('/check_univ', methods=('POST', ))
def check_univ():
    univ_name = request.form['univ_name']

    response = requests.post(f'{API_BASE_URL}/check', headers={
        'Content-Type': 'application/json'
    }, json=({
        'univName': univ_name
    }))

    result = response.json()
    if result.get('success'):
        session['univ_name'] = univ_name
        flash('유효한 학교명입니다.', category='success')
        return redirect(url_for('login.index', univ_name=univ_name))
    else:
        flash('유효한 학교명이 아닙니다.', category='error')
        return redirect(url_for('login.index'))

@bp.route('/send_email', methods=('POST', ))
def send_email():
    email = request.form['email']
    univ_name = session.get('univ_name')

    response = requests.post(f'{API_BASE_URL}/certify', headers={
        'Content-Type': 'application/json'
    }, json=({
        'key': API_KEY,
        'email': email,
        'univName': univ_name,
        'unvi_check': True
    }))

    result = response.json()
    if result.get('success'):
        session['email'] = email
        flash('이메일 전송 성공, 이메일에서 인증코드를 확인하세요.', category='success')
        return redirect(url_for('login.index', univ_name=univ_name, email=email))
    else:
        if check_status(email):
            session.clear()
            session['user_email'] = email
            flash('인증여부 확인되었습니다.', category='success')
            return redirect(url_for('card.index'))
        else:
            flash('이메일 전송에 실패했습니다.', category='error')
            print('email: ', email)
            print('univ_name: ', univ_name)
            print(result)
            return redirect(url_for('login.index', univ_name=univ_name))
    
@bp.route('/verify_code', methods=('POST', ))
def verify_code():
    email = session.get('email')
    univ_name = session.get('univ_name')
    code = request.form['code']

    response = requests.post(f'{API_BASE_URL}/certifycode', headers={
        'Content-Type': 'application/json'
    }, json=({
        'key': API_KEY,
        'email': email,
        'univName': univ_name,
        'code': code
    }))
    
    result = response.json()
    if result.get('success'):
        return redirect(url_for('card.index'))
    else:
        flash('유효한 인증번호가 아닙니다.', category='error')
        print(result.get('message'))
        print("email: ", email)
        print("univ_name: ", univ_name)
        return redirect(url_for('login.index', univ_name=univ_name, email=email))
    
def clear_user(email):
    response = requests.post(f'{API_BASE_URL}/clear', headers={
        'Content-Type': 'application/json'
    }, json=({
        'key': API_KEY,
        'email': email
    }))

    result = response.json()
    if result.get('success'):
        print(email, '유저 초기화 성공')
        return print_userlist();
    else:
        return print('인증된 유저 초기화 실패')

def print_userlist():
    response = requests.post(f'{API_BASE_URL}/certifiedlist', headers={
        'Content-Type': 'application/json'
    }, json=({
        'key': API_KEY
    }))

    result = response.json()
    if result.get('success'):
        return print(result.get('data'))
    else:
        return print('인증된 유저 리스트 불러오기 실패')
    
def check_status(email):
    response = requests.post(f'{API_BASE_URL}/status', headers={
        'Content-Type': 'application/json'
    }, json=({
        'key': API_KEY,
        'email': email
    }))

    result = response.json()
    if result.get('success'):
        print(result.get('certified_date'))
        return result.get('success')
    else:
        return result.get('failed')
'''