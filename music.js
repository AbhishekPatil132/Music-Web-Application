function like() {
  var likeButton = document.getElementById("like");
  var heartIcon = likeButton.querySelector("i");

  if (heartIcon.classList.contains("bx-heart")) {
    heartIcon.classList.replace("bx-heart", "bxs-heart");
  } else {
    heartIcon.classList.replace("bxs-heart", "bx-heart");
  }
}


function shuffle() {
  var shuffleButton = document.getElementById("shuffle");
  var shuffleIcon = shuffleButton.querySelector("i");

  if (shuffleButton.style.color === "green") {
    shuffleButton.style.color = "";
  } else {
    shuffleButton.style.color = "green";
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
