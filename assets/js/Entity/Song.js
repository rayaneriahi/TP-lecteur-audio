export default class Song
{
    constructor(id, name, artist, playlistId, path, picture) {
        this.id = id;
        this.name = name;
        this.artist = artist;
        this.playlistId = playlistId;
        this.path = path;
        this.picture = picture;
        this.songNumber = 0
    }
}