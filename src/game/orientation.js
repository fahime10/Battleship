export function getOrientation() {
    const orientationElement = 
        document.getElementById("current-placement").textContent;

    const placement = orientationElement.split(" ").slice(-1).toString();

    switch (placement) {
        case "horizontal": {
            return "horizontal";
        }
        case "vertical": {
            return "vertical";
        }
    }
}