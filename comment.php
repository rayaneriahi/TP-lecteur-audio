<?php

require_once'pdo.php';

$jsonData = file_get_contents('php://input');

$data = json_decode($jsonData, true);

$commentsText = [];

foreach ($comments as $comment) {
    if ($data["songId"] == $comment["song_id"])  {
        array_push($commentsText ,$comment["text"]);
    }
}

echo json_encode([
    "commentsText" => $commentsText,
]);

?>