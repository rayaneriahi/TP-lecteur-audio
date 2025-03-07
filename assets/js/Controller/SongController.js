import Song from "../Entity/Song.js";

export default class SongController
{
    async getSongs() {
        const data = await fetch('../../../pdo/get-songs.php').then(response => response.json())
        let songs = []
        data.songs.forEach(data => {
            songs.push(new Song(data.id, data.name, data.artist, data.playlist_id, data.mp3, data.picture))    
        })
        return songs
    }

    async getSong(id) {
        return this.getSongs().then(songs => songs.find(song => song.id == id))
    }

    async getSongsByPlaylist(playlistId) {
        return this.getSongs().then(songs => songs.filter(song => song.playlistId == playlistId))
    }

    addSongNumber(songs, btns) {
        btns.forEach((btn) => {
            const song = songs.find(song => song.id == btn.dataset.songId)
            song.songNumber = parseInt(btn.dataset.songNumber)
        })
    }

    playPause(audio) {
        audio.paused ? audio.play() : audio.pause()
    }

    getRandomSong(songs, song) {
        let randomSongNumber = Math.floor(Math.random() * songs.length) + 1;
        while (randomSongNumber == song.songNumber) {
            randomSongNumber = Math.floor(Math.random() * songs.length) + 1;
        }
        return songs.find(song => song.songNumber == randomSongNumber);
    }

    getPreviousSong(songs, song) {
        return song.songNumber == 1 ? songs.length : song.songNumber - 1;
    }

    getNextSong(songs, song) {
        return song.songNumber == songs.length ? 1 : song.songNumber + 1;
    }

    fadeDown(audio) {
        let volume = audio.duration - audio.currentTime;
        volume > 10 ? volume = 10 : null;
        volume = Math.round(volume * 10);
        volume = volume / 100
        volume < 0.05 ? volume = 0 : null
        
        audio.volume = volume
    }

    fadeUp(audio) {
        let volume = Math.round(audio.currentTime * 10) / 100;
        volume > 0.95 ? volume = 1 : null
        audio.volume = volume
    }
}