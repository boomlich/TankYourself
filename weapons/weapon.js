class Weapon {

    constructor(playerPos, cooldown, startAmmo, maxAmmo) {
        this.playerPos = [playerPos[0], playerPos[1]];
        this.bulletCD = cooldown;
        this.currentCD = 0;
        this.maxAmmo = maxAmmo;
        this.ammo = startAmmo;
        this.bulletCds = [];

        for (let i = 0; i < this.ammo; i++) {
            addAmmoIcon();
        }
    }

    fire(direction) {
        if (this.ammo > 0) {
            let projectile = new Projectile(this.playerPos, direction, 100, 20, 1);
            gameModel.addProjectile(projectile);
            this.ammo -= 1;
            this.bulletCds.push(0);
            removeAmmoIcon();
        }
    }

    update(deltaTime) {

        if (this.ammo < this.maxAmmo) {
            this.bulletCds = this.updateCooldowns(this.bulletCds, deltaTime);
        }
    }

    updateCooldowns(oldCDs, deltaTime) {
        let updatedCDs = [];

        for (let i = 0; i < oldCDs.length; i++) {
            let CD = oldCDs[i];
            CD += deltaTime;
            if (CD > this.bulletCD) {
                this.ammo += 1;
                addAmmoIcon();
            } else {
                updatedCDs.push(CD);
            }
        }
        return updatedCDs;
    }
}