<?php

require_once'pdo.php';

$jsonData = file_get_contents('php://input');

$data = json_decode($jsonData, true);

foreach ($songs as $song) {
    if ($data["songId"] == $song["id"])  {
        echo json_encode([
            "song" => $song,
        ]);
        break;
    }
}

?>