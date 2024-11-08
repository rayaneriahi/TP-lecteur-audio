<?php

require_once'pdo.php';

$jsonData = file_get_contents('php://input');

$data = json_decode($jsonData, true);

$songsCurrentPlaylist = [];
$commentsText = [];
$currentPlaylist = [];

$i = 0;
foreach ($songs as $song) {
    if ($data["playlistId"] == $song["playlist_id"])  {
        $songEntry = [
            "songNumber" => $i++,
            "name" => $song["name"],
            "mp3" => $song["mp3"],
            "id" => $song["id"],
            "artist" => $song["artist"],
            "picture" => $song["picture"],
        ];
        $songsCurrentPlaylist[] = $songEntry;
    }
}

foreach ($playlists as $playlist) {
    if ($data["playlistId"] == $playlist["id"])  {
        $plalistEntry = [
            "name" => $playlist["name"],
            "author" => $playlist["author"],
            "picture" => $playlist["picture"]
        ];
        $currentPlaylist[] = $plalistEntry;
    }
}

echo json_encode([
    "songs" => $songsCurrentPlaylist,
    "playlist" => $currentPlaylist,
]);

?>