class Enemy {

    acceleration = [0.0, 0.0];
    velocity = [0.0, 0.0]
    maxAcceleration = 0.0005;

    constructor(health, startSize, finalSize, position, target, speed, score, loot, lootchance) {
        this.health = health;
        this.speed = speed;
        this.position = [position[0], position[1]];
        this.target = [target[0], target[1]];
        this.score = score;
        this.loot = loot;
        this.lootchance = lootchance;
        
        this.collision = new Collision(this.position, finalSize, finalSize);

        this.size = startSize;
        this.sizeAnim = new Anim(startSize, finalSize, 5, 2);
    }

    spawn() {
    }

    applyForce(force) {
        this.velocity[0] += force[0];
        this.velocity[1] += force[1];
    }

    applyDamage(damage) {
        this.health -= damage;
    }

    update(deltaTime) {

        if (this.sizeAnim.update(deltaTime)) {
            this.size = this.sizeAnim.value;
        }

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
        super(1, 10, 25, position, gameModel.playerPosition, 1, 0, 0, 0);
    }
}

class EnemySeed {

    constructor(progression, duration) {
        this.startProgression = progression;
        this.currentProgression = 0;
        this.progression = progression;
        this.totalDuration = duration;
        this.currentDuration = 0;
        // this.enemy = enemy;
        this.position = gameModel.edge.progressToPoint(progression);
        this.right = false;
        this.progressionPerSec = 50 / duration; 

        this.movement = new Anim(progression, progression + 50, duration, 1);
        console.log("seed created");
    }

    update(deltaTime) {


        if (this.movement.update(deltaTime)) {
            let progression = mod(this.movement.value, 100);
            this.position = gameModel.edge.progressToPoint(progression);
        } else {
            this.spawnEnemy();
        }

        // this.currentDuration += deltaTime;
        // if (this.currentDuration > this.totalDuration) {
        //     this.spawnEnemy();
        // }

        // let progression = mod(this.startProgression + 50 * parametricBlend(this.currentProgression / 50), 100);
        // this.currentProgression += this.progressionPerSec * deltaTime;

        // this.position = gameModel.edge.progressToPoint(progression);
        
    }

    spawnEnemy() {
        // gameModel.addEnemy(this.enemy);
        console.log("enemy spawned");
        gameModel.removeEnemySeed(this);
        console.log(gameModel.playerPosition);
        gameModel.addEnemy(new EnemyBasic(this.position));
    }

}