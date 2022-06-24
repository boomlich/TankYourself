function unitVector(vector) {
    length = vectorLength(vector);
    return [vector[0] / length, vector[1] / length];
}

function pointsToVector(A, B) {
    return [B[0] - A[0], B[1] - A[1]];
}

function vectorLength(vector) {
    return Math.sqrt(Math.pow(vector[0], 2) + Math.pow(vector[1], 2));
}

function forceFalloff(distance, maxDistance, steepness) {
    let slope = maxDistance / steepness;
    return 1.0 / (1.0 + Math.pow(Math.E, - ((slope * 2.0) / maxDistance) * distance + slope));
}

function limitVector(vector, limit) {
    let length = vectorLength(vector);
    
    if (length > limit) {
        return [vector[0] / length * limit, vector[1] / length * limit];
    }
    return vector;
}