class PlayerCharacter {

    constructor(x, y) {
        this.size = 30;
        this.position = [x - this.size / 2, y - this.size / 2];
        this.weapon = new Weapon([x, y], 1000);
        this.collision = new Collision(this.position, this.size, this.size);
    }

    fireWeapon(direction) {
        this.weapon.fire(direction);
    }

    update() {
        if (this.collision.checkCollision(gameModel.entityManager.enemies)) {
            gameModel.gameOver();
        }
    }
}