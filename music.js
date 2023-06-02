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

    const image = topTrack.image[2]['#text'];

    document.getElementById('playing-song-img').src = image;
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



// ************ API for Top 2 Artists from India ***************

async function fetchTopArtists() {
  try {
    const apiKey = '54eea564740c511910bb580592d841f7'; // Replace with your Last.fm API key
    const country = 'india';

    const apiUrl = `https://ws.audioscrobbler.com/2.0/?method=geo.gettopartists&country=${country}&api_key=${apiKey}&format=json`;

    const response = await fetch(apiUrl);
    const data = await response.json();

    if (data.error) {
      console.error('Error fetching top artists:', data.message);
      return;
    }

    const topArtists = data.topartists.artist.slice(0, 2); // Get the top 2 artists
    let m = 1;

    topArtists.forEach((artist) => {
      const artistName = artist.name;
      const artistImage = artist.image[1]['#text'];

      document.getElementById(`img${m}`).src = artistImage;
      document.getElementById(`top-artist${m}`).innerHTML = artistName;
      m = m + 1;
    });
  } catch (error) {
    console.error('Error fetching top artists:', error);
  }
}

fetchTopArtists();


// *********  Playing the Top 5 Songs *************

const playSong = (songName, artistName, imageUrl) => {
  document.getElementById('playing-song').innerHTML = songName;
  document.getElementById('playing-song-artist').innerHTML = artistName;
  document.getElementById('playing-song-img').src = imageUrl;
  // add code to play the song here
};

// Event listeners for top 5 songs
document.getElementById('top-2').addEventListener('click', () => {
  const songName = document.getElementById('song1').innerHTML;
  const artistName = document.getElementById('artist1').innerHTML;
  const imageUrl = document.getElementById('top-2').querySelector('img').src;
  playSong(songName, artistName, imageUrl);
});

document.getElementById('top-3').addEventListener('click', () => {
  const songName = document.getElementById('song2').innerHTML;
  const artistName = document.getElementById('artist2').innerHTML;
  const imageUrl = document.getElementById('top-3').querySelector('img').src;
  playSong(songName, artistName, imageUrl);
});

document.getElementById('top-4').addEventListener('click', () => {
  const songName = document.getElementById('song3').innerHTML;
  const artistName = document.getElementById('artist3').innerHTML;
  const imageUrl = document.getElementById('top-4').querySelector('img').src;
  playSong(songName, artistName, imageUrl);
});

document.getElementById('top-5').addEventListener('click', () => {
  const songName = document.getElementById('song4').innerHTML;
  const artistName = document.getElementById('artist4').innerHTML;
  const imageUrl = document.getElementById('top-5').querySelector('img').src;
  playSong(songName, artistName, imageUrl);
});

document.getElementById('top-6').addEventListener('click', () => {
  const songName = document.getElementById('song5').innerHTML;
  const artistName = document.getElementById('artist5').innerHTML;
  const imageUrl = document.getElementById('top-6').querySelector('img').src;
  playSong(songName, artistName, imageUrl);
});


// **************** API for Artist details ******************

