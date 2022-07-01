
let pauseMenu;

let HUD;
let HUD_healthContainer;
let HUD_scoreContainer;
let HUD_score;
let HUD_coins;
let HUD_ammoContainer
let HUD_combo;

let ammoIconBasicID = [];
let healthIcons = [];

function addAmmoDisplay() {
    // HUD_ammoContainer = document.createElement("div");
    // HUD_ammoContainer.id = "ammoDisplay";
    // HUD.appendChild(HUD_ammoContainer);
}

function addAmmoIcon() {
    // let d = Date.now();
    // let ammoIcon = document.createElement("div");
    // ammoIcon.className = "ammoBasic";
    // ammoIcon.id = d;
    // HUD.appendChild(ammoIcon);
    // ammoIconBasicID.push(d);
}

function removeAmmoIcon() {
    // let elem = document.getElementById(ammoIconBasicID.pop());
    // elem.parentNode.removeChild(elem);
}

function addPauseMenu(elapsedTime) {
    pauseMenu = document.createElement("div");
    HUD.id = "pauseMenu"
    uiContainer.appendChild(pauseMenu);

    pauseMenu.innerHTML = `
    <div class = "inGameMenu">
        <div class = "inGameMenuTitle"> Game paused</div>
        <div class = "inGameMenuButtonPanel">
            <button class = "button inGameMButton" onclick = "pauseGame()">Resume</button>
            <button class = "button inGameMButton" onclick = "restartGame()">Restart</button>
            <button class = "button inGameMButton" onclick = "options()">Options</button>
            <button class = "button inGameMButton" onclick = "mainMenu()">Main menu</button>
        </div>

        <div id = "pauseMenuTimerPanel">
            <div>Timer:</div>
            <div id = "pauseTimer">02:53</div>
        </div>

        <div id = "pauseMenuAudioPanel">
            <div class = "menuSliderPanel">
                <div id = "pauseAudioText">SFX</div>
                <input type="checkbox" id="sfx" name="sfx" value="sfx">
                <input type="range" min="0" max="100" value="100" class="slider" id="sfxSlider">
            </div>
            <div class = "menuSliderPanel">
                <div id = "pauseAudioText">Music</div>
                <input type="checkbox" id="music" name="music" value="music">
                <input type="range" min="0" max="100" value="100" class="slider" id="musicSlider">
            </div>
        </div>
    </div>
    `
    let pauseTimer = document.getElementById("pauseTimer");
    pauseTimer.innerHTML = elapsedTime;
}

function removePauseMenu() {
    uiContainer.removeChild(pauseMenu);
}

function removeHUD() {
    uiContainer.removeChild(HUD);
    healthIcons = [];
}

function addHUD(health) {
    HUD = document.createElement("div");
    HUD.id = "HUD";
    uiContainer.appendChild(HUD);

    HUD.innerHTML = `
    <div id = "healthDisplay"></div>

    <div id = "scoreContainer">
        <div class = "score">
            <div id = "scoreText" class = "score">0</div>
        </div>
        <div class = "score">
            <div id = "coinText" class = "score">0</div>
            <div class = "coinIcon"></div>
        </div>
    </div>

    <div id = "ammoContainer">
        <div class = "ammo"></div>
        <div class = "ammo"></div>
        <div class = "ammo"></div>
    </div>

    <div id = "pause">
        <button class = "button bPause" onclick = "pauseGame()"></button>
    </div>

    <div id = "combo">23 x 1.25</div>
    `;

    HUD_healthContainer = document.getElementById("healthDisplay");
    HUD_score = document.getElementById("scoreText");
    HUD_coins = document.getElementById("coinText");
    HUD_combo = document.getElementById("combo");
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
        updateHealthIcons();
    }
}

function updateCombo(){
    HUD_combo.classList.add("pop");
}

function removePop() {
    HUD_combo.classList.remove("pop");
}