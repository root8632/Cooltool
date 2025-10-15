document.addEventListener('DOMContentLoaded', () => {
    const minValInput = document.getElementById('min-val');
    const maxValInput = document.getElementById('max-val');
    const generateBtn = document.getElementById('generate-btn');
    const resultEl = document.getElementById('random-result');

    function generateRandomNumber() {
        const min = parseInt(minValInput.value);
        const max = parseInt(maxValInput.value);

        if (isNaN(min) || isNaN(max)) {
            resultEl.textContent = '유효한 숫자를 입력하세요.';
            return;
        }

        if (min > max) {
            resultEl.textContent = '최소값은 최대값보다 클 수 없습니다.';
            return;
        }

        const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
        resultEl.textContent = randomNumber;
    }

    generateBtn.addEventListener('click', generateRandomNumber);

    // Generate a number on initial load
    generateRandomNumber();
});