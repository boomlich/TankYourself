let gameModel;
let edge;
const uiContainer = document.getElementById("uiContainer");

function setup() {
    createCanvas(750, 750);
    gameModel = new GameModel(width, height);
    edge = new Edge(width, height, 10);
    
}
  
function draw() {

    background(0, 2, 33);

    gameModel.update();
    drawEdges();
    drawPlayer();
    drawProjectiles();
    drawEnemies();
    
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

function drawEnemies() {

    let enemies = gameModel.entityManager.enemies;

    fill(245, 0, 120)
    for (const enemy of enemies) {
        ellipse(enemy.position[0], enemy.position[1], enemy.size);
    }
}

function drawEdges() {
    fill(color(0, 0, 0, 0));
    stroke('red');
    strokeWeight(4);
    rect(edge.minX, edge.minY, edge.maxX, edge.maxY);
    
    // drawStroke(edge.minX, edge.minY, edge.maxX, edge.minY, 255);
    // drawStroke(edge.maxX, edge.minY, edge.maxX, edge.maxY, 255);
    // drawStroke(edge.maxX, edge.maxY, edge.minX, edge.maxY, 255);
    // drawStroke(edge.minX, edge.maxY, edge.minX, edge.minY, 255);
}

function drawStroke(x1, y1, x2, y2, color) {
    fill(245, 0, 120)
    line(x1, y1, x2, y2);
    stroke(color);
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