class Particle {

    constructor(spawn, forceX, forceY, startSize, endSize, startColor, endColor, animStyle, totalDuration) {
        this.position = [spawn[0], spawn[1]];
        this.size = startSize;
        this.health = 1;

        this.offsetX = 0;
        this.offsetY = 0;

        this.currentDuration = 0;
        this.totalDuration = totalDuration;

        this.positionXAnim = new Anim(spawn[0], forceX, this.totalDuration, animStyle);
        this.positionYAnim = new Anim(spawn[1], forceY, this.totalDuration, animStyle);

        this.sizeAnim = new Anim(startSize, endSize, this.totalDuration, animStyle);

        this.color = startColor;
        this.colorAnimR = new Anim(startColor[0], endColor[0], totalDuration, animStyle);
        this.colorAnimG = new Anim(startColor[1], endColor[1], totalDuration, animStyle);
        this.colorAnimB = new Anim(startColor[2], endColor[2], totalDuration, animStyle);
        this.colorAnimA = new Anim(startColor[3], endColor[3], totalDuration, animStyle);
    }

    update(deltaTime) {

        if (this.currentDuration > this.totalDuration) {
            this.health = 0;
        }

        this.position[0] = this.getNewAnimValue(this.position[0], this.positionXAnim, deltaTime) + this.offsetX;
        this.position[1] = this.getNewAnimValue(this.position[1], this.positionYAnim, deltaTime) + this.offsetY;
        this.size = this.getNewAnimValue(this.size, this.sizeAnim, deltaTime);

        let colorR = this.getNewAnimValue(this.color[0], this.colorAnimR, deltaTime);
        let colorG = this.getNewAnimValue(this.color[1], this.colorAnimG, deltaTime);
        let colorB = this.getNewAnimValue(this.color[2], this.colorAnimB, deltaTime);
        let colorA = this.getNewAnimValue(this.color[3], this.colorAnimA, deltaTime);
        this.color = [colorR, colorG, colorB, colorA];

        this.currentDuration += deltaTime;
    }

    getPosition() {
        return [this.position[0] - this.size / 2, this.position[1] -this.size / 2];
    }

    getNewAnimValue(original, animation, deltaTime) {
        if (animation.update(deltaTime)) {
            return animation.value;
        }
        return original
    }
}

class Explosion {

    constructor(position, force, amount, pStartSize, pEndSize, pStartColor, pEndColor, duration) {
        this.position = [position[0], position[1]];
        this.forceX = force;
        this.forceY = force;
        this.amount = amount;
        this.pStartSize = pStartSize;
        this.pEndSize = pEndSize;
        this.pStartColor = pStartColor;
        this.pEndColor = pEndColor;
        this.duration = duration;
    }

    trigger() {
        for (let i = 0; i < this.amount; i++) {

            let pForceX = this.position[0] + randomNumber(-this.forceX, this.forceX);
            let pForceY = this.position[1] + randomNumber(-this.forceY, this.forceY);

            gameModel.addParticle(new Particle(this.position, pForceX, pForceY, this.pStartSize, this.pEndSize, this.pStartColor, this.pEndColor, 3, this.duration));
        }
    }

    calculateRandomForce(min, max) {
        let force = randomNumber();
    }
}

class Trail {

    constructor(position, frequency, timeToLive, startSize, endSize, startColor, endColor) {
        this.position = position;
        this.frequency = frequency / 1000;
        this.timeToLive = timeToLive;
        this.startSize = startSize;
        this.endSize = endSize;
        this.startColor = startColor;
        this.endColor = endColor;

        this.spawnTimer = 0;
    }

    update(deltaTime) {
        if (this.spawnTimer > this.frequency) {
            let count = Math.floor(this.spawnTimer / this.frequency);
            for (let i = 0; i < count; i++) {
                gameModel.addParticle(new Particle(this.position, this.position[0], this.position[1], this.startSize, this.endSize, this.startColor, this.endColor, 0, this.timeToLive));
            }
            this.spawnTimer -= this.frequency * count;
        }
        this.spawnTimer += deltaTime;
    }
}