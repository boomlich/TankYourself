class GameModel {

    fps;
    elapsedTime;
    enemySpawnChance;

    constructor(width, height) {
        this.entityManager = new EntityManager();
        this.edge = new Edge(width, height, 10);
        this.playerPosition = [width / 2, height / 2];
        this.enemySpawnManager = new EnemySpawnManager(this, this.edge, this.playerPosition);
        let d = new Date();
        this.prevTime = d.getTime();
        this.startGame();
    }

    startGame() {
        this.playerCharacter = new PlayerCharacter(this.playerPosition, 1, 1, 1);
        this.gameActive = true;
        this.elapsedTime = 0;
    }

    playerFire(direction, fireTime) {
        this.playerCharacter.fireWeapon(direction, fireTime);
    }

    addProjectile(projectile) {
        this.entityManager.addProjectile(projectile)
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

    gameOver() {
        console.log("GAME OVER");
    }


    update() {
        // Calculate time between frames
        let d = new Date()
        let nowTime = d.getTime();
        deltaTime = (nowTime - this.prevTime) / 1000.0;
        this.prevTime = nowTime;

        this.fps = 1 / deltaTime;

        if (this.gameActive) {

            this.elapsedTime += deltaTime;

            // update entities
            this.entityManager.update(deltaTime);
            this.playerCharacter.update(deltaTime);
            this.enemySpawnManager.update(deltaTime);
        }
    }
}

class EnemySpawnManager {
    constructor(gameModel, edge, playerPosition) {
        this.enemySpawners = [
            new EnemySpawner(new EnemyBasic([0, 0], playerPosition), 0.05, 0.20, 0, 200, gameModel, edge),
            new EnemySpawner(new EnemyMega([0, 0], playerPosition), 0.01, 0.1, 50, 200, gameModel, edge),
            new EnemySpawner(new EnemyGiga([0, 0], playerPosition), 0.005, 0.05, 100, 200, gameModel, edge),

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

    removeEnemySeed(enemySeed) {
        let index = this.enemySeeds.indexOf(enemySeed);
        this.enemySeeds.splice(index, 1);
    }

    update(deltaTime) {
        this.projectiles = this.updateKillable(this.projectiles, deltaTime);
        this.enemies = this.updateKillable(this.enemies, deltaTime);
        this.enemySeeds = this.updateKillable(this.enemySeeds, deltaTime);
        this.particles = this.updateKillable(this.particles, deltaTime);
        // console.log(this.projectiles);
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