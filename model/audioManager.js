let sfxEnabled = true;
let musicEnabled = true;
let sfxVolume = 0.8;
let musicVolume = 0.3;

function playSFX(sfx) {
    if (sfxEnabled) {
        sfx.currentTime = 0;
        sfx.volume = sfxVolume;
        sfx.play();
    }
}

function playMusic(music) {
    if (musicEnabled) {
        music.currentTime = 0;
        music.volume = musicVolume;
        music.loop = true;
        music.play();
    }
}

function audioAdjustVolume(chanel, value) {
    if (chanel === "sfxSlider") {
        sfxVolume = value / 100;
    } else if (chanel === "musicSlider") {
        musicVolume = value / 100;
        music_a.volume = musicVolume;
    }
}

function sfxVolumeAdjust(value) {
    sfxVolume = value / 100;
    console.log(sfxVolume);
}

function musicVolumeAdjust(value) {
    musicVolume = value / 100;
    console.log(musicVolume);
}

function disableAudioChanel(chanel, value) {
    if (chanel === "sfx") {
        sfxEnabled = value;
    } else if (chanel === "music") {
        musicEnabled = value;
    }

    console.log("SFX: " + sfxEnabled);
    console.log("Music: " + musicEnabled);
}