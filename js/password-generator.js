document.addEventListener('DOMContentLoaded', () => {
    const lengthInput = document.getElementById('length');
    const upperCheck = document.getElementById('include-uppercase');
    const lowerCheck = document.getElementById('include-lowercase');
    const numbersCheck = document.getElementById('include-numbers');
    const symbolsCheck = document.getElementById('include-symbols');
    const generateBtn = document.getElementById('generate-pw-btn');
    const resultInput = document.getElementById('password-result');
    const copyBtn = document.getElementById('copy-pw-btn');

    const charSets = {
        uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
        lowercase: 'abcdefghijklmnopqrstuvwxyz',
        numbers: '0123456789',
        symbols: '!@#$%^&*()_+-=[]{}|;:,.<>?'
    };

    function generatePassword() {
        const length = +lengthInput.value;
        let charset = '';
        let password = '';

        if (upperCheck.checked) charset += charSets.uppercase;
        if (lowerCheck.checked) charset += charSets.lowercase;
        if (numbersCheck.checked) charset += charSets.numbers;
        if (symbolsCheck.checked) charset += charSets.symbols;

        if (charset === '') {
            resultInput.value = '적어도 하나 이상의 문자 종류를 선택하세요.';
            return;
        }

        // Ensure at least one character from each selected set
        if (upperCheck.checked) password += getRandomChar(charSets.uppercase);
        if (lowerCheck.checked) password += getRandomChar(charSets.lowercase);
        if (numbersCheck.checked) password += getRandomChar(charSets.numbers);
        if (symbolsCheck.checked) password += getRandomChar(charSets.symbols);

        for (let i = password.length; i < length; i++) {
            password += getRandomChar(charset);
        }

        // Shuffle the password to mix the guaranteed characters
        resultInput.value = shuffleString(password);
    }

    function getRandomChar(str) {
        return str[Math.floor(Math.random() * str.length)];
    }

    function shuffleString(str) {
        const arr = str.split('');
        for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]]; // Swap
        }
        return arr.join('');
    }

    function copyPassword() {
        const password = resultInput.value;
        if (password && !password.includes(' ')) {
            navigator.clipboard.writeText(password).then(() => {
                alert('비밀번호가 클립보드에 복사되었습니다.');
            }, () => {
                alert('복사에 실패했습니다.');
            });
        }
    }

    generateBtn.addEventListener('click', generatePassword);
    copyBtn.addEventListener('click', copyPassword);

    // Generate a password on load
    generatePassword();
});