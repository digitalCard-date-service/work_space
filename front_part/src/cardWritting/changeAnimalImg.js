'use strict';

const images = document.querySelectorAll(".animalImg");
const formImage = document.querySelector(".form_image");  

images.forEach((element) => {
    element.addEventListener("click", function(event) {
        changeImg(event.target);
    });
});

function changeImg(clickedImg) {
    const imgSrc = clickedImg.src;
    formImage.src = imgSrc;  
}