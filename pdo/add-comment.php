<?php

require_once'db.php';

$data = json_decode(file_get_contents('php://input'), true);

$request = $db->prepare('INSERT INTO comment (text, song_id, publication_date) VALUES (:text, :song_id, NOW())');
$request->execute([
    'text'=> $data['text'],
    'song_id'=> $data['songId']
]);