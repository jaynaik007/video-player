const video = document.querySelector("video");
const progressRange = document.querySelector(".progress-range");
const progressBar = document.querySelector(".progress-bar");
const playBtn = document.getElementById("play-btn");
const volumneIcon = document.getElementById("volume-icon");
const volumeRange = document.querySelector(".volume-range");
const volumeBar = document.querySelector(".volume-bar");
const currentTime = document.querySelector(".time-elapsed");
const duration = document.querySelector(".time-duration");
const fullscreenBtn = document.querySelector(".fullscreen");
const speed = document.querySelector(".player-speed");
const player = document.querySelector(".player");

// Play & Pause ----------------------------------- //

function showPlayBtn() {
  playBtn.classList.replace("fa-pause", "fa-play");
  playBtn.setAttribute("title", "Play");
}

function togglePlay() {
  if (video.paused) {
    video.play();
    playBtn.classList.replace("fa-play", "fa-pause");
    playBtn.setAttribute("title", "Pause");
  } else {
    video.pause();
    showPlayBtn();
  }
}

// Progress Bar ---------------------------------- //
// Calculate display time format
function displayTime(time) {
  const minutes = Math.floor(time / 60);
  let seconds = Math.floor(time % 60);
  seconds = seconds < 10 ? `0${seconds}` : seconds;
  return `${minutes}: ${seconds}`;
}

// Update Progress as video plays
function updateProgress() {
  progressBar.style.width = `${(video.currentTime / video.duration) * 100}%`;
  currentTime.textContent = `${displayTime(video.currentTime)} /`;
  duration.textContent = `${displayTime(video.duration)}`;
}

// To click to Seek within them video
function setProgress(e) {
  const newTime = e.offsetX / progressRange.offsetWidth;
  progressBar.style.width = `${newTime * 100}%`;
  video.currentTime = newTime * video.duration;
}

// Volume Controls --------------------------- //

let lastVolume = 1;

// Volumn Bar
function changeVolume(e) {
  let volume = e.offsetX / volumeRange.offsetWidth;
  // Rounding volumne up or down
  if (volume < 0.1) {
    volume = 0;
  }
  if (volume > 0.9) {
    volume = 1;
  }
  volumeBar.style.width = `${volume * 100}%`;
  video.volume = volume;
  // Change volume dependong on volume
  volumneIcon.className = "";
  if (volume > 0.7) {
    volumneIcon.classList.add("fas", "fa-volume-up");
  } else if (volume < 0.7 && volume > 0) {
    volumneIcon.classList.add("fas", "fa-volume-down");
  } else {
    volumneIcon.classList.add("fas", "fa-volume-off");
  }
  lastVolume = volume;
}

// Mute/unmute
function toggleMute() {
  volumneIcon.className = "";
  if (video.volume) {
    lastVolume = video.volume;
    video.volume = 0;
    volumeBar.style.width = 0;
    volumneIcon.classList.add("fas", "fa-volume-mute");
    volumneIcon.setAttribute("title", "Unmute");
  } else {
    video.volume = lastVolume;
    volumeBar.style.width = `${lastVolume * 100}%`;
    volumneIcon.classList.add("fas", "fa-volume-up");
    volumneIcon.setAttribute("title", "Mute");
  }
}

// Change Playback Speed -------------------- //

function changeSpeed() {
  video.playbackRate = speed.value;
}

// Fullscreen ------------------------------- //
/* View in fullscreen */
function openFullscreen(elem) {
  if (elem.requestFullscreen) {
    elem.requestFullscreen();
  } else if (elem.webkitRequestFullscreen) {
    /* Safari */
    elem.webkitRequestFullscreen();
  } else if (elem.msRequestFullscreen) {
    /* IE11 */
    elem.msRequestFullscreen();
  }
  video.classList.add("video-fullscreen");
}

/* Close fullscreen */
function closeFullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.webkitExitFullscreen) {
    /* Safari */
    document.webkitExitFullscreen();
  } else if (document.msExitFullscreen) {
    /* IE11 */
    document.msExitFullscreen();
  }
  video.classList.remove("video-fullscreen");
}

let fullscreen = false;
// Toggle fullscreen
function toggleFullScreen() {
  if (!fullscreen) {
    openFullscreen(player);
  } else {
    closeFullscreen();
  }
  fullscreen = !fullscreen;
}

// Event Listeners
video.addEventListener("ended", showPlayBtn);
playBtn.addEventListener("click", togglePlay);
video.addEventListener("click", togglePlay);
video.addEventListener("timeupdate", updateProgress);
video.addEventListener("canplay", updateProgress);
progressRange.addEventListener("click", setProgress);
volumeRange.addEventListener("click", changeVolume);
volumneIcon.addEventListener("click", toggleMute);
speed.addEventListener("click", changeSpeed);
fullscreenBtn.addEventListener("click", toggleFullScreen);
