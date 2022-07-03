class MenuTitle {
    constructor(){
        this.image = titleLogo;
        this.width = 340;
        this.height = 59;
        this.renderPosition = [width / 2 - this.width / 2, height / 4 - this.height / 2];
        this.midPosition = [width / 2, height / 4];
        this.collision = new Collision(this.renderPosition, this.width, this.height);
    }

    update(deltaTime) {
        this.checkEnemyCollision();
    }

    checkEnemyCollision() {
        let enemy = this.collision.checkCollision(gameModel.entityManager.enemies);
        if (enemy != null) {
            enemy.applyDamage(enemy.health, 1, false);
            gameModel.cam.startShake(25, 1);
        }
    }
}