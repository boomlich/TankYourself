class Projectile {

    constructor(position, direction, force, size, damage) {
        this.position = [position[0], position[1]];
        this.direction = direction;
        this.force = force;
        this.size = size;
        this.collision = new Collision(this.position, this.size, this.size);
        this.health = damage;
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

    makeCopyWithDirection(direction) {
        return new Projectile(this.position, direction, this.force, this.size, this.health);
    }

    checkIfEdgeHit() {
        let edge = gameModel.edge;

        if (this.position[0] < edge.minX) {
            this.edgeHit(edge.minX, this.position[1], this.direction[1] < 0);
        } else if (this.position[0] > edge.maxX) {
            this.edgeHit(edge.maxX, this.position[1], this.direction[1] > 0);
        } else if (this.position[1] < edge.minY) {
            this.edgeHit(this.position[0], edge.minY, this.direction[0] > 0);
        } else if (this.position[1] > edge.maxY) {
            this.edgeHit(this.position[0], edge.maxY, this.direction[0] < 0);
        }
    }

    edgeHit(x, y, rightMovement) {
        this.applyDamage(this.health);
        gameModel.addEnemySeed(new EnemySeed(gameModel.edge.pointToProgression(x, y), 3, rightMovement));
        console.log(gameModel.edge.pointToProgression(x, y));
    }

    applyDamage(damage) {
        this.health -= damage;
    }
}

class BasicBullet extends Projectile {
    constructor(position, direction) {
        super(position, direction, 100, 20, 1);
    }
}

class MegaBullet extends Projectile {
    constructor(position, direction) {
        super(position, direction, 10, 25, 2);
    }
}

class GigaBullet extends Projectile {
    constructor(position, direction) {
        super(position, direction, 15, 30, 3);
    }
}