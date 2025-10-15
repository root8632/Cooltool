document.addEventListener('DOMContentLoaded', () => {
    const scoreEl = document.getElementById('score');
    const timeEl = document.getElementById('time');
    const startBtn = document.getElementById('start-aim-btn');
    const gameArea = document.getElementById('game-area');
    const target = document.getElementById('target');

    let score = 0;
    let time = 30;
    let timerId = null;
    let isGameRunning = false;

    function startGame() {
        if (isGameRunning) return;

        isGameRunning = true;
        score = 0;
        time = 30;
        scoreEl.textContent = score;
        timeEl.textContent = time;
        startBtn.disabled = true;
        target.style.display = 'block';
        moveTarget();

        timerId = setInterval(() => {
            time--;
            timeEl.textContent = time;
            if (time === 0) {
                endGame();
            }
        }, 1000);
    }

    function endGame() {
        clearInterval(timerId);
        isGameRunning = false;
        target.style.display = 'none';
        startBtn.disabled = false;
        alert(`게임 종료! 최종 점수: ${score}`);
    }

    function moveTarget() {
        if (!isGameRunning) return;

        const gameAreaRect = gameArea.getBoundingClientRect();
        const targetSize = target.offsetWidth;
        const maxX = gameAreaRect.width - targetSize;
        const maxY = gameAreaRect.height - targetSize;

        const randomX = Math.floor(Math.random() * maxX);
        const randomY = Math.floor(Math.random() * maxY);

        target.style.left = `${randomX}px`;
        target.style.top = `${randomY}px`;
    }

    function hitTarget() {
        if (!isGameRunning) return;
        score++;
        scoreEl.textContent = score;
        moveTarget();
    }

    startBtn.addEventListener('click', startGame);
    target.addEventListener('click', hitTarget);
});