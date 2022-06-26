class Anim {
    constructor(start, end, duration, animCurve) {
        this.start = start;
        this.end = end;
        this.differance = this.end - this.start;
        this.currentProgress = 0;
        this.totalDuration = duration;
        this.currentDuration = 0;
        this.progressPerTime = this.differance / this.totalDuration;
        this.current = start;
        this.value = 0;
        this.animCurve = animCurve;
    }

    update(deltaTime) {

        this.currentDuration += deltaTime;
        if (this.currentDuration > this.totalDuration) {
            return false;
        }

        let multiplier = 0;
        if (this.animCurve === 0) {
            multiplier = this.currentProgress / this.differance;
        } else if (this.animCurve === 1) {
            multiplier = parametricBlend(this.currentProgress / this.differance);
        } else if (this.animCurve === 2) {
            multiplier = easeOutElastic(this.currentProgress / this.differance);
        }

        this.value = this.start + this.differance * multiplier;
        this.currentProgress += this.progressPerTime * deltaTime;

        return true;
    }
}