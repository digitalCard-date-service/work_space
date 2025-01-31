'use strict';

document.addEventListener("DOMContentLoaded", () => {
    const modal = document.getElementsByClassName("modal")[0]; // 첫 번째 모달 선택
    const modalButton = document.querySelector(".modal_button");

    document.body.style.overflow = "hidden"; // 스크롤 방지

    // 버튼 클릭 시 모달 닫기
    modalButton.addEventListener("click", () => {
        modal.style.display = "none"; // 모달 숨기기
        document.body.style.overflow = ""; // 스크롤 복원
    });

    // 모달 바깥 클릭 방지 (불필요한 이벤트 제거)
    modal.addEventListener("click", (event) => {
        event.stopPropagation(); // 모달 바깥 클릭 이벤트 차단
    });
});