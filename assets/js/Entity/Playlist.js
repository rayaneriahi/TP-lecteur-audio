export default class Playlist
{
    constructor(id, name, author, picture) {
        this.id = id;
        this.name = name;
        this.author = author;
        this.picture = picture;
        this.songs = [];
    }
}