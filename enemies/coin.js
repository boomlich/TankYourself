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
        this.collision = new Collision([0, 0], 0, 0);
        this.hasPickedUp = false;
        this.pickupAnim = new Anim(0, 1, 1, 4);
        this.rotation = 0;
    }

    getPosition() {
        return [this.position[0] - this.halfSize, this.position[1] - this.halfSize];
    }

    picupCoin() {
        this.pickupX = this.position[0];
        this.pickupY = this.position[1];
        this.pickupSize = this.size;
        playSFX(sfx_coin);
        this.hasPickedUp = true;
        this.collision.enabled = false;
    }
    
    spawnAnim() {
        this.size = this.sizeAnim.value;
        this.halfSize = this.size / 2;
        this.collision.setDimentions(this.size, this.size);
        this.collision.position = this.getPosition();
    }

    playPickupAnim(deltaTime) {
        if (this.pickupAnim.update(deltaTime)) {
            this.position = [this.pickupX, this.pickupY - 25 * this.pickupAnim.value];
            this.size = this.pickupSize - this.pickupSize * this.pickupAnim.value;
            this.halfSize = this.size / 2;
            this.rotation = 2 * PI * this.pickupAnim.value;
        } else {
            this.health = 0;
        }
    }

    update(deltaTime) {

        if (this.currentTime > this.delay) {
            if (this.sizeAnim.update(deltaTime)) {
                this.spawnAnim();
            }
            if (this.hasPickedUp) {
                this.playPickupAnim(deltaTime);
            }
        } else {
            this.currentTime += deltaTime * 1000;
        }
    }
}