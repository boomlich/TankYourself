class EnemySpawnManager {
    constructor(gameModel, edge, playerPosition) {
        this.enemySpawners = [
            new EnemySpawner(new EnemyBasic([0, 0], playerPosition), 0.1, 0.20, 0, 400, gameModel, edge),
            new EnemySpawner(new EnemyMega([0, 0], playerPosition), 0.01, 0.1, 50, 400, gameModel, edge),
            new EnemySpawner(new EnemyGiga([0, 0], playerPosition), 0.005, 0.05, 100, 400, gameModel, edge),
        ];
    }

    update(deltaTime) {
        for (const spawner of this.enemySpawners) {
            spawner.update(deltaTime);
        }
    }
}


class EnemySpawnMenu extends EnemySpawnManager {
    constructor(gameModel, edge, playerPosition) {
        super(gameModel, edge, playerPosition);
        
        for (const spawner of this.enemySpawners) {
            this.setConstantValues(spawner);
        }
    }

    setConstantValues(spawner) {
        spawner.currentChance = 0.1;
        spawner.chanceLimit = 0.1;
        spawner.incrementPerSec = 0;
    }
}

class EnemySpawner {
    constructor(enemy, startChance, chanceLimit, startTime, increaseTime, gameModel, edge) {
        this.enemy = enemy;
        this.currentChance = startChance;
        this.chanceLimit = chanceLimit;
        this.startTime = startTime;
        this.gameModel = gameModel;
        this.edge = edge;

        this.incrementPerSec = (chanceLimit - startChance) / increaseTime;
    }

    update(deltaTime) {
        if (gameModel.elapsedTime > this.startTime || this.gameModel.onMainMenu) {
            if (this.currentChance < this.chanceLimit) {
                this.currentChance += this.incrementPerSec * deltaTime;
            } else {
                this.currentChance = this.chanceLimit;
            }
            this.enemySpawnRoll(deltaTime);
        }
    }

    enemySpawnRoll(deltaTime) {
        let roll = Math.random();
        let chance = this.currentChance * deltaTime;

        if (roll < chance) {
            this.spawnEnemyAtRandomPos();
        }
    }

    spawnEnemyAtRandomPos() {
        let pos = this.edge.progressToPoint(Math.floor(Math.random() * 101));
        this.gameModel.addEnemy(this.enemy.makeCopyAtPos(pos));
    }
}