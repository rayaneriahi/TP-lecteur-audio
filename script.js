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
        console.log(data);
        const song = document.querySelector('#song');
        song.innerHTML = `<h1 class="text-white">${data.playlistName}</h1> ${data.songs.map(song => `<button id="${song.id}" class="text-white btnsSong">${song.name}</button><br>`).join('')}`
        const btnsSong = document.querySelectorAll('.btnsSong');
        btnsSong.forEach(btnSong => {
            btnSong.addEventListener('click', () => {
                playPlayer(btnSong, data)
            })
            console.log("click")
        });
    });
})

async function playPlayer(btnSong) {
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
    console.log(btnSong.id)
    comment.innerHTML =          `<form id="form" action="add-comment.php" method="post">
    <label for="text" class="text-white">Add a comment</label>
    <input id="inputText" type="text" name="text">
    <input id="inputSongId" type="hidden" name="songId" value="${btnSong.id}">
    <button type="submit" class="text-white bg-gray-600">Comment</button>
</form>
<ul>${data.commentsText.map(commentText => `<li class='text-white'>${commentText}</li>`).join('')}</ul>`
console.log(data.commentsText)

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
    playPlayer(btnSong)
})
}