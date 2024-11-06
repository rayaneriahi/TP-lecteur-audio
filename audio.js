const audioButton = document.getElementById("audioButton");

const repeatButton = document.getElementById("repeatButton");
let fadeInInterval;
let fadeOutInterval;
let fadeOut = false;
let fadeInOn = false;
let fadeOutOn = false;
let audioVolume = false;
//const audio = document.querySelectorAll(".myAudio");
//let a = 0;

const audio = document.querySelector("#myAudio");


// let repeatMode = "none"; // Options possibles: "none", "track", "playlist"


// Bouton de répétition pour alterner entre les modes
// repeatButton.addEventListener("click", () => {
//     if (repeatMode === "none") {
//         repeatMode = "track";
//         repeatButton.textContent = "Repeat Track"; // Mode "Répéter la piste"
//     } else if (repeatMode === "track") {
//         repeatMode = "playlist";
//         repeatButton.textContent = "Repeat Playlist"; // Mode "Répéter la playlist"
//     } else {
//         repeatMode = "none";
//         repeatButton.textContent = "No Repeat"; // Mode "Aucune répétition"
//     }
// });


audioButton.addEventListener("click", () => {
        if (audio.paused) {
            audioButton.textContent = "Pause";  // Change le texte du bouton
            if (audio.currentTime == 0) {
                fadeInAudio();
            }
            else {
                audio.play();
                if (fadeInOn){
                    let fadeInInterval = setInterval(() => {
                        const audioButton = document.getElementById("audioButton");
                        audioButton.addEventListener("click", () => {
                            clearInterval(fadeInInterval)
                        })
                    if (audio.volume < 0.2) {
                        audio.volume += 0.002  
                        console.log(audio.volume) 
                    }
                    else {
                        clearInterval(fadeInInterval)
                        console.log("Fade In Off")
                    }
                    }, 100)
                } else if (fadeOutOn) {
                    if (audioVolume == false ) {
                        audio.volume = 0.2;
                        audioVolume = true;
                    }
                let fadeOutInterval = setInterval(() => {
                    const audioButton = document.getElementById("audioButton");
                    audioButton.addEventListener("click", () => {
                        clearInterval(fadeOutInterval)
                    })
                if (audio.volume > 0.002) {
                    audio.volume -= 0.002  
                    console.log(audio.volume) 
                }
                else {
                    clearInterval(fadeOutInterval)
                    console.log("Fade Out Off")
                }
                }, 100)
            }
            }
        } else {
            audio.pause();  // Met en pause
            clearInterval (fadeInInterval)
            clearInterval (fadeOutInterval)
            audioButton.textContent = "Play";  // Remet le texte à "Play"
        }
});

// Fonction pour lancer le fade-in d'un morceau
function fadeInAudio() {
    audio.play();  // Démarre la lecture
    audio.volume = 0;
    fadeInOn = true;
    fadeInInterval = setInterval(() => {
        const audioButton = document.getElementById("audioButton");
        audioButton.addEventListener("click", () => {
            clearInterval(fadeInInterval)
        })
        if (audio.volume < 0.2) {
            audio.volume += 0.002  
            console.log(audio.volume) 
        }
        else {
            fadeInOn = false;
            clearInterval(fadeInInterval)
            console.log("Fade In Off")
        }
        // if (audio.volume < 0.001) {
        //     audio.volume += 0.001 // Augmente progressivement le volume
        //     console.log("audio.volume")
        // } else {
        //     if (audio.currentTime > audio.duration - 10) {
        //         fadeOutAudio()
        //         clearInterval(fadeInInterval); // Arrête le fade-in au volume maximal
        //     }
        // }
    }, 100);
};

audio.addEventListener("timeupdate", () => {
    if (audio.currentTime > audio.duration - 10 ) {
        if (fadeOut == false) {
            fadeOutAudio()
            console.log("ok ou pas")
        }
        fadeOut = true;
        fadeInOn = false;
    }
})
// Fonction pour lancer le fade-out et préparer le prochain morceau
function fadeOutAudio() {
    audio.volume = 0.2
    clearInterval(fadeInAudio)
    fadeOutOn = true;
    fadeOutInterval = setInterval(() => {
        if (audio.volume > 0.002) {
            audio.volume -= 0.002 // Diminue progressivement le volume
            console.log(audio.volume)
        }
        else {
            fadeOutOn = false;
            clearInterval(fadeOutInterval);
            audio.pause();
            //if (audio.length - 1 > a) {
            //a++
            //fadeInAudio(a)
            //}
        }
    }, 100);
};