'use strict';

const arrowUpBtn = document.getElementById('arrow-up');


window.addEventListener('scroll', () => {
        if (window.scrollY > 200) {
            arrowUpBtn.style.display = 'block';
        } else {
            arrowUpBtn.style.display = 'none';
        }
    });

arrowUpBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });