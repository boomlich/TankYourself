class Enemy {

    acceleration = [0.0, 0.0];
    velocity = [0.0, 0.0]

    constructor(health, position, target, speed, score, loot, lootchance) {
        this.health = health;
        this.speed = speed;
        this.position = [position[0], position[1]];
        this.target = [target[0], target[1]];
        this.score = score;
        this.loot = loot;
        this.lootchance = lootchance;
        this.startSize = 10;
        this.finalSize = this.calculateSize(this.health);
        
        this.collision = new Collision(this.position, this.finalSize, this.finalSize);

        this.size = this.startSize;
        this.sizeAnim = new Anim(this.startSize, this.finalSize, 5, 2);

        this.color = [245, 0, 120, 255];
    }

    calculateSize(health) {
        if (health == 1) {
            return 15;
        } else if (health == 2) {
            return 25;
        } else {
            return 30
        }
    }

    applyForce(force) {
        this.velocity[0] += force[0];
        this.velocity[1] += force[1];
    }

    applyDamage(damage) {
        this.health -= damage;

        if (this.health > 0) {
            this.sizeAnim.markFinished();
            this.size = this.calculateSize(this.health);
            this.triggerExplosion(50, 5, 10);
        } else {
            this.triggerExplosion(100, 10, 10);
            gameModel.gameScore += this.score;
        }
    }

    triggerExplosion(force, count, startSize) {
        let explosion = new Explosion(this.position, force, count, startSize, 0, this.color, this.color, 1);
        explosion.trigger();
    }

    makeCopyAtPos(position) {
        return new Enemy(this.health, position, this.target, this.speed, this.score, this.loot, this.lootchance);
    }

    calculateAcceleration(position, target, velocity, maxSpeed, force) {

        let desiredVelocity = unitVector([target[0] - position[0], target[1] - position[1]]);
        desiredVelocity = [desiredVelocity[0] * maxSpeed, desiredVelocity[1] * maxSpeed];

        let steeringVelocity = unitVector([desiredVelocity[0] - velocity[0], desiredVelocity[1] - velocity[1]]);
        steeringVelocity[0] *= 0.01;
        steeringVelocity[1] *= 0.01;

        return steeringVelocity;
    }

    update(deltaTime) {

        if (this.sizeAnim.update(deltaTime)) {
            this.size = this.sizeAnim.value;
        }

        this.acceleration = this.calculateAcceleration(this.position, this.target, this.velocity, this.speed, 0);

        this.velocity[0] += this.acceleration[0];
        this.velocity[1] += this.acceleration[1];
        this.velocity = limitVector(this.velocity, this.speed);

        this.position[0] += this.velocity[0];
        this.position[1] += this.velocity[1];  
    }
}

class EnemyBasic extends Enemy {
    constructor(position, playerPosition) {
        super(1, position, playerPosition, 1, 1, 0, 0);
    }
}

class EnemyMega extends Enemy {
    constructor(position, playerPosition) {
        super(2, position, playerPosition, 1, 2, 0, 0)
    }
}

class EnemyGiga extends Enemy {
    constructor(position, playerPosition) {
        super(3, position, playerPosition, 1, 3, 0, 0)
    }
}

class EnemySeed {

    constructor(enemy, progression, duration, rightMovement, spawnParticle, delay) {
        this.enemy = enemy;
        this.startProgression = progression;
        this.currentProgression = 0;
        this.progression = progression;
        this.totalDuration = duration;
        this.currentDuration = 0;
        this.position = gameModel.edge.progressToPoint(progression);
        this.startPosition = [this.position[0], this.position[1]];
        this.right = false;
        this.progressionPerSec = 50 / duration; 

        this.health = 1;

        enemy.score += enemy.score;

        this.color = enemy.color;

        let diff = rightMovement ? 50 : -50;
        this.movement = new Anim(progression, progression + diff, duration, 1);

        this.spawnParticle = spawnParticle;
        this.delay = delay;
        this.currentTime = 0;
    }

    update(deltaTime) {

        if (this.currentTime < this.delay) {
            this.spawnParticle.offsetX = this.position[0] - this.startPosition[0];
            this.spawnParticle.offsetY = this.position[1] - this.startPosition[1];
        }


        if (this.movement.update(deltaTime)) {
            let progression = mod(this.movement.value, 100);
            this.position = gameModel.edge.progressToPoint(progression);
        } else {
            this.spawnEnemy();
        }

        this.currentTime += deltaTime;
    }

    delayFinished() {
        return this.currentTime > this.delay;
    }

    spawnEnemy() {
        this.health = 0;
        gameModel.addEnemy(this.enemy.makeCopyAtPos(this.position));
    }
}