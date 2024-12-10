'use strict';

const FETCH_URL = "https://univcert.com/api/v1/certifiedlist";
const CLEAR_ALL_URL = "https://univcert.com/api/v1/clear";
const CLEAR_USER_URL = "https://univcert.com/api/v1/clear";

function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}

function authCheck() {
    const authToken = getCookie("authToken");
    if (!authToken) {
        alert("로그인이 필요합니다.");
        window.location.href = "/admin";
        window.location.href = "/admin";
    }
}

document.addEventListener("DOMContentLoaded", () => {
    authCheck();

    const clearAllButton = document.getElementById("clearAllButton");
    const fetchUsersButton = document.getElementById("fetchUsersButton");
    const userListContainer = document.getElementById("user-list");

    fetchUsersButton.addEventListener("click", fetchCertifiedUsers);
    clearAllButton.addEventListener("click", clearAllUsers);

    async function fetchCertifiedUsers() {
        try {
            const response = await fetch('control/certifiedList', {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({}),
            });

            if (!response.ok) {
                throw new Error(`HTTP Error: ${response.status}`);
            }

            const data = await response.json();
            if (data.success) {
                displayCertifiedUsers(data.data);
            } else {
                alert("유저 리스트를 가져오는 데 실패했습니다.");
            }
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    }

    function displayCertifiedUsers(users) {
        userListContainer.innerHTML = "";

        if (!users.length) {
            userListContainer.innerHTML = "<p>현재 인증된 유저가 없습니다.</p>";
            return;
        }

        users.forEach((user) => {
            const userDiv = document.createElement("div");
            userDiv.className = "user-item";
            userDiv.innerHTML = `
                <div class="user-info">
                    <p><strong>이메일:</strong> ${user.email}</p>
                    <p><strong>학교명:</strong> ${user.univName}</p>
                    <p><strong>인증 날짜:</strong> ${user.certified_date}</p>
                    <p><strong>인증 횟수:</strong> ${user.count}</p>
                </div>
                <button class="delete-button" data-email="${user.email}">초기화</button>
            `;

            const deleteButton = userDiv.querySelector(".delete-button");
            deleteButton.addEventListener("click", () => clearUser(user.email));

            userListContainer.appendChild(userDiv);
        });
    }

    async function clearUser(email) {
        if (!confirm(`${email} 유저를 초기화하시겠습니까?`)) return;

        try {
            const response = await fetch('control/clear', {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                'email': email }),
            });

            const data = await response.json();
            if (data.success) {
                alert("유저가 성공적으로 초기화되었습니다.");
                fetchCertifiedUsers();
            } else {
                alert(`유저 초기화 실패: ${data.message}`);
            }
        } catch (error) {
            console.error("Error clearing user:", error);
        }
    }

    async function clearAllUsers() {
        if (!confirm("모든 유저를 초기화하시겠습니까?")) return;

        try {
            const response = await fetch('control/clear', {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({}),
            });

            const data = await response.json();
            if (data.success) {
                alert("모든 유저가 성공적으로 초기화되었습니다.");
                fetchCertifiedUsers();
            } else {
                alert(`전체 초기화 실패: ${data.message}`);
            }
        } catch (error) {
            console.error("Error clearing all users:", error);
        }
    }
});
