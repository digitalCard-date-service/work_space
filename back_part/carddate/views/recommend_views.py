from flask import Blueprint, jsonify, render_template, request, session
import numpy as np
from sklearn.metrics.pairwise import cosine_similarity
from sklearn.preprocessing import OneHotEncoder
from ..models import Profile
from .. import db

bp = Blueprint('recommend', __name__, url_prefix='/recommend')


@bp.route('/')
def index():
    return render_template('recommendOpen.html')

@bp.route('/submit', methods=['GET'])
def get_random_profile():
    try:
        id = session.get('id')
        ageFilter = session.get('age', [])
        majorList = session.get('major', [])
        mbti = session.get('mbti', [])
        hobbyList = session.get('hobby', [])

        # 기본 쿼리 생성
        query = Profile.query
        userProfile = Profile.query.filter_by(id=id).first()

        if not userProfile:
            return jsonify({'error': 'User profile not found'}), 404

        # 나이 조건 처리
        for filter in ageFilter:
            if filter == 'older':
                query = query.filter(Profile.age > userProfile.age)
            elif filter == 'same':
                query = query.filter(Profile.age == userProfile.age)
            elif filter == 'younger':
                query = query.filter(Profile.age < userProfile.age)

        # 전공, MBTI, 취미 조건 처리
        if majorList:
            query = query.filter(Profile.major.in_(majorList))
        if mbti:
            query = query.filter(Profile.mbti.in_(mbti))
        if hobbyList:
            query = query.filter(Profile.hobby.in_(hobbyList))

        # 조건에 맞는 데이터를 10개 랜덤으로 가져오기
        profiles = query.order_by(db.func.random()).limit(10).all()

        if not profiles:
            return jsonify({'error': 'No profiles found'}), 404

        # 10개의 데이터로 프로필 리스트 생성
        profile_list = [
            {
                'id': profile.id,
                'name': profile.name,
                'gender': profile.gender,
                'age': profile.age,
                'major': profile.major,
                'mbti': profile.mbti,
                'hobby': profile.hobby,
                'contact': profile.contact,
                'image': profile.image,
                'color': profile.color,
            }
            for profile in profiles
        ]

        # 5. 모든 데이터 가져오기
        all_profiles = Profile.query.all()

        if not all_profiles:
            return jsonify({'error': 'No profiles available in database'}), 500

        # 벡터화 준비
        def profile_to_vector(profile):
            try:
                # 숫자형 데이터
                age = int(profile.age)

                # 범주형 데이터
                categorical_data = [[profile.major, profile.mbti, profile.hobby]]

                return np.concatenate(([age], encoder.transform(categorical_data).flatten()))
            except Exception as e:
                raise ValueError(f"Error vectorizing profile {profile.id}: {str(e)}")

        # One-Hot Encoding 준비
        encoder = OneHotEncoder(sparse=False, handle_unknown='ignore')
        categorical_data = [[p.major, p.mbti, p.hobby] for p in all_profiles]

        try:
            encoder.fit(categorical_data)
        except Exception as e:
            return jsonify({'error': f"Error in OneHotEncoder fitting: {str(e)}"}), 500

        # 6. 10개의 데이터 벡터 계산
        filtered_vectors = np.array([profile_to_vector(profile) for profile in profiles])

        # 7. 모든 명함의 벡터화
        all_vectors = np.array([profile_to_vector(profile) for profile in all_profiles])

        # 8. 10개 데이터 평균 벡터 계산
        mean_vector = np.mean(filtered_vectors, axis=0)

        # 9. 코사인 유사도 계산
        similarities = cosine_similarity([mean_vector], all_vectors).flatten()

        # 10. 가장 유사도가 높은 명함 찾기
        most_similar_index = np.argmax(similarities)
        most_similar_profile = all_profiles[most_similar_index]

        # 결과 반환
        result = {
            'id': most_similar_profile.id,
            'name': most_similar_profile.name,
            'gender': most_similar_profile.gender,
            'age': most_similar_profile.age,
            'major': most_similar_profile.major,
            'mbti': most_similar_profile.mbti,
            'hobby': most_similar_profile.hobby,
            'contact': most_similar_profile.contact,
            'image': most_similar_profile.image,
            'color': most_similar_profile.color,
        }
        return jsonify({'random_profiles': profile_list, 'most_similar_profile': result})

    except Exception as e:
        return jsonify({'error': f"An unexpected error occurred: {str(e)}"}), 500