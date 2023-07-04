export function getOrientation() {
    const orientationElement = document.getElementById("current-placement").textContent;

    const placement = orientationElement.slice(-1);

    switch (axis) {
        case "x": {
            return "horizontal";
        }
        case "y": {
            return "vertical";
        }
    }
}