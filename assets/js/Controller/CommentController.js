import Comment from "../Entity/Comment.js";

export default class CommentController
{
    async getComments() {
        const data = await fetch('../../../pdo/get-comments.php').then(response => response.json());
        let comments = [];
        data.comments.forEach(data => {
            comments.push(new Comment(data.id, data.text, data.song_id, data.publication_date))
        })
        return comments
    }

    async getCommentsBySong(songId) {
        return this.getComments().then(comments => comments.filter(comment => comment.songId == songId))
    }

    async add(text, songId) {
        fetch('../../../pdo/add-comment.php', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                "text": text,
                "songId": songId
            })
        });
    }
}