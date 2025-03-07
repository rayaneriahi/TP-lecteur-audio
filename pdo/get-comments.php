<?php

include_once'db.php';

$request = $db->prepare('SELECT * FROM comment');
$request->execute();
$comments = $request->fetchAll(PDO::FETCH_ASSOC);

echo json_encode(['comments' => $comments]);