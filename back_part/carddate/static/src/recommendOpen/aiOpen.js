document.addEventListener('DOMContentLoaded', () => {
    const randomizeButton = document.getElementById('randomizeButton');
    const confirmButton = document.getElementById('confirmButton');
    const cardBack = document.querySelector('.card-back'); // 카드의 뒷면 요소
    const animalImage = document.querySelector('.card-image img'); // 카드 이미지 요소
    const infoRows = document.querySelectorAll('.info-row.hidden'); // 숨겨진 정보

    const cardInfo = {
        gender: document.querySelector('.gender'),
        name: document.querySelector('.name'),
        major: document.querySelector('.major'),
        studentID_age: document.querySelector('.studentID_age'),
        mbti: document.querySelector('.mbti'),
        hobbies: document.querySelector('.hobbies'),
        contact: document.querySelector('.contact'),
    };

    let isRecommendationOpened = false; // 추천 오픈 상태 변수

    // 서버에서 추천카드 데이터를 가져오는 함수
    async function fetchRecommendedCard() {
        try {
            const response = await fetch('https://example.com/api/recommended-card'); // 실제 API URL
            if (!response.ok) {
                throw new Error('Failed to fetch recommended card');
            }
            return await response.json();
        } catch (error) {
            console.error('Error fetching recommended card:', error);
            alert('추천 데이터를 가져오는 데 실패했습니다.');
        }
    }

    // 카드 UI 업데이트 함수
    function updateCardUI(data) {
        if (!data) return;

        // 배경 이미지 및 텍스트 데이터 업데이트
        cardBack.style.backgroundImage = `url(${data.backgroundImage})`; // 서버에서 받은 배경 이미지 URL 설정
        animalImage.src = data.image; // 서버에서 받은 동물 이미지 URL 설정
        cardInfo.gender.textContent = data.gender;
        cardInfo.name.textContent = data.name;
        cardInfo.major.textContent = data.department;
        cardInfo.studentID_age.textContent = data.yearAge;
        cardInfo.mbti.textContent = data.mbti;
        cardInfo.hobbies.textContent = data.hobbies;
        cardInfo.contact.textContent = data.contact;
    }

    // 추천 오픈 버튼 클릭 이벤트
    randomizeButton.addEventListener('click', async () => {
        if (isRecommendationOpened) {
            alert("더 이상 추천오픈을 누를 수 없습니다."); // 경고 문구 추가
            return;
        }

        const recommendedCardData = await fetchRecommendedCard(); // 서버 데이터 가져오기
        if (recommendedCardData) {
            updateCardUI(recommendedCardData); // UI 업데이트
            randomizeButton.disabled = true; // 추천오픈 버튼 비활성화
            confirmButton.disabled = false; // 확인 버튼 활성화
            isRecommendationOpened = true; // 추천 오픈 상태 갱신
        }
    });

    // 확인 버튼 클릭 이벤트
    confirmButton.addEventListener('click', () => {
        const confirmAction = confirm("해당 카드를 확정하시겠습니까?");
        if (confirmAction) {
            infoRows.forEach(row => row.querySelector('.value').style.visibility = 'visible'); // 숨겨진 정보 표시
            confirmButton.disabled = true; // 확인 버튼 비활성화
        }
    });
});
