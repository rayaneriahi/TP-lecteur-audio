<?php

session_start();

try {
    $db = new PDO('mysql:host=localhost; dbname=tp-lecteur-audio', 'root', '');
} catch(Exception) {
    die;
}

$request = $db->prepare('SELECT * FROM comment');
$request->execute();
$comments = $request->fetchAll(PDO::FETCH_ASSOC);

$request = $db->prepare('SELECT * FROM playlist');
$request->execute();
$playlists = $request->fetchAll(PDO::FETCH_ASSOC);

$request = $db->prepare('SELECT * FROM song');
$request->execute();
$songs = $request->fetchAll(PDO::FETCH_ASSOC);

?>
