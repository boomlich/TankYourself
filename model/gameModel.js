class GameModel {

    elapsedTime;

    constructor(width, height) {
        this.entityManager = new EntityManager();
        this.edge = new Edge(width, height, 10);
        this.playerPosition = [width / 2, height / 2];
        let d = new Date();
        this.prevTime = d.getTime();
        this.startGame();
    }

    startGame() {

        // console.log(this.entityManager);
        this.playerCharacter = new PlayerCharacter(this.playerPosition, 1, 1, 1);
        this.gameActive = true;
        this.elapsedTime = 0;

        // this.randomEnemySpawn(500);

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

        if (this.gameActive) {

            this.elapsedTime += deltaTime;
            
            this.randomEnemySpawn(deltaTime);
            




            // update entities
            this.entityManager.update(deltaTime);
            this.playerCharacter.update(deltaTime);
        }
    }

    randomEnemySpawn(deltaTime) {

        // let maxTime = 1000;
        // let timeProgression = 1;
        // if (elapsedTime < maxTime) {
        //     timeProgression = elapsedTime / 1000;
        // }
        
        let roll = Math.floor(Math.random() * 100);

        console.log(roll);

        let chance = 0.0000001 * deltaTime;

        if (roll < chance) {
            let pos = this.edge.progressToPoint(Math.floor(Math.random() * 101));
            this.addEnemy(new EnemyBasic(pos));
        }

        // let spawnedEnemy = new EnemyBasic();
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
        console.log(this.projectiles);
    }

    addEnemy(enemy) {
        this.enemies.push(enemy);
    }

    addEnemySeed(enemySeed) {
        this.enemySeeds.push(enemySeed);
    }

    removeEnemySeed(enemySeed) {
        let index = this.enemySeeds.indexOf(enemySeed);
        this.enemySeeds.splice(index, 1);
    }

    update(deltaTime) {
        this.projectiles = this.updateKillable(this.projectiles, deltaTime);
        this.enemies = this.updateKillable(this.enemies, deltaTime);
        this.enemySeeds = this.updateKillable(this.enemySeeds, deltaTime);
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