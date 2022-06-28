
let HUD;
let HUD_healthContainer;
let HUD_scoreContainer;
let HUD_score;
let HUD_coins;

let ammoIconBasicID = [];
let healthIcons = [];


function addAmmoIcon() {
    let d = Date.now();
    let ammoIcon = document.createElement("div");
    ammoIcon.className = "ammoBasic";
    ammoIcon.id = d;
    HUD.appendChild(ammoIcon);
    ammoIconBasicID.push(d);
}

function removeAmmoIcon() {
    let elem = document.getElementById(ammoIconBasicID.pop());
    elem.parentNode.removeChild(elem);
}

function addHUD() {
    HUD = document.createElement("div");
    HUD.id = "HUD";
    uiContainer.appendChild(HUD);
}

function addHealthDisplay(health) {
    HUD_healthContainer = document.createElement("div");
    HUD_healthContainer.id = "healthDisplay"
    HUD.appendChild(HUD_healthContainer);

    for (let i = 0; i < health; i++) {
        addHealthIcon();
    }
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

function addScoreContainer() {
    HUD_scoreContainer = document.createElement("div");
    HUD_scoreContainer.id = "scoreDisplay"
    HUD.appendChild(HUD_scoreContainer);
    
    HUD_score = document.createElement("div");
    HUD_score.className = "score";
    HUD_score.innerHTML = "0";
    HUD_scoreContainer.appendChild(HUD_score);

    HUD_coins = document.createElement("div");
    HUD_coins.className = "score";
    HUD_coins.innerHTML = "0";
    HUD_scoreContainer.appendChild(HUD_coins);
}