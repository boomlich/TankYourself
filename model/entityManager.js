class EntityManager {

    constructor() {
        this.init();
    }

    init() {
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

    update(deltaTime) {
        if (!gameModel.isGameOver) {
            this.projectiles = this.updateKillable(this.projectiles, deltaTime);
            this.enemies = this.updateKillable(this.enemies, deltaTime);
            this.enemySeeds = this.updateKillable(this.enemySeeds, deltaTime);
            this.coins = this.updateKillable(this.coins, deltaTime);
        }
        this.particles = this.updateKillable(this.particles, deltaTime);
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