class PlayerCharacter {

    constructor(position) {
        this.size = 30;
        this.position = [position[0] - this.size / 2, position[1] - this.size / 2];
        this.weapon = new Weapon([position[0], position[1]], 1000);
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