const btnPlaylist = document.querySelectorAll('.btnPlaylist');

btnPlaylist.forEach(btn => {
    btn.addEventListener('click', async () => {
        const response = await fetch("song.php", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "playlistId": btn.id
            })
        });
        const data = await response.json();
        const song = document.querySelector('#song');
        song.innerHTML = `<h1 class="text-white text-5xl mb-3">${data.playlistName}</h1> ${data.songs.map(song => `<button id="${song.songNumber}" class="text-white btnsSong text-2xl">${song.name}</button><br>`).join('')}`
        const btnsSong = document.querySelectorAll('.btnsSong');
        btnsSong.forEach(btnSong => {
            btnSong.addEventListener('click', () => {
                displayComment(btnSong.id, data)
                displaySong(data, btnSong.id)
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
    <h1 class="text-white text-5xl mb-3">Comments</h1>
    <form id="form" class="space-y-3" action="add-comment.php" method="post">
    <label for="text" class="text-white pl-3 text-2xl">Add a comment :</label><br>
    <input id="inputText" type="text" name="text" class="px-3 py-1 rounded-xl w-4/5 text-2xl" required>
    <input id="inputSongId" type="hidden" name="songId" value="${songNumber}">
    <button type="submit" class="text-white bg-gray-600 px-3 py-1 rounded-xl text-xl">Comment</button>
</form>
<ul class="text-2xl space-y-3">${data2.commentsText.map(commentText => `<li class='text-white'>• ${commentText}</li>`).join('')}</ul>`

const form = document.querySelector('#form');
form.addEventListener('submit', (event) => {
    event.preventDefault();
    fetch("add-comment.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "text": form.querySelector("#inputText").value,
            "songId": form.querySelector('#inputSongId').value
        })
    })
    displayComment(songNumber, data)
})
}

async function displaySong(data, songNumber, audioRepete, audioRandom) {
    let songId = null;
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
    const data2 = await response.json();
    const audio = new Audio(data2.song.mp3);

    const btnsSong = document.querySelectorAll('.btnsSong');
    btnsSong.forEach(btnSong => {
        btnSong.addEventListener('click', () => {
            audio.pause()
        })
    });

    const player = document.querySelector('#player');
    player.innerHTML = `
        <h1 class="text-white text-5xl place-self-center">${data2.song.name}</h1>

            <input id="progressBar" class="w-full accent-slate-500" type="range" min="0" max="100" value="0">
        <div class="flex flex-row space-x-3">
            <button id="btnRandom" class="text-white bg-gray-600 rounded-2xl"><img id="imgRandom" class="size-16 mx-4" src="assets/img/btn-random.png"></button>
            <button id="btnPlayPause" class="text-white bg-gray-600 rounded-2xl px-3 py-1"><img id="imgPlayPause" class="size-14" src="assets/img/btn-play.png"></button>
            <button id="btnRepete" class="text-white bg-gray-600 rounded-2xl"><img id="imgPlayPause" class="size-24" src="assets/img/btn-repete.png"></button>
        </div>
    `

    const btnPlayPause = document.querySelector('#btnPlayPause');
    const imgPlayPause = document.querySelector('#imgPlayPause');

    btnPlayPause.addEventListener('click', () => {
        if (audio.paused) {
            audio.play();
            imgPlayPause.src = "assets/img/btn-pause.png";
        } else {
            audio.pause();
            imgPlayPause.src = "assets/img/btn-play.png";
        }
    })

    const progressBar = document.querySelector('#progressBar');

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
            displaySong(data, songNumber, audioRepete = true)
        } else if (random === true) {
            randomSong = songNumber
            while (randomSong == songNumber) {
                randomSong = Math.floor(Math.random() * data.songs.length)
            }
            displaySong(data, randomSong, audioRepete = false, audioRandom = true)
        } else {
            imgPlayPause.src = "assets/img/btn-play.png";
            progressBar.value = 0;
        }
    })

    if (audioRepete) {
        audio.play()
        imgPlayPause.src = "assets/img/btn-pause.png";
        repete = true 
        btnRepete.classList.add("bg-gray-500")
    }

    if (audioRandom) {
        audio.play()
        imgPlayPause.src = "assets/img/btn-pause.png";
        random = true 
        btnRandom.classList.add("bg-gray-500")
    }
}