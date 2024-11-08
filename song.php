<?php

require_once'pdo.php';

$jsonData = file_get_contents('php://input');

$data = json_decode($jsonData, true);

$songsCurrentPlaylist = [];
$commentsText = [];

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
        $playlistName = $playlist["name"];
    }
}

echo json_encode([
    "songs" => $songsCurrentPlaylist,
    "playlistName" => $playlistName,
]);

?>