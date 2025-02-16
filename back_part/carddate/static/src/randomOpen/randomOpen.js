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

    let isFlipped = false; // 카드 뒤집힘 상태
    let isConfirmed = false; // 카드 확정 여부
    let currentCardIndex = 0; // 현재 카드 인덱스 (0 또는 1)
    const cards = []; // 서버에서 받은 두 개의 카드 저장
    let hasFetchedCards = false; // 서버에서 카드를 가져왔는지 여부

    // 서버에서 카드 데이터를 가져오는 함수
    async function fetchCards() {
        try {
            const response = await fetch('/random/card/public'); // 이름/SNS 제외 데이터 요청
            if (!response.ok) {
                throw new Error('카드 데이터를 가져오지 못했습니다.');
            }
            const data = await response.json();

            // 중복 검사 및 카드 저장
            if (data[0].id !== data[1].id) {
                cards.push(data[0], data[1]);
                hasFetchedCards = true;
                alert('두 개의 카드를 성공적으로 가져왔습니다. 카드를 클릭하여 뒤집을 수 있습니다.');
            } else {
                throw new Error('서버에서 중복된 카드를 받았습니다.');
            }
        } catch (error) {
            alert('카드 데이터를 가져오는 데 실패했습니다. 잠시 후 다시 시도하세요.');
        }
    }

    // 이름 및 SNS 정보를 요청하는 함수
    async function fetchDetailedInfo(cardId) {
        try {
            const response = await fetch('/random/card/private', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id: cardId
                })
            }); // 상세 정보 요청
            if (!response.ok) {
                throw new Error('카드 세부 정보를 가져오지 못했습니다.');
            }
            return await response.json();
        } catch (error) {
            alert('세부 정보를 가져오는 데 실패했습니다.');
            throw error;
        }
    }

    async function fetchDeleteCard(cardId) {
        try {
            const response = await fetch('/random/card/delete', {
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
    function updateCardUI(cardData) {
        if (!cardData) return;

        cardBack.style.backgroundImage = `url(${cardData.color})`;
        animalImage.src = cardData.image;
        cardInfo.gender.textContent = cardData.gender;
        cardInfo.name.textContent = ''; // 이름 비워둠
        cardInfo.major.textContent = cardData.major;
        cardInfo.studentID_age.textContent = cardData.studentID_age;
        cardInfo.mbti.textContent = cardData.mbti;
        cardInfo.hobbies.textContent = cardData.hobby;
        cardInfo.contact.textContent = ''; // SNS 비워둠
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
            await fetchCards();
            if (hasFetchedCards) {
                updateCardUI(cards[currentCardIndex]); // 첫 번째 카드 표시
                openButton.textContent = '명함1오픈';
                confirmButton.disabled = false; // 확정 버튼 활성화
            }
        } else {
            currentCardIndex = currentCardIndex === 0 ? 1 : 0;
            updateCardUI(cards[currentCardIndex]); // 다음 카드 표시
            openButton.textContent = `명함${currentCardIndex + 1}오픈`;
        }
    });

    // 확정 버튼 클릭 이벤트 핸들러
    confirmButton.addEventListener('click', async () => {
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
            try {
                const detailedInfo = await fetchDetailedInfo(cards[currentCardIndex].id); // 이름/SNS 정보 요청
                isConfirmed = true; // 카드 확정
                cardInfo.name.textContent = detailedInfo.name;
                cardInfo.contact.textContent = detailedInfo.contact; // SNS ID 업데이트
                infoRows.forEach(row => row.querySelector('.value').style.visibility = 'visible');
                openButton.disabled = true;
                confirmButton.disabled = true;
                nextButton.disabled = false;

                // fetchDeleteCard(cards[currentCardIndex].id);

                // 확정된 카드 정보를 sessionStorage에 저장
                const confirmedCard = {
                    name: detailedInfo.name,
                    age: cardInfo.studentID_age.textContent.split(' ')[0], // '20살 (학번)'에서 '20' 추출
                    mbti: cardInfo.mbti.textContent,
                    hobbies: cardInfo.hobbies.textContent,
                    contact: detailedInfo.contact,
                    image: animalImage.src,
                };

                sessionStorage.setItem('confirmedCard', JSON.stringify(confirmedCard));
                alert('카드가 성공적으로 확정되어 저장되었습니다!');
            } catch (error) {
                alert('확정에 실패했습니다. 다시 시도하세요.');
            }
        }
    });
    nextButton.addEventListener('click', () => {
        window.location.href = '/chatbot';
    })
});