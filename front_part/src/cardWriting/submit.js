'use strict';

document.addEventListener("DOMContentLoaded", ()=>{
    const submitButton = document.querySelector(".submitButton");
    submitButton.addEventListener("click", validateForm);
})
function validateForm(event) {
    event.preventDefault();

    const gender = document.querySelector("input[name='gender']").value.trim();
    const name = document.querySelector("input[name='name']").value.trim();
    const major = document.querySelector("input[name='major']").value.trim();
    const studentID_age = document.querySelector("input[name='studentID_age']").value.trim();
    const mbti = document.querySelector("input[name='mbti']").value.trim();
    const hobbies = document.querySelector("input[name='hobbies']").value.trim();
    const contact = document.querySelector("input[name='contact']").value.trim();

    const errors = [];

    // 1. 성별 검사: "여성" 또는 "남성"만 허용
    if (!["여성", "남성", "woman", "man"].includes(gender)) {
        errors.push("성별은 '남성(man)' 또는 '여성(woman)'만 입력 가능합니다.");
    }

    // 2. 이름 검사: 비어있으면 안 됨
    if (name.length === 0) {
        errors.push("이름(name)을 입력하세요.");
    }

    // 3. 학과 검사: 특수문자 제외, 공백 없음
    const majorRegex = /^[가-힣a-zA-Z0-9()]+$/; 
    if (!majorRegex.test(major)) {
        errors.push("학과(major)는 특수문자 없이, 괄호 '()'만 허용됩니다. 공백 없이 입력해주세요. 예:건축학부(건축학전공)");
    }

    // 4. 학번(나이) 검사: "숫자(숫자)" 형식만 허용
    const studentID_ageRegex = /^\d+\(\d+\)$/;
    if (!studentID_ageRegex.test(studentID_age)) {
        errors.push("학번(나이)(class_num(age)는 '숫자(숫자)' 형식으로 입력해주세요. 예: 23(21)");
    }

    // 5. MBTI 검사: 소문자 4글자만 허용
    const mbtiRegex = /^[a-z]{4}$/;
    if (!mbtiRegex.test(mbti)) {
        errors.push("MBTI는 소문자 4글자로 입력해주세요. 예: intj");
    }

    // 6. 취미 검사: 콤마와 띄어쓰기는 허용, 특수문자와 동명사는 금지
   const hobbiesRegex = /^[가-힣a-zA-Z\s,]+$/; // 한글, 영어, 공백, 콤마 허용
   const invalidPatternsRegex = /[!@#$%^&*()_+=[\]{};':"\\|<>/?~`]|하기$/;
   if (!hobbiesRegex.test(hobbies) || invalidPatternsRegex.test(hobbies)) {
       errors.push("취미(hobby)는 콤마와 띄어쓰기를 포함할 수 있지만, 특수문자와 동사는 허용되지 않습니다. 예: 축구, 농구");
   }


    // 7. 연락처 검사: 하나의 값만 입력
    if (contact.length === 0) {
        errors.push("연락처(contact)를 입력하세요.");
    }

    // 에러가 있으면 알림 표시 및 제출 중단
    if (errors.length > 0) {
        alert(`입력값이 올바르지 않습니다:\n- ${errors.join("\n- ")}`);
        return;
    }

    // 양식이 올바르면 제출 진행
    alert("양식이 올바릅니다. 제출을 진행합니다.");
    submitCard(event);
}

async function submitCard(event) {
    // 사용자 확인
    const isConfirmed = confirm("정말로 제출하시겠습니까?");
    if (!isConfirmed) {
        return; 
    }

    // 기본 제출 방지
    event.preventDefault();

    const url = "백엔드 API URL 지정하는 곳";  // 실제 API URL

    // FormData를 통해 폼 데이터를 가져옵니다.
    const formData = new FormData(document.querySelector(".form-container"));
    const formObj = {};

    // FormData를 순회하며 formObj에 데이터를 저장
    formData.forEach((value, key) => {
        formObj[key] = value;   
    });

    // 동물 이미지 경로 추가
    const animalImg = document.querySelector(".form_image");
    const imgSrc = animalImg ? animalImg.getAttribute("src") : null;  // 동물 이미지 경로가 없으면 null 처리

    if (imgSrc) {
        // 상대 경로를 절대 경로로 변환
        const absoluteImgSrc = new URL(imgSrc, window.location.href).href;
        formObj["animalImg_src"] = absoluteImgSrc;  // formObj에 절대 경로로 된 동물 이미지 경로 추가
    }

    // 카드 색상 경로 가져오기
    const card = document.querySelector(".form-container");
    const computedStyle = window.getComputedStyle(card);
    let cardColorSrc = computedStyle.backgroundImage;
    
    if (cardColorSrc) {
        const regex = /url\(["'](.*?)["']\)/;
        const match = cardColorSrc.match(regex);

        if (match) {
            let imageUrl = match[1];
            formObj["cardColor_src"] = imageUrl;  // formObj에 카드 색상 경로 추가
        } 
    }
    console.log(formObj);
    
    // 서버로 전송 (POST 요청)
    try {
        const response = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formObj)
        });

        if (!response.ok) {
            const errorMessage = `HTTP 에러 발생: ${response.status}`;
            throw new Error(errorMessage);
        } else {
            const data = await response.json();
            alert("제출이 완료됐습니다.");
            window.location.href = "./idealTypeSurvey.html";  
        }
    } catch (error) {
        alert("서버로 데이터를 전송하는데 문제가 발생했습니다.");
    }
}
