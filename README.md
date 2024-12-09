
# 디지털 명함 소개팅

> 디지털 명함을 활용하여 자신을 소개하고 이성을 매칭시켜주는 혁신적인 소개팅 플랫폼입니다.

---

## 📋 프로젝트 개요

### 프로젝트 목적
- 현대인의 라이프스타일에 맞춰, 디지털 명함을 기반으로 간단하고 효과적인 소개팅 플랫폼 제공.
- 사용자가 관심사를 공유하며 대상 선택의 어려움을 줄여 새로운 인연을 만날 수 있는 디지털 공간 구축.
- 오프라인에서 진행되는 명함소개팅의 시간적 공간적 제약을 감소.
- 직접 대면의 어색함과 부담감을 줄임.

### 주요 기능
- **디지털 명함 생성**: 사용자 프로필과 관심사를 바탕으로 디지털 명함 생성.
- **명함 매칭**: 랜덤으로 2장 추천, 혹은 추천서비스로 최적의 명함을 1장 제공.
- **AI 챗봇 시뮬레이션**: 이성과 대화를 나누기 힘들어하는 사용자를 위한 챗봇 시스템 제공.

---

## 💻 기술 스택

### 프론트엔드
- **Vanila Js**: 동적 웹페이지 제작, API통신.
- **CSS Modules**: 스타일 관리, 반응형 웹 구현.
- **HTML**: 웹 페이지 구조 작성.
- **Figma**: 디자인 요소 및 와이어 프레임 제작.

### 백엔드
- **flask**: 파이썬 웹 프레임워크로 서버 구축, API 설계, 라우팅 관리.
- **SQLite**: 데이터 저장소.

### 기타
- **PyCharm**: 프로젝트별 독립적인 Virtual Environment 제공.
- **Heroku**: 클라우드 기반 서버 배포.

---

## 🛠️ 설계 및 구현

### 시스템 구조
- **클라이언트-서버 구조**: React.js 클라이언트와 Express.js 백엔드 간 REST API 및 WebSocket 통신.
- **데이터베이스 설계**: MongoDB를 활용한 사용자, 매칭 기록, 대화 데이터 관리.

![시스템 구조도](./assets/system_architecture.png) <!-- 시스템 구조도 이미지 링크 -->

### 데이터 흐름
1. **사용자 프로필 등록**:
   - 클라이언트에서 사용자 데이터를 입력 -> API를 통해 서버에 저장.
2. **매칭 프로세스**:
   - 서버가 공통 관심사 및 지역 기반으로 매칭 -> 매칭 결과를 클라이언트에 반환.
3. **채팅 기능**:
   - Socket.IO를 활용하여 클라이언트 간 실시간 메시지 전송.

---

## 🧩 주요 로직

### 매칭 알고리즘
사용자의 공통 관심사를 기반으로 매칭을 수행합니다.
```javascript
function matchUsers(user1, user2) {
    const commonInterests = user1.interests.filter(interest => user2.interests.includes(interest));
    return commonInterests.length > 0; // 공통 관심사가 있는 경우 매칭 성공
}
```

### 채팅 실시간 메시지 전송
Socket.IO를 활용하여 클라이언트 간 메시지를 실시간으로 송수신합니다.
```javascript
io.on('connection', (socket) => {
    socket.on('sendMessage', (message) => {
        io.to(message.room).emit('receiveMessage', message);
    });
});
```

---

## 🛠️ 페이지별 세부 구현

### 1. 메인 페이지 (`Home Page`)
**기능**:
- 사용자를 환영하는 메시지와 플랫폼 소개.
- 주요 메뉴와 CTA(Call to Action) 버튼 제공.

**세부 구현 설명**:
- 페이지 레이아웃: 중앙 정렬된 환영 메시지와 명확한 CTA 버튼.
- 스타일: 반응형 디자인 적용.

---

### 2. 회원가입 페이지 (`Sign-Up Page`)
**기능**:
- 사용자 정보를 입력받아 계정을 생성.
- 유효성 검사 및 이메일 중복 확인 기능 제공.

**세부 구현 설명**:
- 유효성 검사: 입력값 실시간 확인 및 에러 메시지 표시.
- 중복 확인: 서버 API와 연동하여 이메일 중복 여부 확인.

---

### 3. 로그인 페이지 (`Login Page`)
**기능**:
- 사용자 인증을 통해 로그인 처리.
- JWT를 활용하여 세션 유지.

**세부 구현 설명**:
- JWT 토큰: 인증 후 클라이언트에 저장하여 API 요청 시 사용.
- 실패 처리: 비밀번호 또는 이메일 오류 시 적절한 에러 메시지 제공.

---

### 4. 디지털 명함 생성 페이지 (`Card Creation Page`)
**기능**:
- 사용자가 프로필 정보와 관심사를 입력하여 디지털 명함 생성.
- 명함 미리보기 및 사용자 정의 옵션 제공.

**세부 구현 설명**:
- 미리보기 기능: 실시간으로 사용자가 입력한 내용을 반영.
- 스타일 커스터마이징: 색상, 글꼴 등 개인화 설정 지원.

---

### 5. 매칭 페이지 (`Matching Page`)
**기능**:
- 공통 관심사 및 지역 기반으로 사용자 매칭.
- 매칭 결과를 카드 형태로 표시.

**세부 구현 설명**:
- 매칭 알고리즘: 공통 관심사와 지역 정보를 기준으로 사용자 필터링.
- UI/UX: 매칭된 사용자 카드 스와이프 기능 제공.

---

### 6. 채팅 페이지 (`Chat Page`)
**기능**:
- 실시간 메시지 송수신 지원.
- 과거 채팅 기록 불러오기.

**세부 구현 설명**:
- 실시간 통신: Socket.IO를 활용한 양방향 메시징.
- 기록 불러오기: MongoDB에서 채팅 내역 조회 및 표시.

---

### 7. 히스토리 페이지 (`History Page`)
**기능**:
- 과거 매칭 및 대화 내역 확인.
- 사용자별 기록 열람.

**세부 구현 설명**:
- 매칭 기록: 날짜별로 정렬하여 열람 가능.
- 대화 기록: 채팅 내용과 사용자 프로필 정보 함께 표시.

---

## 📑 외부 문서

### 시스템 다이어그램
- 전체 시스템 구조 및 데이터 흐름은 [System Architecture Diagram](./assets/system_architecture.png) 파일에서 확인 가능합니다.

### 추가 문서 링크
- [API 문서](./docs/API_REFERENCE.md)
- [UI/UX 설계 문서](./docs/UI_UX_DESIGN.md)

---

## 🔗 API 문서

### 주요 엔드포인트

#### 1. 회원가입 API
- **URL**: `/api/auth/register`
- **Method**: POST
- **Body**:
  ```json
  {
      "email": "example@example.com",
      "password": "password123",
      "name": "John Doe"
  }
  ```
- **Response**:
  ```json
  {
      "message": "Registration successful",
      "userId": "123456789"
  }
  ```

#### 2. 로그인 API
- **URL**: `/api/auth/login`
- **Method**: POST
- **Body**:
  ```json
  {
      "email": "example@example.com",
      "password": "password123"
  }
  ```
- **Response**:
  ```json
  {
      "token": "JWT_TOKEN"
  }
  ```

#### 3. 매칭 조회 API
- **URL**: `/api/match`
- **Method**: GET
- **Headers**:
  ```
  Authorization: Bearer <JWT_TOKEN>
  ```
- **Response**:
  ```json
  {
      "matches": [
          {
              "userId": "123",
              "name": "Alice",
              "interests": ["Music", "Art"]
          }
      ]
  }
  ```

---

## 🚀 설치 및 실행 방법

1. **저장소 클론**
   ```bash
   git clone https://github.com/digitalCard-date-service/work_space.git
   cd work_space
   ```

2. **의존성 설치**
   ```bash
   npm install
   ```

3. **환경 변수 설정**
   `.env.example` 파일을 참고하여 `.env` 파일 생성 후 필요한 값을 설정하세요.

4. **애플리케이션 실행**
   ```bash
   npm start
   ```

---

## 🤝 기여 방법

1. 저장소를 포크합니다.
2. 새 브랜치를 생성합니다.
   ```bash
   git checkout -b feature/새로운기능
   ```
3. 변경 사항을 커밋합니다.
   ```bash
   git commit -m "Add 새로운 기능"
   ```
4. 브랜치를 푸시합니다.
   ```bash
   git push origin feature/새로운기능
   ```
5. 풀 리퀘스트를 제출합니다.

---

## 📜 라이선스

이 프로젝트는 [MIT 라이선스](LICENSE)를 따릅니다.

---

## 📞 연락처

- 프로젝트 관리자: [이름 또는 GitHub 프로필 링크]
- 문의 사항: [이메일 주소]
