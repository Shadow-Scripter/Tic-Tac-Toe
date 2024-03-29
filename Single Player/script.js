let currentPlayer = 'X';
let board = ['', '', '', '', '', '', '', '', ''];

function cellClicked(index) {
    if (!board[index]) {
        document.getElementById(`cell-${index}`).innerText = currentPlayer;
        board[index] = currentPlayer;
        if (checkWinner()) {
            if (currentPlayer === 'X') {
                displayMessage("You win!", "green", "win");
            } else {
                displayMessage("You lose!", "red" , "lose");
            }
            resetBoard();
            return;
        }
        if (checkDraw()) {
            displayMessage("It's a draw!", "grey",  "draw");
            resetBoard();
            return;
        }
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        if (currentPlayer === 'O') {
            setTimeout(makeComputerMove, 500); // Simulate computer's move after a delay
        }
    }
}

function makeComputerMove() {
    // Simple AI: Select the best move for the computer
    let bestScore = -Infinity;
    let move;
    for (let i = 0; i < board.length; i++) {
        if (!board[i]) {
            board[i] = 'O';
            let score = minimax(board, 0, false);
            board[i] = '';
            if (score > bestScore) {
                bestScore = score;
                move = i;
            }
        }
    }
    board[move] = 'O';
    document.getElementById(`cell-${move}`).innerText = 'O';
    if (checkWinner()) {
        displayMessage("You lose!", "red");
        resetBoard();
        return;
    }
    if (checkDraw()) {
        displayMessage("It's a draw!", "grey");
        resetBoard();
        return;
    }
    currentPlayer = 'X';
}

function minimax(board, depth, isMaximizing) {
    if (checkWinner()) {
        return isMaximizing ? -10 : 10;
    }
    if (checkDraw()) {
        return 0;
    }
    if (isMaximizing) {
        let bestScore = -Infinity;
        for (let i = 0; i < board.length; i++) {
            if (!board[i]) {
                board[i] = 'O';
                let score = minimax(board, depth + 1, false);
                board[i] = '';
                bestScore = Math.max(score, bestScore);
            }
        }
        return bestScore;
    } else {
        let bestScore = Infinity;
        for (let i = 0; i < board.length; i++) {
            if (!board[i]) {
                board[i] = 'X';
                let score = minimax(board, depth + 1, true);
                board[i] = '';
                bestScore = Math.min(score, bestScore);
            }
        }
        return bestScore;
    }
}

function checkWinner() {
    const winningConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
    return winningConditions.some((condition) => {
        const [a, b, c] = condition;
        return board[a] && board[a] === board[b] && board[a] === board[c];
    });
}

function checkDraw() {
    return board.every(cell => cell);
}

function resetBoard() {
    currentPlayer = 'X';
    board = ['', '', '', '', '', '', '', '', ''];
    document.querySelectorAll('.cell').forEach(cell => cell.innerText = '');
}

function displayMessage(message, color, className) {
    let msgElement = document.createElement('div');
    msgElement.textContent = message;
    msgElement.style.color = color;
    msgElement.classList.add(className); // Add the specified class name
    document.body.appendChild(msgElement);
    setTimeout(() => {
        msgElement.remove();
    }, 2000)}; // Display the message for 2 seconds
