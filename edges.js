class Edge {

    constructor(width, height, offset) {
        this.minX = offset;
        this.maxX = width - offset;
        this.minY = offset;
        this.maxY = height - offset;

        this.lines = [
            [this.minX, this.minY, this.maxX, this.minY],
            [this.maxX, this.minY, this.maxX, this.maxY],
            [this.maxX, this.maxY, this.minX, this.maxY],
            [this.minX, this.maxY, this.minX, this.minY]
        ]

        this.length = (this.maxX - this.minX) * 2 + (this.maxY - this.minY) * 2;
        this.edgeWidth = this.maxX - this.minX;
        this.edgeHeight = this.maxY - this.minY;
    }

    /**
     * 
     * @param {x-coordinat of the point on the edge} x 
     * @param {y-coordinat of the point on the edge} y 
     * @returns progression of the path
     */
    pointToProgression(x, y) {
        let lineProgression;

        if (y == this.minY) {
            lineProgression = x / this.edgeWidth;
            return 25 * lineProgression;
        } else if (x === this.maxX) {
            lineProgression = y / this.edgeHeight;
            return 25 + 25 * + lineProgression;
        } else if (y === this.maxY) {
            lineProgression = (this.edgeWidth - x) / this.edgeWidth;
            return 50 + 25 * lineProgression;
        } else if (x === this.minX) {
            lineProgression = (this.edgeHeight - y) / this.edgeHeight;
            return 75 + 25 * lineProgression;
            
        } else {
            return 0;
        }
    }

    progressToPoint(totalProgress) {
        if (totalProgress < 25) {
            return this.lineProgressionToPoint(totalProgress, this.lines[0]);
        } else if (totalProgress < 50) {
            return this.lineProgressionToPoint(totalProgress - 25, this.lines[1]);
        } else if (totalProgress < 75) {
            return this.lineProgressionToPoint(totalProgress - 50, this.lines[2]);
        } else {
            return this.lineProgressionToPoint(totalProgress - 75, this.lines[3]);
        }
    }

    lineProgressionToPoint(progressOnLine, line) {
        let lineProgression = progressOnLine / 25;
        let start = [line[0], line[1]];
        let end = [line[2], line[3]];
        let lineUnitVec = unitVector(pointsToVector(start, end));
        return [
            line[0] + lineUnitVec[0] * lineProgression * Math.abs(end[0] - start[0]),
            line[1] + lineUnitVec[1] * lineProgression * Math.abs(end[1] - start[1])
        ];
    }
}