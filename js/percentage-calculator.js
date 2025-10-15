document.addEventListener('DOMContentLoaded', () => {
    const calculatePercentageBtn = document.getElementById('calculate-percentage-btn');
    const calculateValueBtn = document.getElementById('calculate-value-btn');

    calculatePercentageBtn.addEventListener('click', () => {
        const total = parseFloat(document.getElementById('percentage_a').value);
        const part = parseFloat(document.getElementById('percentage_b').value);
        const resultEl = document.getElementById('percentage-result');

        if (isNaN(total) || isNaN(part) || total === 0) {
            resultEl.textContent = '유효한 숫자를 입력하세요.';
            return;
        }

        const percentage = (part / total) * 100;
        resultEl.textContent = `${percentage.toFixed(2)} %`;
    });

    calculateValueBtn.addEventListener('click', () => {
        const total = parseFloat(document.getElementById('value_a').value);
        const percentage = parseFloat(document.getElementById('value_b').value);
        const resultEl = document.getElementById('value-result');

        if (isNaN(total) || isNaN(percentage)) {
            resultEl.textContent = '유효한 숫자를 입력하세요.';
            return;
        }

        const value = total * (percentage / 100);
        resultEl.textContent = `${value.toFixed(2)}`;
    });
});