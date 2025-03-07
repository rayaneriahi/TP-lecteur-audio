export default class PlayerView {
    constructor() {
        this.playerCommentSection = document.querySelector("#playerComment");
        this.playerSection = document.querySelector('#player');
        this.commentSection = document.querySelector('#comment');
    }

    add(song, comments) {
        this.playerCommentSection.classList.add("flex", "flex-col", "border-black", "border-l-2", "h-full", "w-1/2");
        this.addPlayer(song);
        this.addComment(comments);
    }

    addPlayer(song) {
        this.playerSection.classList.add("w-full", "h-1/2", "border-black", "border-b-2", "items-center", "justify-center", "flex", "flex-col", "space-y-20",  "px-10");
        
        const html =
            `<div class="flex flex-row items-center space-x-5">
                <img src="${song.picture}" class="size-28 rounded-xl bg-black">
                <div class="flex flex-col ml-5 ">
                    <h1 class="text-white text-5xl">${song.name}</h1>
                    <span class="text-gray-400 text-2xl">${song.artist}</span>
                </div>
            </div>
            <input id="progressBar" class="w-full accent-slate-500" type="range" min="0" max="100" value="0">
            <div class="flex flex-row space-x-10">
                <button id="btnPrevious" class="text-white bg-gray-600 rounded-2xl hover:bg-gray-500"><img class="size-8 mx-3" src="assets/img/btn-previous.png"></button>
                <button id="btnRandom" class="text-white bg-gray-600 rounded-2xl hover:bg-gray-500"><img id="imgRandom" class="size-8 mx-3" src="assets/img/btn-random.png"></button>
                <button id="btnPlayPause" class="text-white bg-gray-600 rounded-2xl px-3 py-1 hover:bg-gray-500"><img id="imgPlayPause" class="size-8" src="assets/img/btn-play.png"></button>
                <button id="btnRepete" class="text-white bg-gray-600 rounded-2xl hover:bg-gray-500"><img id="imgPlayPause" class="size-14" src="assets/img/btn-repete.png"></button>
                <button id="btnNext" class="text-white bg-gray-600 rounded-2xl hover:bg-gray-500"><img class="size-8 mx-3 rotate-180" src="assets/img/btn-previous.png"></button>
            </div>`;

        this.playerSection.innerHTML = html;
    }

    addComment(comments) {
        if (!this.commentSection.classList.contains("w-full")) {
            this.commentSection.classList.add("w-full", "h-1/2", "p-5", "space-y-5", "overflow-y-auto", "break-all");
        }

        const html =
            `<h1 class="text-white text-4xl mb-3">Comments</h1>
            <form id="form" class="space-y-3" action="add-comment.php" method="post">
                <label for="text" class="text-white pl-3 text-xl">Add a comment :</label><br>
                <div class="flex flex-row items-center space-x-3">
                    <input id="inputText" type="text" name="text" class="bg-white px-3 py-1 rounded-xl w-4/5 text-xl hover:bg-gray-300" required>
                    <button type="submit" class="text-white bg-gray-600 px-3 py-1 rounded-xl text-base hover:bg-gray-500">Comment</button>
                </div>
            </form>
            <ul class="text-base space-y-3">
                ${comments.map(comment => `<li class='text-white'>• ${comment.text}</li>`).join('')}
            </ul>`;

        this.commentSection.innerHTML = html;
    }

    repeteRandom(isActive, btn) {
        if (isActive) {
            btn.classList.remove("bg-gray-600");
            btn.classList.contains("hover:bg-gray-500")
                ? btn.classList.remove("hover:bg-gray-500")
                : btn.classList.remove("hover:bg-gray-600");

            btn.classList.add("bg-gray-400");
            btn.classList.add("hover:bg-gray-400");

            btn.addEventListener('mouseout', () => {
                btn.classList.remove("hover:bg-gray-400");
                btn.classList.add("hover:bg-gray-500");
            });
        }
        else {
            btn.classList.remove("bg-gray-400");
            btn.classList.contains("hover:bg-gray-500")
                ? btn.classList.remove("hover:bg-gray-500")
                : btn.classList.remove("hover:bg-gray-600");
            btn.classList.add("bg-gray-600");
            btn.classList.add("hover:bg-gray-600");

            btn.addEventListener('mouseout', () => {
                btn.classList.remove("hover:bg-gray-600");
                btn.classList.add("hover:bg-gray-500");
            });
        }
    }

    playPause(isPause, btn) {
        const img = btn.querySelector('img');
        if (isPause) {
            img.src = "assets/img/btn-play.png";
        }
        else {
            img.src = "assets/img/btn-pause.png";
        }
    }

    ended(audio, btn, progressBar) {
        const img = btn.querySelector('img');
        if (!audio.loop) {
            img.src = "assets/img/btn-play.png"
            progressBar.value = 0
        }
    }

    block(nextBtn, previousBtn, playPauseBtn, randomBtn, repeteBtn, progressBar) {
        const btns = [nextBtn, previousBtn, playPauseBtn, randomBtn, repeteBtn];
        btns.forEach(btn => {
            btn.disabled = true
            btn.classList.remove("hover:bg-gray-500")
            btn.classList.add("brightness-50")
        });
        progressBar.disabled = true
    }
}