class GameModel {

    fps;
    elapsedTime;
    enemySpawnChance;
    gameScore;
    gameCoins;

    constructor(width, height) {
        this.entityManager = new EntityManager();
        this.scoreManager = new ScoreManager();
        this.edge = new Edge(width, height, 10);
        this.playerPosition = [width / 2, height / 2];
        this.enemySpawnManager = new EnemySpawnManager(this, this.edge, this.playerPosition);
        this.cam = new Camera();
        let d = new Date();
        this.prevTime = d.getTime();
        this.startGame();
    }

    startGame() {
        
        this.player = new PlayerCharacter(this.playerPosition, 1, 1, 1, 3);
        this.gameActive = true;
        this.elapsedTime = 0;
        this.scoreManager.init();

        addHUD(this.player.health);
    }



    getPlayerHealth() {
        if (this.player != null) {
            return this.player.health;
        }
        return 0;
    }

    addHealth() {
        this.player.health += 1;
    }

    playerFire(direction, fireTime) {
        this.player.fireWeapon(direction, fireTime);
    }

    addProjectile(projectile) {
        this.entityManager.addProjectile(projectile)
    }

    addCoin(coin) {
        this.entityManager.addCoin(coin);
    }

    enemyDeath(enemy, projectileHit) {
        if (projectileHit) {
            this.scoreManager.addScore(enemy.score);
        } else {
            this.scoreManager.resetCombo();
        }
    }

    pickupCoin(coin) {
        this.scoreManager.addCoins(coin.value);
        coin.destroy();
    }

    addEnemy(enemy) {
        this.entityManager.addEnemy(enemy);
    }

    addParticle(particle) {
        this.entityManager.addParticle(particle);
    }


    addEnemySeed(enemySeed) {
        this.entityManager.addEnemySeed(enemySeed);
    }

    pauseGame() {
        if (this.gameActive) {
            this.gameActive = false;
            removeHUD();
            addPauseMenu(this.formatDateTimer(this.elapsedTime));
        } else {
            this.prevTime = this.getNowTime();
            this.gameActive = true;
            removePauseMenu();
            addHUD(this.player.health);
        }
    }

    formatDateTimer(elapsedTime) {
        let minutes = Math.floor(elapsedTime / 60);
        let seconds = elapsedTime - minutes * 60;

        if (minutes < 10) {
            minutes = "0" + minutes;
        } else {
            minutes = Math.floor(minutes);
        }
        if (seconds < 10) {
            seconds = "0" + Math.floor(seconds);
        } else {
            seconds = Math.floor(seconds);
        }

        return minutes + ":" + seconds;
    }

    gameOver() {
        // this.gameActive = false;
        console.log("GAME OVER");
    }

    getNowTime() {
        let d = new Date()
        return d.getTime();
    }


    update() {
        // Calculate time between frames
        let nowTime = this.getNowTime();
        deltaTime = (nowTime - this.prevTime) / 1000.0;
        this.prevTime = nowTime;

        this.fps = 1 / deltaTime;

        if (this.gameActive) {

            this.elapsedTime += deltaTime;

            // update entities
            this.entityManager.update(deltaTime);
            this.player.update(deltaTime);
            this.enemySpawnManager.update(deltaTime);
            this.scoreManager.update(deltaTime);

            HUD_score.innerHTML = this.scoreManager.score;
            HUD_coins.innerHTML = this.scoreManager.coins;
            HUD_combo.innerHTML = this.scoreManager.getScoreComboString();

            updateHealthIcons(this.player.health);
            this.cam.update(deltaTime);
        }
    }
}

class EnemySpawnManager {
    constructor(gameModel, edge, playerPosition) {
        this.enemySpawners = [
            new EnemySpawner(new EnemyBasic([0, 0], playerPosition), 0.1, 0.20, 0, 400, gameModel, edge),
            new EnemySpawner(new EnemyMega([0, 0], playerPosition), 0.01, 0.1, 50, 400, gameModel, edge),
            new EnemySpawner(new EnemyGiga([0, 0], playerPosition), 0.005, 0.05, 100, 400, gameModel, edge),
        ];
    }

    update(deltaTime) {
        for (const spawner of this.enemySpawners) {
            spawner.update(deltaTime);
        }
    }
}

class EnemySpawner {
    constructor(enemy, startChance, chanceLimit, startTime, increaseTime, gameModel, edge) {
        this.enemy = enemy;
        this.currentChance = startChance;
        this.chanceLimit = chanceLimit;
        this.startTime = startTime;
        this.gameModel = gameModel;
        this.edge = edge;

        this.incrementPerSec = (chanceLimit - startChance) / increaseTime;
    }

    update(deltaTime) {
        if (gameModel.elapsedTime > this.startTime) {
            this.enemySpawnRoll(deltaTime);
            this.currentChance += this.incrementPerSec * deltaTime;
        }
    }

    enemySpawnRoll(deltaTime) {
        let roll = Math.random();
        let chance = this.currentChance * deltaTime;

        if (roll < chance) {
            this.spawnEnemyAtRandomPos();
        }
    }

    spawnEnemyAtRandomPos() {
        let pos = this.edge.progressToPoint(Math.floor(Math.random() * 101));
        this.gameModel.addEnemy(this.enemy.makeCopyAtPos(pos));
        console.log("sPAWNED");
    }
}


class EntityManager {

    constructor() {
        this.enemies = [];
        this.projectiles = [];
        this.particles = [];
        this.enemySeeds = []
        this.coins = [];
    }

    addProjectile(projectile) {
        this.projectiles.push(projectile);
    }

    addEnemy(enemy) {
        this.enemies.push(enemy);
    }

    addEnemySeed(enemySeed) {
        this.enemySeeds.push(enemySeed);
    }

    addParticle(particle) {
        this.particles.push(particle);
    }
    
    addCoin(coin) {
        this.coins.push(coin);
    }

    removeEnemySeed(enemySeed) {
        let index = this.enemySeeds.indexOf(enemySeed);
        this.enemySeeds.splice(index, 1);
    }

    update(deltaTime) {
        this.projectiles = this.updateKillable(this.projectiles, deltaTime);
        this.enemies = this.updateKillable(this.enemies, deltaTime);
        this.enemySeeds = this.updateKillable(this.enemySeeds, deltaTime);
        this.particles = this.updateKillable(this.particles, deltaTime);
        this.coins = this.updateKillable(this.coins, deltaTime);
    }

    updateKillable(array, deltaTime) {
        let updatedArray = [];

        for (const element of array) {
            element.update(deltaTime);
            if (element.health > 0) {
                updatedArray.push(element);
            }
        }
        return updatedArray;
    }
}