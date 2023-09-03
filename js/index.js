window.onload = () => {
    "use strict";
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("./sw.js");
    }
  };

const cellElements = document.querySelectorAll("[data-cell]");

const board = document.querySelector("[data-board]")

const winningMessageTextElement = document.querySelector("[data-winning-message-text]");

const winningMessage = document.querySelector("[data-winning-massage]");
const reseta  = document.querySelector("[data-reseta]")

let isCicleTurn;

const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]

const starGame = (e) => {
    isCicleTurn = false;
    for (const cell of cellElements) {
    cell.classList.remove("circle");
    cell.classList.remove("x");
    cell.removeEventListener("click", handleClick);
    cell.addEventListener("click", handleClick, { once: true});
}
   

   setBoardHoverClass()
   winningMessage.classList.remove("show-winning-massage")
}

const checaEmpate = () => {
    return[... cellElements].every(cell => {
        return cell.classList.contains('x') || cell.classList.contains("circle");
    });
};

const terminojogo = (draw) => {
    if (draw) {
        winningMessageTextElement.innerText =  "Empate!"
    } else {
        winningMessageTextElement.innerText =  isCicleTurn ? "O ganhou!" : "x ganhou!"; 
    }
    winningMassage.classList.add("show-winning-message");
};


 const checkForWin = (currentPlayer) => {
    return winningCombinations.some((combination) => {
         return combination.every((index) => {
            return cellElements[index].classList.contains(currentPlayer);
         });
    });
 };

const placeMark = (cell, classToAdd) => {
    cell.classList.add(classToAdd);
};


const setBoardHoverClass = () => {
    board.classList.remove('circle');
    board.classList.remove('x');

    if (isCicleTurn) {
        board.classList.add('circle');
    } else{
        board.classList.add("x");
    }

}


const swapturns = () => {
    isCicleTurn = !isCicleTurn;

     setBoardHoverClass();
  
};

const handleClick = (e) => {
    //colocando a marca x o
    const cell = e.target;
    const classToAdd = isCicleTurn ? 'circle' : 'x';   

    placeMark(cell, classToAdd);

    const isWin = checkForWin(classToAdd);

    const isDraw = checaEmpate();

    if (isWin){
        terminojogo(false);
    }   else if ( isDraw ) {
            terminojogo(true)
    } else {
        swapturns();
    }
    
};

 starGame();    

 reseta.addEventListener("click", starGame);

