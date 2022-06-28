class Particle {

    constructor(spawn, forceX, forceY, startSize, endSize, startColor, endColor, animStyle, totalDuration) {
        this.position = [spawn[0], spawn[1]];
        this.size = startSize;
        this.color = startColor;
        this.health = 1;

        this.offsetX = 0;
        this.offsetY = 0;

        this.currentDuration = 0;
        this.totalDuration = totalDuration;

        this.positionXAnim = new Anim(spawn[0], forceX, this.totalDuration, animStyle);
        this.positionYAnim = new Anim(spawn[1], forceY, this.totalDuration, animStyle);

        this.sizeAnim = new Anim(startSize, endSize, this.totalDuration, animStyle);
        this.colorAnim = new Anim(startColor, endColor, this.totalDuration, animStyle);
    }

    update(deltaTime) {

        if (this.currentDuration > this.totalDuration) {
            this.health = 0;
        }

        this.position[0] = this.getNewAnimValue(this.position[0], this.positionXAnim, deltaTime) + this.offsetX;
        this.position[1] = this.getNewAnimValue(this.position[1], this.positionYAnim, deltaTime) + this.offsetY;
        this.size = this.getNewAnimValue(this.size, this.sizeAnim, deltaTime);
        this.color = this.getNewAnimValue(this.color, this.colorAnim, deltaTime);

        this.currentDuration += deltaTime;
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