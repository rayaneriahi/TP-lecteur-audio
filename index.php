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
    
    <div id="playlist" class="h-full w-full border-black border-r-2 overflow-y-auto flex flex-col z-20 transition-all  absolute overflow-hidden sm:w-1/5 sm:relative">
    <!-- h-full w-1/4 border-black border-r-2 overflow-y-auto whitespace-nowrap -->

            <?php

            if (!empty($playlists)) {
                echo "<div class='content-center justify-center h-1/6'><h1 class='text-white text-4xl text-center'>Playlists</h1></div>
                <div class='flex flex-row px-5 flex-wrap'>";
                foreach ($playlists as $playlist) {
                    echo '<div data-playlist-id="' . $playlist["id"] . '" class="cursor-pointer flex flex-row space-x-3 m-5 p-5 hover:bg-gray-600 btnPlaylist"><img class="size-14 rounded-xl bg-black" src="' . $playlist["picture"] . '"><div class="flex flex-col justify-center"><span class="text-white text-base">' . $playlist["name"] . '</span><span class="text-sm cursor-pointer text-gray-400">' . $playlist["author"] . ' </span></div></div>';
                }
                echo "</div>";
            }

            ?>

    </div>

    <div id="song" class="h-full z-10 w-full transition-all absolute overflow-hidden sm:w-1/5 sm:relative p-5 space-y-3 overflow-y-auto break-all">
    </div>

    <div id="player-container" class="flex z-20 bg-gray-800 flex-col transition-all translate-y-full sm:translate-y-0 border-black border-l-2 h-full w-full absolute overflow-hidden sm:w-3/5 sm:relative">

    <div id="player" class="w-full h-1/2 border-black border-b-2 items-center justify-center flex flex-col space-y-20  px-10">
    </div>

    <div id="comment" class="w-full h-1/2 p-5 space-y-5 overflow-y-auto break-all">
    </div>

    </div>

<script src="script.js"></script>
<script src="audio.js"></script>
</body>
</html>