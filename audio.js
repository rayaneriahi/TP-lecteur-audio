const audioButton = document.getElementById("audioButton");
const audio = document.querySelectorAll(".myAudio");
console.log(audio)
let a = 0
console.log(audio.length - 1)

audioButton.addEventListener("click", () => {
        if (audio[a].paused) {
            audioButton.textContent = "Pause";  // Change le texte du bouton
            fadeInAudio(a)
        } else {
            audio[a].pause();  // Met en pause
            audioButton.textContent = "Play";  // Remet le texte à "Play"
        }
})

// Fonction pour lancer le fade-in d'un morceau
function fadeInAudio(a) {
    console.log("fadein")
    audio[a].play();  // Démarre la lecture
    audio[a].volume = 0;
    let fadeInInterval = setInterval(() => {
        if (audio[a].volume < 0.1) {
            audio[a].volume += 0.001 // Augmente progressivement le volume
        } else {
            if (audio[a].currentTime > audio[a].duration - 10) {
                console.log(audio[a].currentTime)
                fadeOutAudio(a)
                clearInterval(fadeInInterval); // Arrête le fade-in au volume maximal
            }
        }
    }, 100);
}

// Fonction pour lancer le fade-out et préparer le prochain morceau
function fadeOutAudio(a) {
    console.log("fadeout")
    let fadeOutInterval = setInterval(() => {
        if (audio[a].volume > 0.001) {
            audio[a].volume -= 0.001 // Diminue progressivement le volume
            console.log(audio[a].volume, audio[a].currentTime)
        } else {
            clearInterval(fadeOutInterval);
            audio[a].pause();
            if (audio.length - 1 > a) {
            a++
            fadeInAudio(a)
            }
        }
    }, 100);
}