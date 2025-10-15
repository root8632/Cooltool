document.addEventListener('DOMContentLoaded', () => {
    const heightInput = document.getElementById('height');
    const weightInput = document.getElementById('weight');
    const calculateBtn = document.getElementById('calculate-bmi-btn');
    const bmiValueEl = document.getElementById('bmi-value');
    const bmiStatusEl = document.getElementById('bmi-status');

    function calculateBMI() {
        const height = parseFloat(heightInput.value);
        const weight = parseFloat(weightInput.value);

        if (isNaN(height) || isNaN(weight) || height <= 0 || weight <= 0) {
            bmiValueEl.textContent = '-';
            bmiStatusEl.textContent = '유효한 키와 몸무게를 입력하세요.';
            return;
        }

        const heightInMeters = height / 100;
        const bmi = weight / (heightInMeters * heightInMeters);

        bmiValueEl.textContent = bmi.toFixed(2);
        bmiStatusEl.textContent = getBMIStatus(bmi);
    }

    function getBMIStatus(bmi) {
        if (bmi < 18.5) {
            return '저체중';
        } else if (bmi < 23) {
            return '정상';
        } else if (bmi < 25) {
            return '과체중';
        } else if (bmi < 30) {
            return '비만';
        } else {
            return '고도비만';
        }
    }

    calculateBtn.addEventListener('click', calculateBMI);
});