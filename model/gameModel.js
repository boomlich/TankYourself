class GameModel {

    constructor() {
        this.entityManager = new EntityManager();
        this.startGame();
        let d = new Date();
        this.prevTime = d.getTime();
    }

    startGame() {
        this.playerCharacter = new PlayerCharacter(width/2, height/2);
        this.gameActive = true;

        this.entityManager.addEnemy(new Enemy(1, 20, [20, 500], [375, 375], 5, 0, 0, 0));

    }

    playerFire(direction) {
        this.playerCharacter.fireWeapon(direction);
    }

    addProjectile(projectile) {
        this.entityManager.addProjectile(projectile)
    }


    update() {
        // Calculate time between frames
        let d = new Date()
        let nowTime = d.getTime();
        deltaTime = (nowTime - this.prevTime) / 1000.0;
        this.prevTime = nowTime;

        // update entities
        this.entityManager.update(deltaTime);
    }
}


class EntityManager {

    constructor() {
        this.enemies = [];
        this.projectiles = [];
        this.particles = [];
    }

    addProjectile(projectile) {
        this.projectiles.push(projectile);
    }

    addEnemy(enemy) {
        this.enemies.push(enemy);
    }

    update(deltaTime) {
        for (const projectile of this.projectiles) {
            projectile.update(deltaTime);
        }

        for (const enemy of this.enemies) {
            enemy.update(deltaTime);
        }
    }
}