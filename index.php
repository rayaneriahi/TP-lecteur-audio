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

<body class="bg-gradient-to-tr to-gray-600 from-gray-800 flex flex-row h-screen">
    
    <div class="h-full w-1/4 border-black border-r-2 overflow-y-auto whitespace-nowrap">

            <?php

            if (!empty($playlists)) {
                echo "<h1 class='text-white text-4xl p-5'>Playlists</h1>";
                foreach ($playlists as $playlist) {
                    echo '<div data-playlist-id="' . $playlist["id"] . '" class="cursor-pointer flex flex-row items-center space-x-3 p-5 hover:bg-gray-600 btnPlaylist"><img class="size-14 rounded-xl bg-black" src="' . $playlist["picture"] . '"><div class="flex flex-col"><span class="text-white text-base hover:text-gray-500">' . $playlist["name"] . '</span><span class="text-sm cursor-pointer text-gray-400">' . $playlist["author"] . ' songs</span></div></div>';
                }
            }

            ?>

    </div>

    <div id="song" class="h-full w-1/4 overflow-y-auto whitespace-nowrap">
    </div>

    <div class="flex flex-col border-black border-l-2 h-full w-1/2">

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