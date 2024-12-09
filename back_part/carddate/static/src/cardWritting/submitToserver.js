document.addEventListener('DOMContentLoaded', function() {
    document.querySelector(".submitButton").addEventListener("click", async function(event) {
        event.preventDefault();

        const isConfirmed = confirm("정말로 제출하시겠습니까?");
        if (!isConfirmed) {
            return;
        }

        // 이미지 이름과 색상 이름 추출 함수
        function getImageName(src) {
            const match = src.match(/\/([^\/]+)\.png$/);
            if (match) {
                return match[1].replace(/^\d+\./, ''); // 숫자와 점 제거
            }
            return 'cuteDog'; // 기본값
        }

        function getColorName(src) {
            const match = src.match(/card_([^.]+)\.svg$/);
            return match ? match[1] : 'gray'; // 기본값
        }

        // 현재 선택된 이미지와 색상 가져오기
        const selectedImage = document.querySelector('.form_image').src;
        const selectedColorButton = document.querySelector('.color:active, .color.selected') || document.querySelector('.color');
        const selectedColor = selectedColorButton.dataset.src;

        // 폼 데이터 수집
        const inputs = document.querySelectorAll('.form_row input');
        const formData = {
            gender: inputs[0].value || inputs[0].placeholder,    // 성별
            name: inputs[1].value || inputs[1].placeholder,      // 이름
            major: inputs[2].value || inputs[2].placeholder,     // 학과
            age: inputs[3].value || inputs[3].placeholder,       // 학번(나이)
            mbti: inputs[4].value || inputs[4].placeholder,      // MBTI
            hobby: inputs[5].value || inputs[5].placeholder,     // 취미
            contact: inputs[6].value || inputs[6].placeholder,   // 연락처
            image_data: getImageName(selectedImage),            // hamster, cat 등으로 저장
            color: getColorName(selectedColor)                  // gray, pink 등으로 저장
        };

        try {
            const response = await fetch('/form/submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                throw new Error('서버 응답이 실패했습니다.');
            }

            const result = await response.json();
            alert('프로필이 성공적으로 저장되었습니다!');
            window.location.href = '/drawing';  // 성공 시 다음 페이지로 이동

        } catch (error) {
            console.error('Error:', error);
            alert('제출 중 오류가 발생했습니다: ' + error.message);
        }
    });
});