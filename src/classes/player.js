import { Gameboard } from "./gameboard.js";
import { Ship } from "./ship.js";

let x = 0;
let y = 0;

export class Player {
    constructor(name) {
        this.name = name;
        this.gameboard = new Gameboard();
        this.ships = createShips();
        this.moves = availableMoves();
        this.noShips = this.ships.length;
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

        x = coord.x;
        y = coord.y;

        return this.gameboard.receiveAttack(coord);
    }

    recordMove() {
        return { x: x, y: y };
    }

    sinkShip() {
        this.noShips--;
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