'use strict';

let selectedCharacter = null;
let confirmedCard = null; // 확정된 카드 정보 저장
const modal = document.getElementById("modal");
const modalTitle = document.getElementById("modal-title");
const modalDescription = document.getElementById("modal-description");
const startChatButton = document.getElementById("start-chat-button");
const chatBox = document.getElementById("chat-box");
const messages = document.getElementById("messages");
const userInput = document.getElementById("user-input");
const sendButton = document.getElementById("send-button");
const personCard = document.querySelector(".character-card[data-character='']");
const characterSettings = {
    "방민정": `You are 방민정, a 20-year-old cheerful and bright individual with an ENFP personality. You like taking walks. In this online blind date, respond casually or politely based on the user's tone.`,
    "임가현": `You are 임가현, a 25-year-old calm and reserved individual with an INTJ personality. You enjoy watching OTT shows. Respond naturally, matching the user's tone.`,
    "공민혁": `You are 공민혁, a 22-year-old passionate and friendly individual with an ENFJ personality. You love playing soccer and admire Son Heung-min.`,
    "차현우": `You are 차현우, a 24-year-old confident and disciplined individual with an ESTJ personality. You love fitness and gym activities.`,
    "김하늘": `You are 김하늘, a 23-year-old sweet and reserved individual with an INFP personality. You enjoy reading books and intellectual conversations.`,
    "이지나": `You are 이지나, a 21-year-old bold and artistic individual with an ENTJ personality. You love painting and creative projects.`,
    "최성현": `You are 최성현, a 27-year-old intellectual and diligent individual with an ISTJ personality. You enjoy coding and problem-solving.`,
};

// sessionStorage에서 저장된 카드 데이터를 가져와 person 카드에 반영
document.addEventListener("DOMContentLoaded", () => {
    const storedCard = JSON.parse(sessionStorage.getItem("confirmedCard"));

    if (storedCard) {
        setConfirmedCard(storedCard);
    } else {
        alert("확정한 카드가 존재하지 않습니다. 랜덤뽑기로 이동합니다.");
        window.location.href = "/random";
    }
});

function setConfirmedCard(card) {
    confirmedCard = card; // 확정된 카드 저장

    // person 카드 업데이트
    personCard.querySelector("img").src = card.image;
    personCard.querySelector(".character-name").textContent = card.name;
    personCard.dataset.character = card.name;
    personCard.dataset.description = `${card.age}살, ${card.mbti} 성격. ${card.hobbies}을(를) 좋아합니다.`;

    // characterSettings에 추가
    characterSettings[card.name] = `You are ${card.name}, a ${card.age}-year-old individual with a ${card.mbti} personality. You enjoy ${card.hobbies}. Match the users tone and respond naturally, avoiding overly formal expressions. 너는 지금 처음 만난 상대와 대화해. 조금의 호기심을 가지고 대화해줘.`;
}

// 캐릭터 선택 이벤트
document.querySelectorAll(".character-card").forEach((card) => {
    card.addEventListener("click", () => {
        selectedCharacter = card.dataset.character;
        modalTitle.textContent = selectedCharacter;
        modalDescription.textContent = card.dataset.description;
        modal.style.display = "flex";
    });
});

// 모달에서 대화 시작
startChatButton.addEventListener("click", () => {
    if (!selectedCharacter) {
        alert("캐릭터를 선택해주세요!");
        return;
    }
    modal.style.display = "none";
    chatBox.style.display = "block";
    messages.innerHTML = `<div class="bot">안녕하세요, 저는 ${selectedCharacter}입니다.</div>`;
});

// 메시지 전송 이벤트
sendButton.addEventListener("click", async () => {
    const userMessage = userInput.value.trim();
    if (!userMessage) return;

    // 사용자 메시지 추가
    const userDiv = document.createElement("div");
    userDiv.className = "user";
    userDiv.textContent = userMessage;
    messages.appendChild(userDiv);

    userInput.value = "";

    // API 요청
    try {
        const response = await fetch("/chatbot/chat", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                'setting': characterSettings[selectedCharacter],
                'message': userMessage,
            }),
        });
        console.log(response.json());

        if (!response.ok) throw new Error("API 요청 실패");

        const data = await response.json();
        const botMessage = data.choices[0].message.content;

        // 봇 응답 추가
        const botDiv = document.createElement("div");
        botDiv.className = "bot";
        botDiv.textContent = botMessage;
        messages.appendChild(botDiv);

        messages.scrollTop = messages.scrollHeight;
    } catch (error) {
        alert("메시지를 전송하는 중 오류가 발생했습니다.");
    }
});

// Enter 키로 메시지 전송
userInput.addEventListener("keyup", (event) => {
    if (event.key === "Enter") {
        sendButton.click();
    }
});
