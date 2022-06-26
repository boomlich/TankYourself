

// const HUD = document.getElementById("HUD");
let ammoIconBasicID = [];


function addAmmoIcon() {
    let d = Date.now();
    let ammoIcon = document.createElement("div");
    ammoIcon.className = "ammoBasic";
    ammoIcon.id = d;
    console.log(d);
    HUD.appendChild(ammoIcon);
    ammoIconBasicID.push(d);
    console.log(ammoIconBasicID);
}

function removeAmmoIcon() {
    let elem = document.getElementById(ammoIconBasicID.pop());
    elem.parentNode.removeChild(elem);
}