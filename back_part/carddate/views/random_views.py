from flask import Blueprint, render_template, jsonify, session, request
from crypt import methods
from sqlalchemy import func
from ..models import Profile
from .. import db

bp = Blueprint('random', __name__, url_prefix='/random')

@bp.route('/')
def index():
    return render_template('randomOpen.html')

@bp.route('/card/public', methods=['GET'])
def get_public_details():
    gender = session.get('gender')

    if(gender == '남성'):
        randomProfiles = Profile.query.filter(Profile.gender == '여성').order_by(func.random()).limit(2).all()
    else:
        randomProfiles = Profile.query.filter(Profile.gender == '남성').order_by(func.random()).limit(2).all()
    # 선택한 프로필들을 JSON 형식으로 변환하여 반환
    profiles_data = [{
        'id': profile.id,
        'gender': profile.gender,
        'studentID_age': str(profile.classNumber)+'('+str(profile.age)+')',
        'major': profile.major,
        'mbti': profile.mbti,
        'hobby': profile.hobby,
        'image': '../static/assets/' + str(
            1 if profile.image == 'cuteDog' else
            2 if profile.image == 'dengE' else
            3 if profile.image == 'husky' else
            4 if profile.image == 'cat' else
            5 if profile.image == 'hamster' else
            6 if profile.image == 'rabbit' else
            7 if profile.image == 'fox' else
            8 if profile.image == 'panda' else
            9 if profile.image == 'wolf' else
            10 if profile.image == 'lion' else
            11 if profile.image == 'tiger' else
            12 if profile.image == 'bear' else
            13 if profile.image == 'dragon' else
            14 if profile.image == 'horse' else
            15 if profile.image == 'Monkey' else
            16 if profile.image == 'turtle' else 0) + '.'+ profile.image +'.png',
        'color': '../static/assets/card_' + profile.color +'.svg'
    } for profile in randomProfiles]
    session.clear()
    return jsonify(profiles_data)

@bp.route('/card/private', methods=['POST'])
def get_private_details():
    id = request.get_json()
    id = id.get('id')
    profile = Profile.query.filter(Profile.id == id).first()
    profile_data = {
        'name': profile.name,
        'contact': profile.contact
    }
    return jsonify(profile_data)

@bp.route('card/delete', methods=['POST'])
def delete_card():
    try:
        # 요청에서 ID 추출
        id = request.get_json().get('id')
        if not id:
            return jsonify({"error": "ID is required"}), 400

        # ID로 프로필 찾기
        profile = Profile.query.filter_by(id=id).first()
        if not profile:
            return jsonify({"error": "Profile not found"}), 404

        # 데이터 삭제
        db.session.delete(profile)
        db.session.commit()
        return jsonify({"message": "Profile deleted successfully"}), 200

    except Exception as e:
        db.session.rollback()  # 오류 발생 시 롤백
        return jsonify({"error": f"An error occurred: {str(e)}"}), 500
