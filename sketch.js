let gameModel;
const uiContainer = document.getElementById("uiContainer");

function setup() {
    createCanvas(750, 750);
    gameModel = new GameModel(width, height);
    
}
  
function draw() {

    background(0, 2, 33);

    gameModel.update();
    drawPlayer();
    drawProjectiles();
    
    drawingContext.shadowBlur = 32;

    textSize(32);

    mouseDir = [mouseX - width/2, mouseY - width/2]
    mouseDirUnit = unitVector(mouseDir);
    text(mouseDir[0] + " . " + mouseDir[1], 10, 30);
    text(mouseDirUnit[0] + " . " + mouseDirUnit[1], 10, 100);
}


function drawPlayer() {

    let player = gameModel.playerCharacter;

    if (gameModel.gameActive) {
        fill(0, 187, 255)
        drawingContext.shadowColor = color(0, 187, 255);
        rect(player.position[0], player.position[1], player.size, player.size);
    }
}

function drawProjectiles() {
    let projectiles = gameModel.entityManager.projectiles;

    for (const projectile of projectiles) {
        // console.log("Projectile drawn: " + projectile.position + " :: " +  projectile.size);
        ellipse(projectile.position[0], projectile.position[1], projectile.size);
    }
}


function mousePressed(event) {

    if (event.path[0] == uiContainer) {
        if (gameModel.gameActive) {
            gameModel.playerFire(mouseDirUnit);
        }
    }
}

function mouseReleased() {

}