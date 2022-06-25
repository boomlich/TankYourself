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

        this.playerCharacter = new PlayerCharacter(this.playerPosition);
        this.gameActive = true;

        // Test enemy
        // this.addEnemy(new Enemy(1, 20, [20, 500], [width/2, height/2], 1, 0, 0, 0));
    }

    playerFire(direction) {
        this.playerCharacter.fireWeapon(direction);
    }

    addProjectile(projectile) {
        this.entityManager.addProjectile(projectile)
    }

    removeProjectile(projectile) {
        this.entityManager.removeProjectile(projectile);
    }

    addEnemy(enemy) {
        this.entityManager.addEnemy(enemy);
    }

    removeEnemy(enemy) {
        this.entityManager.removeEnemy(enemy);
    }

    addEnemySeed(enemySeed) {
        this.entityManager.addEnemySeed(enemySeed);
    }

    removeEnemySeed(enemySeed) {
        this.entityManager.removeEnemySeed(enemySeed);
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

    removeEnemy(enemy) {
        let index = this.enemies.indexOf(enemy);
        console.log("index : " + index);
        console.log("indexD: ", this.enemies.indexOf(enemy));
        
        if (index > -1) {
            this.enemies.splice(index, 1);
        } else {
            console.log("NOT FOUND");
        }
    }

    addEnemySeed(enemySeed) {
        this.enemySeeds.push(enemySeed);
    }

    removeEnemySeed(enemySeed) {
        let index = this.enemySeeds.indexOf(enemySeed);
        this.enemySeeds.splice(index, 1);
    }

    removeProjectile(projectile) {
        let index = this.projectiles.indexOf(projectile);
        this.projectiles.splice(index, 1);
    }

    update(deltaTime) {
        // for (const projectile of this.projectiles) {
        //     projectile.update(deltaTime);
        // }

        this.projectiles = this.updateKillable(this.projectiles, deltaTime);

        this.enemies = this.updateKillable(this.enemies, deltaTime);

        for (const seed of this.enemySeeds) {
            seed.update(deltaTime);
        }
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