import Playlist from "../Entity/Playlist.js"

export default class PlaylistController
{
    async getPlaylists() {
        const data = await fetch('../../../pdo/get-playlists.php').then(response => response.json())
        let playlists = []
        data.playlists.forEach(data => {
            playlists.push(new Playlist(data.id, data.name, data.author, data.picture))
        })
        return playlists
    }

    async getPlaylist(id, songs) {
        let playlists = await this.getPlaylists().then(playlists => playlists.find(playlist => playlist.id == id))
        playlists.songs = songs
        return playlists
    }
}