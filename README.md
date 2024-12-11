# 💌 디지털 명함 소개팅 💌

> 디지털 명함을 활용하여 자신을 소개하고 이성을 매칭시켜주는 혁신적인 대학생 소개팅 플랫폼

---

## 📋 프로젝트 개요

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

---

## 🔫 사이트 이용 링크

<배포 링크>

---

## 💻 기술 스택

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
- **Python**: 설명추가!

### 기타
- **PyCharm**: 프로젝트별 독립적인 가상환경(Virtual Environment) 관리를 지원하는 Python 전용 IDE
- **Heroku**: 클라우드 플랫폼으로 간편한 서버 배포와 확장성 제공

---

## 📝 설계 및 구현

### 시스템 구조
- **클라이언트-서버 구조**: VanillaJS 기반 클라이언트와 Flask 백엔드 간 REST API 통신
- **데이터베이스 설계**: SQLite를 이용하여 사용자 정보와 매칭 데이터를 효율적으로 관리

웹 아키텍처

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

---

## 🧩 주요 로직

### 매칭 알고리즘
사용자 관심사와 선호 데이터를 기반으로 최적의 매칭을 수행합니다.
```javascript
function matchUsers(user1, user2) {
    const commonInterests = user1.interests.filter(interest => user2.interests.includes(interest));
    return commonInterests.length > 0; // 공통 관심사가 있는 경우 매칭 성공
}
```

---

## 🛠️ 페이지별 세부 구현

서비스 제공 페이지는 사용자 편과 관리자 편으로 나눠, 각각 사용자 경험 향상과 서비스 안정적 운영에 목표를 두어 설계


### 사용자 편

#### 1. 홈 페이지 (`Onboarding Page`)
![Uploading image.png…]()

**기능**: 플랫폼 소개, 사용자 환영 메시지, 간단한 사이트 이용 가이드 제공

**세부 구현 설명**:
- **페이지 레이아웃**: 7개의 섹션으로 구성된 하향식 레이아웃 제공
- **미니 콘텐츠 제공**: 사용자가 리프레쉬할 수 있도록 포춘카드 미니 콘텐츠 추가
- **스타일**: 직접 디자인한 이미지를 활용하여 산뜻하고 직관적인 UI 구성

**[테스트영상]()**



#### 2. 로그인 페이지 (`Login Page`)
**기능**:
- Univcert API를 활용한 간편한 로그인 및 학교 인증 서비스 제공

**세부 구현 설명**:
- **유효성 검사**: 대학교 이름, 학교 이메일, 인증 코드를 통한 간단한 로그인 구현
- **보안 강화**: Key값 보호를 위해 백엔드에서 API Key를 활용하여 안전한 인증 절차 구현
- **세션 관리**: 인증된 사용자에게 30분 동안 세션 부여, 만료 시 자동 로그아웃 후 로그인 페이지로 리다이렉션
- **악용 방지**: 무분별한 사이트 이용을 방지하기 위해 한번 인증 후 세션이 만료된 유저는 더이상 사이트를 이용할 수 없게 설계
- **링크 악용방지**: URL을 이용한 강제 사이트 이동을 막기 위해 checkAuth 함수로 세션이 부과되지 않은 이용자들은 로그인 페이지로 리다이렉션

**[테스트영상]()**



#### 3. 명함 작성 페이지 (`Writing Page`)
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

**[테스트영상]()**



#### 4. 이상형 조사 페이지 (`Survey Page`)
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
 
**[테스트영상]()**



#### 5. 매칭 서비스 선택 페이지 (`Drawing Page`)
**기능**:
- 랜덤 또는 추천 명함 매칭 선택

**세부 구현 설명**:
- **UI/UX**: 사용자에게 두 가지 옵션을 직관적으로 제공
- **애니메이션**: 명함 뽑기 시 회전 효과를 추가하여 역동적인 경험 제공

**[테스트영상]()**



#### 6-1. 랜덤 뽑기 페이지 (`Random Page`)
**기능**:
- 랜덤 명함 2장을 제공하고 선택할 수 있는 기능

**세부 구현 설명**:
- **명함 데이터 호출**: 서버에서 랜덤으로 데이터를 가져와 교차 표시
- **정보 보호**: 이름과 SNS ID는 사용자가 확정하기 버튼을 누를 때만 노출
- **사용자 흐름 제어**: 오픈버튼을 누르기전까진 카드를 볼 수 없고, 확정하기 버튼을 누르기 전까진 다음페이지로 이동 불가능

**[테스트영상]()**



#### 6-2. 추천 뽑기 페이지 (`Recommend Page`)
**기능**:
- 사용자 데이터를 기반으로 최적의 명함 1장을 추천

**세부 구현 설명**:
- **매칭 알고리즘**: 작성된 명함과 이상형 조사 데이터를 기반으로 필터링 및 매칭 알고리즘을 실행하여 최적의 명함 추천
- **정보 보호**: 이름과 SNS ID는 사용자가 확정하기 버튼을 누를 때만 노출
- **사용자 흐름 제어**: 오픈버튼을 누르기전까진 카드를 볼 수 없고, 확정하기 버튼을 누르기 전까진 다음페이지로 이동 불가능

**[테스트영상]()**



#### 7. AI 챗봇 페이지 (`Chatbot Page`)
**기능**:
- 대화 연습을 위한 AI 챗봇 제공
- 격려 메시지
- 이용자의 피드백을 수용하기 위한 구글 폼 링크 제공

**세부 구현 설명**:
- **AI 모델 사용**: ChatGPT API를 이용하여 자연스러운 대화 흐름 구현
- **다양한 캐릭터**: 취미, 성격에 따라 7가지 캐릭터 제공. 확정된 명함을 기반으로 구성된 커스터마이징 캐릭터 제공
- **실시간 응답**: 사용자 입력에 따라 즉각적인 응답 생성
- **하이퍼 링크**:

**[테스트영상]()**

__
### 관리자 편

#### **1. 관리자 로그인 페이지 (`adminLogin Page`)**
**기능**: 관리자 전용 페이지 접근을 위한 안전한 로그인

**세부 구현 설명**:
- **백엔드 기반 로그인**: 입력한 비밀번호 검증을 안전하게 백엔드에서 구현 
- **링크 악용방지**: URL을 이용한 강제 사이트 이동을 막기 위해 checkAuth 함수로 세션이 부과되지 않은 이용자들은 로그인 페이지로 리다이렉션

**[테스트영상]()**



#### **2. 사용자 관리 및 모니터링 페이지 (`master Page`)**
**기능**: 인증 사용자 관리, 전체 초기화, 사이트 상태 모니터링

**세부 구현 설명**:
- **UI/UX**: 직관적인 디자인으로 손쉬운 사용편의 제공
- **API를 통한 유저 관리**: Univecert API를 활용하여 인증유저를 출력, 삭제 버튼을 통해 개별유저 초기화 및 전체 초기화 버튼 제공

**[테스트영상]()**


<!--### 설명 마무리

각 페이지는 사용자 경험과 편의성을 극대화하도록 설계되었으며 안정적인 서비스 운영을 목표로 개발
(추가 설명!)-->

---

## 📚 백엔드 API 설계 및 응답 방식

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

---

## 🔎 개선 및 발전

내용추가!

---

## 💣 제한 및 한계

내용 추가!

---

## 👥 역할 분담

| **분야** | **이름** | **담당 역할** |
|:------------:|:-----------:|-------------------------------------------------------------------------------------------------------------------------------------|
| **🌐 Frontend 🔍** | 조유찬 | 서버 통신 통합, 동적 웹페이지 개발, 품질 보증(QA), 최적화, 알고리즘 설계, 프로젝트 관리, 릴리스 마감, 코드 프리즈, 배포 후 검증, 최종 보고서 작성 |
| **🌐 Frontend 🎨** | 이서인 | 디자인 기획, 페이지별 콘텐츠 제작, 서버 통신 통합, 반응형 웹 구현, 동적 웹페이지 개발, 마감 작업, 이미지 및 로고 제작, 코드 프리즈, 최종 보고서 작성 |
| **🗄️ Backend 📈** | 정다운 | 알고리즘 설계, 백엔드 API 개발, 자바스크립트 코드의 서버 요청을 Flask 기반으로 처리할 수 있도록 연동하는 파이썬 서버 코드 작성, 릴리스 마감, 코드 프리즈, 배포 후 검증 |
| **🗄️ Backend 🛢️** | 문효재 | 데이터베이스 시스템 설계, 쿼리 최적화, 데이터 마이그레이션, 데이터베이스 관리, 배포 준비, 웹사이트 배포 |


### 세부역할
1. 조유찬

---

## 📑 외부 참고 자료

- [Univcert API 문서](https://univcert.com/)
- [ChatGPT API 문서](https://platform.openai.com/docs/overview)

---

## 🤝 기여 방법

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

---

## ✉️ Contact

- Frontend Developers
  - 조유찬: yuchancho174@gmail.com
  - 이서인: guapapamama@gmail.com
- Backend Developers
  - 정다운: daun5535@gmail.com
  - 문효재: dsdk1088@gmail.com
