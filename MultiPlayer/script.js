let currentPlayer = 'X';
let board = ['', '', '', '', '', '', '', '', ''];

function cellClicked(index) {
    if (!board[index]) {
        document.getElementById(`cell-${index}`).innerText = currentPlayer;
        board[index] = currentPlayer;
        if (checkWinner()) {
            document.getElementById('status').innerText = `Player ${currentPlayer} wins!`;
            resetBoard();
            return;
        }
        if (checkDraw()) {
            document.getElementById('status').innerText = "It's a draw!";
            resetBoard();
            return;
        }
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
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
    document.getElementById('status').innerText = '';
}
