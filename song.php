<?php

require_once'pdo.php';

$jsonData = file_get_contents('php://input');

$data = json_decode($jsonData, true);

$songsCurrentPlaylist = [];
$commentsText = [];

foreach ($songs as $song) {
    if ($data["playlistId"] == $song["playlist_id"])  {
        array_push($songsCurrentPlaylist, [
            'name' => $song["name"],
            'id' => $song["id"]
        ]);
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