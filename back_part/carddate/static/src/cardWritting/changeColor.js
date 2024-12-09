'use strict';

const colors = document.querySelectorAll(".color");
const card = document.querySelector(".form-container");

colors.forEach((element) => {
    element.addEventListener("click", function(event){
        changeColor(event.target);
    });
});

function changeColor(clickedColor){
    colors.forEach(color => {
        color.classList.remove('selected');
    });

    // 클릭된 색상에 selected 클래스 추가
    clickedColor.classList.add('selected');

    // 기존 배경 변경 코드
    const cardSrc = clickedColor.getAttribute("data-src");
    card.style.backgroundImage = `url(${cardSrc})`;
}
