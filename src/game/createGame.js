import { createGrid } from "../components/grid.js";
import { placingShip } from "../components/placingShip.js";

export function createGame(ship) {
    document.querySelector("main").innerHTML = "";

    const gameContainer = document.createElement("div");
    gameContainer.setAttribute("id", "setup-container");

    const grid = createGrid("Place ships whithout overlapping them");

    const error = document.createElement("span");
    error.textContent = "Place all ships before starting";

    const placementContainer = document.createElement("section");
    placementContainer.classList.add("placement-container");

    const h2 = document.createElement("h2");
    h2.setAttribute("id", "current-placement");
    h2.textContent = "Current placement: horizontal";

    const button = document.createElement("button");
    button.textContent = "Change to vertical";
    button.addEventListener("click", () => {
        changePlacement(h2, button);
    });

    placementContainer.append(h2, button);

    const newShip = placingShip(ship);

    const buttonContainer = document.createElement("section");
    buttonContainer.setAttribute("id", "button-container");
    
    const reset = document.createElement("button");
    reset.textContent = "Reset";
    reset.setAttribute("id", "reset-button");

    const random = document.createElement("button");
    random.textContent = "Random Place";
    random.setAttribute("id", "random-button");

    buttonContainer.append(reset, random);

    const startGameContainer = document.createElement("section");
    startGameContainer.setAttribute("id", "start-game-container");

    const startGame = document.createElement("button");
    startGame.setAttribute("id", "start-button");
    startGame.textContent = "Start Game";

    startGameContainer.appendChild(startGame);

    gameContainer.append(error, grid, placementContainer, newShip,
        buttonContainer, startGameContainer);
    
    document.querySelector("main").append(gameContainer);

}

function changePlacement(header, button) {
    if (header.textContent === "Current placement: horizontal") {
        header.textContent = "Current placement: vertical";
        button.textContent = "Change to horizontal";
    } else {
        header.textContent = "Current placement: horizontal";
        button.textContent = "Change to vertical";
    }
}