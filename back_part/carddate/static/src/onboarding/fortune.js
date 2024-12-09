'use strict';

document.addEventListener('DOMContentLoaded', function() {
    const cards = document.querySelectorAll('.start_card');
    const button = document.querySelector('.start_cardButton');
    
    // 처음에 card1만 표시
    let currentCard = cards[0];
    currentCard.classList.add('active');

    button.addEventListener('click', () => {
        // 현재 카드 숨기기
        currentCard.classList.remove('active');
        
        // 카드 중에서 랜덤하게 선택
        const randomIndex = Math.floor(Math.random() * cards.length);
        currentCard = cards[randomIndex];
        currentCard.classList.add('active');
    });
});
