'use strict';

const cheerUpMents = document.querySelectorAll('.cheerUpMent');
let currentIndex = 0;

function showNextMent() {
  cheerUpMents[currentIndex].classList.remove('active');
  currentIndex = (currentIndex + 1) % cheerUpMents.length;
  cheerUpMents[currentIndex].classList.add('active');
}

setInterval(showNextMent, 3000);
