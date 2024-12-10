'use strict';

document.addEventListener("DOMContentLoaded", () => {
    const randomButton = document.querySelector(".draw_randomButton");
    const recommendButton = document.querySelector(".draw_recommendButton");
    const modal = document.querySelector(".modal");
    const modalOverlay = document.querySelector(".modal-overlay");
    const drawButton = document.querySelector(".drawButton");
    const cardStrip = document.querySelector(".modal_card-container");
    const modalLoading = document.querySelector(".modal_loading");

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
    let spinDuration = 10;
    let slowSpeed = 20;
    let stripContainer;
    const cardHeight = 400;
    let totalCardHeight;
    let startTime;
    let currentAction = "";
    let animationStarted = false;
    let animationCompleted = false;
    let loadingInterval;

    function lockScroll() {
        document.body.style.overflow = "hidden";
        document.body.style.height = "100%";
    }

    function unlockScroll() {
        document.body.style.overflow = "";
        document.body.style.height = "";
    }

    function startLoadingAnimation() {
        let dots = 0;
        modalLoading.textContent = "뽑기중";
        loadingInterval = setInterval(() => {
            dots = (dots + 1) % 4;
            modalLoading.textContent = "뽑기중" + ".".repeat(dots);
        }, 500);
    }

    function stopLoadingAnimation() {
        clearInterval(loadingInterval);
        modalLoading.textContent = "뽑기중...";
    }

    function showModal(action) {
        modal.classList.add("active");
        modalOverlay.classList.add("active");
        lockScroll();
        currentAction = action;
        setupCardStrip();
        startLoadingAnimation();
    }

    function setupCardStrip() {
        stripContainer = document.createElement("div");
        stripContainer.classList.add("card-strip");

        cardImages.forEach((src) => {
            const img = document.createElement("img");
            img.src = src;
            stripContainer.appendChild(img);
        });

        cardImages.forEach((src) => {
            const img = document.createElement("img");
            img.src = src;
            stripContainer.appendChild(img);
        });

        cardStrip.innerHTML = "";
        cardStrip.appendChild(stripContainer);

        totalCardHeight = stripContainer.scrollHeight;

        stripContainer.style.animation = `scroll ${slowSpeed}s linear infinite`;
    }

    function startAnimation() {
        animationStarted = true;
        stripContainer.style.animationDuration = `${spinDuration}s`;
        stripContainer.style.animationTimingFunction = "linear";
        startTime = performance.now();
        animateScroll();
    }

    function animateScroll() {
        if (!animationStarted) return;

        const now = performance.now();
        const timeElapsed = (now - startTime) / 1000;

        const progress = Math.min(timeElapsed / spinDuration, 1);
        const currentSpeed = Math.max(1 - progress, 0);

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
        stopLoadingAnimation();

        const currentTranslateY = getComputedStyle(stripContainer).transform.match(/matrix.*\((.+)\)/);
        let translateY = currentTranslateY ? parseFloat(currentTranslateY[1].split(", ")[5]) : 0;

        const offset = Math.abs(translateY) % cardHeight;
        if (offset > 0) {
            translateY -= offset;
        }

        stripContainer.style.animation = "none";
        stripContainer.style.transform = `translateY(${translateY}px)`;

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

    modal.addEventListener("click", (event) => {
        event.stopPropagation();
    });
});
