document.addEventListener("DOMContentLoaded", () => {
    const randomButton = document.querySelector(".draw_randomButton");
    const recommendButton = document.querySelector(".draw_recommendButton");
    const modal = document.querySelector(".modal");
    const modalOverlay = document.querySelector(".modal-overlay");
    const drawButton = document.querySelector(".drawButton");
    const cardStrip = document.querySelector(".modal_card-container");

    const cardImages = [
        "../static/assets/card_gray.svg",
        "../static/assets/card_blue.svg",
        "../static/assets/card_yellow.svg",
        "../static/assets/card_pink.svg",
        "../static/assets/card_orange.svg",
        "../static/assets/card_green.svg",
        "../static/assets/card_purple.svg",
        "../static/assets/card_white.svg"
    ];

    let isSpinning = false;
    let spinDuration = 10; // 뽑기 버튼 누른 후의 애니메이션 속도
    let slowSpeed = 20; // 평상시 천천히 움직이는 속도
    let stripContainer;
    const cardHeight = 400; // 카드 높이 (CSS와 맞춤)
    let totalCardHeight; // 전체 카드 스트립의 높이
    let startTime;
    let currentAction = "";
    let animationStarted = false;
    let animationCompleted = false;

    // 스크롤락 기능
    function lockScroll() {
        document.body.style.overflow = "hidden"; // 스크롤 차단
        document.body.style.height = "100%";    // 높이 고정
    }

    function unlockScroll() {
        document.body.style.overflow = ""; // 스크롤 복구
        document.body.style.height = "";   // 높이 복구
    }

    function showModal(action) {
        modal.classList.add("active");
        modalOverlay.classList.add("active");
        lockScroll(); // 스크롤 잠금
        currentAction = action;
        setupCardStrip(); // 애니메이션 세팅
    }

    function hideModal() {
        modal.classList.remove("active");
        modalOverlay.classList.remove("active");
        unlockScroll(); // 스크롤 복구
    }

    function setupCardStrip() {
        stripContainer = document.createElement("div");
        stripContainer.classList.add("card-strip");

        // 카드 이미지 추가
        cardImages.forEach((src) => {
            const img = document.createElement("img");
            img.src = src;
            stripContainer.appendChild(img);
        });

        // 카드 반복 추가
        cardImages.forEach((src) => {
            const img = document.createElement("img");
            img.src = src;
            stripContainer.appendChild(img);
        });

        cardStrip.innerHTML = "";
        cardStrip.appendChild(stripContainer);

        totalCardHeight = stripContainer.scrollHeight; // 전체 높이 계산

        // 평상시 천천히 움직이는 애니메이션 설정
        stripContainer.style.animation = `scroll ${slowSpeed}s linear infinite`;
    }

    function startAnimation() {
        animationStarted = true;
        stripContainer.style.animationDuration = `${spinDuration}s`; // 빠르게 움직이도록 설정
        stripContainer.style.animationTimingFunction = "linear";
        startTime = performance.now();
        animateScroll();
    }

    function animateScroll() {
        if (!animationStarted) return;

        const now = performance.now();
        const timeElapsed = (now - startTime) / 1000;

        const progress = Math.min(timeElapsed / spinDuration, 1); // 진행 비율
        const currentSpeed = Math.max(1 - progress, 0); // 속도 점차 줄이기

        stripContainer.style.animationDuration = `${currentSpeed * spinDuration + 1}s`;

        if (currentSpeed > 0) {
            requestAnimationFrame(animateScroll);
        } else {
            if (!animationCompleted) {
                stopAnimation();
            }
        }
    }

    function stopAnimation() {
        animationStarted = false;
        animationCompleted = true;

        // 현재 `translateY` 값 가져오기
        const currentTranslateY = getComputedStyle(stripContainer).transform.match(/matrix.*\((.+)\)/);
        let translateY = currentTranslateY ? parseFloat(currentTranslateY[1].split(", ")[5]) : 0;

        // 카드 높이에 맞게 정렬
        const offset = Math.abs(translateY) % cardHeight;
        if (offset > 0) {
            translateY -= offset; // 카드 높이에 맞추기
        }

        stripContainer.style.animation = "none"; // 애니메이션 중지
        stripContainer.style.transform = `translateY(${translateY}px)`; // 최종 위치 설정

        isSpinning = false;

        setTimeout(() => {
            alert("카드 뽑기 성공!");
            if (currentAction === "random") {
                window.location.href = "/random";
            } else if (currentAction === "recommend") {
                window.location.href = "/recommend";
            }
        }, 1000);
    }

    randomButton.addEventListener("click", () => showModal("random"));
    recommendButton.addEventListener("click", () => showModal("recommend"));

    drawButton.addEventListener("click", () => {
        if (!isSpinning && !animationStarted) {
            isSpinning = true;
            animationCompleted = false;
            startAnimation();
        }
    });

    modalOverlay.addEventListener("click", () => hideModal());

    modal.addEventListener("click", (event) => {
        event.stopPropagation();
    });
});
