document.addEventListener("DOMContentLoaded", () => {
    const clearAllButton = document.getElementById("clearAllButton")
    const fetchUsersButton = document.getElementById("fetchUsersButton");
    const fetchDataButton = document.getElementById("fetchDataButton");
    const listContainer = document.getElementById("list-container");

    clearAllButton.addEventListener("click", () => {
        if (clearAllTarget === "certifiedList") {
            clearCertifiedList();
        } else if (clearAllTarget === "cardList") {
            clearCardList();
        }
    });

    fetchUsersButton.addEventListener("click", () => {
        fetchCertifiedUsers();
        clearAllTarget = "certifiedList"; // 인증 유저 초기화 타겟 설정
    });

    fetchDataButton.addEventListener("click", () => {
        fetchDatabaseData();
        clearAllTarget = "cardList"; // 데이터베이스 초기화 타겟 설정
    });

    let clearAllTarget = " ";

    async function clearCertifiedList() {
        if (!confirm('인증 유저를 모두 초기화하시겠습니까?')) return;

        try {
            const response = await fetch('control/clearCertifiedList', {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({})
            });

            const data = await response.json();
            if (data.success) {
                alert("인증 유저가 성공적으로 초기화되었습니다.");
                fetchCertifiedUsers();
            } else {
                alert(`초기화 실패: ${data.message}`);
            }
        } catch (error) {
            console.error("Error clearing certified users:", error);
        }
    }

    async function clearCardList() {
        if (!confirm('모든 데이터를 초기화하시겠습니까?')) return;

        try {
            const response = await fetch('control/clearCardList', {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({})
            });

            const data = await response.json();
            if (data.success) {
                alert("모든 데이터가 성공적으로 초기화되었습니다.");
                fetchDatabaseData();
            } else {
                alert(`초기화 실패: ${data.message}`);
            }
        } catch (error) {
            console.error("Error clearing card data:", error);
        }
    }

    async function fetchCertifiedUsers() {
        try {
            const response = await fetch('control/certifiedList', {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({})
            });

            if (!response.ok) {
                throw new Error('HTTP Error: ${response.status}');
            }

            const data = await response.json();

            if (data.success) {
                displayList(data.data, "유저");
            } else {
                alert("유저 리스트를 가져오는 데 실패했습니다.");
            }
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    }

    async function fetchDatabaseData() {
        try {
            const response = await fetch('control/cardList', {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({})
            });

            if (!response.ok) {
                throw new Error(`HTTP Error: ${response.status}`);
            }

            const data = await response.json();

            if (data.success) {
                displayList(data.data, "데이터");
            } else {
                alert("데이터를 가져오는 데 실패했습니다.");
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }

    function displayList(items, type) {
    listContainer.innerHTML = ""; 

    if (!items.length) {
        listContainer.innerHTML = `<p>현재 ${type}가 없습니다.</p>`;
        return;
    }

    items.forEach(item => {
        const itemDiv = document.createElement("div");
        itemDiv.className = "list-item";
        itemDiv.innerHTML = type === "유저"
            ? `
                <p><strong>이메일:</strong> ${item.email}</p>
                <p><strong>학교명:</strong> ${item.univName}</p>
                <p><strong>인증시도횟수:</strong> ${item.count}</p>
                <p><strong>인증여부:</strong> ${item.certified}</p>
                <p><strong>인증 날짜:</strong> ${item.certified_date}</p>
                <button class="delete-button" data-email="${item.email}">초기화</button>
            `
            : `
                <p><strong>ID:</strong> ${item.id}</p>
                <p><strong>이름:</strong> ${item.name}</p>
                <p><strong>성별:</strong> ${item.gender}</p>
                <p><strong>학번:</strong> ${item.classNumber}</p>
                <p><strong>나이:</strong> ${item.age}</p>
                <p><strong>전공:</strong> ${item.major}</p>
                <p><strong>MBTI:</strong> ${item.mbti}</p>
                <p><strong>취미:</strong> ${item.hobby}</p>
                <p><strong>연락처:</strong> ${item.contact}</p>
                <p><strong>이미지:</strong> ${item.image}</p>
                <p><strong>색상:</strong> ${item.color}</p>
                <p><strong>생성 날짜:</strong> ${item.create_date}</p>
                <button class="delete-button" data-id="${item.id}">삭제</button>
            `;

        listContainer.appendChild(itemDiv);

        const deleteButton = itemDiv.querySelector(".delete-button");
        if (type === "유저") {
            deleteButton.addEventListener("click", () => clearUser(item.email));
        } else {
            deleteButton.addEventListener("click", () => deleteDatabaseData(item.id));
        }
    });
}

    async function clearUser(email) {
        if (!confirm('${email} 유저를 초기화하시겠습니까?')) return;

        try {
            const response = await fetch('control/clear', {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email })
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

    async function deleteDatabaseData(id) {
        if (!confirm(`${id} 데이터를 삭제하시겠습니까?`)) return;

        try {
            const response = await fetch('control/delete', {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id })
            });

            const data = await response.json();
            if (data.success) {
                alert("데이터가 성공적으로 삭제되었습니다.");
                fetchDatabaseData();
            } else {
                alert(`데이터 삭제 실패: ${data.message}`);
            }
        } catch (error) {
            console.error("Error deleting data:", error);
        }
    }
});
