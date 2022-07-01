class PlayerCharacter {

    constructor(position, basicBullets, megaBullets, gigaBullets, health) {
        this.midPosition = [position[0], position[1]];
        this.size = this.calcSize(health);
        this.position = [position[0] - this.size / 2, position[1] - this.size / 2];

        this.basicGun = new Weapon(position, 2, basicBullets, basicBullets, new BasicBullet(position, [0, 0]));
        this.megaGun = new Weapon(position, 5, megaBullets, megaBullets, new MegaBullet(position, [0, 0]));
        this.gigaGun = new Weapon(position, 10, gigaBullets, gigaBullets, new GigaBullet(position, [0, 0]));
        this.weapons = [this.basicGun, this.megaGun, this.gigaGun];

        this.collision = new Collision(this.position, this.size, this.size);
        this.health = health;
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

    fireWeapon(direction, fireTime) {

        if (fireTime < 250) {
            this.basicGun.fire(direction);
        } else if (fireTime < 2000) {
            this.megaGun.fire(direction);
        } else {
            this.gigaGun.fire(direction);
        }
    }

    update(deltaTime) {
        this.checkEnemyCollision();

        for (const gun of this.weapons) {
            gun.update(deltaTime);
        }
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

        if (this.health > 0) {
            this.triggerExplosion(50, 5, 10);
            this.adjustSize(this.health);
        } else {
            this.death();
        }
    }
    
    death() {
        this.triggerExplosion(100, 25, 10);
    }

    triggerExplosion(force, count, startSize) {
        let explosion = new Explosion(this.position, force, count, startSize, 0, this.color, this.color, 1);
        explosion.trigger();
    }

}