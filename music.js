const apiKey = 'f04e45b808fb2402087ccdefc7a6ea6f';

async function fetchMusicDetails() {
  const trackName = document.getElementById('input').value;
  const apiUrl = `http://ws.audioscrobbler.com/2.0/?method=track.search&track=${trackName}&api_key=${apiKey}&format=json`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    const track = data.results.trackmatches.track[0];
    const artist = track.artist;
    const songName = track.name;
    const listeners = track.listeners;
    const image = track.image[2]['#text'];

    document.getElementById('track-name').innerHTML = songName;
    document.getElementById('track-details').innerHTML = listeners;
    document.getElementById('track-artist').innerHTML = artist;
    document.getElementById('image').src = image;

    console.log(data);


    const psb = document.getElementById('pause-start-btn');
    psb.addEventListener('click', () => {
    const icon = psb.querySelector('i');
    if (icon.classList.contains('bx-pause')) {
    icon.classList.replace('bx-pause', 'bx-play');
    } else {
    icon.classList.replace('bx-play', 'bx-pause');
    }
    });
    
  } catch (error) {
    console.error('Error:', error);
  }
}

document.getElementById('s-cover').addEventListener('click', (e) => {
  e.preventDefault();
  fetchMusicDetails();
});

