import { Ship } from "../classes/ship.js";
import { Gameboard } from "../classes/gameboard.js";
import { Player } from "../classes/player.js";
import { menuScreen } from "../components/initial-page";
import { createGame } from "./createGame.js";

export function startGame(name) {
    let player = new Player(name);
    createGame(player.ships[0].length);
}