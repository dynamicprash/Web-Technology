let clickedValues = ["", "", "", "", "", "", "", "", "", ]
let winConditions = [
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8],
]

let cells = document.querySelectorAll('.cell');
let restart = document.querySelector('.restart');
let GameStatus = document.querySelector('.GameStatus');
running = false;

let player = 'X';
initializeGame();

function initializeGame(){
    running = true;
    
    cells.forEach(cell => cell.addEventListener('click', cellUpdate));
    
    restart.addEventListener('click', restartGame);
   
}


function cellUpdate(){
    if(!running){
        return;
    }
    const cellIndex = this.getAttribute('cellindex');
    
    if(clickedValues[cellIndex] == "" && running == true) {
        clickedValues[cellIndex]= player;
        console.log(clickedValues);
        this.innerText = player;    
        changePlayer();
        
        checkWin();
        statusUpdate();
    }
    else{
        return;
    }
   
    
}

function changePlayer(){
    if (player == 'X'){
        player = 'Y';
    }
    else{
        player = 'X';
    }
}
function restartGame(){
    player = "X";
    let clickedValues = ["", "", "", "", "", "", "", "", "", ]
    GameStatus.innerHTML = `${player}'s Trun`;
    cells.forEach(cell => cell.innerHTML = "");
    running = true;
}

function statusUpdate(){
    GameStatus.innerHTML = `${player}'s Trun`;
}

function checkWin(){
    let win = false;
    for(let i = 0; i < winConditions.length; i++){
        let win  = winConditions[i];
        let cellA = win[0];
        let cellB = win[1];
        let cellC = win[2];

        if(cellA == "" || cellB == "" || cellC == ""){
            continue;
        }

        if(cellA == cellB && cellB == cellC){
            win = true;
            break;
        }
    }

    if(win){
        GameStatus.innerHTML = `${player} Wins`;
        running = false;
    }

    else if(!clickedValues.includes("")){
        GameStatus.innerHTML = `Draw`;
        running = false;
    }

    return;
}