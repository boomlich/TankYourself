class Enemy {

    acceleration = [0.0, 0.0];
    velocity = [0.0, 0.0]
    maxAcceleration = 0.0005;

    constructor(health, size, position, target, speed, score, loot, lootchance) {
        this.health = health;
        this.speed = speed;
        this.position = [position[0], position[1]];
        this.target = [target[0], target[1]];
        this.score = score;
        this.loot = loot;
        this.lootchance = lootchance;
        this.size = size;
        this.collision = new Collision(this.position, size, size);
    }

    death() {
        gameModel.removeEnemy();
    }

    applyForce(force) {
        this.velocity[0] += force[0];
        this.velocity[1] += force[1];
    }

    applyDamage(damage) {
        this.health -= damage;

        if (this.health < 1) {
            this.death();
        }
    }

    update(deltaTime) {

        let direction = unitVector(pointsToVector(this.position, this.target));
        this.acceleration[0] += direction[0] * this.maxAcceleration;
        this.acceleration[1] += direction[1] * this.maxAcceleration; 

        // console.log(this.acceleration);

        this.velocity[0] += this.acceleration[0];
        this.velocity[1] += this.acceleration[1];

        this.velocity = limitVector(this.velocity, this.speed);

        if (vectorLength(this.velocity) == this.speed) {
            this.acceleration = [0, 0];
        }

        this.position[0] += this.velocity[0];
        this.position[1] += this.velocity[1];
        
    }
}

class EnemyBasic extends Enemy {
    constructor(position) {
        super(1, 25, position, gameModel.playerPosition, 1, 0, 0, 0);
    }
}

class EnemySeed {

    constructor(progression, duration) {
        this.progression = progression;
        this.duration = duration;
        // this.enemy = enemy;
        this.position = gameModel.edge.progressToPoint(progression);
        this.right = false;
        this.progressionPerTimeUnit = 50 / duration; 
        console.log("seed created");
    }

    update(deltaTime) {
        this.duration -= deltaTime;
        if (this.duration <= 0) {
            this.spawnEnemy();
        }
        if (this.right) {
            this.progression = mod(this.progression + this.progressionPerTimeUnit * deltaTime, 100);
        } else {
            this.progression = mod(this.progression - this.progressionPerTimeUnit * deltaTime, 100);
        }
        console.log(this.progression);
        this.position = gameModel.edge.progressToPoint(this.progression);
    }

    spawnEnemy() {
        // gameModel.addEnemy(this.enemy);
        console.log("enemy spawned");
        gameModel.removeEnemySeed(this);
        console.log(gameModel.playerPosition);
        gameModel.addEnemy(new EnemyBasic(this.position));
    }

}