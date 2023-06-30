import { Gameboard } from "../classes/gameboard.js";
import { Ship } from "../classes/ship.js";

describe("Testing Gameboard class", () => {
    test("Create a gameboard", () => {
        const gameboard = new Gameboard();
        
        expect(gameboard.gameboard.length).toBe(10);
        expect(gameboard.gameboard[0].length).toBe(10);
    });

    test("Place ship horizontally", () => {
        const gameboard = new Gameboard();
        const ship = new Ship(4);

        gameboard.placeShip({ x: 2, y: 0 }, "horizontal", ship);

        expect(gameboard.gameboard[0]).toStrictEqual([
            "", "", ship, ship, ship, ship, "", "" , "", ""
        ]);
    });

    test("Place ship vertically", () => {
        const gameboard = new Gameboard();
        const ship = new Ship(3);

        gameboard.placeShip({ x: 1, y: 3 }, "vertical", ship);

        expect(gameboard.gameboard[3]).toStrictEqual([
            "", ship, "", "", "", "", "", "" , "", ""
        ]);

        expect(gameboard.gameboard[4]).toStrictEqual([
            "", ship, "", "", "", "", "", "" , "", ""
        ]);

        expect(gameboard.gameboard[5]).toStrictEqual([
            "", ship, "", "", "", "", "", "" , "", ""
        ]);
    });

    
});