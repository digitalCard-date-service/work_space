"use strict";

document.addEventListener("DOMContentLoaded", () => {
    // 제출 버튼
    const submitButton = document.getElementById("submitButton");

    // 제출 버튼 클릭 이벤트
    submitButton.addEventListener("click", async (e) => {
      e.preventDefault(); // 기본 동작 방지

      // 전송 여부 확인
      if (!confirm("정말로 전송하겠습니까?")) return;

      // JSON 데이터 객체
      const surveyData = {
        age: [], // 나이
        major: [], // 학과
        mbti: "", // MBTI
        hobbies: [] // 취미
      };

      // 나이 섹션 데이터 수집
      const ageSelected = document.querySelectorAll(".survey_section-container:nth-child(1) div.selected");
      ageSelected.forEach((item) => {
        surveyData.age.push(item.dataset.label);
      });

      // 학과 섹션 데이터 수집
      const majorSelected = document.querySelectorAll(".survey_section-container:nth-child(2) div.selected");
      majorSelected.forEach((item) => {
        switch (item.dataset.label) {
          case "libbie": // 문과
            surveyData.major.push(
              "행정학과", "영어영문학과", "문예창작학과", "경영학전공", "글로벌테크노경영전공",
              "글로벌한국어문화학부(한국어교육전공)", "글로벌한국어문화학부(K-컬처앤테크전공)",
              "글로벌기초교육학부", "영어과", "벤처경영학과"
            );
            break;
          case "engie": // 공대
            surveyData.major.push(
              "기계시스템디자인공학과", "기계자동차공학과", "안전공학과", "신소재공학과", "건설시스템공학과",
              "건축학부(건축공학전공)", "건축학부(건축학전공)", "건축기계설비공학과", "전기정보공학과", "전자공학과",
              "컴퓨터공학과", "스마트ICT융합공학과", "화공생명공학과", "환경공학과", "식품생명공학과",
              "정밀화학과", "안경광학과", "산업정보시스템전공", "ITM전공", "MSDE학과",
              "인공지능응용학과", "지능형반도체공학과", "미래에너지융합학과", "융합기계공학과",
              "건설환경융합공학과", "정보통신융합공학과"
            );
            break;
          case "art": // 미대
            surveyData.major.push(
              "디자인학과(산업디자인전공)", "디자인학과(시각디자인전공)", "도예학과", "금속공예디자인학과",
              "조형예술학과", "문화예술학과"
            );
            break;
          case "physic": // 체대
            surveyData.major.push("스포츠과학과", "헬스피트니스학과");
            break;
          case "music": // 음대
            surveyData.major.push(null); // 음대는 null
            break;
          default:
            break;
        }
      });

      // MBTI 섹션 데이터 수집
      const mbtiSelected = document.querySelectorAll(".survey_section-container.mbti div.selected");
      if (mbtiSelected.length === 4) {
        surveyData.mbti = Array.from(mbtiSelected)
          .map((item) => item.dataset.label)
          .join(""); // 데이터 라벨 값을 조합하여 스트링으로 변환
      }

      // 취미 데이터 수집
      const hobbyInput = document.getElementById("hobby_input").value.trim();
      if (hobbyInput) {
        surveyData.hobbies = hobbyInput.split(",").map((hobby) => hobby.trim()); // ,로 구분하여 배열로 변환
      }

      // JSON 데이터 출력 (디버깅용)
//      console.log("보낼 데이터:", JSON.stringify(surveyData));

      // 서버로 데이터 전송
      try {
        const response = await fetch("/survey/submit", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(surveyData),
        });
        if (response.ok) {
          alert("전송 완료");
          setTimeout(() => {
            window.location.href = "/drawing";
          }, 500);
        } else {
          throw new Error("서버 응답 오류");
        }
      } catch (error) {
        alert("서버 전송 실패!");
      }
    });
  });
  