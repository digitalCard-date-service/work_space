from flask import Blueprint, render_template, jsonify, request
import requests
import os

from ..models import Profile
from .. import db

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
            "success": True
        })
    return jsonify({
        "status": 401,
        "success": False
    })

@bp.route('/control')
def control():
    return render_template('master.html')

@bp.route('/control/clearCertifiedList', methods=['POST'])
def clear_certified_list():
    try:
        response = requests.post(f'{API_BASE_URL}/clear', headers={
            'Content-Type': 'application/json'
        }, json={'key': API_KEY})
        result = response.json()
        return jsonify(result)
    except Exception as e:
        return jsonify({
            "status": 500,
            "success": False,
            "message": f"An error occurred: {str(e)}"
        })

@bp.route('/control/clearCardList', methods=['POST'])
def clear_card_list():
    try:
        # 모든 데이터를 삭제
        Profile.query.delete()
        db.session.commit()
        return jsonify({
            "status": 200,
            "success": True,
            "message": "All records have been deleted"
        })
    except Exception as e:
        return jsonify({
            "status": 500,
            "success": False,
            "message": f"An error occurred: {str(e)}"
        })

@bp.route('/control/certifiedList', methods=['POST'])
def certified_list():
    response = requests.post(f'{API_BASE_URL}/certifiedlist', headers={
        'Content-Type': 'application/json'
    }, json=({
        'key': API_KEY,
    }))
    result = response.json()
    return jsonify(result)

@bp.route('/control/cardList', methods=['POST'])
def card_list():
    try:
        # 모든 Profile 데이터를 id 기준으로 오름차순 정렬
        all_profiles = Profile.query.order_by(Profile.id).all()

        # 데이터를 JSON 형식으로 변환
        result = [
            {
                "id": profile.id,
                "name": profile.name,
                "gender": profile.gender,
                "classNumber": profile.classNumber,
                "age": profile.age,
                "major": profile.major,
                "mbti": profile.mbti,
                "hobby": profile.hobby,
                "contact": profile.contact,
                "image": profile.image,
                "color": profile.color,
                "create_date": profile.create_date.strftime("%Y-%m-%d %H:%M:%S")  # 날짜 형식 변환
            }
            for profile in all_profiles
        ]

        return jsonify({
            "status": 200,
            "success": True,
            "data": result
        })

    except Exception as e:
        return jsonify({
            "status": 500,
            "success": False,
            "error": str(e)
        })

@bp.route('/control/delete', methods=['POST'])
def delete():
    try:
        # 프론트엔드에서 요청으로 전달된 JSON 데이터에서 id 추출
        data = request.get_json()
        record_id = data.get('id')

        # 해당 id를 가진 데이터를 조회
        record = Profile.query.get(record_id)
        if not record:
            return jsonify({
                "status": 404,
                "success": False,
                "message": "Record not found"
            })

        # 데이터 삭제
        db.session.delete(record)
        db.session.commit()

        return jsonify({
            "status": 200,
            "success": True,
            "message": f"Record with id {record_id} has been deleted"
        })

    except Exception as e:
        return jsonify({
            "status": 500,
            "success": False,
            "message": f"An error occurred: {str(e)}"
        })