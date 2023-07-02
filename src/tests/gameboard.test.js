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

    test("Receive on target attack", () => {
        const gameboard = new Gameboard();
        const ship = new Ship(3);

        gameboard.placeShip({ x: 2, y: 0 }, "horizontal", ship);

        expect(gameboard.receiveAttack({ x: 2, y: 0 })).toBe("hit");

        expect(gameboard.gameboard[0]).toStrictEqual([
            "", "", "[X]", ship, ship, "", "", "", "", ""
        ]);
    });

    test("Receive missed attack", () => {
        const gameboard = new Gameboard();
        const ship = new Ship(3);

        gameboard.placeShip({ x: 2, y: 0 }, "horizontal", ship);

        expect(gameboard.receiveAttack({ x: 0, y: 0 })).toBe("miss");

        expect(gameboard.gameboard[0]).toStrictEqual([
            "miss", "", ship, ship, ship, "", "", "", "", ""
        ]);
    });

    test("Report sunk ship", () => {
        const gameboard = new Gameboard();
        const ship = new Ship(3);

        gameboard.placeShip({ x: 2, y: 0 }, "horizontal", ship);

        expect(gameboard.receiveAttack({ x: 2, y: 0 })).toBe("hit");
        expect(gameboard.receiveAttack({ x: 3, y: 0 })).toBe("hit");
        expect(gameboard.receiveAttack({ x: 4, y: 0 })).toBe("sunk");


        expect(gameboard.gameboard[0]).toStrictEqual([
            "", "", "[X]", "[X]", "[X]", "", "", "", "", ""
        ]);
    });

    test("No sunken ship, sir!", () => {
        const gameboard = new Gameboard();
        const ship = new Ship(3);

        gameboard.placeShip({ x: 2, y: 0 }, "horizontal", ship);

        expect(gameboard.checkSunk()).toBeFalsy();

        expect(gameboard.receiveAttack({ x: 2, y: 0 })).toBe("hit");
        expect(gameboard.receiveAttack({ x: 3, y: 0 })).toBe("hit");
        expect(gameboard.receiveAttack({ x: 5, y: 0 })).toBe("miss");


        expect(gameboard.gameboard[0]).toStrictEqual([
            "", "", "[X]", "[X]", ship, "miss", "", "", "", ""
        ]);

        expect(gameboard.checkSunk()).toBeFalsy();
    });

    test("Overlap ship", () => {
        const gameboard = new Gameboard();
        const ship = new Ship(4);
        const ship2 = new Ship(4);

        gameboard.placeShip({ x: 1, y: 0 }, "horizontal", ship);

        expect(gameboard.placeShip({ x: 4, y: 0 }, "vertical", ship2)).toBe("collision");
        
        expect(gameboard.gameboard[0]).toStrictEqual([
            "", ship, ship, ship, ship, "", "", "", "", ""
        ]);

        expect(gameboard.gameboard[1]).not.toEqual([
            "", "", "", "", ship2, "", "", "", "", ""
        ]);
        expect(gameboard.gameboard[2]).not.toEqual([
            "", "", "", "", ship2, "", "", "", "", ""
        ]);
        expect(gameboard.gameboard[3]).not.toEqual([
            "", "", "", "", ship2, "", "", "", "", ""
        ]);
    });

    test("Ship out of bounds", () => {
        const gameboard = new Gameboard();
        const ship = new Ship(4);

        expect(gameboard.placeShip({ x: 9, y: 0 }, "horizontal", ship)).toBe("collision");

        expect(gameboard.gameboard[0]).toStrictEqual([
            "", "", "", "", "", "", "", "", "", ""
        ]);
    });
});