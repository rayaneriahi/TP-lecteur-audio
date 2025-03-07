export default class SongView
{
    constructor() {
        this.songSection = document.getElementById('song');
    }

    add(songs, playlist) {
        this.songSection.classList.add("h-full", "w-1/2", "overflow-y-auto", "flex", "flex-col")

        let i = 1;
        const html =
            `<div class="flex flex-row items-center space-x-5 justify-center h-1/6">
                <img src="${playlist.picture}" class="size-28 rounded-xl bg-black">
                <div class="flex flex-col ml-5 justify-center">
                    <h1 class="text-white text-4xl">${playlist.name}</h1>
                    <span class="text-gray-400 text-xl">${playlist.author}</span>
                </div>
            </div>
            <div class="flex flex-row px-5 flex-wrap">
                ${songs.map(song => {
                    const html = `<div data-song-number="${i}" data-song-id="${song.id}" class="cursor-pointer flex flex-row items-center btnSong space-x-3 p-5 m-5 hover:bg-gray-600">
                        <img class="size-14 rounded-xl bg-black" src="${song.picture}">
                        <div class="flex flex-col">
                            <span class="cursor-pointer text-white text-base">${song.name}</span>
                            <span class="text-sm cursor-pointer text-gray-400">${song.artist}</span>
                        </div>
                    </div>`
                    i++
                    return html
                }).join('')}
            </div>`
        
        this.songSection.innerHTML = html
    }

    resizeToThird() {
        this.songSection.classList.remove("w-1/2")
        this.songSection.classList.add("w-1/3")
    }
}