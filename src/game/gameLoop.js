import { Player } from "../classes/player.js";
import { createGameScreen } from "../components/createGameScreen.js";
import { endScreen } from "./end.js";

let isPlayerTurn = true;
let move;
let waitingTurn = false;
let gameOver = false;

export function gameLoop(playerGrid, player) {
    isPlayerTurn = true;
    waitingTurn = false;
    gameOver = false;
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
    playerClick(cell, computer, player);
    enemyAttack(computer, player);

    if (cell.classList.contains("attack")) {
        const clone = cell.cloneNode(true);
        cell.replaceWith(clone);
    }
}

function playerClick(cell, computer, player) {
    if (isPlayerTurn !== true || gameOver) {
        return;
    }
    isPlayerTurn = !isPlayerTurn;

    const position = JSON.parse(cell.getAttribute("location"));
    const x = parseInt(position.x);
    const y = parseInt(position.y);

    const result = computer.gameboard.receiveAttack({ x: x, y: y });
    modifyBoard(result, cell, player, computer);
    isGameOver(computer, player.name);
}

function modifyBoard(result, cell, player, target) {
    switch (result) {
        case "sunk" : {
            move.textContent = `${player.name} sunk ${target.name}'s ship!`;
            cell.classList.add("attack", "hit");
            cell.ariaLabel = "hit";
            player.sinkShip();
            break;
        }
        case "hit": {
            move.textContent = `${player.name} hit ${target.name}'s ship!`;
            cell.classList.add("attack", "hit");
            cell.ariaLabel = "hit";
            break;
        }
        case "miss": {
            move.textContent = `${player.name}'s missile missed!`;
            cell.classList.add("attack", "miss");
            cell.ariaLabel = "miss";
            break;
        }
    }
}

function isGameOver(player, name) {
    if (player.noShips === 0) {
        gameOver = true;

        const main = document.querySelector("main");
        const container = document.getElementById("game-screen");

        main.removeChild(container);

        endScreen(name);
    }
}

function enemyAttack(computer, player) {
    if (isPlayerTurn !== false || waitingTurn || gameOver) {
        return;
    }

    waitingTurn = true;

    setTimeout(() => {
        move.textContent = "Enemy's turn to attack!";
        setTimeout(() => {
            const result = player.randomAttack();
            
            const placeHit = player.recordMove();

            const element = document.querySelector(`#player-grid [location=\'{"x": "${placeHit.x}", "y": "${placeHit.y}"}\']`);

            modifyBoard(result, element, computer, player);

            isPlayerTurn = !isPlayerTurn;
            waitingTurn = false;

            isGameOver(player, computer.name);
        }, 9);
    }, 2);

    if (waitingTurn != true) {
        document.querySelector("#move").textContent = "Ready to fire, sir!";
    }
}