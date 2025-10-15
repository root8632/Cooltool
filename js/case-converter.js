document.addEventListener('DOMContentLoaded', () => {
    const inputArea = document.getElementById('case-input');
    const outputArea = document.getElementById('case-output');

    const upperBtn = document.getElementById('upper-btn');
    const lowerBtn = document.getElementById('lower-btn');
    const sentenceBtn = document.getElementById('sentence-btn');
    const titleBtn = document.getElementById('title-btn');

    function updateOutput() {
        outputArea.value = inputArea.value;
    }

    upperBtn.addEventListener('click', () => {
        outputArea.value = inputArea.value.toUpperCase();
    });

    lowerBtn.addEventListener('click', () => {
        outputArea.value = inputArea.value.toLowerCase();
    });

    sentenceBtn.addEventListener('click', () => {
        const text = inputArea.value.toLowerCase();
        outputArea.value = text.replace(/(^\s*\w|[.!?]\s*\w)/g, (c) => c.toUpperCase());
    });

    titleBtn.addEventListener('click', () => {
        const text = inputArea.value.toLowerCase();
        outputArea.value = text.replace(/\b\w/g, (c) => c.toUpperCase());
    });

    inputArea.addEventListener('input', updateOutput);
});