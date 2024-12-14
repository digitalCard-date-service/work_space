# 💌 디지털 명함 소개팅 💌

> 디지털 명함을 활용하여 자신을 소개하고 이성을 매칭시켜주는 혁신적인 대학생 소개팅 플랫폼

---

<details>
<summary><h2>📋 프로젝트 개요</h2></summary>

### 프로젝트 목적
- 디지털 명함을 활용하여 MZ 대학생의 라이프스타일에 맞는 효율적이고 편리한 소개팅 플랫폼 제공
- 관심사 공유를 통해 선택의 폭을 좁히고 대상 선택의 어려움을 해소
- 오프라인 명함 소개팅의 시간적, 공간적 제약을 극복하여 접근성 확장
- 대면 만남의 부담감을 줄이고 디지털 기반의 안전하고 편안한 소통 환경을 제공

### 타겟층
- 대학생 누구나

### 주요 기능
- **디지털 명함 생성**: 사용자 프로필과 관심사를 기반으로 한 맞춤형 디지털 명함 생성
- **명함 매칭**: 랜덤으로 2장의 명함 추천 또는 개인화된 알고리즘을 통해 최상의 명함 1장 제공
- **AI 챗봇 시뮬레이션**: 소통이 어려운 사용자를 위해 자연스러운 대화 연습 환경을 제공하는 AI 기반 챗봇 지원
</details>

---

<details>
	
<summary><h2>🔫 사이트 이용</h2></summary>	

[배포 링크](https://morning-sands-38586-8c5d0863d417.herokuapp.com/)

[테스트 영상](https://youtu.be/rtmiQ2zEn14)

</details>

---

<details>
<summary><h2>💻 기술 스택</h2></summary>

<div align="left">
	<img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=JavaScript&logoColor=white" />
	<img src="https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=CSS3&logoColor=white" />
   	<img src="https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=HTML5&logoColor=white" />
   	<img src="https://img.shields.io/badge/Figma-F24E1E?style=flat&logo=Figma&logoColor=white" />
	<img src="https://img.shields.io/badge/Flask-000000?style=flat&logo=Flask&logoColor=white" />
	<img src="https://img.shields.io/badge/SQLite-003B57?style=flat&logo=SQLite&logoColor=white" />
   	<img src="https://img.shields.io/badge/Python-3776AB?style=flat&logo=Python&logoColor=white" />
	<img src="https://img.shields.io/badge/PyCharm-000000?style=flat&logo=PyCharm&logoColor=white" />
	<img src="https://img.shields.io/badge/Heroku-430098?style=flat&logo=Heroku&logoColor=white" />
</div>

### 프론트엔드 
- **VanillaJS**: 클라이언트 측 동작을 제어하며, REST API 요청 및 DOM 조작 구현
- **CSS Modules**: 사용자 인터페이스(UI)의 스타일링 및 반응형 디자인 적용
- **HTML**: 애플리케이션의 구조와 콘텐츠 작성
- **Figma**: 클라우드 기반 협업 디자인 도구로, 와이어프레임, UI/UX 디자인, 프로토타이핑을 효율적으로 지원

### 백엔드
- **Flask**: 경량 Python 웹 프레임워크로 서버 구축, API 설계, 라우팅을 간편하게 관리
- **SQLite**: 경량화된 관계형 데이터베이스로 빠르고 독립적인 데이터 저장소 제공
- **Python**: 플라스크와 백엔드 조작에 쓰이는 주언어로, 객제지향적이고 간결하고 읽기 쉬운게 특징

### 기타
- **PyCharm**: 프로젝트별 독립적인 가상환경(Virtual Environment) 관리를 지원하는 Python 전용 IDE
- **Heroku**: 클라우드 플랫폼으로 간편한 서버 배포와 확장성 제공

</details>

---

<details>
<summary><h2>📝 설계 및 구현</h2></summary>
	
### 시스템 구조
- **클라이언트-서버 구조**: VanillaJS 기반 클라이언트와 Flask 백엔드 간 REST API 통신
- **데이터베이스 설계**: SQLite를 이용하여 사용자 정보와 매칭 데이터를 효율적으로 관리

### 웹 아키텍처
![KakaoTalk_Photo_2024-12-11-23-50-52](https://github.com/user-attachments/assets/2ae84af3-1b82-4c5c-8d2f-8a92690dbc36)

### 데이터 흐름
- **사용자 프로필 등록**
  	1. 사용자가 클라이언트에서 데이터를 입력함
  	2. API를 통해 서버가 데이터를 수신함
  	3. 서버가 받은 데이터를 DB에 저장함

- **추천 프로세스**
  	1. 사용자가 이상형 설문조사를 통해 정보를 입력함
  	2. 입력된 정보가 브라우저 세션에 저장됨
  	3. 사용자가 추천 서비스를 요청하면 세션 데이터를 기반으로 이상형과 가장 유사한 명함을 DB에서 조회
  	4. 서버가 조회된 명함 데이터를 브라우저로 전송함
  	5. 사용자가 명함을 확정하면, 해당 데이터는 DB에서 삭제됨

- **랜덤 프로세스**
  	1. 서버가 DB에서 랜덤으로 2개의 명함 데이터를 조회함
  	2. 조회된 데이터를 브라우저로 전송함
  	3. 사용자가 명함을 확정하면, 해당 명함 데이터는 DB에서 삭제됨
</details>

---

<details>
<summary><h2>🧩 주요 로직</h2></summary>

### 매칭 알고리즘
사용자 관심사와 선호 데이터를 기반으로 최적의 매칭을 수행합니다.
```python
@bp.route('/card', methods=['GET'])
def getRandomProfile():
    # 세션 변수 설정
    userId = session.get('id')
    ageFilter = session.get('age', [])
    majorList = session.get('major', [])
    mbti = session.get('mbti', [])
    hobbyList = session.get('hobbies', [])
    isMobile = session.get('isMobile', [])

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
            'color': '../static/assets/card_' + recommendProfile.color + ('-mobile' if isMobile else '') + '.svg'
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
        'color': '../static/assets/card_' + mostSimilarProfile.color + ('-mobile' if isMobile else '') + '.svg'
    }
    # print('age: ', userProfile.age, ageFilter, 'than', mostSimilarProfile.age)
    # print('major: ', majorList, ': ' ,result['major'])
    # print('mbti: ', mbti, ': ', result['mbti'])
    # print('hobby: ', hobbyList, ': ', result['hobby'])
    return jsonify(result)

```
### 1. 세션 정보 가져오기
- 세션에서 사용자 정보를 가져옴
  - `userId`: 사용자 ID
  - `ageFilter`: 나이 필터 조건
  - `majorList`: 선호 전공 목록
  - `mbti`: 선호 MBTI
  - `hobbyList`: 선호 취미 목록
  - `isMobile`: 모바일 여부
- `userId`를 기반으로 현재 사용자의 프로필을 데이터베이스에서 조회

### 2. 사용자 프로필 확인
- 사용자 프로필이 없으면 404 에러 `User profile not found`를 반환
- 사용자의 성별을 확인해 상대 성별로 필터링

### 3. 기본 쿼리 구성
- 사용자 본인을 제외하는 필터 `Profile.id != userId` 설정
- 조건별 필터링
  - **성별**: 사용자의 상대 성별로 필터링
  - **나이 조건**
    - `older`: 사용자보다 나이가 많은 프로필
    - `same`: 사용자와 같은 나이의 프로필
    - `younger`: 사용자보다 나이가 어린 프로필
  - **전공, MBTI, 취미**: 각각 사용자가 선호하는 값으로 필터링

### 4. 추천 프로필 가져오기
- 필터 조건에 맞는 데이터 중 랜덤으로 1개를 조회
- 조회된 프로필이 있으면 다음 데이터를 반환
  - ID, 이름, 성별, 학번/나이, 전공, MBTI, 취미, 연락처, 이미지, 카드 색상

### 5. 이상형 데이터 생성 (대체 프로필)
- 조건에 맞는 데이터가 없으면 이상형 데이터를 생성
  - 나이: 사용자 나이 +1 `older` 또는 -1 `younger`
  - 전공, MBTI, 취미: 세션 데이터에서 첫 번째 값 사용 또는 기본값 설정

### 6. 벡터화 및 유사도 계산
- 이상형 데이터를 포함한 모든 프로필 데이터를 벡터화
  - `age`, `major`, `mbti`, `hobby`를 사용
  - OneHotEncoder를 통해 카테고리 데이터를 벡터로 변환
- 코사인 유사도를 계산하여 이상형 데이터와 가장 유사한 프로필을 선택

### 7. 최종 결과 반환
- 가장 유사한 프로필 데이터를 JSON 형식으로 반환
  - ID, 이름, 성별, 학번/나이, 전공, MBTI, 취미, 연락처, 이미지 경로, 카드 색상
</details>

---

<details>
<summary><h2>🛠️ 페이지별 세부 구현</h2></summary>	
	
서비스 제공 페이지는 사용자 편과 관리자 편으로 나눠, 각각 사용자 경험 향상과 서비스 안정적 운영에 목표를 두어 설계

### 사용자 편

#### 1. 홈 페이지 (`Onboarding Page`)
<img width="1710" alt="KakaoTalk_Photo_2024-12-11-23-41-45 002" src="https://github.com/user-attachments/assets/93f1f7ac-0d49-4f24-811e-f16f117ae570" />

**기능**: 플랫폼 소개, 사용자 환영 메시지, 간단한 사이트 이용 가이드 제공

**세부 구현 설명**:
- **페이지 레이아웃**: 7개의 섹션으로 구성된 하향식 레이아웃 제공
- **미니 콘텐츠 제공**: 사용자가 리프레쉬할 수 있도록 포춘카드 미니 콘텐츠 추가
- **스타일**: 직접 디자인한 이미지를 활용하여 산뜻하고 직관적인 UI 구성

#### 2. 로그인 페이지 (`Login Page`)
<img width="1710" alt="KakaoTalk_Photo_2024-12-11-23-41-48 004" src="https://github.com/user-attachments/assets/1b7d5ff6-6ab4-4b70-a34a-6a8d7ab754bb" />

**기능**:
- Univcert API를 활용한 간편한 로그인 및 학교 인증 서비스 제공

**세부 구현 설명**:
- **유효성 검사**: 대학교 이름, 학교 이메일, 인증 코드를 통한 간단한 로그인 구현
- **보안 강화**: Key값 보호를 위해 백엔드에서 API Key를 활용하여 안전한 인증 절차 구현
- **세션 관리**: 인증된 사용자에게 30분 동안 세션 부여, 만료 시 자동 로그아웃 후 로그인 페이지로 리다이렉션
- **악용 방지**: 무분별한 사이트 이용을 방지하기 위해 한번 인증 후 세션이 만료된 유저는 더이상 사이트를 이용할 수 없게 설계
- **링크 악용방지**: URL을 이용한 강제 사이트 이동을 막기 위해 checkAuth 함수로 세션이 부과되지 않은 이용자들은 로그인 페이지로 리다이렉션

#### 3. 명함 작성 페이지 (`Writing Page`)
<img width="1710" alt="KakaoTalk_Photo_2024-12-11-23-41-48 005" src="https://github.com/user-attachments/assets/5a36c3ec-b9b9-4ed2-b252-8943912bdab9" />

**기능**:
- 사용자 맞춤형 디지털 명함 작성 및 제출

**세부 구현 설명**:
- **폼 검증**: 예시를 제공하여 올바른 양식을 작성하도록 유도. 올바르지 않은 양식을 제출하였다면 양식검사 알고리즘을 수행하여 어느부분을 수정해야하는지 오류알림 제공
   - 성별
   - 이름
   - 학과
   - 학번(나이)
   - MBTI
   - 취미
   - SNS ID
- **개성 표현**: 기존 오프라인에는 없던 카드 색상 및 동물 이미지 선택 옵션 추가하여 개성표현의 범위를 확장
- **명함 저장**: 백엔드와 통신하여 폼 data를 JSON형식으로 서버로 전송. 서버에서 다시 DB에 저장

#### 4. 이상형 조사 페이지 (`Survey Page`)
<img width="1710" alt="KakaoTalk_Photo_2024-12-11-23-41-48 006" src="https://github.com/user-attachments/assets/1fd6f16a-3c38-4396-93db-047d653a4d8c" />

**기능**:
- 이상형 데이터를 수집하여 추천 매칭 알고리즘에 반영

**세부 구현 설명**:
- **데이터 수집**: 나이, 학과, MBTI, 취미 등을 선택 및 입력 받기
- **다중 선택 지원**: 선호 나이 및 학과는 복수 선택 가능
- **선택지 피드백**: 선택 시 즉각적인 시각적 피드백 제공
- **서버와의 통신**
  - 나이: 연상, 연하, 동갑으로 나뉘며 각 버튼별 데이터 라벨링을 통한 특정 키워드를 string 형태로 전송
  - 학과: 문과, 이과, 공대, 음대, 체대, 미대로 나누어 각각의 분류에 맞게 미리 학과정보를 배열의 형태로 저장하여 전송
  - mbti: 선택한 문자들을 조합하여 string 형식으로 전송
  - 취미: 키워드별로 나누어 배열에 저장하여 전송
 
#### 5. 매칭 서비스 선택 페이지 (`Drawing Page`)
<img width="1710" alt="KakaoTalk_Photo_2024-12-11-23-41-49 007" src="https://github.com/user-attachments/assets/699bad69-3942-4d89-b8ca-279880a89490" />

**기능**:
- 랜덤 또는 추천 명함 매칭 선택

**세부 구현 설명**:
- **UI/UX**: 사용자에게 두 가지 옵션을 직관적으로 제공
- **애니메이션**: 명함 뽑기 시 회전 효과를 추가하여 역동적인 경험 제공

#### 6-1. 랜덤 뽑기 페이지 (`Random Page`)
<img width="1710" alt="KakaoTalk_Photo_2024-12-11-23-41-46 003" src="https://github.com/user-attachments/assets/aff5a2ca-0629-41ea-bff9-d7e863d62b7c" />

**기능**:
- 랜덤 명함 2장을 제공하고 선택할 수 있는 기능

**세부 구현 설명**:
- **명함 데이터 호출**: 서버에서 랜덤으로 데이터를 가져와 교차 표시
- **정보 보호**: 이름과 SNS ID는 사용자가 확정하기 버튼을 누를 때만 노출
- **사용자 흐름 제어**: 오픈버튼을 누르기전까진 카드를 볼 수 없고, 확정하기 버튼을 누르기 전까진 다음페이지로 이동 불가능

#### 6-2. 추천 뽑기 페이지 (`Recommend Page`)
<img width="1710" alt="KakaoTalk_Photo_2024-12-11-23-41-49 008" src="https://github.com/user-attachments/assets/19c907cf-a837-49b0-bed0-b8fb4ef323b3" />

**기능**:
- 사용자 데이터를 기반으로 최적의 명함 1장을 추천

**세부 구현 설명**:
- **매칭 알고리즘**: 작성된 명함과 이상형 조사 데이터를 기반으로 필터링 및 매칭 알고리즘을 실행하여 최적의 명함 추천
- **정보 보호**: 이름과 SNS ID는 사용자가 확정하기 버튼을 누를 때만 노출
- **사용자 흐름 제어**: 오픈버튼을 누르기전까진 카드를 볼 수 없고, 확정하기 버튼을 누르기 전까진 다음페이지로 이동 불가능

#### 7. AI 챗봇 페이지 (`Chatbot Page`)
<img width="1710" alt="KakaoTalk_Photo_2024-12-11-23-41-44 001" src="https://github.com/user-attachments/assets/99725514-a034-436d-8da8-58ed33abf7c4" />

**기능**:
- 대화 연습을 위한 AI 챗봇 제공
- 격려 메시지
- 이용자의 피드백을 수용하기 위한 구글 폼 링크 제공

**세부 구현 설명**:
- **AI 모델 사용**: ChatGPT API를 이용하여 자연스러운 대화 흐름 구현
- **다양한 캐릭터**: 취미, 성격에 따라 7가지 캐릭터 제공. 확정된 명함을 기반으로 구성된 커스터마이징 캐릭터 제공
- **실시간 응답**: 사용자 입력에 따라 즉각적인 응답 생성
- **하이퍼 링크**:

__
### 관리자 편

#### **1. 관리자 로그인 페이지 (`adminLogin Page`)**
<img width="1710" alt="KakaoTalk_Photo_2024-12-11-23-47-48 001" src="https://github.com/user-attachments/assets/2195f439-2d18-418d-9e5b-f46e28083a1c" />

**기능**: 관리자 전용 페이지 접근을 위한 안전한 로그인

**세부 구현 설명**:
- **백엔드 기반 로그인**: 입력한 비밀번호 검증을 안전하게 백엔드에서 구현 
- **링크 악용방지**: URL을 이용한 강제 사이트 이동을 막기 위해 checkAuth 함수로 세션이 부과되지 않은 이용자들은 로그인 페이지로 리다이렉션

#### **2. 사용자 관리 및 모니터링 페이지 (`master Page`)**
<img width="1710" alt="KakaoTalk_Photo_2024-12-11-23-47-50 002" src="https://github.com/user-attachments/assets/93b865b8-6d15-44a0-9f99-cdb76bba9e69" />

**기능**: 인증 사용자 관리, 전체 초기화, 사이트 상태 모니터링, DB관리

**세부 구현 설명**:
- **UI/UX**: 직관적인 디자인으로 손쉬운 사용편의 제공
- **API를 통한 유저 관리**: Univecert API를 활용하여 인증유저를 출력, 삭제 버튼을 통해 개별유저 초기화 및 전체 초기화 버튼 제공
- **DB관리**: DB를 HTML에 가져와서 조회 및 삭제 가능

</details>

---

<details>
<summary><h2>📚 백엔드 API 설계 및 응답 방식</h2></summary>
### **1. login\_views.py (로그인)**

- **목표**: 대학 이메일 인증 및 관련 기능을 처리하는 뷰
- **주요 경로**:
  - `/`: 로그인 페이지로 이동함
  - `/check`: 학교 이름을 확인하는 요청을 처리함
  - `/status`: 이메일 인증 상태를 확인함
  - `/certify`: 이메일 인증 코드를 전송함
  - `/certifycode`: 인증 코드를 검증하는 요청을 처리함
- **설명**: 대학 이메일 인증을 위해 여러 API를 호출하여 인증 상태를 확인하고, 인증 코드를 처리하는 기능을 제공함

#### **API 상세**

**`/check`**
- 설명: 대학 이름 확인
- 요청:
  ```json
  { "univName": "string" }
  ```
- 응답:
  - 성공:
    ```json
    { "success": true }
    ```
  - 실패:
    ```json
    { "status": 400, "success": false, "message": "string" }
    ```

**`/status`**
- 설명: 이메일 인증 상태 확인
- 요청:
  ```json
  { "email": "string" }
  ```
- 응답:
  - 성공:
    ```json
    { "success": true, "certified_date": "string" }
    ```
  - 실패:
    ```json
    { "status": 400, "success": false, "message": "string" }
    ```

**`/certify`**
- 설명: 인증 번호 발송
- 요청:
  ```json
  { "email": "string", "univName": "string", "univ_check": true }
  ```
- 응답:
  - 성공:
    ```json
    { "success": true }
    ```
  - 실패:
    ```json
    { "status": 400, "success": false, "message": "string" }
    ```

**`/certifycode`**
- 설명: 인증 번호 검증
- 요청:
  ```json
  { "email": "string", "univName": "string", "code": "string" }
  ```
- 응답:
  - 성공:
    ```json
    {
      "success": true,
      "univName": "string",
      "certified_email": "string",
      "certified_date": "string"
    }
    ```
  - 실패:
    ```json
    { "status": 400, "success": false, "message": "string" }
    ```

### **2. writing\_views.py (카드 작성)**

- **목표**: 사용자가 작성한 카드 정보를 데이터베이스에 저장
- **주요 경로**:
  - `/submit`: 카드 정보를 데이터베이스에 저장함

#### **API 상세**

**`/submit`**
- 설명: 카드 정보를 데이터베이스에 저장함
- 요청:
  ```json
  {
    "id": number,
    "name": "string",
    "gender": "string",
    "studentID_age": "string",
    "major": "string",
    "mbti": "string",
    "hobby": "string",
    "contact": "string",
    "image": "string",
    "color": "string"
  }
  ```
- 응답:
  - 성공:
    ```json
    { "status": "success", "message": "string", "profile_id": number }
    ```
  - 실패:
    ```json
    { "status": "error", "message": "string", "error": "string" }
    ```

### **3. idealType\_views.py (이상형 설문)**

- **목표**: 사용자의 이상형 데이터를 저장
- **주요 경로**:
  - `/`: 이상형 설문 페이지로 이동함
  - `/submit`: 사용자가 입력한 이상형 데이터를 세션에 저장하고, 성공 메시지를 반환함
- **설명**: 사용자의 나이, 전공, MBTI, 취미 등을 세션에 저장하여 추천 서비스에서 활용할 수 있도록 함

#### **API 상세**

**`/submit`**
- 설명: 이상형 정보를 넘겨받아 세션에 저장함
- 요청:
  ```json
  {
    "age": "integer",
    "major": "string",
    "mbti": "string",
    "hobbies": ["list of strings"]
  }
  ```
- 응답:
  ```json
  {
    "status": "success",
    "message": "string"
  }
  ```

### **4. random\_views.py (랜덤 프로필 생성)**

- **목표**: 랜덤으로 사용자 프로필을 생성하고 관련 정보를 제공하는 뷰
- **주요 경로**:
  - `/card/public`: 랜덤으로 프로필 목록 반환함
  - `/card/private`: 선택한 프로필의 개인정보 반환함
  - `/card/delete`: 프로필 삭제함

#### **API 상세**

**`/card/public`**
- 설명: 랜덤으로 뽑은 카드 반환함
- 요청:
  ```json
  {}
  ```
- 응답:
  ```json
  {
    "id": number,
    "gender": "string",
    "studentID_age": "string",
    "major": "string",
    "mbti": "string",
    "hobby": "string",
    "image": "string",
    "color": "string"
  }
  ```

**`/card/private`**
- 설명: 확정한 카드의 개인정보 반환함
- 요청:
  ```json
  { "id": number }
  ```
- 응답:
  ```json
  {
    "name": "string",
    "contact": "string"
  }
  ```

**`/card/delete`**
- 설명: 확정한 카드를 데이터베이스에서 삭제함
- 요청:
  ```json
  { "id": number }
  ```
- 응답:
  - 성공:
    ```json
    { "message": "string" }
    ```
  - 실패:
    ```json
    { "error": "string" }
    ```

### **5. recommend\_views.py (추천 시스템)**

- **목표**: 사용자의 프로필을 바탕으로 추천 프로필을 생성하는 뷰
- **주요 경로**:
  - `/card`: 이상형 정보와 일치하거나 유사한 카드를 추천함

#### **API 상세**

**`/card`**
- 설명: 이상형 정보와 일치하는 프로필을 반환하거나, 코사인 유사도를 계산하여 가장 유사한 프로필을 반환함
- 요청:
  ```json
  {}
  ```
- 응답:
  ```json
  {
    "id": number,
    "name": "string",
    "gender": "string",
    "studentID_age": "string",
    "major": "string",
    "mbti": "string",
    "hobby": "string",
    "contact": "string",
    "image": "string",
    "color": "string"
  }
  ```

### **6. aiSimulation\_views.py (AI 챗봇)**

- **목표**: 외부 GPT API와 통신하여 AI 챗봇 기능을 제공
- **주요 경로**:
  - `/chat`: 사용자의 메시지와 설정을 기반으로 GPT API 호출함

#### **API 상세**

**`/chat`**
- 설명: 외부 chat-GPT API와 통신함
- 요청:
  ```json
  {
    "setting": "system instruction",
    "message": "user input"
  }
  ```
- 응답:
  ```json
  {
    "id": "unique identifier",
    "object": "chat.completion",
    "choices": [
      {
        "message": {
          "role": "assistant",
          "content": "string"
        }
      }
    ]
  }
  ```

### **7. admin\_views.py (관리자 기능)**

- **목표**: 관리자 인증 및 데이터 관리 기능을 제공함
- **주요 경로**:
  - `/submit`: 관리자 인증을 처리함
  - `/control/clear`: 인증된 유저 데이터를 삭제함
  - `/control/certifiedList`: 인증된 유저 목록 반환함

#### **API 상세**

**`/submit`**
- 설명: 관리자 인증을 처리함
- 요청:
  ```json
  { "password": "string" }
  ```
- 응답:
  - 성공:
    ```json
    { "status": 200, "success": "true" }
    ```
  - 실패:
    ```json
    { "status": 401, "success": "false" }
    ```

**`/control/clear`**
- 설명: 인증된 유저 전체 삭제 또는 특정 유저 삭제함
- 요청:
  - 이메일 포함:
    ```json
    { "email": "string" }
    ```
  - 이메일 미포함:
    ```json
    {}
    ```
- 응답:
  - 성공:
    ```json
    { "message": "string" }
    ```
  - 실패:
    ```json
    { "error": "string" }
    ```

**`/control/certifiedList`**
- 설명: 인증된 유저 목록 반환함
- 요청:
  ```json
  {}
  ```
- 응답:
  - 성공:
    ```json
    { "certified": [list of certified users] }
    ```
  - 실패:
    ```json
    { "error": "string" }
    ```
</details>

---

<details>
<summary><h2>🛢️ SQL 쿼리 정리</h2></summary>

### 1. **기본 조회 쿼리**
#### **전체 프로필 조회**
```sql
SELECT * FROM profile;
```

#### **특정 컬럼만 조회**
```sql
SELECT name, age, major, mbti FROM profile;
```

### 2. **조건별 필터링**
#### **성별 기준 조회**
```sql
SELECT * FROM profile WHERE gender = '남성';
```

#### **특정 학과 학생 조회**
```sql
SELECT * FROM profile WHERE major = '컴퓨터공학과';
```

#### **특정 학번(나이) 학생 조회**
```sql
SELECT * FROM profile WHERE age = 21(23);
```

#### **MBTI별 조회**
```sql
SELECT * FROM profile WHERE mbti LIKE 'istp';
```

### 3. **정렬**
#### **나이순 정렬**
```sql
SELECT * FROM profile ORDER BY age ASC;
```

#### **최근 가입자순 정렬**
```sql
SELECT * FROM profile ORDER BY create_date DESC;
```

### 4. **그룹화 및 통계**
#### **학과별 학생 수**
```sql
SELECT major, COUNT(*) as student_count
FROM profile
GROUP BY major;
```

#### **MBTI 유형별 학생 수**
```sql
SELECT mbti, COUNT(*) as mbti_count
FROM profile
GROUP BY mbti;
```

#### **성별 평균 나이**
```sql
SELECT gender, AVG(age) as avg_age
FROM profile
GROUP BY gender;
```

### 5. **검색**
#### **이름으로 검색**
```sql
SELECT * FROM profile WHERE name LIKE '문효재';
```

#### **취미로 검색**
```sql
SELECT * FROM profile WHERE hobby LIKE '축구';
```

### 6. **복합조건 쿼리**
#### **컴퓨터공학과의 23세 이상 학생**
```sql
SELECT * FROM profile
WHERE major = '컴퓨터공학과'
AND age >= 23;
```

#### **특정 학과의 MBTI 분포**
```sql
SELECT mbti, COUNT(*) as count
FROM profile
WHERE major = '컴퓨터공학과'
GROUP BY mbti;
```

### 7. **제한 및 오프셋**
#### **최근 가입한 5명만 조회**
```sql
SELECT * FROM profile
ORDER BY create_date DESC
LIMIT 5;
```

#### **페이지네이션 (예: 한 페이지당 10명)**
```sql
SELECT * FROM profile
LIMIT 10 OFFSET 0;
```
</details>

---

<details>
<summary><h2>🌟개선한 점</h2></summary>

### 보안강화 🛡️
- **초기 문제**: API 키가 프론트엔드 코드에 포함되어 쉽게 노출될 가능성이 있었음
- **개선 방법**: 프론트에서는 백엔드로 알맞는 동작요청을 패치하고 백엔드에서 API 키를 처리하도록 변경하여, 프론트엔드가 직접 외부 API와 통신하지 않도록 구조를 개선하여 API 키의 보안성이 크게 향상
</details>

---
<details>
<summary><h2>💣 한계 및 발전</h2></summary>
	
### 한계 및 개선 방안

#### **1. 세션 정보의 신뢰성 부족**
- **한계점**: 세션 값은 클라이언트에서 쉽게 조작될 수 있어 신뢰도가 낮음
- **개선 방안**: 
  - 추가적인 서버 검증 및 암호화를 통해 세션 데이터의 안전성을 확보

#### **2. UI/UX 최적화 문제**
- **한계점**: 모바일(폭 390px 이하) 및 노트북(16인치 이하) 환경에만 최적화되어 있음
  - 다양한 디바이스에서 레이아웃이 깨지거나 배치가 이상해지는 문제가 발생
  - 사용자 경험이 저하됨
- **개선 방안**: 
  - 반응형 디자인을 강화하여 다양한 화면 크기에서 최적화된 UI/UX를 제공

#### **3. 디자인 마감 문제**
- **한계점**: 최적화 작업 중 동적 요소의 움직임으로 인해 다른 요소 레이아웃이 변경되는 현상이 있음
  - 모바일 디자인이 시각적으로는 편리하지만 조작 면에서는 다소 불편할 수 있음
- **개선 방안**: 
  - **피그마**를 활용해 세밀한 디자인과 레이아웃을 설계
  - 팀원 간의 설계 협업을 통해 레이아웃과 사용자 경험(UI/UX)을 더욱 발전시킬 방향을 모색

#### **4. 데이터베이스의 한계**
- **한계점**: 
  - **동시성 처리 문제**: SQLite는 쓰기 작업에서 단일 스레드만 지원하여 다중 사용자 환경에 부적합
  - **기능 제한**: SQLite는 파일 기반 DB로, 네트워크 접근, 사용자 권한 관리, 복제 기능 등이 제한적임
    - 새로운 버전 배포 시 기존 데이터베이스 파일이 덮어씌워져 데이터 손실 위험이 있음
- **개선 방안**: 
  - 동시성 처리가 가능한 데이터베이스로 전환하거나 데이터 접근을 관리할 수 있는 미들웨어 도입

#### **5. 협업 및 깃 커밋 문제**
- **한계점**: 백엔드와 프론트엔드의 병렬 작업 경험 부족으로 인해 프로젝트 관리 능력이 부족했음
  - 소통 부족으로 프론트엔드와 백엔드 연결 과정에서 코드 수정이 잦았음
  - 브랜치 관리와 머지 과정에서 충돌이 빈번히 발생
  - 레포지토리를 삭제하거나 커밋 로그가 유실되는 등의 실수가 잦았음
- **개선 방안**: 
  - 명확한 협업 프로세스 수립 및 정기적인 소통 회의 진행
  - 브랜치 전략과 깃 사용 방법에 대한 사전 교육 제공

#### **6. 추천 알고리즘 성능 문제**
- **한계점**: 현재 추천 로직은 모든 데이터를 벡터화하고 유사도를 계산하며, 데이터가 많아질수록 성능 저하 가능성이 큼
- **개선 방안**: 
  - 미리 계산된 유사도 데이터를 저장하고 캐싱을 활용하여 성능 저하를 방지

#### **7. 테스트 부재**
- **한계점**: 주요 로직과 에러 상황에 대한 테스트가 부족함
- **개선 방안**: 
  - 유닛 테스트와 통합 테스트를 추가하여 주요 기능과 에러 상황을 점검
  - 이를 통해 코드 품질을 유지하고 신뢰성을 향상시킴

#### **8. 예외 처리 부족**
- **한계점**: 현재 API는 모든 예외를 하나의 `Exception`으로 처리하고 있음
- **개선 방안**: 
  - 데이터베이스 연결 문제, 값 변환 오류 등 구체적인 예외를 분리하여 처리
  - 이를 통해 디버깅이 보다 효율적이며, 문제를 신속히 파악할 수 있음
</details>

---
<details>
<summary><h2>👥 역할 분담</h1></summary> 

| **분야** | **이름** | **담당 역할** |
|:------------:|:-----------:|-------------------------------------------------------------------------------------------------------------------------------------|
| **🌐 Frontend 🔍** | 조유찬 | 서버 통신 통합, 동적 웹페이지 개발, 웹 아키텍처 설계, 품질 보증(QA), 최적화, 추천 알고리즘 설계, 반응형 웹 구현, 애니메이션 제작, 프로젝트 관리, 릴리스 마감, 코드 프리즈, 배포 후 검증, 프론트 총괄, 최종 보고서 작성 |
| **🌐 Frontend 🎨** | 이서인 | 디자인 기획, 페이지별 콘텐츠 제작, 웹 아키텍처 설계, 디자인 작업, 서버 통신 통합, 반응형 웹 구현, 동적 웹페이지 개발, 프론트 마감 작업, 이미지 및 로고 제작, 코드 프리즈, 최종 보고서 작성 |
| **🗄️ Backend 📈** | 정다운 | 추천 알고리즘 설계, 백엔드 API 개발, 자바스크립트 코드의 서버 요청을 Flask 기반으로 처리할 수 있도록 연동하는 파이썬 서버 코드 작성, 릴리스 마감, 코드 프리즈, 배포 후 검증, 백엔드 총괄 |
| **🗄️ Backend 🛢️** | 문효재 | 데이터베이스 시스템 설계, 쿼리 최적화, 데이터 마이그레이션, 데이터베이스 관리, 배포 준비, 웹사이트 배포 |

### 페이지별 주요 담당자
※ 기준: 각 페이지 제작 과정에서 다방면으로 기여한 정도에 따라 선정됨
- 온보딩 페이지: 이서인
- 로그인 페이지: 조유찬, 정다운
- 명함작성 페이지: 조유찬, 이서인, 정다운, 문효재
- 이상형 설문 페이지: 조유찬, 이서인, 정다운
- 랜덤오픈 페이지: 조유찬, 정다운, 문효재, 이서인
- 추천오픈 페이지: 조유찬, 정다운, 이서인
- AI 챗봇 페이지: 조유찬, 이서인, 정다운
- 어드민 로그인 페이지: 조유찬, 정다운
- 관리자 페이지: 조유찬, 정다운
</details>

---

<details>
<summary><h2>📜사용 라이선스<h2></summary>

### 이 프로젝트는 MIT License를 따릅니다. 😊

</details>

---

<details>
<summary><h2>📑 외부 참고 자료</h2></summary>

- [Univcert API 문서](https://univcert.com/)
- [ChatGPT API 문서](https://platform.openai.com/docs/overview)
</details>

---

<details>
<summary><h2>🤝 기여 방법</h2></summary>

1. 저장소를 포크합니다.
2. 새 브랜치를 생성합니다
   ```bash
   git checkout -b feature/new-feature
   ```
3. 변경 사항을 커밋합니다
   ```bash
   git commit -m "Add new feature"
   ```
4. 브랜치를 푸시합니다
   ```bash
   git push origin feature/new-feature
   ```
5. 풀 리퀘스트를 제출합니다
</details>

---

<details>
<summary><h2>✉️ Contact</h2></summary>
	
- Frontend Developers
  - 조유찬: yuchancho174@gmail.com
  - 이서인: guapapamama@gmail.com
- Backend Developers
  - 정다운: daun5535@gmail.com
  - 문효재: dsdk1088@gmail.com
 </details>

