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

        this.checkIfEdgeHit();
        this.checkIfEnemyHit();

    }

    checkIfEnemyHit() {
        let enemyHit = this.collision.checkCollision(gameModel.entityManager.enemies);
        if (enemyHit != null) {
            let enemyHealth = enemyHit.health;
            enemyHit.applyDamage(this.health);
            this.applyDamage(enemyHealth);
        }
    }

    checkIfEdgeHit() {
        let edge = gameModel.edge;

        if (this.position[0] < edge.minX) {
            this.edgeHit(edge.minX, this.position[1]);
        } else if (this.position[0] > edge.maxX) {
            this.edgeHit(edge.maxX, this.position[1]);
        } else if (this.position[1] < edge.minY) {
            this.edgeHit(this.position[0], edge.minY);
        } else if (this.position[1] > edge.maxY) {
            this.edgeHit(this.position[0], edge.maxY);
        }
    }

    edgeHit(x, y) {

        gameModel.removeProjectile(this);
        gameModel.addEnemySeed(new EnemySeed(gameModel.edge.pointToProgression(x, y), 3));
        console.log(gameModel.edge.pointToProgression(x, y));
    }

    applyDamage(damage) {
        this.health -= damage;

        if (this.health < 1) {
            this.death();
        }
    }

    death() {
        gameModel.removeProjectile(this);
    }
}