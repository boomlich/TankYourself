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

function mod(n, m) {
    return ((n % m) + m) % m;
}


function parametricBlend(t) {
    let sqt = t * t;
    return sqt / (2.0 * (sqt - t) + 1.0);
}

function easeOutElastic(x) {
    const c4 = (2 * Math.PI) / 3;
    
    return x === 0
      ? 0
      : x === 1
      ? 1
      : pow(2, -10 * x) * sin((x * 10 - 0.75) * c4) + 1;
    }
