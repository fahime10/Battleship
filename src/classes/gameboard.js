export class Gameboard {
    constructor() {
        this.gameboard = createGameboard();
    }

    placeShip(location, placement, ship) {
        let startPos = JSON.parse(JSON.stringify(location));

        let shipLength = new Array(ship.length).fill(" ");
        const outOfBounds = this.checkOutOfBounds(location, placement, shipLength);

        if (outOfBounds === "collision") {
            return outOfBounds;
        }

        location = startPos;

        for (let i = 0; i < ship.length; i++) {
            this.gameboard[location.y][location.x] = ship;

            if (placement === "horizontal") {
                location.x++;
            } else {
                location.y++;
            }
        }
    }

    receiveAttack(location) {
        const coord = this.gameboard[location.y][location.x];

        if (coord === "") {
            this.gameboard[location.y][location.x] = "miss";
            return "miss";
        }

        if (typeof coord === "object") {
            coord.hit();
            this.gameboard[location.y][location.x] = "[X]";

            if (coord.isSunk()) {
                return "sunk";
            }
            
            return "hit";
        }
    }

    checkSunk() {
        return this.gameboard.forEach((row) => {
            row.forEach((element) => {
                if (typeof element === "object") {
                    return true;
                } else {
                    return false;
                }
            });
        });
    }

    checkOutOfBounds(location, placement, ship) {
        let check = ship.every(() => {
            if (location.y > 9 || location.x > 9) {
                return false;
            }

            if (typeof this.gameboard[location.y][location.x] === "object") {
                return false;
            }
    
            if (placement === "horizontal") {
                location.x++;
            } else {
                location.y++;
            }
            return true;
        });

        if (check === false) {
            return "collision";
        }
    }
}

function createGameboard() {
    let gameboard = [];

    for (let i = 0; i < 10; i++) {
        let row = [];
        for (let j = 0; j < 10; j++) {
            row.push("");
        }
        gameboard.push(row);
    }

    return gameboard;
}