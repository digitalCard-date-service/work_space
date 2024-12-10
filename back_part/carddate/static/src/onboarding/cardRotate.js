'use strict';

document.addEventListener('DOMContentLoaded', function () {
    const cards = document.querySelectorAll('.start_card'); // 모든 카드 요소 가져오기
    const button = document.querySelector('.start_cardButton'); // 버튼 요소 가져오기
    let currentCard = cards[0]; // 초기 상태: card1
    let isFlipped = false; // 카드 회전 상태 추적

    // 초기 상태: card1 표시
    currentCard.classList.add('active');

    // 버튼 클릭 및 터치 이벤트
    const handleButtonClick = () => {
        // 현재 카드 초기화 (앞면으로 돌리고 숨김)
        currentCard.classList.remove('active');
        currentCard.style.transform = "rotateY(0deg)";
        isFlipped = false;

        // 랜덤 카드 선택
        const randomIndex = Math.floor(Math.random() * cards.length);
        currentCard = cards[randomIndex];
        currentCard.classList.add('active'); // 새 카드 활성화

        // 새 카드 뒷면 표시
        setTimeout(() => {
            currentCard.style.transform = "rotateY(180deg)";
            isFlipped = true; // 상태 업데이트
        }, 100); // 약간의 지연을 추가해 자연스러운 전환
    };

    button.addEventListener('click', handleButtonClick);
    button.addEventListener('touchstart', (e) => {
        e.preventDefault(); // 터치 이벤트 기본 동작 방지 (필수)
        handleButtonClick();
    });

    // 카드 클릭 및 터치 이벤트
    const handleCardFlip = (card) => {
        if (card.classList.contains('active')) {
            if (isFlipped) {
                // 뒷면에서 앞면으로 회전
                card.style.transform = "rotateY(0deg)";
                isFlipped = false;
            } else {
                // 앞면에서 뒷면으로 회전
                card.style.transform = "rotateY(180deg)";
                isFlipped = true;
            }
        }
    };

    cards.forEach((card) => {
        card.addEventListener('click', () => handleCardFlip(card));
        card.addEventListener('touchstart', (e) => {
            e.preventDefault();
            handleCardFlip(card);
        });
    });
});
