export function validate(name) {
    if (name.length === 0) {
        document.querySelector("span").style.display = "block";
        return false;
    } else {
        document.querySelector("span").style.display = "none";
        return true;
    }
}