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
    
    <div class="h-full w-1/4 border-black border-r-2">

        <div>

            <?php

            if (!empty($playlists)) {
                echo "<h1 class='text-white'>Playlists</h1>";
                foreach ($playlists as $playlist) {
                    echo '<button id="' . $playlist["id"] . '" class="text-white btnPlaylist">' . $playlist["name"] . '</button><br>';
                }
            }

            ?>

        </div>

    </div>

    <div id="song" class="h-full w-1/4">
    </div>

    <div class="flex flex-col border-black border-l-2 h-full w-1/2">

        <div class="w-full h-1/2 border-black border-b-2">
          
          <!-- Élément audio sans contrôles visibles -->
          <audio class="myAudio" src="assets/music/music1.mp3" preload="auto"></audio>
          <audio class="myAudio" src="assets/music/music2.mp3" preload="auto"></audio>
          <button id="audioButton" class="text-white">Play</button>
       
        </div>

        <div id="comment" class="w-full h-1/2">
        </div>

    </div>

<script src="script.js"></script>
<script src="audio.js"></script>
</body>
</html>