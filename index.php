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

<body class="bg-gray-800 flex flex-row h-screen w-screen">
    
    <div id="playlists" class="h-full z-20 bg-gray-800 transition-all w-full absolute overflow-hidden sm:w-1/5 sm:relative border-black border-r-2 p-5 space-y-3 overflow-y-auto break-all">

            <?php

            if (!empty($playlists)) {
                echo "<h1 class='text-white text-4xl p-5'>Playlists</h1>";
                foreach ($playlists as $playlist) {
                    echo '<div data-playlist-id="' . $playlist["id"] . '" class="cursor-pointer flex flex-row items-center space-x-3 p-5 hover:bg-gray-600 btnPlaylist"><img class="size-14 rounded-xl bg-black" src="' . $playlist["picture"] . '"><div class="flex flex-col"><span class="text-white text-base hover:text-gray-500">' . $playlist["name"] . '</span><span class="text-sm cursor-pointer text-gray-400">' . $playlist["author"] . ' songs</span></div></div>';
                }
            }

            ?>

    </div>

    <div id="song" class="h-full z-10 w-full transition-all absolute overflow-hidden sm:w-1/5 sm:relative p-5 space-y-3 overflow-y-auto break-all">
    </div>

    <div id="player-container" class="flex z-20 bg-gray-800 flex-col transition-all translate-y-full sm:translate-y-0 border-black border-l-2 h-full w-full absolute overflow-hidden sm:w-3/5 sm:relative">

    <!-- Élément audio sans contrôles visibles -->
    <!-- <audio id="myAudio" class="myAudio" src="assets/music/music1.mp3" preload="auto"></audio>
    <audio class="myAudio" src="assets/music/music2.mp3" preload="auto"></audio>
    <button id="audioButton" class="text-white">Play/Pause</button>
    <button id="repeatButton" class="text-white">No repeat</button> Bouton pour activer/désactiver la répétition -->


    <div id="player" class="w-full h-1/2 border-black border-b-2 items-center justify-center flex flex-col space-y-20  px-10">
    </div>

    <div id="comment" class="w-full h-1/2 p-5 space-y-5 overflow-y-auto break-all">
    </div>

    </div>

<script src="script.js"></script>
<script src="audio.js"></script>
</body>
</html>