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



// **************** API for searched music **********************

async function fetchMusic() {
  const searchTerm = document.getElementById('search-input').value;
  const apiKey = '	54eea564740c511910bb580592d841f7'; // Replace with your Last.fm API key
  const apiUrl = `https://ws.audioscrobbler.com/2.0/?method=track.search&track=${encodeURIComponent(searchTerm)}&api_key=${apiKey}&format=json`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    
    //console.log(data);
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

// *************API for getting top song ****************** 

async function fetchTopSong() {
  const apiKey = '54eea564740c511910bb580592d841f7'; // Replace with your Last.fm API key
  const apiUrl = `https://ws.audioscrobbler.com/2.0/?method=chart.gettoptracks&api_key=${apiKey}&format=json`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    if (data.error) {
      console.error('Error fetching top song:', data.message);
      return;
    }
    //console.log(data);
    const topTrack = data.tracks.track[0];
    const songName = topTrack.name;
    const artistName = topTrack.artist.name;
    const playCount = topTrack.playcount;


    document.getElementById('trending-song').innerHTML = songName;
    document.getElementById('trending-hit-artist').innerHTML = artistName;
    document.getElementById('trending-hit-listeners').innerHTML = playCount;
  } catch (error) {
    console.error('Error fetching top song:', error);
  }
}

fetchTopSong();


// *************** Playing trending song ******************

let playTrendingSong = async () => {
  try {
    const apiKey = '54eea564740c511910bb580592d841f7'; // Replace with your Last.fm API key
    const apiUrl = `https://ws.audioscrobbler.com/2.0/?method=chart.gettoptracks&api_key=${apiKey}&format=json`;

    const response = await fetch(apiUrl);
    const data = await response.json();

    if (data.error) {
      console.error('Error fetching top song:', data.message);
      return;
    }

    const topTrack = data.tracks.track[0];
    const songName = topTrack.name;
    const artistName = topTrack.artist.name;

    document.getElementById('playing-song').innerHTML = songName;
    document.getElementById('playing-song-artist').innerHTML = artistName;
  } catch (error) {
    console.error('Error fetching top song:', error);
  }
};

document.getElementById('trending-song').addEventListener('click', playTrendingSong);


// ***************** API for getting top 5 tracks **********************

async function fetchTop5Song() {
  const apiKey = '54eea564740c511910bb580592d841f7'; // Replace with your Last.fm API key
  const apiUrl = `https://ws.audioscrobbler.com/2.0/?method=chart.gettoptracks&api_key=${apiKey}&format=json`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    if (data.error) {
      console.error('Error fetching top song:', data.message);
      return;
    }
    //console.log(data);

    for (let i = 1; i<6; i++)
    {
      const topTrack = data.tracks.track[i];
      const songName = topTrack.name;
      const artistName = topTrack.artist.name;

      document.getElementById(`song${i}`).innerHTML = songName;
      document.getElementById(`artist${i}`).innerHTML = artistName;

    }
  } catch (error) {
    console.error('Error fetching top song:', error);
  }
}

fetchTop5Song();


// ************** Play-pause implementation ***************


var isPlaying = false;
    var audioElement = document.createElement('audio');
    audioElement.setAttribute('src', 'Vaaste - Dhvani Bhanushali-(PagalWorld.Ink).mp3');

    function togglePlayPause() {
        var pauseIcon = document.querySelector('#pause i');

        if (isPlaying) {
            audioElement.pause();
            isPlaying = false;
            pauseIcon.classList.remove('bx-pause-circle');
            pauseIcon.classList.add('bx-play-circle');
        } else {
            audioElement.play();
            isPlaying = true;
            pauseIcon.classList.remove('bx-play-circle');
            pauseIcon.classList.add('bx-pause-circle');
        }
    }

    var pauseButton = document.querySelector('#pause');
    pauseButton.addEventListener('click', togglePlayPause);


// *********** song duration ****************

let Song = document.getElementById('audio');
  let progress = document.getElementById('progress');

  Song.addEventListener('loadedmetadata', function () {
    progress.max = Song.duration;
    progress.value = Song.currentTime;
  });

  Song.addEventListener('timeupdate', function () {
    progress.value = Song.currentTime;
  });

  progress.oninput = function () {
    Song.currentTime = progress.value;
  };

  progress.onchange = function () {
    Song.play();
  };







