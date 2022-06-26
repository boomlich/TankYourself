class GameModel {

    constructor(width, height) {
        this.entityManager = new EntityManager();
        this.edge = new Edge(width, height, 10);
        this.playerPosition = [width / 2, height / 2];
        let d = new Date();
        this.prevTime = d.getTime();
        this.startGame();
    }

    startGame() {
        this.playerCharacter = new PlayerCharacter(this.playerPosition, 3, 0, 0);
        this.gameActive = true;
    }

    playerFire(direction) {
        this.playerCharacter.fireWeapon(direction);
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

        // update entities
        this.entityManager.update(deltaTime);
        this.playerCharacter.update(deltaTime);
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

    removeEnemySeed(enemySeed) {
        let index = this.enemySeeds.indexOf(enemySeed);
        this.enemySeeds.splice(index, 1);
    }

    update(deltaTime) {
        this.projectiles = this.updateKillable(this.projectiles, deltaTime);
        this.enemies = this.updateKillable(this.enemies, deltaTime);
        this.enemySeeds = this.updateKillable(this.enemySeeds, deltaTime);
    }

    updateKillable(array, deltaTime) {
        let updatedArray = [];

        for (let i = 0; i < array.length; i++) {
            const element = array[i];
            element.update(deltaTime);
            if (element.health > 0) {
                updatedArray.push(element);
            }
        }
        return updatedArray;
    }
}