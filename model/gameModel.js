class GameModel {

    fps;
    elapsedTime;
    enemySpawnChance;


    constructor(width, height) {
        this.entityManager = new EntityManager();
        this.scoreManager = new ScoreManager();
        this.edge = new Edge(width, height, 10);
        this.playerPosition = [width / 2, height / 2];
        this.cam = new Camera();
        // this.startGame();
        this.startMainMenu();
    }

    startMainMenu() {
        
        this.entityManager.init();
        this.menuTitle = new MenuTitle();
        this.enemySpawnManager = new EnemySpawnMenu(this, this.edge, this.menuTitle.midPosition);
        this.onMainMenu = true;
        this.isGameOver = false;
        this.elapsedTime = 0;
        this.prevTime = this.getNowTime();
        addMainMenu();

    }

    startGame() {
        addHUD();
        playMusic(music_a);
        this.entityManager.init();
        this.player = new PlayerCharacter(this.playerPosition, 1, 1, 3);
        this.enemySpawnManager = new EnemySpawnManager(this, this.edge, this.playerPosition);
        this.gameActive = true;
        this.isGameOver = false;
        this.onMainMenu = false;
        this.elapsedTime = 0;
        this.scoreManager.init();
        this.prevTime = this.getNowTime();    
    }

    setGameOver() {
        gameOverScreen(this.formatDateTimer(this.elapsedTime), this.scoreManager.score, this.scoreManager.coins, this.scoreManager.totalComboPoints);
        this.isGameOver = true;
        playSFX(sfx_gameOverA);
        playSFX(sfx_gameOverB);
        music_a.pause();
    }

    getPlayerHealth() {
        if (this.player != null) {
            return this.player.health;
        }
        return 0;
    }

    addHealth() {
        if (this.player.health < this.player.maxHealth) {
            this.player.health += 1;
        }
    }

    playerFire(fireTime) {
        this.player.fireWeapon(fireTime);
    }

    addProjectile(projectile) {
        this.entityManager.addProjectile(projectile)
    }

    addCoin(coin) {
        this.entityManager.addCoin(coin);
    }

    enemyDeath(enemy, projectileHit) {
        if (projectileHit) {
            this.scoreManager.addScore(enemy.score);
        } else {
            this.scoreManager.resetCombo();
        }
    }

    pickupCoin(coin) {
        this.scoreManager.addCoins(coin.value);
        coin.picupCoin();
    }

    addEnemy(enemy) {
        this.entityManager.addEnemy(enemy);
    }

    addParticle(particle) {
        this.entityManager.addParticle(particle);
    }


    addEnemySeed(enemySeed) {
        this.entityManager.addEnemySeed(enemySeed);
    }

    pauseGame() {
        if (this.gameActive) {
            this.gameActive = false;
            addPauseMenu(this.formatDateTimer(this.elapsedTime));
            music_a.pause();
        } else {
            this.prevTime = this.getNowTime();
            this.gameActive = true;
            addHUD();
            music_a.play();
        }
    }

    formatDateTimer(elapsedTime) {
        let minutes = Math.floor(elapsedTime / 60);
        let seconds = elapsedTime - minutes * 60;

        if (minutes < 10) {
            minutes = "0" + minutes;
        } else {
            minutes = Math.floor(minutes);
        }
        if (seconds < 10) {
            seconds = "0" + Math.floor(seconds);
        } else {
            seconds = Math.floor(seconds);
        }

        return minutes + ":" + seconds;
    }

    getNowTime() {
        let d = new Date()
        return d.getTime();
    }


    update() {
        // Calculate time between frames
        let nowTime = this.getNowTime();
        deltaTime = (nowTime - this.prevTime) / 1000.0;
        this.prevTime = nowTime;

        this.fps = 1 / deltaTime;

        if (this.onMainMenu) {
            this.entityManager.update(deltaTime);
            this.enemySpawnManager.update(deltaTime);
            this.menuTitle.update(deltaTime);
        } else {
            if (this.gameActive) {

                this.elapsedTime += deltaTime;
    
                // update entities
                this.entityManager.update(deltaTime);
                if (!this.isGameOver) {
                    this.player.update(deltaTime, mouseDirection);
                    this.enemySpawnManager.update(deltaTime);
                }
                this.scoreManager.update(deltaTime);
                HUD_score.innerHTML = this.scoreManager.score;
                HUD_coins.innerHTML = this.scoreManager.coins;
                HUD_combo.innerHTML = this.scoreManager.getScoreComboString();
                updateHealthIcons(this.player.health);
                
            }
        }
        this.cam.update(deltaTime);
    }
}