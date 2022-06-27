class PlayerCharacter {

    constructor(position, basicBullets, megaBullets, gigaBullets) {
        this.size = 30;
        this.position = [position[0] - this.size / 2, position[1] - this.size / 2];

        this.basicGun = new Weapon([position[0], position[1]], 2, basicBullets, basicBullets, new BasicBullet(position, [0, 0]));
        this.megaGun = new Weapon([position[0], position[1]], 5, megaBullets, megaBullets, new MegaBullet(position, [0, 0]));
        this.gigaGun = new Weapon([position[0], position[1]], 10, gigaBullets, gigaBullets, new GigaBullet(position, [0, 0]));

        this.weapons = [this.basicGun, this.megaGun, this.gigaGun];

        this.collision = new Collision(this.position, this.size, this.size);
    }

    fireWeapon(direction, fireTime) {

        if (fireTime < 2500) {
            console.log("BASIC FIRE");
            this.basicGun.fire(direction);
        } else if (fireTime < 5000) {
            console.log("MEGA FIRE");
        } else {
            console.log("GIGA FIRE");
        }

        
    }

    update(deltaTime) {
        if (this.collision.checkCollision(gameModel.entityManager.enemies)) {
            gameModel.gameOver();
        }

        for (const gun of this.weapons) {
            gun.update(deltaTime);
        }
    }

}