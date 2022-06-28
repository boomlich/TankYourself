

// const HUD = document.getElementById("HUD");
let ammoIconBasicID = [];


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