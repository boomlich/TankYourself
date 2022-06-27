let gameModel;
let edge;
const uiContainer = document.getElementById("uiContainer");
const HUD = document.getElementById("HUD");



function setup() {
    createCanvas(500, 500);
    gameModel = new GameModel(width, height);
    edge = gameModel.edge;
}
  
function draw() {

    background(0, 2, 33);

    gameModel.update();
    drawEdges();
    drawPlayer();
    drawProjectiles();
    drawEnemies();
    drawEnemySeed();
    
    drawingContext.shadowBlur = 32;

    mouseDirection = unitVector([mouseX - width/2, mouseY - width/2]);


    textSize(20);
    text(Math.round(gameModel.elapsedTime * 100) / 100, 25, 40);
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
    for (const lin of edge.lines) {
        line(lin[0], lin[1], lin[2], lin[3]);
    }
    stroke(255);
}

function drawStroke(x1, y1, x2, y2, color) {
    fill(245, 0, 120)
    line(x1, y1, x2, y2);
    // stroke(color);
}

function drawEnemySeed() {
    let enemySeeds = gameModel.entityManager.enemySeeds;

    for (const seed of enemySeeds) {
        ellipse(seed.position[0], seed.position[1], 10);
    }
    
}

// function mousePressed(event) {


// }

// function mouseReleased(event) {

//     if (gameModel.gameActive) {
//         gameModel.playerFire(mouseDirection);
//     }
// }