'use strict';

const API_BASE_URL = 'https://univcert.com/api/v1';
const API_KEY = '0a88c9b6-497f-4236-820c-79866b6a4e08'; // 여기에 API 키를 입력하세요

// 학교명 확인
document.querySelector('.univ__checkButton').addEventListener('click', async () => {
  const schoolName = document.querySelector('.univ__input').value;

  const response = await fetch(`${API_BASE_URL}/check`, {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ univName: schoolName })
  });

  const result = await response.json();
  if (result.success) {
    alert("학교 확인 완료!");
    // 이메일 입력으로 넘어감
  } else {
    alert("유효한 학교명이 아닙니다.");
  }
});


// 인증번호 제출
document.querySelector('.prove__checkButton').addEventListener('click', async () => {
  const code = document.querySelector('.prove__input').value;
  const email = document.querySelector('.email__input').value;
  const schoolName = document.querySelector('.univ__input').value;

  const response = await fetch(`${API_BASE_URL}/certifycode`, {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      key: API_KEY,
      email: email,
      univName: schoolName,
      code: code
    })
  });

  const result = await response.json();
  if (result.success) {
    alert("인증 성공!");
    // 인증 성공 시, 체크 아이콘의 색상을 초록색으로 변경하고 페이지 이동
    let checkIcon = document.querySelector('.check-icon');
    checkIcon.style.color = 'green';
    setTimeout(() => {
      window.location.href = '/form'; // 다음 페이지의 URL로 변경
    }, 2000); // 2초 후에 페이지 이동
  } else {
    alert("인증번호가 잘못되었습니다.");
  }
});

// 선 인증된 이메일 확인 후, 맞다면 바로 작성사이트로 이동 아니라면 이메일 코드 젅송
document.querySelector('.email__checkButton').addEventListener('click', async () => {
  const email = document.querySelector('.email__input').value;

    let response = await fetch(`${API_BASE_URL}/status`, {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      key: API_KEY,
      email: email,
    })
  });

  let result = await response.json();
  if (result.success) {
    alert("이메일이 인증되었습니다.");
    let checkIcon = document.querySelector('.check-icon');
    checkIcon.style.color = 'green';
    setTimeout(() => {
      window.location.href = '/form'; // 다음 페이지의 URL로 변경
    }, 2000); // 2초 후에 페이지 이동
  } else {
    alert("인증되지 않은 이메일입니다.");
  const schoolName = document.querySelector('.univ__input').value;
  response = await fetch(`${API_BASE_URL}/certify`, {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      key: API_KEY,
      email: email,
      univName: schoolName,
      univ_check: true
    })
  });

  result = await response.json();
  if (result.success) {
    alert("이메일 전송 성공! 이메일에서 인증코드를 확인하세요.");
  } else {
    alert("이메일 전송에 실패했습니다.");
  }
  }
});

// 인증된 유저 리스트 출력
async function fetchCertifiedList() {
  const response = await fetch(`${API_BASE_URL}/certifiedlist`, {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ key: API_KEY })
  });

  const result = await response.json();
  if (result.success) {
    console.log(result.data); // 인증된 유저 리스트를 콘솔에 출력
  } else {
    alert("인증된 유저 리스트를 가져오는 데 실패했습니다.");
  }
}

// 필요한 경우 인증된 유저 리스트를 호출
fetchCertifiedList();


// 클라이언트와 서버의 역할
// 1. 클라이언트는 사용자가 입력한 데이터를 서버와 HTTP 요청을 통해 교환
// 2. 서버는 요청을 처리하고 응답함 -> 백엔드 Application

// 통신흐름
// 1. 사용자가 대학명, 이메일, 인증코드를 입력
// 2. 버튼으로 제출하면 JS코드가  Fetch 함수를 통해 서버에 요청을 보냄
// 2-2. 요청의 종류: 엔드포인트-> 호출할API URL, HTTP 메소드, 헤더->요청에 대한 정보(컨텐츠 타입 등), 본문 -> 보낼 데이터
// 3. 서버에서 요청을 받고 처리
// 4. 이에 대한 응답을 클라이언트로 반환(성공 여부, 관련 데이터를 반환)
// 5. 클라이언트 응답처리: 클라이언트에선 응답을 처리하고 사용자에게 결과를 표시(성공 및 오류 메세지 띄우기 등)
// 즉 프론트엔드에선 요청을 보내고, 응답을 처리하는 역할을 함(JS로 구현)
// 서버는 API 만든 회사에서 주로 제공 -> 백엔드 시스템 필요없음, 안정성과 보안성이 높음

// fetch 함수
// 웹 API와 HTTP 요청을 수행하기 위한 내장함수, 데이터를 주고받는데 사용되며 비동기적으로 작동(promise 객체 반환) -> 새로고침 없이 데이터를 요청하고 처리
// 인자로 API URL과 method, header, body에 대한 객체를 받음

// method - post: 서버에 데이터를 전송하고 새로운 리소스(요청을 통해 만들어진 데이터)를 생성

// API(Application Programming Interface): 소프트웨어 애플리케이션 간의 사용작용을 가능케 하는 규칙 및 도구(데이터 교환, 기능제공 등)

// 결국 이러한 로그인 구현을 프론트에서 혹은 백엔드에서 구현할 수 있는데, 주로 백엔드에서는 자체적인 로그인 기능을 만들때, 프론트에서는 외부API를 이용할 때
// -> 상황에 맞게 적절히 개발

// JSON(JavaScript Object Notation): 데이터 저장 및 전송을 위한 가벼운 형식 -> 서버와 클라이언트 간의 데이터 전송에서 많이 사용
// JSON은 'key: value'로 이루어짐 -> 일반 객체랑 비슷
// JSON.stringfy(obj) -> JSON화: 서버에 보낼 때
// JSON.parse(JSON) -> JS객체화: 클라이언트에서 다룰 때
