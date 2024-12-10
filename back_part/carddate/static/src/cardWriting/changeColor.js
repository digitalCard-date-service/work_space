'use strict';

const colors = document.querySelectorAll(".color");
const card = document.querySelector(".form-container");

// 기본 동작: 모든 화면 크기에서 적용
colors.forEach((element) => {
    element.addEventListener("click", function(event) {
        changeColor(event.target);

        // width가 834px 이하일 때만 추가 동작 실행
        if (window.matchMedia("(max-width: 834px)").matches) {
            handleSmallScreen(event.target);
        }
    });
});

// 기본 배경 색상 변경 함수
function changeColor(clickedColor) {
    const cardSrc = clickedColor.getAttribute("data-src");
    card.style.backgroundImage = `url(${cardSrc})`;
}

// 834px 이하에서만 실행되는 추가 동작
function handleSmallScreen(clickedColor) {
    const cardSrcMobile = clickedColor.getAttribute("data-mobile");
    card.style.backgroundImage = `url(${cardSrcMobile})`;
}
