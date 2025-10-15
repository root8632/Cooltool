document.addEventListener('DOMContentLoaded', () => {
    const noteArea = document.getElementById('note-area');
    const saveBtn = document.getElementById('save-note-btn');
    const downloadBtn = document.getElementById('download-note-btn');
    const clearBtn = document.getElementById('clear-note-btn');
    const statusMsg = document.getElementById('status-msg');

    const STORAGE_KEY = 'simpleNotepadContent';

    // Load saved note
    const savedNote = localStorage.getItem(STORAGE_KEY);
    if (savedNote) {
        noteArea.value = savedNote;
    }

    function showStatus(message) {
        statusMsg.textContent = message;
        setTimeout(() => {
            statusMsg.textContent = '';
        }, 2000);
    }

    saveBtn.addEventListener('click', () => {
        localStorage.setItem(STORAGE_KEY, noteArea.value);
        showStatus('메모가 저장되었습니다.');
    });

    downloadBtn.addEventListener('click', () => {
        const text = noteArea.value;
        const blob = new Blob([text], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'memo.txt';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    });

    clearBtn.addEventListener('click', () => {
        if (confirm('정말로 모든 메모를 삭제하시겠습니까?')) {
            noteArea.value = '';
            localStorage.removeItem(STORAGE_KEY);
            showStatus('메모가 초기화되었습니다.');
        }
    });
});