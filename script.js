const btnPlaylist = document.querySelectorAll('.btnPlaylist');
let nextSongFade = null;
let audio = null;
let stopClick = false
 
btnPlaylist.forEach(btn => {
    btn.addEventListener('click', async () => {
        console.log(btn.dataset.playlistId)
        const response = await fetch("song.php", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "playlistId": btn.dataset.playlistId
            })
        });
        const data = await response.json();

        const playlists = document.querySelector('#playlists');
        playlists.classList.add('-translate-x-full', 'sm:-translate-x-0');

        const song = document.querySelector('#song');
        const playlist = document.querySelector('#playlist')
        playlist.classList.remove("w-full")
        playlist.classList.add("w-1/2")
        song.classList.add("h-full", "w-1/2", "overflow-y-auto", "flex", "flex-col")
        song.innerHTML = `<div class="flex flex-row items-center space-x-5 justify-center h-1/6"><img src="${data.playlist[0].picture}" class="size-28 rounded-xl bg-black"><div class="flex flex-col ml-5 justify-center"><h1 class="text-white text-4xl">${data.playlist[0].name}</h1><span class="text-gray-400 text-xl">${data.playlist[0].author}</span></div></div> <div class="flex flex-row px-5 flex-wrap">${data.songs.map(song => `<div data-song-number="${song.songNumber}" class="cursor-pointer flex flex-row items-center btnsSong space-x-3 p-5 m-5 hover:bg-gray-600"><img class="size-14 rounded-xl bg-black" src="${song.picture}"><div class="flex flex-col"><span class="cursor-pointer text-white text-base">${song.name}</span><span class="text-sm cursor-pointer text-gray-400">${song.artist}</span></div></div>`).join('')}</div>`
        const btnsSong = document.querySelectorAll('.btnsSong')
        btnsSong.forEach(btnSong => {
            btnSong.addEventListener('click', () => {

                if (!stopClick) {
                    if (audio !== null) {
                        audio.pause();
                    }

                    const playerContainer = document.querySelector('#player-container');
                    const player = document.querySelector('#player')
                    const comment = document.querySelector('#comment')
                    playerContainer.classList.add("translate-y-0", "flex", "flex-col", "border-black", "border-l-2", "h-full", "w-1/2")
                    player.classList.add("w-full", "h-1/2", "border-black", "border-b-2", "items-center", "justify-center", "flex", "flex-col", "space-y-20",  "px-10")
                    comment.classList.add("w-full", "h-1/2", "p-5", "space-y-5", "overflow-y-auto", "break-all")
                    playlist.classList.remove("w-1/2")
                    playlist.classList.add("w-1/3")
                    song.classList.remove("w-1/2")
                    song.classList.add("w-1/3")

                    displayComment(btnSong.dataset.songNumber, data)
                    displaySong(data, btnSong.dataset.songNumber, false, false, false, true, null)
                }

            })
        });
    });
})



async function displayComment(songNumber, data) {
        let songId = null;
        data.songs.forEach(song => {
            if (song.songNumber == songNumber) {
                songId = song.id
            }
        });
        const response = await fetch("comment.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "songId": songId
        })
    });
    const data2 = await response.json();
    const comment = document.querySelector('#comment');
    comment.innerHTML = `
    <h1 class="text-white text-4xl mb-3">Comments</h1>
    <form id="form" class="space-y-3" action="add-comment.php" method="post">
    <label for="text" class="text-white pl-3 text-xl">Add a comment :</label><br>
    <div class="flex flex-row items-center space-x-3">
        <input id="inputText" type="text" name="text" class="px-3 py-1 rounded-xl w-4/5 text-xl hover:bg-gray-300" required>
        <button type="submit" class="text-white bg-gray-600 px-3 py-1 rounded-xl text-base hover:bg-gray-500">Comment</button>
    </div>
</form>
<ul class="text-base space-y-3">${data2.commentsText.map(commentText => `<li class='text-white'>• ${commentText}</li>`).join('')}</ul>`

const form = document.querySelector('#form');
form.addEventListener('submit', async(event) => {
    event.preventDefault();
    await fetch("add-comment.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "text": form.querySelector("#inputText").value,
            "songId": songId
        })
    })
    displayComment(songNumber, data)
})
}

async function displaySong(data, songNumber, audioRepete, audioRandom, playAudio, fadeSecure, audio2, data3) {
    let data2 = null
    let intervalfadeIn = null
    let intervalfadeOut = null
    let nextSongFade = false
    audio = null
    let timeEnd = false
    let fadeOff = false

    let songId = null;

    if (!fadeSecure) {
        audio = audio2
        data2 = data3
        stopClick = false
    } else {
        data.songs.forEach(song => {
            if (song.songNumber == songNumber) {
                songId = song.id
            }
        });

        const response = await fetch("fetch-player.php", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "songId": songId
            })
        });
        data2 = await response.json();
        audio = new Audio(data2.song.mp3);
    }

    const btnsSong = document.querySelectorAll('.btnsSong');
    btnsSong.forEach(btnSong => {
        btnSong.addEventListener('click', () => {
            if (!stopClick) {
                if (audio !== null) {
                    audio.pause()
                }
                clearInterval(intervalfadeIn)
                clearInterval(intervalfadeOut)
            }
        })
    });

    console.log(data2)
  
    const player = document.querySelector('#player');
    player.innerHTML = `

        <div class="flex flex-row items-center space-x-5">
            <img src="${data2.song.picture}" class="size-28 rounded-xl bg-black">
            <div class="flex flex-col ml-5 ">
                <h1 class="text-white text-5xl">${data2.song.name}</h1>
                <span class="text-gray-400 text-2xl">${data2.song.artist}</span>
            </div>
        </div>

            <input id="progressBar" class="w-full accent-slate-500" type="range" min="0" max="100" value="0">
        <div class="flex flex-row space-x-4 md:space-x-10 p-2">
            <button id="btnPrevious" class="text-white bg-gray-600 rounded-2xl hover:bg-gray-500 p-4"><img class = "w-10 h-10" src="assets/img/skip-start-fill.svg"></button>
            <button id="btnRandom" class="text-white bg-gray-600 rounded-2xl hover:bg-gray-500 p-4"><img class = "w-10 h-10" src="assets/img/shuffle.svg"></button>
            <button id="btnPlayPause" class="text-white bg-gray-600 rounded-2xl hover:bg-gray-500 p-4"><img class = "w-10 h-10" id="imgPlayPause" src="assets/img/play.svg"></button>
            <button id="btnRepete" class="text-white bg-gray-600 rounded-2xl hover:bg-gray-500 p-4"><img class = "w-10 h-10" src="assets/img/repeat.svg"></button>
            <button id="btnNext" class="text-white bg-gray-600 rounded-2xl hover:bg-gray-500 p-4"><img class = "w-10 h-10" src="assets/img/skip-end-fill.svg"></button>
        </div>
    `        

    const btnPlayPause = document.querySelector('#btnPlayPause');
    const imgPlayPause = document.querySelector('#imgPlayPause');

    if (!fadeSecure) {
        imgPlayPause.src = "assets/img/pause.svg";
    }

    btnPlayPause.addEventListener('click', () => {
        if (audio.paused) {
            audio.play();
            fade();
            imgPlayPause.src = "assets/img/pause.svg";
        } else {
            audio.pause();
            fadeinStop();
            fadeoutStop();
            imgPlayPause.src = "assets/img/play.svg";
        }
    })

    progressBar.addEventListener('change', () => {
        audio.currentTime = (progressBar.value * audio.duration) / 100
    })

    let mouseDown = false
    progressBar.addEventListener('mousedown', () => {
        mouseDown = true
    })

    document.addEventListener('mouseup', () => {
        mouseDown = false
    })

    audio.addEventListener('timeupdate', () => {
        if (mouseDown !== true) {
            progressBar.value = (audio.currentTime / audio.duration) * 100
        }
    })

    let repete = false
    let random = false

    const btnRepete = document.querySelector('#btnRepete');
    btnRepete.addEventListener('click', () => {
        if (repete === false) {
            repete = true
            btnRepete.classList.add("bg-gray-500")
            random = false
            btnRandom.classList.remove("bg-gray-500")
        } else {
            repete = false
            btnRepete.classList.remove("bg-gray-500")
        }
    })

    const btnRandom = document.querySelector('#btnRandom');
    btnRandom.addEventListener('click', () => {
        if (random === false) {
            random = true
            btnRandom.classList.add("bg-gray-500")
            repete = false
            btnRepete.classList.remove("bg-gray-500")
        } else {
            random = false
            btnRandom.classList.remove("bg-gray-500")
        }
    })

    audio.addEventListener('ended', () => {
        if (repete === true) {
            displaySong(data, songNumber, true, false, false, true, null)
        } else if (random === true) {
            randomSong = songNumber
            while (randomSong == songNumber) {
                randomSong = Math.floor(Math.random() * data.songs.length)
            }
            displaySong(data, randomSong, false, true, false, true, null)
            displayComment(randomSong, data)
        } else if (nextSongFade == false) {
            let nextSong = parseInt(songNumber) + 1
            if (nextSong > data.songs.length - 1) {
                nextSong = 0
            }
            displaySong(data, nextSong, false, false, true, true, null)
            displayComment(nextSong, data)
        }
    })

    audio.addEventListener('timeupdate', () => {
        if (audio.currentTime > audio.duration - 5.2 && audio.currentTime < audio.duration - 4.8 && timeEnd == false && !audio.paused && repete == false && random == false) {
            timeEnd = true
            stopClick = true
            const progressBar = document.querySelector('#progressBar');
            progressBar.disabled = true
            const btnPlayPause = document.querySelector('#btnPlayPause');
            btnPlayPause.disabled = true
            const btnsSong = document.querySelectorAll('.btnsSong');
            btnsSong.disabled = true
            const btnNext = document.querySelector('#btnNext');
            btnNext.disabled = true
            const btnPrevious = document.querySelector('#btnPrevious');
            btnPrevious.disabled = true
            const imgPlayPause = document.querySelector('#imgPlayPause');
            imgPlayPause.src = "assets/img/pause.svg"
            nextSongFade = true
            let nextSong = parseInt(songNumber) + 1
            if (nextSong > data.songs.length - 1) {
                nextSong = 0
            }
            songId = null;
            data.songs.forEach(song => {
                if (song.songNumber == nextSong) {
                    songId = song.id
                }
            });
            PlayNextSong()
            async function PlayNextSong () {
                const response = await fetch("fetch-player.php", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        "songId": songId
                    })
                });
                const data3 = await response.json();
                const audio2 = new Audio(data3.song.mp3);
                audio2.play()
                audio2.volume = 0
                let interval = setInterval (() => {
                    audio2.volume += 0.02
                    if (audio2.volume > 0.98) {
                        audio2.volume = 1
                        clearInterval(interval)
                    }
                }, 100)
                audio.addEventListener('ended', () => {
                    displaySong(data, nextSong, false, false, false, false, audio2, data3)
                    displayComment(nextSong, data)
                })
            }
        }
    })

    if (audioRepete) {
        audio.play()
        fade()
        imgPlayPause.src = "assets/img/pause.svg";
        repete = true
        btnRepete.classList.add("bg-gray-500")
    }

    if (audioRandom) {
        audio.play()
        fade()
        imgPlayPause.src = "assets/img/pause.svg";
        random = true
        btnRandom.classList.add("bg-gray-500")
    }

    if (playAudio) {
        audio.play()
        fade()
        imgPlayPause.src = "assets/img/pause.svg";
    }

    progressBar.addEventListener('change', () => {
        if (audio.currentTime > 5) {
            fadeOff = true
        }
    })

    function fade() {
        if (audio.currentTime < 0.1 && audio.currentTime < 5 && fadeOff == false) {
            audio.volume = 0;
            fadeIn();
        } else if (audio.volume < 1 && audio.currentTime < 5 && fadeOff == false) {
            fadeIn();
        } else {
            audio.volume = 1
        }
    }

    function fadeIn() {
        console.log("fadeIn activé")
        intervalfadeIn = setInterval(() => {
            if (audio.paused) {
                clearInterval(intervalfadeIn)
            } else if (fadeOff == true) {
                clearInterval(intervalfadeIn)
            } else {
                audio.volume += 0.02;
            }
            if (audio.volume >= 0.98) {
                audio.volume = 1
                console.log("fade in fini")
                clearInterval(intervalfadeIn);
            }
        }, 100);
    }

    function fadeinStop() {
        if ( audio.volume < 1)
            console.log("fadeIn désactivé")
            clearInterval(intervalfadeIn);
    }

    audio.addEventListener('timeupdate', () => {
        if (audio.currentTime > audio.duration - 5.2 && audio.currentTime < audio.duration - 4.8 && audio.volume == 1 && timeEnd == false && !audio.paused && repete == false && random == false) {
            timeEnd = true
            fadeOut();
        }
    })

    function fadeOut() {
        console.log("fadeOut activé")
        intervalfadeOut = setInterval(() => {
            audio.volume -= 0.02;
            if (audio.volume <= 0.02) {
                audio.volume = 0
                console.log("fade out fini")
                clearInterval(intervalfadeOut);
            }
        }, 100);
    }

    function fadeoutStop() {
        if ( audio.volume > 0)
            console.log("fadeOut désactivé")
            clearInterval(intervalfadeOut);
    }

    const btnPrevious = document.querySelector('#btnPrevious');
    btnPrevious.addEventListener('click', () => {
        if (!audio.paused) {
        audio.pause()
        clearInterval(intervalfadeIn)
        }
        let previousSong = parseInt(songNumber) - 1
        if (previousSong < 0) {
            previousSong = data.songs.length - 1
        }
        displaySong(data, previousSong, false, false, true, true)
        console.log(previousSong)
        displayComment(previousSong, data)
    })
    
    const btnNext = document.querySelector('#btnNext');
    btnNext.addEventListener('click', () => {
        if (!audio.paused) {
        audio.pause()
        clearInterval(intervalfadeIn)
        }
        let nextSong = parseInt(songNumber) + 1
        if (nextSong > data.songs.length - 1) {
            nextSong = 0
        }
        displaySong(data, nextSong, false, false, true, true)
        console.log(nextSong)
        displayComment(nextSong, data)
    })
}