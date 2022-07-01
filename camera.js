class Camera {

    x = 0;
    y = 0;
    shakeUpdateTime = 50;
    shakeAmplifier = 0;
    shakeAnim;

    update(deltaTime) {
        
        if (this.currentShakeTime > this.shakeUpdateTime) {
            
            let randomX = (Math.random() * 2 * this.shakeForce) - this.shakeForce;
            let randomY = (Math.random() * 2 * this.shakeForce) - this.shakeForce;

            this.x = randomX * this.shakeAnim.value;
            this.y = randomY * this.shakeAnim.value;

            

            this.currentShakeTime = 0;
        }

        translate(this.x, this.y);

        if (this.shakeAnim != null) {
            this.shakeAnim.update(deltaTime);
        }
        this.currentShakeTime += deltaTime * 1000;
    }

    startShake(force, shakeDuration) {
        this.shakeForce = force;
        this.shakeDuration = shakeDuration;
        this.currentShakeTime = 0;
        this.shakeAnim = new Anim(1, 0, shakeDuration, 2);
    }
}