<?php

require_once'pdo.php';

$jsonData = file_get_contents('php://input');

$data = json_decode($jsonData, true);

$request = $db ->prepare('INSERT INTO comment (text, song_id, publication_date) VALUES (:text, :song_id, NOW())');
$request -> execute([
    'text'=> $data['text'],
    'song_id'=> $data['songId']
]);

?>