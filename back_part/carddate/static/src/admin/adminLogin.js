'use strict';

function setCookie(name, value, hours) {
    const expiration = new Date();
    expiration.setTime(expiration.getTime() + hours * 60 * 60 * 1000);
    document.cookie = `${name}=${value}; expires=${expiration.toUTCString()}; path=/`;
}

document.getElementById("loginButton").addEventListener("click", async function () {
    const password = document.getElementById("password").value;
    const errorMessage = document.getElementById("errorMessage");

    try {
        const response = await fetch("/admin/submit", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
            'password': password })
        });

        const data = await response.json();

        if (response.ok && data.success) {
            setCookie("authToken", "valid", 1);
            alert("로그인 성공");
            window.location.href = "/admin/control";
        } else {
            errorMessage.textContent = data.message || "비밀번호가 틀렸습니다. 다시 시도하세요.";
        }
    } catch (error) {
        console.error("Error during login:", error);
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
  