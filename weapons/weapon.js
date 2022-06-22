class Weapon {


    constructor(playerPos, cooldown) {
        this.playerPos = [playerPos[0], playerPos[1]];
        this.cooldown = cooldown;
        let d = new Date();
        this.prevFireTime = d.getTime();
    }

    cooldownFinished() {
        let d = new Date()
        let nowTime = d.getTime();

        console.log((nowTime - this.prevFireTime));
        
        if (nowTime - this.prevFireTime > this.cooldown) {
            this.prevFireTime = nowTime;
            return true;   
        }
        return false;
    }

    fire(direction) {
        let projectile = new Projectile(this.playerPos, direction, 100, 20);
        gameModel.addProjectile(projectile);
    }
}