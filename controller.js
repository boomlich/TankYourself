let timePressed;

function mousePressed(event) {
    let d = new Date();
    timePressed = d.getTime();
}

function mouseReleased(event) {

    if (event.target.classList[0] != "button") {
        if (gameModel.gameActive) {
            let d = new Date();
            let currentTime = d.getTime();
            let mousePressedTime = currentTime - timePressed;
            gameModel.playerFire(mousePressedTime);
        }
    }
}