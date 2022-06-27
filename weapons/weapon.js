class Weapon {

    constructor(playerPos, cooldown, startAmmo, maxAmmo, projectile) {
        this.playerPos = [playerPos[0], playerPos[1]];
        this.bulletCD = cooldown;
        this.currentCD = 0;
        this.maxAmmo = maxAmmo;
        this.ammo = startAmmo;
        this.bulletCDs = [];
        this.projectile = projectile;

        for (let i = 0; i < this.ammo; i++) {
            addAmmoIcon();
        }
    }

    fire(direction) {
        if (this.ammo > 0) {
            let firedProjectile = this.projectile.makeCopyWithDirection(direction);
            gameModel.addProjectile(firedProjectile);
            this.ammo -= 1;
            this.bulletCDs.push(0);
            removeAmmoIcon();
        }
    }

    update(deltaTime) {
        if (this.ammo < this.maxAmmo) {
            this.bulletCDs = this.updateCooldowns(this.bulletCDs, deltaTime);
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