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
        song.innerHTML = `<h1 class="text-white text-5xl mb-3">${data.playlistName}</h1> ${data.songs.map(song => `<button id="${song.id}" class="text-white btnsSong text-2xl">${song.name}</button><br>`).join('')}`
        const btnsSong = document.querySelectorAll('.btnsSong');
        btnsSong.forEach(btnSong => {
            btnSong.addEventListener('click', () => {
                displayComment(btnSong, data)
                displaySong(btnSong)
            })
        });
    });
})

async function displayComment(btnSong) {
    const response = await fetch("comment.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "songId": btnSong.id
        })
    });
    const data = await response.json();
    const comment = document.querySelector('#comment');
    comment.innerHTML = ` 
    <h1 class="text-white text-5xl mb-3">Comments</h1>
    <form id="form" class="space-y-3" action="add-comment.php" method="post">
    <label for="text" class="text-white pl-3 text-2xl">Add a comment :</label><br>
    <input id="inputText" type="text" name="text" class="px-3 py-1 rounded-xl w-4/5 text-2xl">
    <input id="inputSongId" type="hidden" name="songId" value="${btnSong.id}">
    <button type="submit" class="text-white bg-gray-600 px-3 py-1 rounded-xl text-xl">Comment</button>
</form>
<ul class="text-2xl space-y-3">${data.commentsText.map(commentText => `<li class='text-white'>• ${commentText}</li>`).join('')}</ul>`

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
    displayComment(btnSong)
})
}

async function displaySong(btnSong) {
    const response = await fetch("fetch-player.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "songId": btnSong.id
        })
    });
    const data = await response.json();
    const audio = new Audio(data.song.mp3);
    const player = document.querySelector('#player');
    player.innerHTML = `
        <h1 class="text-white text-5xl place-self-center">${data.song.name}</h1>

            <input id="progressBar" class="w-full accent-slate-500" type="range" min="0" max="100" value="0">
        
        <button id="btnPlayPause" class="text-white bg-gray-600 rounded-2xl px-3 py-1"><img id="imgPlayPause" class="size-14" src="assets/img/btn-play.png"></button>
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

    let mouseMove = false;
    player.addEventListener('mousemove', () => {
        mouseMove = true
        setTimeout(() => {
            mouseMove = false;
        }, 500)
    })

    audio.addEventListener('timeupdate', () => {
        if (mouseMove !== true) {
            progressBar.value = (audio.currentTime / audio.duration) * 100 
        }
    })

    audio.addEventListener('ended', () => {
        imgPlayPause.src = "assets/img/btn-play.png";
        progressBar.value = 0;
    })
}