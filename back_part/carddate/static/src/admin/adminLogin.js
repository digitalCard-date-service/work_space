'use strict';

document.getElementById("loginButton").addEventListener("click", async function () {
    const password = document.getElementById("password").value;
    const errorMessage = document.getElementById("errorMessage");

    try {
        const response = await fetch("/admin/submit", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ 'password': password })
        });

        const data = await response.json();

        if (response.ok && data.success) {
            alert("로그인 성공");
            localStorage.setItem('accessToken', data.accessToken); // 관리자 jwt토큰 부여
            document.cookie = `authToken=admin; path=/; secure; samesite=strict`;

            try {
                // 2. /admin/control 호출 (토큰 포함)
                const token = localStorage.getItem('accessToken');
                const controlResponse = await fetch("/admin/control", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    }
                });
                const pageContent = await controlResponse.text();
                document.open();
                document.write(pageContent);
                document.close();

                if (controlResponse.ok) {
                    alert("관리자 페이지에 접근 성공!");
                } else {
                    errorMessage.textContent = "인증에 실패했습니다.";
                }
            } catch (controlError) {
                console.error("관리자 페이지 호출 중 오류 발생:", controlError);
                errorMessage.textContent = "관리자 페이지에 접근할 수 없습니다.";
            }
            
        } else {
            errorMessage.textContent = data.message || "비밀번호가 틀렸습니다. 다시 시도하세요.";
        }
    } catch (error) {
        alert("야레야레 못말리는 개발자. 다시 시도하세요.");
    }
});

// 명세서 폼
// POST /submit
// Content-Type: application/json

// {
//   "password": "사용자가 입력한 비밀번호"
// }

// {
//     "success": true,
//     "message": "로그인 성공"
//   }
  
// {
//     "success": false,
//     "message": "비밀번호가 틀렸습니다."
//   }
  