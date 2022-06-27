let timePressed;

function mousePressed(event) {
    let d = new Date();
    timePressed = d.getTime();
}

function mouseReleased(event) {

    if (gameModel.gameActive) {

        let d = new Date();
        let currentTime = d.getTime();
        let mousePressedTime = currentTime - timePressed;

        console.log("Pressed time: ", mousePressedTime);
        console.log("RELEASED");

        gameModel.playerFire(mouseDirection, mousePressedTime);
    }
}