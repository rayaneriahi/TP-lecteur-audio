<?php

require_once'pdo.php';

?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="https://cdn.tailwindcss.com"></script>
    <title>Lecteur audio</title>

</head>
<body class="bg-gray-800 flex flex-row h-screen">
    
    <div class="h-full w-1/4 border-black border-r-2 p-5 space-y-3">

            <?php

            if (!empty($playlists)) {
                echo "<h1 class='text-white text-5xl mb-3'>Playlists</h1>";
                foreach ($playlists as $playlist) {
                    echo '<button id="' . $playlist["id"] . '" class="text-white btnPlaylist text-2xl">' . $playlist["name"] . '</button><br>';
                }
            }

            ?>

    </div>

    <div id="song" class="h-full w-1/4 p-5 space-y-3">
    </div>

    <div class="flex flex-col border-black border-l-2 h-full w-1/2">


    <!-- Élément audio sans contrôles visibles -->
    <audio class="myAudio" src="assets/music/music1.mp3" preload="auto"></audio>
    <audio class="myAudio" src="assets/music/music2.mp3" preload="auto"></audio>
    <button id="audioButton" class="text-white">Play/Pause</button>
    <button id="repeatButton" class="text-white">No repeat</button> <!-- Bouton pour activer/désactiver la répétition -->

        <div id="player" class="w-full h-1/2 border-black border-b-2 items-center justify-center flex flex-col space-y-20  px-10">
        </div>

        <div id="comment" class="w-full h-1/2 p-5 space-y-5 overflow-y-auto">
        </div>

    </div>

<script src="script.js"></script>
<script src="audio.js"></script>
</body>
</html>