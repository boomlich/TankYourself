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

    update(deltaTime) {
        for (const projectile of this.projectiles) {
            projectile.update(deltaTime);
        }
    }
}