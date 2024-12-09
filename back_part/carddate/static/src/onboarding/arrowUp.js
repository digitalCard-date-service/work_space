'use strict';
    // 위로가기 버튼 기능
    const arrowUpBtn = document.getElementById('arrow-up');

    // 스크롤 이벤트 리스너 추가
    window.addEventListener('scroll', () => {
        if (window.scrollY > 200) {
            arrowUpBtn.style.display = 'block';
        } else {
            arrowUpBtn.style.display = 'none';
        }
    });

    // 버튼 클릭 시 최상단으로 이동
    arrowUpBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });