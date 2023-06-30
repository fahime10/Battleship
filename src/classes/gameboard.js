export class Gameboard {
    constructor() {
        this.gameboard = createGameboard();
    }

    placeShip(location, placement, ship) {
        let startPos = JSON.parse(JSON.stringify(location));

        location = startPos;

        for (let i = 0; i < ship.length; i++) {
            this.gameboard[location.y][location.x] = ship;

            if (placement == "horizontal") {
                location.x++;
            } else {
                location.y++;
            }
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