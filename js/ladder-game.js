document.addEventListener('DOMContentLoaded', () => {
    const playerInputsContainer = document.getElementById('player-inputs');
    const resultInputsContainer = document.getElementById('result-inputs');
    const addPlayerBtn = document.getElementById('add-player');
    const startGameBtn = document.getElementById('start-game');
    const canvas = document.getElementById('ladder-canvas');
    const ctx = canvas.getContext('2d');
    const resultsDiv = document.getElementById('game-results');

    let playerCount = 2;

    // Add a new player input field
    addPlayerBtn.addEventListener('click', () => {
        if (playerCount < 8) {
            playerCount++;
            const newPlayerInput = document.createElement('input');
            newPlayerInput.type = 'text';
            newPlayerInput.placeholder = `이름${playerCount}`;
            playerInputsContainer.appendChild(newPlayerInput);

            const newResultInput = document.createElement('input');
            newResultInput.type = 'text';
            newResultInput.placeholder = `결과${playerCount}`;
            resultInputsContainer.appendChild(newResultInput);
        } else {
            alert('최대 8명까지 참가할 수 있습니다.');
        }
    });

    // Start the game
    startGameBtn.addEventListener('click', () => {
        const players = Array.from(playerInputsContainer.querySelectorAll('input')).map(input => input.value.trim()).filter(Boolean);
        const results = Array.from(resultInputsContainer.querySelectorAll('input')).map(input => input.value.trim()).filter(Boolean);

        if (players.length < 2 || players.length !== results.length) {
            alert('참가자 이름과 결과를 모두 올바르게 입력해주세요 (최소 2명).');
            return;
        }

        setupAndDrawLadder(players, results);
    });

    function setupAndDrawLadder(players, results) {
        const numPlayers = players.length;
        canvas.width = numPlayers * 100;
        canvas.height = 400;
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        const ladder = buildLadderStructure(numPlayers, canvas.height, 10);
        drawLadder(ladder, players, results);

        // After drawing, add click event to canvas to trace paths
        canvas.onclick = (event) => {
            const rect = canvas.getBoundingClientRect();
            const x = event.clientX - rect.left;
            const startLane = Math.floor(x / 100);

            if (startLane >= 0 && startLane < numPlayers) {
                // Redraw to clear previous traces before tracing a new one
                drawLadder(ladder, players, results);
                tracePath(ladder, startLane);
            }
        };
    }

    function buildLadderStructure(numPlayers, height, numRungs) {
        const ladder = {
            lanes: numPlayers,
            rungs: []
        };
        const laneWidth = 100;
        const availableYs = Array.from({ length: height - 40 }, (_, i) => i + 20);

        for (let i = 0; i < numRungs; i++) {
            const lane1 = Math.floor(Math.random() * (numPlayers - 1));
            const lane2 = lane1 + 1;

            const yIndex = Math.floor(Math.random() * availableYs.length);
            const y = availableYs[yIndex];

            // Prevent rungs from being too close
            availableYs.splice(Math.max(0, yIndex - 20), 40);

            ladder.rungs.push({ from: lane1, to: lane2, y: y });
        }
        // Sort rungs by y-coordinate to make tracing easier
        ladder.rungs.sort((a, b) => a.y - b.y);
        return ladder;
    }

    function drawLadder(ladder, players, results) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        const laneWidth = 100;
        const numPlayers = ladder.lanes;

        ctx.strokeStyle = '#333';
        ctx.lineWidth = 2;
        ctx.font = '14px Noto Sans KR';
        ctx.textAlign = 'center';

        // Draw vertical lanes and names/results
        for (let i = 0; i < numPlayers; i++) {
            const x = i * laneWidth + laneWidth / 2;
            ctx.beginPath();
            ctx.moveTo(x, 20);
            ctx.lineTo(x, canvas.height - 20);
            ctx.stroke();
            ctx.fillText(players[i], x, 15);
            ctx.fillText(results[i], x, canvas.height - 5);
        }

        // Draw horizontal rungs
        ladder.rungs.forEach(rung => {
            const x1 = rung.from * laneWidth + laneWidth / 2;
            const x2 = rung.to * laneWidth + laneWidth / 2;
            ctx.beginPath();
            ctx.moveTo(x1, rung.y);
            ctx.lineTo(x2, rung.y);
            ctx.stroke();
        });
    }

    function tracePath(ladder, startLane) {
        const laneWidth = 100;
        let currentLane = startLane;
        let y = 20;

        ctx.strokeStyle = `hsl(${startLane * 45}, 100%, 50%)`;
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(currentLane * laneWidth + laneWidth / 2, y);

        ladder.rungs.forEach(rung => {
            if (y < rung.y) {
                 // Move down to the rung
                ctx.lineTo(currentLane * laneWidth + laneWidth / 2, rung.y);
                y = rung.y;

                if (rung.from === currentLane) {
                    // Move across the rung to the right
                    ctx.lineTo(rung.to * laneWidth + laneWidth / 2, y);
                    currentLane = rung.to;
                } else if (rung.to === currentLane) {
                    // Move across the rung to the left
                    ctx.lineTo(rung.from * laneWidth + laneWidth / 2, y);
                    currentLane = rung.from;
                }
            }
        });

        // Move down to the bottom
        ctx.lineTo(currentLane * laneWidth + laneWidth / 2, canvas.height - 20);
        ctx.stroke();

        // Display the result
        const players = Array.from(playerInputsContainer.querySelectorAll('input')).map(input => input.value.trim());
        const results = Array.from(resultInputsContainer.querySelectorAll('input')).map(input => input.value.trim());
        resultsDiv.textContent = `${players[startLane]} ➝ ${results[currentLane]}`;
    }
});