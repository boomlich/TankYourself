class PlayerCharacter {

    constructor(position, basicBullets, megaBullets, health) {
        this.midPosition = [position[0], position[1]];
        this.size = this.calcSize(health);
        this.position = [position[0] - this.size / 2, position[1] - this.size / 2];

        this.basicGun = new Weapon(position, 2, basicBullets, basicBullets, new BasicBullet(position, [0, 0]), true);
        this.megaGun = new Weapon(position, 4, megaBullets, megaBullets, new MegaBullet(position, [0, 0]), false);
        this.weapons = [this.basicGun, this.megaGun];

        this.collision = new Collision(this.position, this.size, this.size);
        this.health = health;
        this.maxHealth = health;
        this.color = [0, 187, 255, 255];
    }

    adjustSize(health) {
        this.size = this.calcSize(health);
        let halfSize = this.size / 2;
        this.position = [this.midPosition[0] - halfSize, this.midPosition[1] - halfSize];
        this.collision.position = this.position;
        this.collision.setDimentions(this.size, this.size);
    }

    calcSize(health) {
        if (health === 1) {
            return 25;
        } else if (health === 2) {
            return 30;
        } else {
            return 35;
        }
    }

    fireWeapon(fireTime) {

        if (fireTime < 150) {
            this.basicGun.fire();
        } else {
            this.megaGun.fire();
        }
    }

    update(deltaTime, angle) {
        this.checkEnemyCollision();

        for (const gun of this.weapons) {
            gun.update(deltaTime, angle);
        }

        updateAmmoIcons(this.weapons[0].ammo, this.weapons[1].ammo);
    }

    checkEnemyCollision() {
        let enemy = this.collision.checkCollision(gameModel.entityManager.enemies);
        if (enemy != null) {
            this.applyDamage(enemy.health);
            enemy.score = 0;
            enemy.applyDamage(enemy.health, 1, false);
        }
    }

    applyDamage(damage) {
        this.health -= damage;
        gameModel.cam.startShake(50, 1);

        playSFX(sfx_hurt);

        if (this.health > 0) {
            this.triggerExplosion(50, 5, 10);
            this.adjustSize(this.health);
        } else {
            this.death();
        }
    }
    
    death() {
        this.triggerExplosion(100, 25, 10);
        gameModel.setGameOver();
    }

    triggerExplosion(force, count, startSize) {
        let explosion = new Explosion(this.position, force, count, startSize, 0, this.color, this.color, 1);
        explosion.trigger();
    }

}