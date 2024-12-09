'use strict';

document.addEventListener("DOMContentLoaded", ()=>{
    const submitButton = document.querySelector(".submitButton");
    submitButton.addEventListener("click", submitCard);
})

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
    console.log("동물 이미지 경로:", imgSrc);

    if (imgSrc) {
        // 상대 경로를 절대 경로로 변환
        const absoluteImgSrc = new URL(imgSrc, window.location.href).href;
        console.log("절대 경로로 변환된 동물 이미지 경로:", absoluteImgSrc);
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
            console.log("추출된 카드 색상 경로:", imageUrl);
            formObj["cardColor_src"] = imageUrl;  // formObj에 카드 색상 경로 추가
        } else {
            console.log("카드 색상 경로를 찾을 수 없습니다.");
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
            console.error(errorMessage);
            throw new Error(errorMessage);
        } else {
            const data = await response.json();
            console.log(`서버 응답: ${data}`);
            alert("제출이 완료됐습니다.");
            window.location.href = "../../cardDrawing.html";  // 완료 후 페이지 이동
        }
    } catch (error) {
        console.error("Error:", error);
        alert("서버로 데이터를 전송하는데 문제가 발생했습니다.");
    }
}
