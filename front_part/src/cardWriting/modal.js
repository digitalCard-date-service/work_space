'use strict';

document.addEventListener("DOMContentLoaded", () => {
    const modal = document.getElementById("modal");
    const formCheckButton = document.querySelector(".formCheckButton");
    const modalButton = document.querySelector(".modal-button");

    // 양식예시 버튼 클릭 시 모달 열기
    formCheckButton.addEventListener("click", (event) => {
        event.preventDefault(); // 버튼 기본 동작 방지
        modal.style.display = "flex"; // 모달 표시
        document.body.style.overflow = "hidden"; // 스크롤 방지
    });

    // 모달 내 확인 버튼 클릭 시 모달 닫기
    modalButton.addEventListener("click", () => {
        modal.style.display = "none"; // 모달 숨기기
        document.body.style.overflow = ""; // 스크롤 복원
    });

    // 모달 바깥 클릭 방지
    modal.addEventListener("click", (event) => {
        if (event.target === modal) {
            event.stopPropagation(); // 모달 바깥 클릭 이벤트 막기
        }
    });
});
