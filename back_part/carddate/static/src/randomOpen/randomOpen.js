'use strict';

document.addEventListener('DOMContentLoaded', () => {
    const openButton = document.getElementById('openButton');
    const confirmButton = document.getElementById('confirmButton');
    const card = document.querySelector('.card');
    const cardBack = document.querySelector('.card-back');
    const animalImage = document.querySelector('.card-image img');
    const infoRows = document.querySelectorAll('.info-row.hidden');

    const cardInfo = {
        gender: document.querySelector('.gender'),
        name: document.querySelector('.name'),
        major: document.querySelector('.major'),
        studentID_age: document.querySelector('.studentID_age'),
        mbti: document.querySelector('.mbti'),
        hobbies: document.querySelector('.hobbies'),
        contact: document.querySelector('.contact'),
    };

    let isFlipped = false; // 카드 뒤집힘 상태
    let isConfirmed = false; // 카드 확정 여부
    let currentCardIndex = 0; // 현재 카드 인덱스 (0 또는 1)
    const cards = []; // 서버에서 받은 두 개의 카드 저장
    let hasFetchedCards = false; // 서버에서 카드를 가져왔는지 여부

    // 서버에서 카드 데이터를 가져오는 함수
    async function fetchCards() {
        try {
            let card1 = null;
            let card2 = null;

            while (true) {
                const response = await fetch('https://example.com/api/random-cards'); // 실제 서버 URL로 변경 필요
                if (!response.ok) {
                    throw new Error('카드 데이터를 가져오지 못했습니다.');
                }
                const data = await response.json();
                card1 = data[0];
                card2 = data[1];

                // 중복 검사
                if (card1.id !== card2.id) {
                    break;
                }
            }

            cards.push(card1, card2);
            hasFetchedCards = true;
            alert('두 개의 카드를 성공적으로 가져왔습니다. 카드를 클릭하여 뒤집을 수 있습니다.');
        } catch (error) {
            console.error('Error fetching cards:', error);
            alert('카드 데이터를 가져오는 데 실패했습니다. 잠시 후 다시 시도하세요.');
        }
    }

    // 카드 UI 업데이트 함수
    function updateCardUI(cardData) {
        if (!cardData) return;

        cardBack.style.backgroundImage = `url(${cardData.backgroundImage})`;
        animalImage.src = cardData.image;
        cardInfo.gender.textContent = cardData.gender;
        cardInfo.name.textContent = cardData.name;
        cardInfo.major.textContent = cardData.major;
        cardInfo.studentID_age.textContent = cardData.studentID_age;
        cardInfo.mbti.textContent = cardData.mbti;
        cardInfo.hobbies.textContent = cardData.hobbies;
        cardInfo.contact.textContent = cardData.contact;
    }

    // 카드 클릭 이벤트 핸들러
    card.addEventListener('click', () => {
        if (!hasFetchedCards) {
            alert('먼저 오픈 버튼을 클릭하세요.');
            return;
        }
        if (isConfirmed) {
            alert('카드를 확정한 이후에는 더 이상 뒤집을 수 없습니다.');
            return;
        }
        isFlipped = !isFlipped;
        card.style.transform = isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)';
    });

    // 오픈 버튼 클릭 이벤트 핸들러
    openButton.addEventListener('click', async () => {
        if (isConfirmed) {
            alert('카드를 확정한 이후에는 더 이상 오픈할 수 없습니다.');
            return;
        }

        if (!hasFetchedCards) {
            await fetchCards(); // 서버에서 카드 데이터를 가져옴
            if (hasFetchedCards) {
                updateCardUI(cards[currentCardIndex]); // 첫 번째 카드 표시
                openButton.textContent = '카드2오픈';
                confirmButton.disabled = false; // 확정 버튼 활성화
            }
        } else {
            currentCardIndex = currentCardIndex === 0 ? 1 : 0; // 카드 인덱스 변경
            updateCardUI(cards[currentCardIndex]); // 다음 카드 표시
            openButton.textContent = `카드${currentCardIndex + 1}오픈`;
        }
    });

    // 확정 버튼 클릭 이벤트 핸들러
    confirmButton.addEventListener('click', () => {
        if (!hasFetchedCards) {
            alert('먼저 카드를 오픈하세요!');
            return;
        }
        if (isConfirmed) {
            alert('이미 확정되었습니다.');
            return;
        }

        const confirmAction = confirm('현재 보이는 카드를 확정하시겠습니까?');
        if (confirmAction) {
            isConfirmed = true; // 카드 확정
            infoRows.forEach(row => row.querySelector('.value').style.visibility = 'visible'); // 숨겨진 정보 표시
            openButton.disabled = true; // 오픈 버튼 비활성화
            confirmButton.disabled = true; // 확정 버튼 비활성화

            // 카드 정보를 sessionStorage에 저장
            const confirmedCard = {
                name: cardInfo.name.textContent,
                age: cardInfo.studentID_age.textContent.split(' ')[0], // '20살 (학번)'에서 '20' 추출
                mbti: cardInfo.mbti.textContent,
                hobbies: cardInfo.hobbies.textContent,
                image: animalImage.src,
            };
            sessionStorage.setItem('confirmedCard', JSON.stringify(confirmedCard));
            alert('카드가 성공적으로 확정되어 저장되었습니다!');
        }
    });
});
