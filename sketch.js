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
    drawParticles();
    
    // drawingContext.shadowBlur = 32;

    mouseDirection = unitVector([mouseX - width/2, mouseY - width/2]);


    textSize(20);
    text(Math.round(gameModel.elapsedTime * 100) / 100, 25, 40);
    text(Math.round(gameModel.fps * 1) / 1, width - 100, 40)
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
        // rect(projectile.collision.position[0], projectile.collision.position[1], projectile.collision.width, projectile.collision.height);
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

function drawParticles() {
    let particles = gameModel.entityManager.particles;

    for (const particle of particles) {
        ellipse(particle.position[0], particle.position[1], particle.size);
    }
}

function drawEnemySeed() {
    let enemySeeds = gameModel.entityManager.enemySeeds;

    for (const seed of enemySeeds) {
        if (seed.delayFinished()) {
            ellipse(seed.position[0], seed.position[1], 10);
        }
    }
    
}