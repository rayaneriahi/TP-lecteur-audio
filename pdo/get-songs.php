<?php

include_once'db.php';

$request = $db->prepare('SELECT * FROM song');
$request->execute();
$songs = $request->fetchAll(PDO::FETCH_ASSOC);

echo json_encode(['songs' => $songs]);