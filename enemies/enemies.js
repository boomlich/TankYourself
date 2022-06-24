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
        gameModel.entityManager.removeEnemy();
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

        // Break if going faster then the speed limit
        // if (vectorLength(this.velocity) > this.speed) {
        //     let unitVelocity = unitVector(this.velocity);
        //     this.acceleration[0] += unitVelocity[0] * -1 * this.maxAcceleration;
        //     this.acceleration[1] += unitVelocity[1] * -1 * this.maxAcceleration;
        // } else {
        //     let direction = unitVector(pointsToVector(this.position, this.target));
        //     this.acceleration[0] += direction[0] * this.maxAcceleration;
        //     this.acceleration[1] += direction[1] * this.maxAcceleration; 
        // }

        let direction = unitVector(pointsToVector(this.position, this.target));
        this.acceleration[0] += direction[0] * this.maxAcceleration;
        this.acceleration[1] += direction[1] * this.maxAcceleration; 

        console.log(this.acceleration);

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