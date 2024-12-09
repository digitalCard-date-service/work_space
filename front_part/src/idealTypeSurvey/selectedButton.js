'use strict';

document.addEventListener("DOMContentLoaded", () => {
    // MBTI 그룹의 모든 div 가져오기
    const mbtiGroups = document.querySelectorAll(".mbti-group");

    mbtiGroups.forEach((group) => {
        const mbtiOptions = group.querySelectorAll("div[id]");

        mbtiOptions.forEach((option) => {
            option.addEventListener("click", () => {
                if (option.classList.contains("selected")) {
                    // 이미 선택된 경우 선택 해제
                    option.classList.remove("selected");
                } else {
                    // 다른 옵션 선택 해제 후 현재 요소 선택
                    mbtiOptions.forEach((opt) => opt.classList.remove("selected"));
                    option.classList.add("selected");
                }
            });
        });
    });

    // 나머지 요소 처리 (선택 제한 없음, 중복 선택 가능)
    const selectableDivs = document.querySelectorAll(".survey_section-container div[id]:not(.mbti-group div[id])");

    selectableDivs.forEach((div) => {
        div.addEventListener("click", () => {
            if (div.classList.contains("selected")) {
                // 이미 선택된 경우 선택 해제
                div.classList.remove("selected");
            } else {
                // 선택 상태로 변경
                div.classList.add("selected");
            }
        });
    });
});
