class Coin {

    constructor(position, size, color) {
        this.position = position;
        this.size = 0;
        this.halfSize = 0;
        this.color = color;
        this.value = 1;
        this.health = 1;
        this.currentTime = 0;
        this.delay = 500; // time before animation starts in ms
        this.sizeAnim = new Anim(0, size, 0.5, 2);
        this.collision = new Collision(this.getPosition(), this.size, this.size);
    }

    getPosition() {
        return [this.position[0] - this.halfSize, this.position[1] - this.halfSize];
    }

    destroy() {
        this.health = 0;
    }

    update(deltaTime) {

        if (this.currentTime > this.delay) {
            if (this.sizeAnim.update(deltaTime)) {
                this.size = this.sizeAnim.value;
                this.halfSize = this.size / 2;
                this.collision.setDimentions(this.size, this.size);
                this.collision.position = this.getPosition();
            }
        } else {
            this.currentTime += deltaTime * 1000;
        }
    }
}