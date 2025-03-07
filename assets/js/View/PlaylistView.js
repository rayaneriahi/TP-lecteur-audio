export default class PlaylistView
{
    constructor() {
        this.playlistSection = document.getElementById('playlist');
    }

    add(playlists) {
        const html =
            `<div class='content-center justify-center h-1/6'>
                <h1 class='text-white text-4xl text-center'>Playlists</h1>
            </div>
            <div class='flex flex-row px-5 flex-wrap'>
                ${playlists.map(Playlist => {
                    return `<div data-playlist-id="${Playlist.id}" class="cursor-pointer flex flex-row space-x-3 m-5 p-5 hover:bg-gray-600 btnPlaylist">
                        <img class="size-14 rounded-xl bg-black" src="${Playlist.picture}">
                        <div class="flex flex-col justify-center">
                            <span class="text-white text-base">${Playlist.name}</span>
                            <span class="text-sm cursor-pointer text-gray-400">${Playlist.author}</span>
                        </div>
                    </div>`
                }).join('')}
            </div>`

        this.playlistSection.innerHTML = html
    }

    resizeToHalf() {
        this.playlistSection.classList.remove("w-full")
        this.playlistSection.classList.add("w-1/2")
    }

    resizeToThird() {
        this.playlistSection.classList.remove("w-1/2")
        this.playlistSection.classList.add("w-1/3")
    }
}