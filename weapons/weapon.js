class Weapon {

    direction = 0;

    constructor(playerPos, cooldown, startAmmo, maxAmmo, projectile, isPrimary) {
        this.playerPos = [playerPos[0], playerPos[1]];
        this.bulletCD = cooldown;
        this.currentCD = 0;
        this.maxAmmo = maxAmmo;
        this.ammo = startAmmo;
        this.projectile = projectile;
        this.length = 30;
        this.isPrimary = isPrimary;
    }

    fire() {
        if (this.ammo > 0) {
            let tipOfWeapon = [this.playerPos[0] + this.direction[0] * (this.length - 5), this.playerPos[1] + this.direction[1] * (this.length - 5)];
            let firedProjectile = this.projectile.makeCopyWithDirection(this.direction, tipOfWeapon);
            gameModel.addProjectile(firedProjectile);
            this.ammo -= 1;
            removePop();
            playSFX(sfx_playerFire);
            this.muzzleExplosion(tipOfWeapon, 100, 20, 12);
        }
    }

    muzzleExplosion(position, force, count, startSize) {
        let explosion = new Explosion(position, force, count, startSize, 0, [255, 255, 255, 255], [255, 255, 255, 255], 1, true);
        explosion.forceX = this.direction[0] * force;
        explosion.forceY = this.direction[1] * force;
        explosion.trigger();
    }

    update(deltaTime, direction) {
        if (this.ammo < this.maxAmmo) {
            this.updateCoolDown(deltaTime);
        }
        this.direction = direction;
    }

    updateCoolDown(deltaTime) {
        this.currentCD += deltaTime;

        if (this.currentCD > this.bulletCD) {
            this.ammo += 1;
            this.currentCD = 0;
        }
    }
}