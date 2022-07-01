class Collision {

    constructor(position, width, height) {
        this.position = position;
        this.width = width;
        this.height = height;
    }

    checkCollision(objects) {
        for (const object of objects) {
            if (this.testCollision(object)) {
                return object;
            }
        }
    }

    setDimentions(width, height) {
        this.width = width;
        this.height = height;
    }

    updatePosition(position) {
        this.position = position;
    }

    testCollision(target) {
        let targetMinX = target.collision.position[0];
        let targetMaxX = target.collision.position[0] + target.collision.width;
        let targetMinY = target.collision.position[1];
        let targetMaxY = target.collision.position[1] + target.collision.height;

        return targetMinX < this.position[0] + this.width && targetMaxX > this.position[0] &&
                targetMinY < this.position[1] + this.height && targetMaxY > this.position[1];
    }
}