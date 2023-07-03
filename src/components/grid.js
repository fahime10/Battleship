export function createGrid(message) {
    const gridContainer = document.createElement("section");
    gridContainer.classList.add("grid-container");

    const prompt = document.createElement("h2");
    prompt.textContent = message;

    const grid = document.createElement("div");
    grid.classList.add("grid");

    for (let i = 0; i < 10; i++) {
        const row = document.createElement("div");
        row.classList.add("row");

        for (let j = 0; j < 10; j++) {
            const cell = document.createElement("div");
            cell.classList.add("cell");
            cell.setAttribute("location", `{"x": "${j}", "y": "${i}"}`);

            row.appendChild(cell);
        }

        grid.appendChild(row);
    }

    gridContainer.append(prompt, grid);
    return gridContainer;
}