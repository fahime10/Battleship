import { menuScreen } from "./initial-page.js";

export function createEndScreen(winner) {
    console.log(winner);
    const main = document.querySelector("main");

    const endContainer = document.createElement("div");
    endContainer.setAttribute("id", "end-screen");

    const winnerSection = document.createElement("section");
    winnerSection.setAttribute("id", "winner-section");

    const winnerText = document.createElement("p");
    winnerText.textContent = "The winner is: ";

    const winnerName = document.createElement("p");
    winnerName.setAttribute("id", "winner-name");
    winnerName.textContent = winner;

    winnerSection.append(winnerText, winnerName);

    const playAgain = document.createElement("button");
    playAgain.setAttribute("id", "play-again");
    playAgain.textContent = "Play again?";

    playAgain.addEventListener("click", playAgainListener);

    endContainer.append(winnerSection, playAgain);
    main.appendChild(endContainer);
}

function playAgainListener() {
    const main = document.querySelector("main");
    const endContainer = document.getElementById("end-screen");

    main.removeChild(endContainer);
    document.querySelector("body").innerHTML = "";

    menuScreen();
}