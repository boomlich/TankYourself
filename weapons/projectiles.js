class Projectile {

    constructor(position, direction, force, size) {
        this.position = [position[0], position[1]];
        this.direction = direction;
        this.force = force;
        this.size = size;
    }

    update(deltaTime) {
        this.position[0] += this.direction[0] * this.force * deltaTime;
        this.position[1] += this.direction[1] * this.force * deltaTime;
    }
}