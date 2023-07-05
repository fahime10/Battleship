import { Player } from "../classes/player.js";
import { createGame } from "./createGame.js";
import { placingShip } from "../components/placingShip.js";
import { getOrientation } from "../game/orientation.js";
import { gameLoop } from "../game/gameLoop.js";

export function startGame(name) {
    let player = new Player(name);
    createGame(player.ships[0].length);

    const cells = document.querySelectorAll(".grid .cell");
    cells.forEach((cell) => {
        cell.addEventListener("mouseover", () => {
            removeHoverFromCells(cells);
            gridListener(cell, player.ships[0], player);
        });

        cell.addEventListener("click", () => {
            placeShip(cell, player);
        });
    });

    const reset = document.getElementById("reset-button");
    reset.addEventListener("click", () => {
        player = new Player(name);
        changeNextShip(player.ships[0]);

        resetCells(cells);
        document.querySelector("span").style.display = "none";
    });

    const random = document.getElementById("random-button");
    random.addEventListener("click", () => {
        removeHoverFromCells(cells);
        randomPlacing(player, cells);
    });

    const start = document.getElementById("start-button");
    start.addEventListener("click", () => {
        createGameLoop(player);
    })
}

function removeHoverFromCells(cells) {
    cells.forEach((cell) => {
        cell.classList.remove("hover-effect");
        cell.classList.remove("cell-error");
    });
}

function gridListener(cell, ship, player) {
    if (player.ships.length === 0) {
        return;
    }

    const length = ship.length;
    const placement = getOrientation();

    const position = JSON.parse(cell.getAttribute("location"));

    const shipArrayLength = new Array(ship.length).fill(" ");
    let positionToInt = { x: parseInt(position.x), y: parseInt(position.y) };

    if (player.gameboard.checkOutOfBounds(positionToInt, placement, shipArrayLength) === "collision") {
        positionToInt = { x: parseInt(position.x), y: parseInt(position.y) };
        moveUntilError(positionToInt, placement, shipArrayLength, player);
        return;
    }

    hoverOnShip(length, placement, position);
}

function moveUntilError(position, placement, lengthArray, player) {
    lengthArray.every(() => {
        const startPos = JSON.parse(JSON.stringify(position));

        if (player.gameboard.checkOutOfBounds([" ", position, placement]) === "collision") {
            return false;
        }

        const element = document.querySelector(`[location=\'{"x": "${startPos.x}", "y": "${startPos.y}"}\']`);
        element.classList.add("cell-error");

        if (placement === "horizontal") {
            startPos.x++;
        } else {
            startPos.y++;
        }

        position = startPos;
        return true;
    });
}

function hoverOnShip(length, placement, position) {
    for (let i = 0; i < length; i++) {
        const element = document.querySelector(`[location=\'{"x": "${position.x}", "y": "${position.y}"}\']`);

        element.classList.add("hover-effect");

        if (placement === "horizontal") {
            position.x++;
        } else {
            position.y++;
        }
    }
}

function changeNextShip(ship) {
    let length = 0;

    if (typeof ship === "object") {
        length = ship.length;
    }

    const previousShip = document.getElementById("new-ship");
    const nextShip = placingShip(length);

    previousShip.replaceWith(nextShip);
}

function resetCells(cells) {
    cells.forEach((cell) => {
        cell.classList.remove("ship");
        cell.classList.remove("hover-effect");
        cell.classList.remove("cell-error");
    });
}

function placeShip(cell, player) {
    if (player.ships.length === 0) {
        return;
    }

    if (cell.classList.contains("cell-error")) {
        return;
    }

    const allHover = document.querySelectorAll(".hover-effect");
    allHover.forEach((shipElement) => {
        shipElement.classList.add("ship");
        shipElement.classList.remove("hover-effect");
    });

    const position = JSON.parse(cell.getAttribute("location"));
    const placement = getOrientation();

    player.placeShip(position.x, position.y, placement);
    changeNextShip(player.ships[0]);
}

function randomPlacing(player) {
    player.randomShips();

    const gameboard = player.gameboard.gameboard;

    for (let y = 0; y < gameboard.length; y++) {
        const row = gameboard[y];
        for (let x = 0; x < gameboard.length; x++) {
            const cell = row[x];

            if (typeof cell === "object") {
                const element = document.querySelector(`[location=\'{"x": "${x}", "y": "${y}"}\']`);

                element.classList.add("ship");
            }
        }
    }

    changeNextShip(player.ships[0]);
}

function createGameLoop(player) {
    if (player.ships.length != 0) {
        document.querySelector("span").style.display = "block";
        return;
    }

    const gridContainer = document.querySelector(".grid-container").cloneNode(true);
    
    const setupContainer = document.querySelector("#setup-container");
    document.querySelector("main").removeChild(setupContainer);

    gameLoop(gridContainer, player);
}