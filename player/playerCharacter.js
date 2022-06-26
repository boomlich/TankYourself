class PlayerCharacter {

    constructor(position, basicBullets, megaBullets, gigaBullets) {
        this.size = 30;
        this.position = [position[0] - this.size / 2, position[1] - this.size / 2];
        
        // this.weapon = new Weapon([position[0], position[1]], 1000);


        this.gunBasic = new Weapon([position[0], position[1]], 2, basicBullets, basicBullets);
        this.gunMega = new Weapon([position[0], position[1]], 5, megaBullets, megaBullets);
        this.gunGiga = new Weapon([position[0], position[1]], 10, gigaBullets, gigaBullets);

        this.weapons = [this.gunBasic, this.gunMega, this.gunGiga];

        this.collision = new Collision(this.position, this.size, this.size);
    }

    fireWeapon(direction) {
        this.gunBasic.fire(direction);
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