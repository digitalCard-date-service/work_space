'use strict';

const images = document.querySelectorAll(".animalImg");
const formImage = document.querySelector(".form_image");  // form_image는 여전히 body에 존재

images.forEach((element) => {
    element.addEventListener("click", function(event) {
        changeImg(event.target);
    });
});

function changeImg(clickedImg) {
    const imgSrc = clickedImg.src;
    formImage.src = imgSrc;  // form_image의 src를 변경
}