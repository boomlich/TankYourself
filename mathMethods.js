function unitVector(vector) {
    length = Math.sqrt(Math.pow(vector[0], 2) + Math.pow(vector[1], 2));
    return [vector[0] / length, vector[1] / length];
}