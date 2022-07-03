class ScoreManager {

    constructor() {
        this.init();
        this.comboExpirationTime = 4000; // if no points gained before this time limit is reached, combo expires.
        this.comboExirationDelay = 400; // points gained before this delay, gives full combo (in ms).
        this.comboExpirationDiff = this.comboExpirationTime - this.comboExirationDelay;
        this.MaxcomboMutliplierPerScore = 0.25; // maximum combo possible to gain at each score
        this.comboMultiplierLimit = 5; // biggest possible combo multiplier the player can gain
    }

    init() {
        this.score = 0;
        this.coins = 0;
        this.totalComboPoints = 0;
        this.highestComboMultiplier = 0;
        this.resetCombo();
    }

    resetCombo() {
        this.comboMultiplier = 0;
        this.currentComboPoints = 0;
        this.countdownTime = 0;
    }

    addCoins(coins) {
        this.coins += coins;
        this.addCombo(coins);

        if (this.coins % 15 == 0) {
            gameModel.addHealth();
        }
    }

    addScore(score) {
        this.score += score;
        this.addCombo(score);
    }

    getScoreComboString() {
        if (this.comboMultiplier > 1) {
            return this.currentComboPoints + " x " + roundToDecimal(this.comboMultiplier, 2);
        } else {
            return "";
        }
    }

    addCombo(score) {
        if (this.comboMultiplier === 0) {
            this.comboMultiplier = 1;
        } else {
            if (this.countdownTime > this.comboExpirationDiff) {
                this.comboMultiplier += this.MaxcomboMutliplierPerScore;
            } else {
                this.comboMultiplier += this.MaxcomboMutliplierPerScore * this.countdownTime / this.comboExpirationDiff;
                this.currentComboPoints += score;
            }

            // Limit combo multiplier by the maximum allowed multiplier
            if (this.comboMultiplier > this.comboMultiplierLimit) {
                this.comboMultiplier = this.comboMultiplierLimit;
            }
            updateCombo();
        }
        this.countdownTime = this.comboExpirationTime;
    }

    update(deltaTime) {
        if (this.comboMultiplier > 0) {
            if (this.countdownTime < 0) {
                let accumulatedScore = Math.floor(this.currentComboPoints * this.comboMultiplier);
                this.score += accumulatedScore;
                this.totalComboPoints += accumulatedScore;
                this.resetCombo();
            }
            this.countdownTime -= deltaTime * 1000;
        }
    }
}