function like() {
  var likeButton = document.getElementById("like");
  var heartIcon = likeButton.querySelector("i");

  if (heartIcon.classList.contains("bx-heart")) {
    heartIcon.classList.replace("bx-heart", "bxs-heart");
    heartIcon.style.color = '#ff0000'
  } else {
    heartIcon.classList.replace("bxs-heart", "bx-heart");
    heartIcon.style.color = '#ffffff'
  }
}


function shuffle() {
  var shuffleButton = document.getElementById("shuffle");
  var shuffleIcon = shuffleButton.querySelector("i");

  if (shuffleButton.style.color === "lime") {
    shuffleButton.style.color = "";
  } else {
    shuffleButton.style.color = "lime";
  }
}


var audio = document.getElementById('audio');
var playpause = document.getElementById("play");


function togglePlayPause() {
   if (audio.paused || audio.ended) {
      playpause.title = "Pause";
      audio.play();
   } else {
      playpause.title = "Play";
      audio.pause();
   }
}

document.querySelector('form').addEventListener('submit', (event) => {
  event.preventDefault();
  fetchMusic();
});

async function fetchMusic() {
  const searchTerm = document.getElementById('search-input').value;
  const apiKey = 'f04e45b808fb2402087ccdefc7a6ea6f'; // Replace with your Last.fm API key
  const apiUrl = `https://ws.audioscrobbler.com/2.0/?method=track.search&track=${encodeURIComponent(searchTerm)}&api_key=${apiKey}&format=json`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    
    console.log(data);
    const track = data.results?.trackmatches?.track[0];
    if (track) {
      const songName = track.name;
      const artist = track.artist;
      const image = track.image[2]['#text'];

      document.getElementById('search-music').textContent = songName;
      document.getElementById('search-music-art').textContent = artist;
      document.querySelector('.screen-body img').src = image;
      document.getElementById('audio').src = track.url;
    } else {
      document.getElementById('search-music').textContent = 'No results found';
      document.getElementById('search-music-art').textContent = '';
      document.querySelector('.screen-body img').src = '';
      document.getElementById('audio').src = '';
    }
  } catch (error) {
    console.error('Error fetching music:', error);
    document.getElementById('search-music').textContent = 'Error fetching music';
    document.getElementById('search-music-art').textContent = '';
    document.querySelector('.screen-body img').src = '';
    document.getElementById('audio').src = '';
  }
}


