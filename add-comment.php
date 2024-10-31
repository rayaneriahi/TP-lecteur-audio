<?php

require_once'pdo.php';

$request = $db ->prepare('INSERT INTO comment (text, song_id, publication_date) VALUES (:text, :song_id, NOW())');
$request -> execute([
    'text'=> $_POST['text'],
    'song_id'=> $_POST['songId']
]);

header('Location: index.php');

?>