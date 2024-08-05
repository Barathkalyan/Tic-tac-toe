const board = document.getElementById('board');
const cells = Array.from(document.getElementsByClassName('cell'));
const resetButton = document.querySelector('.reset-button');
let currentPlayer = 'X';
let gameActive = true;
let gameState = ["", "", "", "", "", "", "", "", ""];
let winningCells = [];

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

const handleCellPlayed = (clickedCell, clickedCellIndex) => {
    gameState[clickedCellIndex] = currentPlayer;
    clickedCell.innerHTML = currentPlayer;
};

const handlePlayerChange = () => {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
};

const handleResultValidation = () => {
    let roundWon = false;
    for (let i = 0; i < winningConditions.length; i++) {
        const winCondition = winningConditions[i];
        let a = gameState[winCondition[0]];
        let b = gameState[winCondition[1]];
        let c = gameState[winCondition[2]];
        if (a === '' || b === '' || c === '') {
            continue;
        }
        if (a === b && b === c) {
            roundWon = true;
            winningCells = winCondition;
            break;
        }
    }

    if (roundWon) {
        gameActive = false;
        winningCells.forEach(index => {
            cells[index].classList.add('winning');
        });
        setTimeout(() => {
            alert(`Player ${currentPlayer} wins!`);
        }, 100);
        return;
    }

    let roundDraw = !gameState.includes("");
    if (roundDraw) {
        gameActive = false;
        setTimeout(() => {
            alert("It's a draw!");
        }, 100);
        return;
    }

    handlePlayerChange();
};

const handleCellClick = (event) => {
    const clickedCell = event.target;
    const clickedCellIndex = parseInt(clickedCell.getAttribute('data-index'));

    if (gameState[clickedCellIndex] !== "" || !gameActive) {
        return;
    }

    handleCellPlayed(clickedCell, clickedCellIndex);
    handleResultValidation();
};

const resetGame = () => {
    gameActive = true;
    currentPlayer = 'X';
    gameState = ["", "", "", "", "", "", "", "", ""];
    winningCells = [];
    cells.forEach(cell => {
        cell.innerHTML = "";
        cell.classList.remove('winning');
    });
};

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
resetButton.addEventListener('click', resetGame);
