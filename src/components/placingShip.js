export function placingShip(size) {
    const container = document.createElement("section");
    container.setAttribute("id", "new-ship");

    const h2 = document.createElement("h2");

    if (size === 0) {
        h2.textContent = "All ships placed";
        container.appendChild(h2);

        return container;
    }

    h2.textContent = "Next ship: ";
    h2.ariaValueText = `Next ship: ${size} long`;

    const row = document.createElement("div");
    row.classList.add("row");

    for (let i = 0; i < size; i++) {
        const cell = document.createElement("div");
        cell.classList.add("cell");

        row.appendChild(cell);
    }

    container.append(h2, row);
    return container;
}