import PlaylistController from "./PlaylistController.js";
import PlaylistView from "../View/PlaylistView.js";
import SongController from "./SongController.js";
import SongView from "../View/SongView.js";
import PlayerView from "../View/PlayerView.js";
import CommentController from "./CommentController.js";

export default class PageController
{
    constructor() {
        this.playlistController = new PlaylistController();
        this.playlistView = new PlaylistView();
        this.songController = new SongController();
        this.songView = new SongView();
        this.playerView = new PlayerView();
        this.commentController = new CommentController();
        this.audio = null;
        this.randomSong = null;
        this.random = false;
        this.repete = false;
        this.fade = false;
        this.nextSong = null
        this.boundKeyboardEvent = null
    }

    async init() {
        const playlists = await this.playlistController.getPlaylists();
        this.playlistView.add(playlists);

        const playlistBtns = document.querySelectorAll('.btnPlaylist');
        playlistBtns.forEach(playlistBtn => {
            playlistBtn.addEventListener('click', () => {
                this.addSong(playlistBtn)
            })
        })
    }

    async addSong(playlistBtn) {
        this.playlistView.resizeToHalf();
        const playlistId = playlistBtn.dataset.playlistId;
        const songs = await this.songController.getSongsByPlaylist(playlistId);
        const playlist = await this.playlistController.getPlaylist(playlistId, songs);
        this.songView.add(songs, playlist);

        const songBtns = document.querySelectorAll('.btnSong');

        this.songController.addSongNumber(songs, songBtns);

        songBtns.forEach(songBtn => {
            songBtn.addEventListener('click', async () => {
                if (!this.fade) {
                    const song = songs.find(song => song.id == songBtn.dataset.songId);
                    this.audio ? this.audio.pause() : null;
                    this.addPlayer(song, songs);
                }
            })
        })
    }

    async addPlayer(song, songs, audio=null) {
        this.boundKeyboardEvent != null ? document.removeEventListener('keydown', this.boundKeyboardEvent) : null

        if (audio == null) {
            this.playlistView.resizeToThird();
            this.songView.resizeToThird();

            const comments = await this.commentController.getCommentsBySong(song.id);
            this.playerView.add(song, comments);
        }

        const form = document.querySelector('#form');
        form.addEventListener('submit', async (event) => {
            event.preventDefault();
            let inputText = form.querySelector('#inputText');
            this.commentController.add(inputText.value, song.id)
            inputText.value = '';
            const comments = await this.commentController.getCommentsBySong(song.id);
            this.playerView.addComment(comments)
        });

        if (audio == null) {
            audio = new Audio(song.path);
            audio.loop = this.repete;
            audio.play()
        }

        this.audio = audio;

        this.playerView.playPause(audio.paused, document.querySelector('#btnPlayPause'));

        audio.addEventListener('timeupdate', () => { progressBar.value = (audio.currentTime / audio.duration) * 100 });

        const progressBar = document.querySelector('#progressBar');
        progressBar.addEventListener('input', () => { audio.currentTime = (progressBar.value * audio.duration) / 100 });

        const previousBtn = document.querySelector('#btnPrevious');
        previousBtn.addEventListener('click', () => {
            const previousSongNumber = this.songController.getPreviousSong(songs, song);
            const previousSong = songs.find(song => song.songNumber == previousSongNumber);
            audio.pause();
            this.addPlayer(previousSong, songs);
        });

        const nextBtn = document.querySelector('#btnNext');
        nextBtn.addEventListener('click', () => {
            const nextSongNumber = this.songController.getNextSong(songs, song);
            const nextSong = songs.find(song => song.songNumber == nextSongNumber);
            audio.pause();
            this.addPlayer(nextSong, songs);
        })

        const randomBtn = document.querySelector('#btnRandom');
        const repeteBtn = document.querySelector('#btnRepete');
        
        if (this.random) {
            this.playerView.repeteRandom(this.random, randomBtn)
            this.randomSong = this.songController.getRandomSong(songs, song)
        }
            
        randomBtn.addEventListener('click', () => {
            if (audio.loop) {
                this.repete = false;
                audio.loop = false;
                this.playerView.repeteRandom(audio.loop, repeteBtn)
            }

            this.random = !this.random
            this.playerView.repeteRandom(this.random, randomBtn);
            this.random ? this.randomSong = this.songController.getRandomSong(songs, song) : null
        })

        audio.loop ? this.playerView.repeteRandom(audio.loop, repeteBtn) : null
        
        repeteBtn.addEventListener('click', () => { 
            if (this.random) {
                this.random = false;
                this.playerView.repeteRandom(this.random, randomBtn);
            }
            
            this.repete = !this.repete
            audio.loop = this.repete
            this.playerView.repeteRandom(audio.loop, repeteBtn);
        });

        const playPauseBtn = document.querySelector('#btnPlayPause')
        playPauseBtn.addEventListener('click', () => {
            this.songController.playPause(audio)
            this.playerView.playPause(audio.paused, playPauseBtn);
        });

        let nextAudio;

        audio.addEventListener('ended', async () => {
            if (this.random) {
                this.addPlayer(this.randomSong, songs)
            }
            else if (!this.fade) {
                const nextSongNumber = this.songController.getNextSong(songs, song);
                const nextSong = songs.find(song => song.songNumber == nextSongNumber);
                this.addPlayer(nextSong, songs);
            }

            if (this.fade) {
                const nextComments = await this.commentController.getCommentsBySong(this.nextSong.id);
                this.playerView.add(this.nextSong, nextComments);
                this.addPlayer(this.nextSong, songs, nextAudio);
                this.fade = false
            }
        });

        audio.addEventListener('timeupdate', () => {
            const fadeTime = audio.duration - 10;
            const currentTime = audio.currentTime;

            if (currentTime > fadeTime - 0.25 && currentTime < fadeTime + 0.25 && !this.fade && !this.repete && !this.random) {
                this.fade = true
                this.playerView.block(nextBtn, previousBtn, playPauseBtn, randomBtn, repeteBtn, progressBar)

                const nextSongNumber = this.songController.getNextSong(songs, song);
                this.nextSong = songs.find(song => song.songNumber == nextSongNumber);
                nextAudio = new Audio(this.nextSong.path);
                nextAudio.volume = 0
                nextAudio.play();
            }

            if (this.fade) {
                this.songController.fadeDown(audio)
                this.songController.fadeUp(nextAudio)
            }
        })

        this.boundKeyboardEvent = (event) => this.keyboardEvent(event, audio, playPauseBtn);
        document.addEventListener('keydown', this.boundKeyboardEvent);
    }

    keyboardEvent(event, audio, playPauseBtn) {
        if (event.key == ' ' && !this.fade) {
            audio.paused ? audio.play() : audio.pause()
            this.playerView.playPause(audio.paused, playPauseBtn);
        }
        else if (event.key == 'ArrowRight' && !this.fade) {
            const durationIncrement = 5
            let timeIncremented = audio.currentTime + durationIncrement;
            if (timeIncremented > audio.duration) {
                timeIncremented = audio.duration
            }
            audio.currentTime = timeIncremented
        }
        else if (event.key == 'ArrowLeft' && !this.fade) {
            const durationIncrement = 5
            let timeIncremented = audio.currentTime - durationIncrement;
            if (timeIncremented < 0) {
                timeIncremented = 0
            }
            audio.currentTime = timeIncremented
        }
    }
}