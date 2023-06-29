import { Ship } from "../classes/ship.js";

describe("Testing Ship class", () => {
    test("Create a ship", () => {
        const ship = new Ship(4);
        expect(ship).toMatchObject({ length: 4, hits: 0, sunk: false });
    });

    test("Our ship has been hit!", () => {
        const ship = new Ship(2);
        ship.hit();
        expect(ship.hits).toBe(1);
    });

    test("We are sinking!", () => {
        const ship = new Ship(3);
        ship.hit();
        ship.isSunk();
        expect(ship.sunk).toBe(false);
        
        ship.hit();
        ship.isSunk();
        expect(ship.sunk).toBe(false);

        ship.hit();
        ship.isSunk();
        expect(ship.sunk).toBe(true);
    });
});