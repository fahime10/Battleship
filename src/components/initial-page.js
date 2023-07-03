import { validate } from "./validate.js";
import { startGame } from "../game/startGame.js";

export function menuScreen() {
    const header = buildHeader();

    const main = document.createElement("main");
    main.append(buildSection());

    const footer = buildFooter();

    document.body.append(header, main, footer);
}

function buildHeader() {
    const header = document.createElement("header");
    const h1 = document.createElement("h1");
    h1.textContent = "Battleship Game";
    header.append(h1);

    return header;
}

function buildSection() {
    const section = document.createElement("section");
    section.setAttribute("class", "menu");

    const label = document.createElement("label");
    label.setAttribute("for", "name");
    label.textContent = "Please enter your name";

    const span = document.createElement("span");
    span.textContent = "Name must be at least one character";

    const input = document.createElement("input");
    input.setAttribute("id", "name");
    input.setAttribute("type", "text");
    input.setAttribute("maxlength", "20");

    const button = document.createElement("button");
    button.textContent = "Start Game";
    button.setAttribute("class", "start");
    
    button.addEventListener("click", () => {
        let name = document.querySelector("#name").value;
        name = name.trim();

        if (validate(name)) {
            startGame(name);
        }
    });

    section.append(label, span, input, button);

    return section;
}

function buildFooter() {
    const footer = document.createElement("footer");
    footer.textContent = "Developed by Fahim Ahmed";

    return footer;
}