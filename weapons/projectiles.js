class Projectile {

    constructor(position, direction, force, damage) {
        this.health = damage;
        this.size = this.setSize(this.health);
        this.position = [position[0], position[1]];
        this.direction = direction;
        this.force = force;
        this.collision = new Collision(this.position, this.size, this.size);
        this.trail = new Trail(this.position, 30, 1, this.size * 0.5, 0, [255, 255, 255, 255], [255, 255, 255, 255]);
        this.color = [0, 187, 255, 255];
    }

    setSize(health) {
        if (health === 1) {
            return 15;
        } else if (health === 2) {
            return 25;
        } else {
            return 30
        }
    }

    update(deltaTime) {
        this.position[0] += this.direction[0] * this.force * deltaTime;
        this.position[1] += this.direction[1] * this.force * deltaTime;

        this.collision.updatePosition(this.getPosition());

        this.trail.update(deltaTime);
        
        this.checkIfEdgeHit();
        this.checkIfEnemyHit();
    }

    checkIfEnemyHit() {
        let enemyHit = this.collision.checkCollision(gameModel.entityManager.enemies, this.getPosition());
        if (enemyHit != null) {
            let impact = this.calculateImpactForce(this.position, enemyHit.position, this.force);
            let enemyHealth = enemyHit.health;
            enemyHit.applyDamage(this.health, impact);
            this.applyDamage(enemyHealth);
        }
    }

    calculateImpactForce(position, enemyPosition, force) {
        let impactForce = unitVector(pointsToVector(position, enemyPosition));
        return [impactForce[0] * force, impactForce[1] * force];
    }

    makeCopyWithDirection(direction) {
        return new Projectile(this.position, direction, this.force, this.health);
    }

    checkIfEdgeHit() {
        let edge = gameModel.edge;

        let sizeDiff = this.size / 2;
        let collisionSize = this.size * 1.25;

        if (this.position[0] - collisionSize < edge.minX) {
            this.edgeHit(edge.minX, this.position[1] - sizeDiff, this.direction[1] < 0);
        } else if (this.position[0] + collisionSize > edge.maxX) {
            this.edgeHit(edge.maxX, this.position[1] - sizeDiff, this.direction[1] > 0);
        } else if (this.position[1] - collisionSize< edge.minY) {
            this.edgeHit(this.position[0] - sizeDiff, edge.minY, this.direction[0] > 0);
        } else if (this.position[1] + collisionSize > edge.maxY) {
            this.edgeHit(this.position[0] - sizeDiff, edge.maxY, this.direction[0] < 0);
        }
    }

    getPosition() {
        return [this.position[0] - this.size / 2, this.position[1] - this.size / 2];
    }

    edgeHit(x, y, rightMovement) {

        let enemy;
        if (this.health === 1) {
            enemy = new EnemyBasic([0, 0], gameModel.playerPosition);
        } else if (this.health === 2) {
            enemy = new EnemyMega([0, 0], gameModel.playerPosition);
        } else {
            enemy = new EnemyGiga([0, 0], gameModel.playerPosition);
        }

        let edgeProgression = gameModel.edge.pointToProgression(x, y);
        let pointOnEdge = gameModel.edge.progressToPoint(edgeProgression);
        let transititonTime = 1 + 0.5 * this.health;
        
        let particle = new Particle(this.position, pointOnEdge[0], pointOnEdge[1], this.size, 10, this.color, enemy.color, 4, transititonTime);
        gameModel.addParticle(particle);

        this.applyDamage(this.health);
        gameModel.addEnemySeed(new EnemySeed(enemy, edgeProgression, 3, rightMovement, particle, transititonTime));
    }

    applyDamage(damage) {
        this.health -= damage;
        this.size = this.setSize(this.health);
    }
}

class BasicBullet extends Projectile {
    constructor(position, direction) {
        super(position, direction, 100, 1);
    }
}

class MegaBullet extends Projectile {
    constructor(position, direction) {
        super(position, direction, 100, 2);
    }
}

class GigaBullet extends Projectile {
    constructor(position, direction) {
        super(position, direction, 100, 3);
    }
}