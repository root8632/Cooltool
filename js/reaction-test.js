document.addEventListener('DOMContentLoaded', () => {
    const reactionBox = document.getElementById('reaction-box');
    const resultEl = document.getElementById('reaction-result');

    let state = 'initial'; // initial, waiting, ready
    let timerStart;
    let timeoutId;

    function startTest() {
        if (state !== 'initial' && state !== 'clicked') return;

        reactionBox.textContent = '...준비...';
        reactionBox.classList.add('waiting');
        state = 'waiting';

        const randomDelay = Math.random() * 4000 + 1000; // 1-5 seconds

        timeoutId = setTimeout(() => {
            reactionBox.textContent = '클릭!';
            reactionBox.classList.remove('waiting');
            reactionBox.classList.add('ready');
            state = 'ready';
            timerStart = new Date().getTime();
        }, randomDelay);
    }

    function handleClick() {
        if (state === 'waiting') {
            clearTimeout(timeoutId);
            reactionBox.textContent = '너무 빨리 클릭했습니다! 다시 시도하세요.';
            reactionBox.classList.remove('waiting');
            state = 'initial';
        } else if (state === 'ready') {
            const timerEnd = new Date().getTime();
            const reactionTime = timerEnd - timerStart;
            resultEl.textContent = `${reactionTime}`;
            reactionBox.textContent = `당신의 반응속도는 ${reactionTime}ms 입니다. 다시 시작하려면 클릭하세요.`;
            reactionBox.classList.remove('ready');
            state = 'clicked';
        } else {
            // initial or clicked state
            resultEl.textContent = '0';
            startTest();
        }
    }

    reactionBox.addEventListener('click', handleClick);
});