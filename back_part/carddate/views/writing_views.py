from flask import Blueprint, request, render_template, jsonify, session
from ..models import Profile
from .. import db
from datetime import datetime
bp = Blueprint('writing', __name__, url_prefix='/writing')


@bp.route('/')
def index():
    return render_template('cardWriting.html')

@bp.route('/submit', methods=['POST'])
def create():
    try:
        # 클라이언트에서 전송한 JSON 데이터 받기
        data = request.get_json()
        session['isMobile'] = data['isMobileImg']

        # 데이터 유효성 검사
        required_fields = ['gender', 'name', 'major', 'age', 'classNumber', 'mbti', 'hobbies', 'contact']
        for field in required_fields:
            if not data.get(field):
                return jsonify({
                    'status': 'error',
                    'message': f'{field} 필드는 필수입니다.'
                }), 400

        # 새 프로필 생성
        profile = Profile(
            gender=data['gender'],
            name=data['name'],
            major=data['major'],
            age=data['age'],
            classNumber=data['classNumber'],
            mbti=data['mbti'],
            hobby=data['hobbies'],
            contact=data['contact'],
            image=data['image'],
            color=data['color'],
            create_date=datetime.now()
        )

        # 데이터베이스에 저장
        db.session.add(profile)
        db.session.commit()

        session['id'] = profile.id
        session['gender'] = profile.gender

        return jsonify({
            'status': 'success',
            'message': '프로필이 성공적으로 저장되었습니다.',
            'profile_id': profile.id
        }), 200

    except Exception as e:
        db.session.rollback()
        return jsonify({
            'status': 'error',
            'message': '서버 오류가 발생했습니다.',
            'error': str(e)
        }), 500