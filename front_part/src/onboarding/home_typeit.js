'use strict'

new TypeIt(".home__title", {
    speed: 50, // 타이핑 속도
    deleteSpeed: 25, // 지우는 속도
    breakLines: false, // 줄 바꿈 방지'
    loop: true
  })
  .type("One step closer to love,") // 첫 번째 문자열 입력
  .pause(1000) // 1초 대기
  .delete() // 텍스트 삭제
  .type(" Waiting and excitement") // 두 번째 문자열 입력
  .pause(1000) // 1초 대기
  .delete() // 텍스트 삭제
  .go(); // 애니메이션 시작

  