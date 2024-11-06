const audioButton = document.getElementById("audioButton");
const repeatButton = document.getElementById("repeatButton");
const audio = document.querySelectorAll(".myAudio");
let a = 0;

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
                audio[a].play();
            }
            else {
                audio[a].play();
            }
        } else {
            audio[a].pause();  // Met en pause
            audioButton.textContent = "Play";  // Remet le texte à "Play"
        }
});

// Fonction pour lancer le fade-in d'un morceau
function fadeInAudio(a) {
    audio[a].play();  // Démarre la lecture
    audio[a].volume = 0;
    let fadeInInterval = setInterval(() => {
        if (audio[a].volume < 0.001) {
            audio[a].volume += 0.001 // Augmente progressivement le volume
            console.log("audio[a].volume")
        } else {
            if (audio[a].currentTime > audio[a].duration - 10) {
                fadeOutAudio(a)
                clearInterval(fadeInInterval); // Arrête le fade-in au volume maximal
            }
        }
    }, 100);
};

// Fonction pour lancer le fade-out et préparer le prochain morceau
function fadeOutAudio(a) {
    let fadeOutInterval = setInterval(() => {
        if (audio[a].volume > 0.001) {
            audio[a].volume -= 0.001 // Diminue progressivement le volume
            console.log("audio[a].volume")
        }
        else {
            clearInterval(fadeOutInterval);
            audio[a].pause();
            if (audio.length - 1 > a) {
            a++
            fadeInAudio(a)
            }
        }
    }, 100);
};