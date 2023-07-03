import { Gameboard } from "./gameboard.js";
import { Ship } from "./ship.js";

export class Player {
    constructor(name) {
        this.name = name;
        this.gameboard = new Gameboard();
        this.ships = createShips();
        this.moves = availableMoves();
    }

    placeShip(x, y, placement) {
        const availableShip = this.ships.shift();

        const result = 
            this.gameboard.placeShip({ x: x, y: y }, placement, availableShip);

        if (result === "collision") {
            this.ships.unshift(availableShip);
        }
    }

    randomShips() {
        const placement = ["horizontal", "vertical"];
        while (this.ships.length !== 0) {
            const x = Math.floor(Math.random() * 9);
            const y = Math.floor(Math.random() * 9);
            const thisPlacement = placement[Math.floor(Math.random())];
            this.placeShip(x, y, thisPlacement);
        }
    }

    randomAttack() {
        let coord = this.moves[Math.floor(Math.random() * this.moves.length)];
        const index = this.moves.indexOf(coord);

        if (index > - 1) {
            this.moves.splice(index, 1);
        }

        return this.gameboard.receiveAttack(coord);
    }
}

function createShips() {
    const lengths = [2, 3, 4, 1, 1];
    const ships = [];

    lengths.forEach((length) => {
        ships.push(new Ship(length));
    });

    return ships;
}

function availableMoves() {
    const moves = [];

    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
            moves.push({ x: i, y: j });
        }
    }

    return moves;
}