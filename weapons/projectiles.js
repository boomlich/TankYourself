class Projectile {

    constructor(position, direction, force, size, health) {
        this.position = [position[0], position[1]];
        this.direction = direction;
        this.force = force;
        this.size = size;
        this.collision = new Collision(this.position, this.size, this.size);
        this.entityManager = gameModel.entityManager;
        this.health = health;
    }

    update(deltaTime) {
        this.position[0] += this.direction[0] * this.force * deltaTime;
        this.position[1] += this.direction[1] * this.force * deltaTime;

        let enemyHit = this.collision.checkCollision(gameModel.entityManager.enemies);

        if (enemyHit != null) {
            console.log("PROJECTILE HIT");

            let enemyHealth = enemyHit.health;
            enemyHit.applyDamage(this.health);
            this.applyDamage(enemyHealth);
        }
    }

    applyDamage(damage) {
        this.health -= damage;

        if (this.health < 1) {
            this.death();
        }
    }

    death() {
        gameModel.entityManager.removeProjectile(this);
    }
}