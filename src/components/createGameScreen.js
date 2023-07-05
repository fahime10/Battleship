import { createGrid } from "./grid.js";

export function createGameScreen(player) {
    const main = document.querySelector("main");

    const container = document.createElement("div");
    container.setAttribute("id", "game-screen");

    const moveContainer = document.createElement("div");
    moveContainer.setAttribute("id", "move-container");
    
    const move = document.createElement("p");
    move.setAttribute("id", "move");
    move.textContent = "Ready to fire, sir!";

    moveContainer.appendChild(move);

    const enemyGrid = createGrid("Enemy");
    enemyGrid.setAttribute("id", "enemy-grid");

    player.childNodes[0].textContent = "Our water";
    player.setAttribute("id", "player-grid");

    container.append(moveContainer, enemyGrid, player);
    main.appendChild(container);
}