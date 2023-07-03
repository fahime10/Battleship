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

    const input = document.createElement("input");
    input.setAttribute("id", "name");
    input.setAttribute("type", "text");

    const button = document.createElement("button");
    button.textContent = "Start Game";

    section.append(label, input, button);

    return section;
}

function buildFooter() {
    const footer = document.createElement("footer");
    footer.textContent = "Developed by Fahim Ahmed";

    return footer;
}