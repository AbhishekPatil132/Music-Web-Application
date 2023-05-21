const apiKey = 'f04e45b808fb2402087ccdefc7a6ea6f';

async function fetchMusicDetails() {
  const trackName = document.getElementById('input').value;
  const apiUrl = `https://ws.audioscrobbler.com/2.0/?method=track.search&track=${trackName}&api_key=${apiKey}&format=json`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    const songName = data.results.trackmatches.track[0].name;
    const listeners = data.results.trackmatches.track[0].listeners;
    const artistName = data.results.trackmatches.track[0].artist;

    document.getElementById('track-name').innerHTML = songName;
    document.getElementById('track-details').innerHTML = listeners;
    document.getElementById('track-artist').innerHTML = artistName;
    //document.getElementById('image').src = ;

    console.log(data);

    const psb = document.getElementById('pause-start-btn');
    psb.addEventListener('click', () => {
      const icon = psb.querySelector('i');
      if (icon.classList.contains('bx-pause')) {
        icon.classList.replace('bx-pause', 'bx-play');
        audio.pause();
      } else {
        icon.classList.replace('bx-play', 'bx-pause');
        audio.play();
      }
    });

    fetchMusicURL(trackName);
  } catch (error) {
    console.error('Error:', error);
  }
}

const fetchMusicURL = async (trackName) => {
  try {
    const encodedMusicName = encodeURIComponent(trackName);
    const apiUrl = `https://musicbrainz.org/ws/2/recording?query=${encodedMusicName}&fmt=json`;

    const response = await fetch(apiUrl);
    const result = await response.json();

    console.log(result);
    if (result.recordings && result.recordings.length > 0) {
      const firstRecording = result.recordings[0];
      const musicUrl = `https://musicbrainz.org/recording/${firstRecording.id}`;

      audio.src = musicUrl;
      audio.load();
    } else {
      console.log('No matching music found.');
    }
  } catch (error) {
    console.error(error);
  }
};

document.getElementById('s-cover').addEventListener('click', (e) => {
  e.preventDefault();
  fetchMusicDetails();
});

const pauseStartBtn = document.getElementById('pause-start-btn');
const audio = document.getElementById('audio');

pauseStartBtn.addEventListener('click', function () {
  if (audio.paused) {
    audio.play();
    pauseStartBtn.innerHTML = "<i class='bx bx-pause'></i>";
  } else {
    audio.pause();
    pauseStartBtn.innerHTML = "<i class='bx bx-play'></i>";
  }
});
