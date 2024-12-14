 //인증 상태 확인
 function checkAuth() {
     const authToken = getCookie('authToken');
     if (!authToken) {
         alert('로그인이 필요합니다.');
         window.location.href = '/login'; // 로그인 페이지로 리디렉션
     }
 }

'use strict';
//import { LOGIN_API } from '../config.js'
//const API_BASE_URL = 'https://univcert.com/api/v1';

/**
 * 공통 Fetch 함수
 * @param {string} endpoint - API 엔드포인트
 * @param {Object} body - 요청 데이터
 */
async function fetchAPI(endpoint, body = {}) {
    try {
        const response = await fetch(`/login/${endpoint}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        });

        if (!response.ok) {
            const errorDetails = await response.json();
            throw new Error(errorDetails.message || 'API 요청 실패');
        }

        return await response.json();
    } catch (error) {
        throw error;
    }
}

// 쿠키에서 특정 값 가져오기
function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
    return null;
}

// 학교 인증
document.querySelector('.univ__checkButton').addEventListener('click', async () => {
    const schoolName = document.querySelector('.univ__input').value.trim();
    if (!schoolName) {
        alert('학교명을 입력하세요.');
        return;
    }

    try {
        const result = await fetchAPI('check', { univName: schoolName });
        if (result.success) {
            alert('학교 확인 완료!');
        } else {
            alert('유효한 학교명이 아닙니다.');
        }
    } catch (error) {
        alert('학교 확인 중 오류가 발생했습니다.');
    }
});

// 이메일 인증 요청
document.querySelector('.email__checkButton').addEventListener('click', async () => {
    const email = document.querySelector('.email__input').value.trim();
    const schoolName = document.querySelector('.univ__input').value.trim();

    if (!schoolName || !email) {
        alert('학교명과 이메일을 모두 입력하세요.');
        return;
    }

    try {
        // 이미 인증된 사용자 확인
        const statusCheck = await fetchAPI('status', { email });
        if (statusCheck.success && statusCheck.certified_date) {
            alert('이미 인증된 이메일입니다. 서비스를 이용할 수 없습니다.');
            return; // 이미 인증된 경우 요청 중단
        }

        // 이메일 인증 요청
        const result = await fetchAPI('certify', { email, univName: schoolName, univ_check: true });

        if (result.success) {
            alert('이메일 전송 성공! 이메일에서 인증코드를 확인하세요.');
        } else {
            alert('이메일 전송에 실패했습니다.');
        }
    } catch (error) {
        alert(`오류: ${error.message || '이메일 인증 요청 중 문제가 발생했습니다.'}`);
    }
});

// 인증번호 제출
document.querySelector('.prove__checkButton').addEventListener('click', async () => {
    const code = document.querySelector('.prove__input').value.trim();
    const email = document.querySelector('.email__input').value.trim();
    const schoolName = document.querySelector('.univ__input').value.trim();

    if (!schoolName || !email || !code) {
        alert('학교명, 이메일, 인증번호를 모두 입력하세요.');
        return;
    }

    try {
        const result = await fetchAPI('certifycode', { email, univName: schoolName, code });
        if (result.success) {
            document.cookie = `authToken=${result.token}; path=/; secure; samesite=strict`;
            document.cookie = `email=${email}; path=/; secure; samesite=strict`;

            alert('인증 성공! 로그인이 완료되었습니다.');
            // 특정 아이콘 요소 선택
            const checkIcon = document.querySelector('.check-icon');
                if (checkIcon) {
                    checkIcon.style.color = "green";
                    }

            startSessionTimer(30); // 세션 타이머 30분 설정
            setTimeout(() => window.location.href = '/writing', 2000);
        } else {
            alert('잘못된 인증번호입니다.');
        }
    } catch (error) {
        alert('인증 처리 중 오류가 발생했습니다.');
    }
});

// 세션 타이머 시작
function startSessionTimer(timeoutMinutes) {
    setTimeout(() => {
        alert('세션이 만료되었습니다. 다시 로그인하세요.');
        document.cookie = 'authToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC; secure; samesite=strict';
        window.location.href = '/login';
    }, timeoutMinutes * 60 * 1000);
}