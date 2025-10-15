const quotes = [
    "성공의 비결은 목적을 향해 끊임없이 나아가는 것이다.",
    "가장 큰 위험은 위험 없는 삶을 사는 것이다.",
    "오늘 당신이 읽는 책이 미래의 당신을 만든다.",
    "행동은 모든 성공의 기초가 되는 열쇠이다.",
    "변화는 우리가 거부할 수 없는 법칙이다."
];

const quoteDisplay = document.getElementById('quote-display');
const quoteInput = document.getElementById('quote-input');
const resetBtn = document.getElementById('reset-btn');
const accuracyEl = document.getElementById('accuracy');
const wpmEl = document.getElementById('wpm');

let currentQuote = '';
let startTime;
let intervalId;

function getRandomQuote() {
    return quotes[Math.floor(Math.random() * quotes.length)];
}

function startTest() {
    if (!startTime) {
        startTime = new Date();
        intervalId = setInterval(updateResults, 1000);
    }
}

function endTest() {
    clearInterval(intervalId);
    intervalId = null;
    updateResults(); // Final update
}

function updateResults() {
    const typedText = quoteInput.value;
    const elapsedTime = (new Date() - startTime) / 1000; // in seconds

    if (!typedText || !startTime) {
        accuracyEl.innerText = '0';
        wpmEl.innerText = '0';
        return;
    }

    // Calculate Accuracy
    let correctChars = 0;
    const quoteChars = currentQuote.split('');
    const typedChars = typedText.split('');

    quoteChars.forEach((char, index) => {
        if (typedChars[index] === char) {
            correctChars++;
        }
    });
    const accuracy = (correctChars / currentQuote.length) * 100;
    accuracyEl.innerText = Math.round(accuracy);

    // Calculate WPM (Words Per Minute) based on correct characters
    const correctTypedWords = correctChars / 5; // 1 word = 5 characters
    const wpm = (correctTypedWords / elapsedTime) * 60;
    wpmEl.innerText = Math.round(wpm > 0 ? wpm : 0);
}

function resetTest() {
    currentQuote = getRandomQuote();
    quoteDisplay.innerText = currentQuote;
    quoteInput.value = '';
    quoteInput.focus();
    startTime = null;
    clearInterval(intervalId);
    intervalId = null;
    updateResults();
}

quoteInput.addEventListener('input', () => {
    startTest();
    // Highlight characters
    const quoteChars = currentQuote.split('');
    const typedChars = quoteInput.value.split('');

    const highlightedText = quoteChars.map((char, index) => {
        if (index < typedChars.length) {
            return `<span style="color: ${char === typedChars[index] ? 'green' : 'red'};">${char}</span>`;
        }
        return `<span>${char}</span>`;
    }).join('');
    quoteDisplay.innerHTML = highlightedText;

    if (typedChars.length >= quoteChars.length) {
        endTest();
    }
});

resetBtn.addEventListener('click', resetTest);

// Initial load
resetTest();