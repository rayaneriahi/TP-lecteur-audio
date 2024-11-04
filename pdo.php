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
<!-- 
// Crée un contexte audio
const audioContext = new (window.AudioContext || window.webkitAudioContext)();

// Fonction pour charger et jouer un son
async function playSoundWithFade(url) {
    const response = await fetch(url);
    const arrayBuffer = await response.arrayBuffer();
    const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);

    // Crée une source audio et un gain (volume) pour contrôler le fade
    const source = audioContext.createBufferSource();
    const gainNode = audioContext.createGain();
    source.buffer = audioBuffer;

    // Connecte la source au gain et le gain au contexte de destination (sortie)
    source.connect(gainNode);
    gainNode.connect(audioContext.destination);

    // Configure le fade-in en montant progressivement le gain de 0 à 1
    gainNode.gain.setValueAtTime(0, audioContext.currentTime);
    gainNode.gain.linearRampToValueAtTime(1, audioContext.currentTime + 2); // fondu entrant de 2 secondes

    // Lancement du son
    source.start();

    // Configure le fade-out en descendant progressivement le gain de 1 à 0
    source.onended = () => {
        gainNode.gain.setValueAtTime(1, audioContext.currentTime);
        gainNode.gain.linearRampToValueAtTime(0, audioContext.currentTime + 2); // fondu sortant de 2 secondes
    };
}

// Appelle la fonction avec le chemin du fichier audio
playSoundWithFade('path/to/your-sound-file.mp3'); -->
