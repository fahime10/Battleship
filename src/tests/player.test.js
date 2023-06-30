import { Player } from "../classes/player.js";
import { Gameboard } from "../classes/gameboard.js";
import { Ship } from "../classes/ship.js";

describe("Testing Player class", () => {
    test("Create a player", () => {
        const player = new Player("Player1");
        const gameboard = new Gameboard();
        const ships = [new Ship(2), new Ship(3), new Ship(4), new Ship(1), new Ship(1)];

        const moves = [];
        for (let i = 0; i < 10; i++) {
            for (let j = 0; j < 10; j++) {
                moves.push({ x: i, y: j });
            }
        }

        expect(player).toEqual({ 
            name: "Player1",
            gameboard: gameboard,
            ships: ships,
            moves: moves
        });
    });

    test("Player places a ships", () => {
        const player = new Player("Player1");
        const ship = new Ship(2);

        player.placeShip(8, 0, "vertical");

        expect(player.ships.length).toBe(4);

        expect(player.gameboard.gameboard[0]).toStrictEqual([
            "", "", "", "", "", "", "", "", ship, "" 
        ]);
        expect(player.gameboard.gameboard[1]).toStrictEqual([
            "", "", "", "", "", "", "", "", ship, "" 
        ]);
    });

    test("Random attack", () => {
        const player = new Player("Player1");

        for (let i = 100; i > 0; i--) {
            expect(player.moves.length).toBe(i);
            player.randomAttack();
        }
    });
});