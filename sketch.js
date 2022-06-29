let gameModel;
let edge;
const uiContainer = document.getElementById("uiContainer");
// const HUD = document.getElementById("HUD");



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
    drawEnemies();
    drawEnemySeed();
    drawParticles();
    drawProjectiles();
    drawingContext.shadowBlur = 32;

    mouseDirection = unitVector([mouseX - width/2, mouseY - width/2]);

    textSize(20);
    // text(Math.round(gameModel.elapsedTime * 100) / 100, 25, 40);
    // text(Math.round(gameModel.fps * 1) / 1, width - 100, 40)
    ellipseMode(CORNER);
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
        fill(projectile.color);
        ellipse(projectile.getPosition()[0], projectile.getPosition()[1], projectile.size);
    }
}

function drawEnemies() {
    let enemies = gameModel.entityManager.enemies;

    for (const enemy of enemies) {
        fill(enemy.color);
        ellipse(enemy.getPosition()[0], enemy.getPosition()[1], enemy.size);
    }
}

function drawEdges() {
    stroke(255);
    for (const lin of edge.lines) {
        line(lin[0], lin[1], lin[2], lin[3]);
    }
    noStroke();
}

function drawParticles() {
    let particles = gameModel.entityManager.particles;
    noStroke();
    for (const particle of particles) {
        fill(particle.color);
        ellipse(particle.getPosition()[0], particle.getPosition()[1], particle.size);
    }
}

function drawEnemySeed() {
    let enemySeeds = gameModel.entityManager.enemySeeds;

    for (const seed of enemySeeds) {
        if (seed.delayFinished()) {
            fill(seed.color);
            ellipse(seed.getPosition()[0], seed.getPosition()[1], seed.size);
        }
    }
}