'use strict';

document.addEventListener("DOMContentLoaded", ()=>{
    const submitButton = document.querySelector(".submitButton");
    submitButton.addEventListener("click", submitCard);
});

// 이미지 이름과 색상 이름 추출 함수
function getImageName(src) {
    const match = src.match(/\/([^\/]+)\.png$/);
    if (match) {
        return match[1].replace(/^\d+\./, ''); // 숫자와 점 제거
    }
    return 'cuteDog'; // 기본값
}

function getColorName(src) {
    const match = src.match(/card_([a-zA-Z]+)\.svg$/); // 색상 이름만 추출하도록 수정
    return match ? match[1] : 'gray'; // 기본값
}

async function submitCard(event) {
    // 사용자 확인
    const isConfirmed = confirm("정말로 제출하시겠습니까?");
    if (!isConfirmed) {
        return;
    }

    // 기본 제출 방지
    event.preventDefault();

    // 폼 데이터 수집
    const formData = new FormData(document.querySelector(".form-container"));
    const formObj = {};

    // FormData를 순회하며 formObj에 데이터를 저장
    formData.forEach((value, key) => {
        if(key != 'studentID_age') {
            formObj[key] = value;
        }
        else {
            formObj['age'] = value.slice(3, 5);
            formObj['classNumber'] = value.slice(0, 2);
        }
    });

    // 동물 이미지 처리
    const selectedImage = document.querySelector('.form_image').src;
    formObj.image = getImageName(selectedImage);

    // 카드 색상 처리
    const formContainer = document.querySelector('.form-container');
    const backgroundImage = window.getComputedStyle(formContainer).getPropertyValue('background-image');
    formObj.color = backgroundImage.match(/card_(\w+)\.svg/)[1];

    console.log(formObj);



    // 서버로 전송
    try {
        const response = await fetch('/form/submit', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formObj)
        });

        const result = await response.json();

        if (result.status === 'success') {
            alert("제출이 완료됐습니다.");
            window.location.href = "/survey";
        } else {
            alert(result.message || "제출 중 오류가 발생했습니다.");
        }
    } catch (error) {
        console.error("Error:", error);
        alert("서버로 데이터를 전송하는데 문제가 발생했습니다.");
    }
}