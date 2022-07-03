
let onMainMenu;
let pauseMenu;

let HUD;
let HUD_healthContainer;
let HUD_scoreContainer;
let HUD_score;
let HUD_coins;
let HUD_ammoContainer
let HUD_combo;

let HUD_ammoDisplayPrimary;
let HUD_ammoDisplaySecondary;

let healthIcons = [];


let ammoPrimary = [];
let ammoSecondary = [];

function addMainMenu() {
    uiContainer.innerHTML = `
    <div id = "mainMenuPanel">
        <div id = "mainMenuButtons">
            <button class = "button inGameMButton" onclick = "gameModel.startGame()">Play</button>
            <button class = "button inGameMButton" onclick = "options()">Options</button>
        </div>
        <div id = "credits">Code, art and sound: Thomas Matre.<br> Music/sound: Pixabay.com</div>
    </div>
    `
}

function mainMenuOptions() {
    uiContainer.innerHTML = `
    <div class = inGameMenu>
    
        <div class = "inGameMenuTitle">Options</div>

        
    
    </div>
    `
}

function gameOverScreen (elapsedTime, gameScore, gameCoins, totalComboPoints) {

    uiContainer.innerHTML =`
    <div class = "inGameMenu delay">
        <div class = "inGameMenuTitle"> Game over</div>
        <div id = "gameOverScorePanel">
            <div class = "gameOverScore title">Score</div>
            <div id ="gameOverScoreText" class = "gameOverScore">` + gameScore + `</div>
        </div>
        
        <div class = "gameOverSummary">

            <div class = "gameOverSummaryTitle">Game Summary</div>

            <div class = "gameOverSummaryContainer left">
                <h6>Combo points earned</h6>
                <div id = "gameOverComboPoints">` + totalComboPoints + `</div>
            </div>

            <div class = "gameOverSummaryContainer right">
                <h6>Time played</h6>
                <div id = "gameOverTimer">` + elapsedTime + `</div>
            </div>

            <div class = "gameOverSummaryContainer left">
                <h6>Coins earned</h6>
                <div id = "gameOverCoins">` + gameCoins + `</div>
            </div>

            <div class = "gameOverSummaryContainer right"></div>
        </div>

        <div id = "gameOverMenuPanel">
            <button class = "button inGameMButton" onclick = "gameModel.startGame()">Restart</button>
            <button class = "button inGameMButton" onclick = "gameModel.startMainMenu()">Main menu</button>
        </div>
    </div>
    `;
}

function addAmmoDisplay() {
}

function addAmmoIcon() {
}

function removeAmmoIcon() {

}

function addPauseMenu(elapsedTime) {

    console.log(sfxEnabled);
    uiContainer.innerHTML = `
    <div id = "HUD">
        <div class = "inGameMenu">
            <div class = "inGameMenuTitle"> Game paused</div>
            <div class = "inGameMenuButtonPanel">
                <button class = "button inGameMButton" onclick = "gameModel.pauseGame()">Resume</button>
                <button class = "button inGameMButton" onclick = "gameModel.startGame()">Restart</button>
                <button class = "button inGameMButton" onclick = "options()">Options</button>
                <button class = "button inGameMButton" onclick = "gameModel.startMainMenu()">Main menu</button>
            </div>

            <div id = "pauseMenuTimerPanel">
                <div>Timer:</div>
                <div id = "pauseTimer">` + elapsedTime +  `</div>
            </div>

            <div id = "pauseMenuAudioPanel">
                <div class = "menuSliderPanel">
                    <div id = "pauseAudioText">SFX</div>
                    <input type="checkbox" id="sfx" name="sfx" value="sfx" checked = "` + sfxEnabled + `" onchange = "disableAudioChanel(this.value, this.checked)">
                    <input type="range" min="0" max="100" value="` + (sfxVolume * 100) + `" class="slider" id="sfxSlider" onchange="sfxVolumeAdjust(this.value)">
                </div>
                <div class = "menuSliderPanel">
                    <div id = "pauseAudioText">Music</div>
                    <input type="checkbox" id="music" name="music" value="music" checked = "` + musicEnabled + `" onchange = "disableAudioChanel(this.value, this.checked)">
                    <input type="range" min="0" max="100" value="` + (musicVolume * 100) + `" class="slider" id="musicSlider" onchange="audioAdjustVolume(this.id, this.value)">
                </div>
            </div>
        </div>
    </div>
    `;
}

function addHUD() {
    uiContainer.innerHTML = `
    <div id = "HUD">
        <div id = "healthDisplay"></div>

        <div id = "scoreDisplay">

            <div id = "scoreText" class = "HUDscoreText">0</div>
            <div class = "score">
                <div class = "diamond"></div>
                <div id = "coinText" class = "HUDscoreText">0</div>
            </div>
        </div>

        <div id = "ammoPanel">

            <div id ="primary" class = "ammoDisplay"></div>

            <div class = "ammoDivider"></div>

            <div id = "secondary" class = "ammoDisplay"></div>

        </div>

        <div id = "pause">
            <button class = "button bPause" onclick = "gameModel.pauseGame()"></button>
        </div>

        <div id = "combo">23 x 1.25</div>
    </div>
    `;

    HUD_healthContainer = document.getElementById("healthDisplay");
    HUD_score = document.getElementById("scoreText");
    HUD_coins = document.getElementById("coinText");
    HUD_combo = document.getElementById("combo");

    HUD_ammoDisplayPrimary = document.getElementById("primary");
    HUD_ammoDisplaySecondary = document.getElementById("secondary");

    healthIcons = [];
    ammoPrimary = [];
    ammoSecondary = [];
}

function addHealthIcon() {
    HUD_health = document.createElement("div");
    HUD_health.className = "heart"
    HUD_healthContainer.appendChild(HUD_health);
    healthIcons.push(HUD_health);
}

function removeHealthIcon() {
    if (healthIcons.length > 0) {
        let heart = healthIcons.pop();
        HUD_healthContainer.removeChild(heart);
    }
}

function updateHealthIcons(health) {
    if (health > healthIcons.length) {
        addHealthIcon();
        updateHealthIcons(health);
    } else if (health < healthIcons.length) {
        removeHealthIcon();
        updateHealthIcons(health);
    }
}

function updateAmmoIcons(primCount, secCount) {
    if (primCount > ammoPrimary.length) {
        addAmmoIcon(true);
        updateAmmoIcons(primCount, secCount);
    } else if (primCount < ammoPrimary.length) {
        removeAmmoIcon(true);
        updateAmmoIcons(primCount, secCount)
    } else if (secCount > ammoSecondary.length) {
        addAmmoIcon(false);
        updateAmmoIcons(primCount, secCount);
    } else if (secCount < ammoSecondary.length) {
        removeAmmoIcon(false);
        updateAmmoIcons(primCount, secCount);
    }
}

function addAmmoIcon(isPrimary) {
    let ammoIcon = document.createElement("div");
    ammoIcon.className = "ammo";
    if (isPrimary) {
        HUD_ammoDisplayPrimary.appendChild(ammoIcon);
        ammoPrimary.push(ammoIcon);
    } else {
        HUD_ammoDisplaySecondary.appendChild(ammoIcon);
        ammoSecondary.push(ammoIcon);
    }
}


function removeAmmoIcon(isPrimary) {
    if (isPrimary) {
        HUD_ammoDisplayPrimary.removeChild(ammoPrimary.pop());
    } else {
        HUD_ammoDisplaySecondary.removeChild(ammoSecondary.pop());
    }
}

function updateCombo(){
    HUD_combo.classList.add("pop");
}

function removePop() {
    HUD_combo.classList.remove("pop");
}