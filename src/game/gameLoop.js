import { Player } from "../classes/player.js";
import { createGameScreen } from "../components/createGameScreen.js";
import { endScreen } from "./end.js";

let isPlayerTurn = true;
let move;
let waitingTurn = false;
let gameOver = false;

export function gameLoop(playerGrid, player) {
    createGameScreen(playerGrid);
    move = document.getElementById("move");
    const computer = new Player("Computer");
    computer.randomShips();

    const enemyGrid = document.querySelectorAll("#enemy-grid .cell");
    enemyGrid.forEach((cell) => {
        cell.addEventListener("click", () => {
            clickListeners(cell, computer, player);
        });
    });
}

function clickListeners(cell, computer, player) {
    playerClick(cell, computer, player.name);
    enemyAttack(player);

    if (cell.classList.contains("attacked")) {
        const clone = cell.cloneNode(true);
        cell.replaceWith(clone);
    }
}

function playerClick(cell, computer, playerName) {
    if (isPlayerTurn !== true || gameOver) {
        return;
    }
    isPlayerTurn = !isPlayerTurn;

    const position = JSON.parse(cell.getAttribute("location"));
    const x = parseInt(position.x);
    const y = parseInt(position.y);

    const result = computer.gameboard.receiveAttack(position);
    modifyBoard(result, cell, playerName, "The enemy");
    isGameOver(computer, playerName);
}

function modifyBoard(result, cell, name, target) {
    switch (result) {
        case "sunk" : {
            move.textContent = `"${name} sunk the ${target} ship!`;
            cell.classList.add("attacked", "hit");
            cell.ariaLabel = "hit";
            break;
        }
        case "hit": {
            move.textContent = `"${name} hit the ${target} ship!`;
            cell.classList.add("attacked", "hit");
            cell.ariaLabel = "hit";
            break;
        }
        case "miss": {
            move.textContent = `"${name} missed ship!`;
            cell.classList.add("attacked", "hit");
            cell.ariaLabel = "hit";
            break;
        }
    }
}

function isGameOver(player, name) {
    const result = player.gameboard.checkSunk();

    if (!result) {
        return;
    }
    
    gameOver = true;

    const main = document.querySelector("main");
    const container = document.getElementById("game-screen");

    main.removeChild(container);

    endScreen(name);
}

function enemyAttack(player) {
    if (isPlayerTurn !== false || waitingTurn || gameOver) {
        return;
    }

    waitingTurn = true;
    setTimeout(() => {
        move.textContent = "Enemy's turn to attack!";
        setTimeout(() => {
            const result = player.randomAttack();
            
            const element = document.querySelector(`#player-grid [location=\'{"x": "${result.x}", "y": "${result.y}"}\']`);

            modifyBoard(result, element, "The enemy", "our");

            isPlayerTurn = !isPlayerTurn;
            waitingTurn = false;
            isGameOver(player, "Computer");
        }, 400);
    }, 2000);
}