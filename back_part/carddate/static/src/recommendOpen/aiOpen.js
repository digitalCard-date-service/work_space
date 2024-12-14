'use strict';

document.addEventListener('DOMContentLoaded', () => {
    const openButton = document.getElementById('openButton');
    const confirmButton = document.getElementById('confirmButton');
    const card = document.querySelector('.card');
    const cardBack = document.querySelector('.card-back');
    const animalImage = document.querySelector('.card-image img');
    const infoRows = document.querySelectorAll('.info-row.hidden');
    const nextButton = document.getElementById('nextButton');

    const cardInfo = {
        gender: document.querySelector('.gender'),
        name: document.querySelector('.name'),
        major: document.querySelector('.major'),
        studentID_age: document.querySelector('.studentID_age'),
        mbti: document.querySelector('.mbti'),
        hobbies: document.querySelector('.hobbies'),
        contact: document.querySelector('.contact'),
    };

    let isFlipped = false; // 카드 상태 플래그
    let isRecommendationOpened = false; // 카드 데이터를 성공적으로 가져왔는지 여부
    let cardId = 0;

    // 서버에서 추천 카드를 가져오는 함수
    async function fetchRecommendedCard() {
        try {
            const response = await fetch('card'); // 서버 URL 수정 필요
            if (!response.ok) {
                throw new Error('Failed to fetch recommended card');
            }
            alert("명함을 가져왔습니다. 카드를 클릭해주세요.");
            return await response.json();
        } catch (error) {
            alert('명함을 가져오는데 실패했습니다.');
        }
    }

    async function fetchDeleteCard(cardId) {
        try {
            const response = await fetch('delete', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    'id': cardId
                })
            }); // 상세 정보 요청
            if (!response.ok) {
                throw new Error('카드 삭제에 실패했습니다.');
            }
            return await response.json();
        } catch (error) {
            alert('카드 삭제에 실패했습니다.');
            throw error;
        }
    }

    // 카드 UI 업데이트 함수
    function updateCardUI(data) {
        if (!data) return;
        cardId = data.id;
        cardBack.style.backgroundImage = `url(${data.color})`;
        animalImage.src = data.image;
        cardInfo.gender.textContent = data.gender;
        cardInfo.name.textContent = data.name;
        cardInfo.major.textContent = data.major;
        cardInfo.studentID_age.textContent = data.studentID_age;
        cardInfo.mbti.textContent = data.mbti;
        cardInfo.hobbies.textContent = data.hobby;
        cardInfo.contact.textContent = data.contact;
    }

    // 오픈 버튼 클릭 이벤트 핸들러
    openButton.addEventListener('click', async () => {
        if (isRecommendationOpened) {
            alert("이미 카드를 오픈했습니다."); 
            return;
        }

        const recommendedCardData = await fetchRecommendedCard();
        if (recommendedCardData) {
            updateCardUI(recommendedCardData);
            isRecommendationOpened = true; // 서버에서 데이터를 성공적으로 가져옴
            confirmButton.disabled = false;
        }
    });

    // 카드 클릭 이벤트 핸들러
    card.addEventListener('click', () => {
        if (!isRecommendationOpened) {
            alert("먼저 오픈 버튼을 클릭하세요."); 
            return;
        }
        isFlipped = !isFlipped;
        card.style.transform = isFlipped ? "rotateY(180deg)" : "rotateY(0deg)";
    });

    // 확정 버튼 클릭 이벤트 핸들러
    confirmButton.addEventListener('click', () => {
        if (!isRecommendationOpened) {
            alert("먼저 카드를 오픈하세요!");
            return;
        }

        const confirmAction = confirm("해당 카드를 확정하시겠습니까?");
        if (confirmAction) {
            infoRows.forEach(row => row.querySelector('.value').style.visibility = 'visible');
            openButton.disabled = true;

            fetchDeleteCard(cardId);

            // 저장된 카드 데이터를 sessionStorage에 저장
            const confirmedCard = {
                name: cardInfo.name.textContent,
                age: cardInfo.studentID_age.textContent.split(' ')[0], // 예: '20살 (학번)'에서 '20'만 추출
                mbti: cardInfo.mbti.textContent,
                hobbies: cardInfo.hobbies.textContent,
                image: animalImage.src,
            };
            sessionStorage.setItem('confirmedCard', JSON.stringify(confirmedCard));
            alert("카드가 저장되었습니다!");
            nextButton.disabled = false;
        }
    });
    nextButton.addEventListener('click', () => {
        window.location.href = '/chatbot';
    })
});
