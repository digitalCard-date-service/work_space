from flask import Blueprint, request, render_template, redirect, url_for, jsonify, session
from ..models import Profile
from .. import db
from datetime import datetime
bp = Blueprint('form', __name__, url_prefix='/form')


@bp.route('/')
def index():
    '''
    if 'user_email' in session:
        return render_template('form.html')
    return redirect(url_for('login.index'))
    '''
    return render_template('form.html')

@bp.route('/drawing')  # 새로운 라우트 추가
def drawing():
    return render_template('card_drawing.html')


@bp.route('/submit', methods=['POST'])
def create():
    try:
        # 클라이언트에서 전송한 JSON 데이터 받기
        data = request.get_json()

        # 데이터 유효성 검사
        required_fields = ['gender', 'name', 'major', 'age', 'mbti', 'hobby', 'contact']
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
            mbti=data['mbti'],
            hobby=data['hobby'],
            contact=data['contact'],
            image_data=data['image_data'],  # 이미지 경로 저장
            color=data['color'],  # 색상 경로 저장
            create_date=datetime.now()
        )

        # 데이터베이스에 저장
        db.session.add(profile)
        db.session.commit()

        print(f"저장된 프로필: ID={profile.id}")  # 디버깅용 로그

        return jsonify({
            'status': 'success',
            'message': '프로필이 성공적으로 저장되었습니다.',
            'profile_id': profile.id
        }), 200

    except Exception as e:
        db.session.rollback()
        print(f"에러 발생: {str(e)}")  # 디버깅용 로그
        return jsonify({
            'status': 'error',
            'message': '서버 오류가 발생했습니다.',
            'error': str(e)
        }), 500