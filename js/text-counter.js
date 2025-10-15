document.addEventListener('DOMContentLoaded', () => {
    const textInput = document.getElementById('text-input');

    const charCountEl = document.getElementById('char-count');
    const wordCountEl = document.getElementById('word-count');
    const charNoSpaceCountEl = document.getElementById('char-no-space-count');
    const paraCountEl = document.getElementById('para-count');

    function updateCounts() {
        const text = textInput.value;

        // Character count
        charCountEl.textContent = text.length;

        // Character count (no spaces)
        charNoSpaceCountEl.textContent = text.replace(/\s/g, '').length;

        // Word count
        const words = text.trim().split(/\s+/).filter(word => word.length > 0);
        wordCountEl.textContent = words.length;

        // Paragraph count
        const paragraphs = text.split('\n').filter(p => p.trim().length > 0);
        paraCountEl.textContent = paragraphs.length;
    }

    textInput.addEventListener('input', updateCounts);
});