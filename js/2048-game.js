document.addEventListener('DOMContentLoaded', () => {
    const gameBoard = document.getElementById('game-board');
    const scoreDisplay = document.getElementById('score');
    const resetButton = document.getElementById('reset-button');
    const gridSize = 4;
    let grid = [];
    let score = 0;

    // Initialize the game
    function init() {
        grid = Array.from({ length: gridSize }, () => Array(gridSize).fill(0));
        score = 0;
        updateScore();
        addNewTile();
        addNewTile();
        drawBoard();
    }

    // Draw the board based on the grid state
    function drawBoard() {
        gameBoard.innerHTML = '';
        for (let r = 0; r < gridSize; r++) {
            for (let c = 0; c < gridSize; c++) {
                const tile = document.createElement('div');
                tile.className = 'tile';
                const value = grid[r][c];
                if (value > 0) {
                    tile.textContent = value;
                    tile.dataset.value = value;
                }
                gameBoard.appendChild(tile);
            }
        }
    }

    // Add a new tile (2 or 4) to an empty spot
    function addNewTile() {
        const emptyTiles = [];
        for (let r = 0; r < gridSize; r++) {
            for (let c = 0; c < gridSize; c++) {
                if (grid[r][c] === 0) {
                    emptyTiles.push({ r, c });
                }
            }
        }
        if (emptyTiles.length > 0) {
            const { r, c } = emptyTiles[Math.floor(Math.random() * emptyTiles.length)];
            grid[r][c] = Math.random() > 0.1 ? 2 : 4;
        }
    }

    // Handle key presses
    function handleInput(e) {
        let moved = false;
        switch (e.key) {
            case 'ArrowUp':
                moved = moveUp();
                break;
            case 'ArrowDown':
                moved = moveDown();
                break;
            case 'ArrowLeft':
                moved = moveLeft();
                break;
            case 'ArrowRight':
                moved = moveRight();
                break;
        }
        if (moved) {
            addNewTile();
            drawBoard();
            if (isGameOver()) {
                alert('Game Over! 최종 점수: ' + score);
            }
        }
    }

    // --- Movement Logic ---
    function moveUp() {
        return slideTiles(true, false);
    }
    function moveDown() {
        return slideTiles(true, true);
    }
    function moveLeft() {
        return slideTiles(false, false);
    }
    function moveRight() {
        return slideTiles(false, true);
    }

    function slideTiles(isVertical, isReversed) {
        let moved = false;
        const outerLoopLimit = isVertical ? gridSize : gridSize;
        const innerLoopLimit = isVertical ? gridSize : gridSize;

        for (let i = 0; i < outerLoopLimit; i++) {
            const line = [];
            for (let j = 0; j < innerLoopLimit; j++) {
                line.push(isVertical ? grid[j][i] : grid[i][j]);
            }

            const { newLine, merged } = mergeLine(line, isReversed);
            if(merged) moved = true;

            for (let j = 0; j < innerLoopLimit; j++) {
                if (isVertical) {
                    if(grid[j][i] !== newLine[j]) moved = true;
                    grid[j][i] = newLine[j];
                } else {
                    if(grid[i][j] !== newLine[j]) moved = true;
                    grid[i][j] = newLine[j];
                }
            }
        }
        return moved;
    }

    function mergeLine(line, isReversed) {
        let filteredLine = line.filter(v => v > 0);
        if (isReversed) filteredLine.reverse();

        let merged = false;

        for (let i = 0; i < filteredLine.length - 1; i++) {
            if (filteredLine[i] === filteredLine[i + 1]) {
                filteredLine[i] *= 2;
                score += filteredLine[i];
                filteredLine.splice(i + 1, 1);
                merged = true;
            }
        }

        const newLine = Array(gridSize).fill(0);
        filteredLine.forEach((v, i) => newLine[i] = v);

        if (isReversed) newLine.reverse();

        updateScore();
        return { newLine, merged };
    }

    // --- Game State ---
    function updateScore() {
        scoreDisplay.textContent = score;
    }

    function isGameOver() {
        for (let r = 0; r < gridSize; r++) {
            for (let c = 0; c < gridSize; c++) {
                if (grid[r][c] === 0) return false; // Empty tile
                if (r < gridSize - 1 && grid[r][c] === grid[r + 1][c]) return false; // Can merge down
                if (c < gridSize - 1 && grid[r][c] === grid[r][c + 1]) return false; // Can merge right
            }
        }
        return true; // No moves left
    }

    // --- Event Listeners ---
    document.addEventListener('keydown', handleInput);
    resetButton.addEventListener('click', init);

    // --- Touch Controls ---
    let touchStartX = 0;
    let touchStartY = 0;
    let touchEndX = 0;
    let touchEndY = 0;

    gameBoard.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
        touchStartY = e.changedTouches[0].screenY;
    });

    gameBoard.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        touchEndY = e.changedTouches[0].screenY;
        handleSwipe();
    });

    function handleSwipe() {
        const dx = touchEndX - touchStartX;
        const dy = touchEndY - touchStartY;
        const absDx = Math.abs(dx);
        const absDy = Math.abs(dy);
        let moved = false;

        if (Math.max(absDx, absDy) > 20) { // Threshold
            if (absDx > absDy) {
                moved = dx > 0 ? moveRight() : moveLeft();
            } else {
                moved = dy > 0 ? moveDown() : moveUp();
            }

            if (moved) {
                addNewTile();
                drawBoard();
                if (isGameOver()) {
                    alert('Game Over! 최종 점수: ' + score);
                }
            }
        }
    }

    // Start the game
    init();
});