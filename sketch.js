let gameModel;
let edge;
const uiContainer = document.getElementById("uiContainer");
let angle = Math.PI / 4;
// const HUD = document.getElementById("HUD");

let img;
let mouseDirection;

function preload() {
    img = loadImage('assets/Tank_01.png');
}


function setup() {
    createCanvas(500, 500);
    gameModel = new GameModel(width, height);
    edge = gameModel.edge;
}
  
function draw() {

    background(0, 2, 33);
    mouseDirection = unitVector([mouseX - width/2, mouseY - width/2]);

    gameModel.update();
    drawEdges();
    drawPlayer();
    drawEnemies();
    drawCoins();
    drawEnemySeed();
    drawParticles();
    drawProjectiles();

    // image(img, 100, 100, 32, 32);
    drawingContext.shadowBlur = 32;

    // HUD_combo.classList.remove("pop");



    textSize(20);

    // text(gameModel.scoreManager.comboMultiplier, 20, 100);
    // text(Math.round(gameModel.elapsedTime * 100) / 100, 25, 40);
    // text(Math.round(gameModel.fps * 1) / 1, width - 100, 40)
    ellipseMode(CORNER);
}


function drawPlayer() {

    let player = gameModel.player;

    if (player.health > 0) {
        fill(player.color)
        drawingContext.shadowColor = color(0, 187, 255);

        push();
        stroke(255);
        rect(player.position[0], player.position[1], player.size, player.size, 5);
        pop();

        push();
        stroke(255);
        translate(player.midPosition[0], player.midPosition[1]);
        rotate(this.vectorAngle(mouseDirection));
        rect(-5, -5, 30, 10, 5);
        pop();
    }
}


function vectorAngle(vector) {
    let sinAngle = vector[1] / vectorLength(vector);

    if (vector[0] < 0) {
        return Math.PI - Math.asin(sinAngle);
    } else {
        return Math.asin(sinAngle);
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
        drawingContext.shadowColor = color(enemy.color);
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
        drawingContext.shadowColor = color(particle.color);
        fill(particle.color);
        ellipse(particle.getPosition()[0], particle.getPosition()[1], particle.size);
    }
}

function drawEnemySeed() {
    let enemySeeds = gameModel.entityManager.enemySeeds;

    for (const seed of enemySeeds) {
        if (seed.delayFinished()) {
            drawingContext.shadowColor = color(seed.color);
            fill(seed.color);
            ellipse(seed.getPosition()[0], seed.getPosition()[1], seed.size);
        }
    }
}

function drawCoins() {
    let coins = gameModel.entityManager.coins;

    for (const coin of coins) {
        push();
        fill(coin.color);
        translate(coin.getPosition()[0] + coin.halfSize, coin.getPosition()[1] + coin.halfSize);
        rotate(angle);
        rect(-coin.halfSize, -coin.halfSize, coin.size, coin.size);
        pop();
    }
}