document.addEventListener('DOMContentLoaded', () => {
    const randomizeButton = document.getElementById('randomizeButton');
    const confirmButton = document.getElementById('confirmButton');
    const otherCardButton = document.getElementById('otherCardButton');
    const animalImage = document.querySelector('.animal-image');
    const cardBack = document.querySelector('.start_card-back');
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

    let requestCount = 0;

    // 서버에서 카드 데이터를 가져오는 함수
    async function fetchCardData() {
        try {
            const response = await fetch('https://example.com/api/random-card'); // 실제 API URL
            if (!response.ok) {
                throw new Error('Failed to fetch card data');
            }
            return await response.json();
        } catch (error) {
            console.error('Error fetching card data:', error);
            alert('카드 데이터를 불러오는 데 실패했습니다.');
        }
    }

    // 카드 UI 업데이트 함수
    function updateCardUI(data) {
        if (!data) return;

        // 이미지 및 텍스트 데이터 업데이트
        animalImage.src = data.image; // 동물 이미지
        cardBack.style.backgroundImage = `url(${data.backgroundImage})`; // 백그라운드 이미지
        cardInfo.gender.textContent = data.gender;
        cardInfo.name.textContent = data.name;
        cardInfo.major.textContent = data.major;
        cardInfo.studentID_age.textContent = data.studentID_age;
        cardInfo.mbti.textContent = data.mbti;
        cardInfo.hobbies.textContent = data.hobbies;
        cardInfo.contact.textContent = data.contact;
    }

    // 랜덤 오픈 버튼 클릭 이벤트
    randomizeButton.addEventListener('click', async () => {
        const cardData = await fetchCardData();
        if (cardData) {
            updateCardUI(cardData);
            randomizeButton.disabled = true;
            otherCardButton.disabled = false;
            confirmButton.disabled = false;
        }
    });

    // 확인 버튼 클릭 이벤트
    confirmButton.addEventListener('click', () => {
        const confirmAction = confirm("해당 카드를 확정하시겠습니까?");
        if (confirmAction) {
            infoRows.forEach(row => row.querySelector('.value').style.visibility = 'visible');
            randomizeButton.disabled = true;
            otherCardButton.disabled = true;
            confirmButton.disabled = true;
        }
    });

    // 다른 카드 버튼 클릭 이벤트
    otherCardButton.addEventListener('click', async () => {
        if (requestCount >= 1) {
            alert("더 이상 카드를 요청할 수 없습니다.");
            return;
        }
        requestCount++;
        const cardData = await fetchCardData();
        if (cardData) {
            updateCardUI(cardData);
        }
    });
});
