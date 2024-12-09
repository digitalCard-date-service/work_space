'use strict';

document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('#ad .ad__img, #step1 .step__img, #step2 .step__img, #step3 .step__img');

    // Intersection Observer 설정
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // 애니메이션 클래스를 추가하여 slide-down 효과를 적용
                entry.target.classList.add('slide-down');
                // 한 번만 작동하도록 해당 요소에 대한 옵저버 해제
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1 // 요소가 10% 이상 보일 때 트리거
    });

    // 각 이미지 요소를 관찰 대상으로 추가
    images.forEach(img => observer.observe(img));
});
