class Weapon {

    constructor(playerPos, cooldown) {
        this.playerPos = [playerPos[0], playerPos[1]];
        this.cooldown = cooldown;
    }

    fire(direction) {
        let projectile = new Projectile(this.playerPos, direction, 100, 20, 1);
        gameModel.addProjectile(projectile);
    }
}