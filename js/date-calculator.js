document.addEventListener('DOMContentLoaded', () => {
    // Set default dates
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('start-date').value = today;
    document.getElementById('end-date').value = today;
    document.getElementById('base-date').value = today;

    // Difference Calculation
    const calculateDiffBtn = document.getElementById('calculate-diff-btn');
    calculateDiffBtn.addEventListener('click', () => {
        const startDate = new Date(document.getElementById('start-date').value);
        const endDate = new Date(document.getElementById('end-date').value);
        const resultEl = document.getElementById('diff-result');

        if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
            resultEl.textContent = '유효한 날짜를 선택하세요.';
            return;
        }

        const diffTime = Math.abs(endDate - startDate);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        resultEl.textContent = `${diffDays} 일 차이`;
    });

    // Date Calculation
    const calculateDateBtn = document.getElementById('calculate-date-btn');
    calculateDateBtn.addEventListener('click', () => {
        const baseDate = new Date(document.getElementById('base-date').value);
        const days = parseInt(document.getElementById('days-to-calc').value);
        const operation = document.getElementById('add-sub').value;
        const resultEl = document.getElementById('calc-result');

        if (isNaN(baseDate.getTime()) || isNaN(days)) {
            resultEl.textContent = '유효한 날짜와 일 수를 입력하세요.';
            return;
        }

        const newDate = new Date(baseDate.getTime());
        if (operation === 'add') {
            newDate.setDate(newDate.getDate() + days);
        } else {
            newDate.setDate(newDate.getDate() - days);
        }

        resultEl.textContent = newDate.toISOString().split('T')[0];
    });
});