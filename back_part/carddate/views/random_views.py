import random
from flask import Blueprint, render_template, jsonify
from ..models import Profile
from .. import db

bp = Blueprint('random', __name__, url_prefix='/random')

@bp.route('/', methods=['GET'])
def get_random_profile():
    # Profile 모델에서 모든 데이터를 조회
    profiles = Profile.query.all()

    # 프로필이 2개 이상일 경우, 랜덤으로 2개를 선택
    if len(profiles) >= 2:
        random_profiles = random.sample(profiles, 2)  # 랜덤으로 2개 선택

        # 선택한 프로필들을 JSON 형식으로 변환하여 반환
        profiles_data = [{
            'gender': profile.gender,
            'age': profile.age,
            'major': profile.major,
            'mbti': profile.mbti,
            'hobby': profile.hobby
        } for profile in random_profiles]

        # 선택된 프로필들을 데이터베이스에서 삭제
        for profile in random_profiles:
            db.session.delete(profile)

        # 변경 사항을 커밋하여 데이터베이스에 반영
        db.session.commit()

        # 랜덤 프로필 데이터와 함께 randomOpen.html 파일을 렌더링
        return render_template('randomOpen.html', profiles=profiles_data)
    else:
        return jsonify({'error': '2개 이상의 프로필이 존재하지 않습니다.'}), 400