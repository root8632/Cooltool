document.addEventListener('DOMContentLoaded', () => {
    const textInput = document.getElementById('qr-text');
    const generateBtn = document.getElementById('generate-qr-btn');
    const qrContainer = document.getElementById('qr-code-container');

    let qrcode = null;

    function generateQRCode() {
        const text = textInput.value.trim();
        if (!text) {
            alert('텍스트를 입력하세요.');
            return;
        }

        // Clear previous QR code
        qrContainer.innerHTML = '';

        // Create new QR code
        qrcode = new QRCode(qrContainer, {
            text: text,
            width: 256,
            height: 256,
            colorDark : "#000000",
            colorLight : "#ffffff",
            correctLevel : QRCode.CorrectLevel.H
        });
    }

    generateBtn.addEventListener('click', generateQRCode);

    // Allow Enter key to generate
    textInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            generateQRCode();
        }
    });
});