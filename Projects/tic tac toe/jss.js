let clickedValues = ["", "", "", "", "", "", "", "", ""];
let winConditions = [
    [0, 1, 2], [0, 3, 6], [0, 4, 8], [1, 4, 7], 
    [2, 5, 8], [2, 4, 6], [3, 4, 5], [6, 7, 8]  // Fixed win condition
];

let cells = document.querySelectorAll('.cell');
let restart = document.querySelector('.restart');
let GameStatus = document.querySelector('.GameStatus');

let player = 'X';
let running = false;

initializeGame();

function initializeGame() {
    running = true;
    
    cells.forEach(cell => {
        cell.innerText = "";  // Clear the board
        cell.removeEventListener('click', cellUpdate); // Remove old listeners
        cell.addEventListener('click', cellUpdate); // Re-enable clicks
    });

    clickedValues = ["", "", "", "", "", "", "", "", ""]; // Reset game values
    GameStatus.innerHTML = `${player}'s Turn`;
    
    restart.addEventListener('click', restartGame); // Make sure restart works
}

function cellUpdate() {
    if (!running) return;

    let cellIndex = Number(this.getAttribute('cellindex'));

    if (clickedValues[cellIndex] === "") {
        clickedValues[cellIndex] = player;
        this.innerText = player;    
        
        if (checkWin()) {
            GameStatus.innerHTML = `${player} Wins!`;
            running = false;
            return;
        }

        if (!clickedValues.includes("")) {
            GameStatus.innerHTML = `Draw!`;
            running = false;
            return;
        }

        changePlayer();
        statusUpdate();
    }
}

function changePlayer() {
    player = (player === 'X') ? 'O' : 'X';
}

function restartGame() {
    player = "X";
    clickedValues = ["", "", "", "", "", "", "", "", ""];  // Properly reset
    running = true;

    cells.forEach(cell => {
        cell.innerText = "";  // Clear cells
        cell.removeEventListener('click', cellUpdate); // Remove old listeners
        cell.addEventListener('click', cellUpdate); // Re-enable clicks
    });

    GameStatus.innerHTML = `${player}'s Turn`;
}

function statusUpdate() {
    GameStatus.innerHTML = `${player}'s Turn`;
}

function checkWin() {
    for (let condition of winConditions) {
        let [a, b, c] = condition;

        if (clickedValues[a] !== "" && clickedValues[a] === clickedValues[b] && clickedValues[a] === clickedValues[c]) {
            return true;  // A player has won
        }
    }
    return false;
}