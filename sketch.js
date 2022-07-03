let gameModel;
let edge;
const uiContainer = document.getElementById("uiContainer");
let angle = Math.PI / 4;

let titleLogo;
let mouseDirection;

let sfx_oneUp;
let sfx_coin;
let sfx_button;
let sfx_gameOverA;
let sfx_gameOverB;
let sfx_hurt;
let sfx_playerFire;
let sfx_enemyHit;
let sfx_enemyDeath;
let music_a;

function preload() {
    titleLogo = loadImage('assets/graphics/TY_TitleLogo.png');
    sfx_oneUp = new Audio("assets/audio/sfx_1up_01.wav");
    sfx_coin = new Audio("assets/audio/sfx_coin_01.wav");
    sfx_button = new Audio("assets/audio/sfx_button_01.wav");
    sfx_gameOverA = new Audio("assets/audio/sfx_gameOver_01.wav");
    sfx_gameOverB = new Audio("assets/audio/sfx_gameOver_02.wav");
    sfx_hurt = new Audio("assets/audio/sfx_hurt_01.wav");
    sfx_enemyHit = new Audio("assets/audio/sfx_enemyHit_01.mp3");
    sfx_playerFire = new Audio("assets/audio/sfx_playerFire_01.mp3");
    sfx_enemyDeath = new Audio("assets/audio/sfx_enemyDeath_01.wav");
    music_a = new Audio("assets/audio/music_01.mp3");
}


function setup() {
    createCanvas(500, 500);
    gameModel = new GameModel(width, height);
    edge = gameModel.edge;
}
  
function draw() {
    ellipseMode(CORNER);
    background(0, 2, 33);
    mouseDirection = unitVector([mouseX - width/2, mouseY - width/2]);

    gameModel.update();
    drawEdges();
    if (!gameModel.onMainMenu) {
        drawPlayer();
        drawEnemies();
        drawCoins();
        drawEnemySeed();
        drawParticles();
        drawProjectiles();
    } else {
        drawMenuText();
        drawEnemies();
        drawParticles();
    }
    drawingContext.shadowBlur = 32;
}

function drawMenuText() {
    let title = gameModel.menuTitle;
    image(title.image, title.renderPosition[0], title.renderPosition[1]);
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
    stroke(245, 0, 120, 255);
    drawingContext.shadowColor = color([245, 0, 120, 255]);
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
        translate(0, 0);
        rotate(angle + coin.rotation);
        rect(-coin.halfSize, -coin.halfSize, coin.size, coin.size);
        pop();
    }
}