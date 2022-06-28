class Collision {

    constructor(position, width, height) {
        this.position = position;
        this.width = width;
        this.height = height;
    }

    // updatePosition(position) {
    //     this.position = [position[0], position[1]];
    // }

    checkCollision(objects) {
        for (const object of objects) {
            if (this.testCollision(object)) {
                return object;
            }
        }
    }

    testCollision(target) {
        let targetMinX = target.collision.position[0] - target.collision.width;
        let targetMaxX = target.collision.position[0] + target.collision.width;
        let targetMinY = target.collision.position[1] - target.collision.height;
        let targetMaxY = target.collision.position[1] + target.collision.height;

        return targetMinX < this.position[0] && targetMaxX > this.position[0] &&
                targetMinY < this.position[1] && targetMaxY > this.position[1];
    }
}