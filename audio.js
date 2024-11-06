const audioButton = document.getElementById("audioButton");
const repeatButton = document.getElementById("repeatButton");
const audio = document.querySelectorAll(".myAudio");
let a = 0

let repeatMode = "none"; // Options possibles: "none", "track", "playlist"


// Bouton de répétition pour alterner entre les modes
repeatButton.addEventListener("click", () => {
    if (repeatMode === "none") {
        repeatMode = "track";
        repeatButton.textContent = "Repeat Track"; // Mode "Répéter la piste"
    } else if (repeatMode === "track") {
        repeatMode = "playlist";
        repeatButton.textContent = "Repeat Playlist"; // Mode "Répéter la playlist"
    } else {
        repeatMode = "none";
        repeatButton.textContent = "No Repeat"; // Mode "Aucune répétition"
    }
});

audioButton.addEventListener("click", () => {
        if (audio[a].paused) {
            audioButton.textContent = "Pause";  // Change le texte du bouton
            if (audio[a].currentTime == 0) {
                playSong(a) 
            }
            else {
                audio[a].play();
            }
        } else {
            audio[a].pause();  // Met en pause
            audioButton.textContent = "Play";  // Remet le texte à "Play"
        }
});
function playSong(a) {
    audio[a].play();  // Démarre la lecture
    audio[a].volume = 0;
};

function fadeIn(a) {
    if (audio[a].volume < 1) {
        audio[a].volume + 0.01 // Augmente progressivement le volume
}
};

function fadeInCurrentTime(a) {
    if (audio[a].currentTime > audio[a].duration - 10) {
        fadeOut(a)
        clearInterval(fadeInInterval); // Arrête le fade-in au volume maximal
}
};
// Fonction pour lancer le fade-in d'un morceau
//function fadeInAudio(a) {
    //console.log("fadein")
    //audio[a].play();  // Démarre la lecture
    //audio[a].volume = 0;
    //let fadeInInterval = setInterval(() => {
        //if (audio[a].volume < 0.1) {
            //audio[a].volume += 0.001 // Augmente progressivement le volume
        //} else {
            //if (audio[a].currentTime > audio[a].duration - 10) {
                //fadeOutAudio(a)
                //clearInterval(fadeInInterval); // Arrête le fade-in au volume maximal
            //}
        //}
    //}, //100);


// Fonction pour lancer le fade-out et préparer le prochain morceau
function fadeOutAudio(a) {
    console.log("fadeout")
    let fadeOutInterval = setInterval(() => {
        if (audio[a].volume > 0.001) {
            audio[a].volume -= 0.001 // Diminue progressivement le volume
        } else {
            clearInterval(fadeOutInterval);
            audio[a].pause();
            if (audio.length - 1 > a) {
            a++
            fadeInAudio(a)
            }
        }
    }, 100);
};

// Gestion du passage à la piste suivante ou de la répétition
function handleNextTrack() {
    if (repeatMode === "track") {
        fadeInAudio(a); // Répète la piste actuelle avec fade-in
    } else if (repeatMode === "playlist" && a === audio.length - 1) {
        a = 0; // Recommence la playlist au début
        fadeInAudio(a);
    } else if (a < audio.length - 1) {
        a++; // Passe à la piste suivante
        fadeInAudio(a);
    } else {
        audioButton.textContent = "Play"; // Réinitialise le bouton
    }
};
console.log(repeatMode);