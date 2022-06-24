class Edge {

    constructor(width, height, offset) {
        this.minX = offset;
        this.maxX = width - 2 * offset;
        this.minY = offset;
        this.maxY = height - 2 * offset;
    }
}