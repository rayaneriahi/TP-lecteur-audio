<?php

include_once'db.php';

$request = $db->prepare('SELECT * FROM playlist');
$request->execute();
$playlists = $request->fetchAll(PDO::FETCH_ASSOC);

echo json_encode(['playlists' => $playlists]);