from random import random

from flask import Blueprint, jsonify, render_template, session, request
import numpy as np
from sklearn.metrics.pairwise import cosine_similarity
from sklearn.preprocessing import OneHotEncoder
from sqlalchemy.orm import query_expression

from ..models import Profile
from .. import db

bp = Blueprint('recommend', __name__, url_prefix='/recommend')


@bp.route('/')
def index():
    return render_template('recommendOpen.html')

@bp.route('/card', methods=['GET'])
def getRandomProfile():
    # 세션 변수 설정
    userId = session.get('id')
    ageFilter = session.get('age', [])
    majorList = session.get('major', [])
    mbti = session.get('mbti', [])
    hobbyList = session.get('hobbies', [])

    # 유저 프로필 가져오기
    userProfile = Profile.query.filter_by(id=userId).first()

    if not userProfile:
        return jsonify({'error': 'User profile not found'}), 404

    userGender = userProfile.gender

    # 기본 쿼리 설정: 본인 제외
    query = Profile.query.filter(Profile.id != userId)

    # 성별 필터
    if userGender == '남성':
        query = query.filter(Profile.gender == '여성')
    else:
        query = query.filter(Profile.gender == '남성')

    # 나이 조건 처리
    for ageCondition in ageFilter:
        if ageCondition == 'older':
            query = query.filter(Profile.age > userProfile.age)
        elif ageCondition == 'same':
            query = query.filter(Profile.age == userProfile.age)
        elif ageCondition == 'younger':
            query = query.filter(Profile.age < userProfile.age)

    # 전공, MBTI, 취미 조건 처리
    if majorList:
        query = query.filter(Profile.major.in_(majorList))
    if mbti:
        query = query.filter(Profile.mbti == mbti)
    if hobbyList:
        query = query.filter(Profile.hobby.in_(hobbyList))

    # 조건에 맞는 데이터 중 랜덤 1개 가져오기
    recommendProfile = query.order_by(db.func.random()).first()
    if recommendProfile:
        # 로그 확인
        '''print('recommendProfile: ', recommendProfile.name)
        print('age: ', ageFilter, ' than ', userProfile.age, ': ', recommendProfile.age)
        print('major: ', majorList, ': ', recommendProfile.major)
        print('mbti: ', mbti, ': ', recommendProfile.mbti)
        print('hobby: ', hobbyList, ': ', recommendProfile.hobby)'''

        # 결과 반환
        result = {
            'id': recommendProfile.id,
            'name': recommendProfile.name,

            'gender': recommendProfile.gender,
            'studentID_age': f"{recommendProfile.classNumber}({recommendProfile.age})",
            'major': recommendProfile.major,
            'mbti': recommendProfile.mbti,
            'hobby': recommendProfile.hobby,
            'contact': recommendProfile.contact,
            'image': '../static/assets/' + str(
                1 if recommendProfile.image == 'cuteDog' else
                2 if recommendProfile.image == 'dengE' else
                3 if recommendProfile.image == 'husky' else
                4 if recommendProfile.image == 'cat' else
                5 if recommendProfile.image == 'hamster' else
                6 if recommendProfile.image == 'rabbit' else
                7 if recommendProfile.image == 'fox' else
                8 if recommendProfile.image == 'panda' else
                9 if recommendProfile.image == 'wolf' else
                10 if recommendProfile.image == 'lion' else
                11 if recommendProfile.image == 'tiger' else
                12 if recommendProfile.image == 'bear' else
                13 if recommendProfile.image == 'dragon' else
                14 if recommendProfile.image == 'horse' else
                15 if recommendProfile.image == 'Monkey' else
                16 if recommendProfile.image == 'turtle' else 0) + '.' + recommendProfile.image + '.png',
            'color': '../static/assets/card_' + recommendProfile.color + '.svg'
        }
        return jsonify(result)

    # 조건에 맞는 데이터가 없는 경우, 이상형 데이터 생성
    idealAge = userProfile.age
    if 'older' in ageFilter:
        idealAge += 1
    elif 'younger' in ageFilter:
        idealAge -= 1

    idealProfile = {
        'age': idealAge,
        'major': majorList[0] if majorList else 'DefaultMajor',
        'mbti': mbti if mbti else 'DefaultMBTI',
        'hobby': hobbyList[0] if hobbyList else 'DefaultHobby'
    }

    # 이상형 데이터 벡터화 준비
    if userGender == '남성':
        allProfiles = Profile.query.filter(Profile.gender == '여성').all()
    else:
        allProfiles = Profile.query.filter(Profile.gender == '남성').all()
    if not allProfiles:
        return jsonify({'error': 'No profiles available in database'}), 500

    def profileToVector(profile):
        # 벡터화 함수
        age = int(profile.age)
        categoricalData = [[profile.major, profile.mbti, profile.hobby]]
        return np.concatenate(([age], encoder.transform(categoricalData).flatten()))

    encoder = OneHotEncoder(sparse_output=False, handle_unknown='ignore')
    categoricalData = [[p.major, p.mbti, p.hobby] for p in allProfiles]
    encoder.fit(categoricalData)

    # 벡터화
    idealVector = np.concatenate((
        [idealProfile['age']],
        encoder.transform([[idealProfile['major'], idealProfile['mbti'], idealProfile['hobby']]]).flatten()
    ))
    allVectors = np.array([profileToVector(profile) for profile in allProfiles])

    # 코사인 유사도 계산
    similarities = cosine_similarity([idealVector], allVectors).flatten()
    mostSimilarIndex = np.argmax(similarities)
    mostSimilarProfile = allProfiles[mostSimilarIndex]

    result = {
        'id': mostSimilarProfile.id,
        'name': mostSimilarProfile.name,
        'gender': mostSimilarProfile.gender,
        'studentID_age': str(mostSimilarProfile.classNumber) + '(' + str(mostSimilarProfile.age) + ')',
        'major': mostSimilarProfile.major,
        'mbti': mostSimilarProfile.mbti,
        'hobby': mostSimilarProfile.hobby,
        'contact': mostSimilarProfile.contact,
        'image': '../static/assets/' + str(
            1 if mostSimilarProfile.image == 'cuteDog' else
            2 if mostSimilarProfile.image == 'dengE' else
            3 if mostSimilarProfile.image == 'husky' else
            4 if mostSimilarProfile.image == 'cat' else
            5 if mostSimilarProfile.image == 'hamster' else
            6 if mostSimilarProfile.image == 'rabbit' else
            7 if mostSimilarProfile.image == 'fox' else
            8 if mostSimilarProfile.image == 'panda' else
            9 if mostSimilarProfile.image == 'wolf' else
            10 if mostSimilarProfile.image == 'lion' else
            11 if mostSimilarProfile.image == 'tiger' else
            12 if mostSimilarProfile.image == 'bear' else
            13 if mostSimilarProfile.image == 'dragon' else
            14 if mostSimilarProfile.image == 'horse' else
            15 if mostSimilarProfile.image == 'Monkey' else
            16 if mostSimilarProfile.image == 'turtle' else 0) + '.' + mostSimilarProfile.image + '.png',
        'color': '../static/assets/card_' + mostSimilarProfile.color + '.svg'
    }
    print('age: ', userProfile.age, ageFilter, 'than', mostSimilarProfile.age)
    print('major: ', majorList, ': ' ,result['major'])
    print('mbti: ', mbti, ': ', result['mbti'])
    print('hobby: ', hobbyList, ': ', result['hobby'])
    return jsonify(result)



'''
        # 조건에 맞는 데이터가 5개 미만일 경우, 부족한 수만큼 랜덤으로 채우기
        if len(profiles) < 5:
            # 추가로 필요한 수만큼 랜덤으로 프로필 가져오기
            remainingCount = 5 - len(profiles)
            # 이미 뽑힌 프로필의 ID 목록
            existing_ids = [profile.id for profile in profiles]

            # 성별 필터 적용
            if userGender == '남성':
                genderCondition = Profile.gender == '여성'
            else:
                genderCondition = Profile.gender == '남성'

            # 기존 ID를 제외한 추가 프로필 쿼리
            additional_profiles = (
                Profile.query
                .filter(Profile.id != id)
                .filter(~Profile.id.in_(existing_ids))  # 기존 ID 제외
                .filter(genderCondition)
                .order_by(db.func.random())  # 랜덤 정렬
                .limit(remainingCount)  # 남은 수만큼 제한
                .all()
            )
            print('추가프로필: ', additional_profiles)

            # 기존 프로필 리스트에 추가
            profiles.extend(additional_profiles)
'''

@bp.route('delete', methods=['POST'])
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