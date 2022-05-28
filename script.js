const musicContainer = document.getElementById('music-container');
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');

const audio = document.getElementById('audio');
const progress = document.getElementById('progress');
const progressContainer = document.getElementById('progress-container');
const title = document.getElementById('title');
const cover = document.getElementById('cover');

// Song titles
const songs = ['hey', 'summer', 'ukulele'];

// Keep track of song
let songIndex = 1;

// Initially load song details into DOM
loadSong(songs[songIndex]);

// Update song details
function loadSong(song) {
  title.innerText = song;
  audio.src = `music/${song}.mp3`;
  cover.src = `images/${song}.jpg`;
}

// Play song
function playSong() {
  musicContainer.classList.add('play');
  playBtn.querySelector('.fas').classList.remove('fa-play');
  playBtn.querySelector('.fas').classList.add('fa-pause');

  audio.play();
}

// Pause song
function pauseSong() {
  musicContainer.classList.remove('play');
  playBtn.querySelector('.fas').classList.remove('fa-pause');
  playBtn.querySelector('.fas').classList.add('fa-play');

  audio.pause();
}

// Play prev song
function prevSong() {
  songIndex--;

  if (songIndex < 0) {
    songIndex = songs.length - 1;
    // set to last one
  }

  loadSong(songs[songIndex]);

  playSong();
}

// Play next song
function nextSong() {
  songIndex++;

  if (songIndex > songs.length - 1) {
    songIndex = 0;
    // set to first one
  }

  loadSong(songs[songIndex]);

  playSong();
}

// Update progress bar
function updateProgress(e) {
  // console.dir(e.srcElement);
  // source element on which the event is happening
  // In the srcElements properties there is duration & currentTime
  const { duration, currentTime } = e.srcElement;
  const progressPercentage = (currentTime / duration) * 100;
  progress.style.width = `${progressPercentage}%`;
}

// Set progress bar
function setProgress(e) {
  // console.dir(this);
  // this = e.srcElement

  const width = this.clientWidth;
  const clickX = e.offsetX;
  // console.log(clickX);
  audio.currentTime = (clickX / width) * audio.duration;
}

// Event Listeners
playBtn.addEventListener('click', () => {
  const isPlaying = musicContainer.classList.contains('play');

  if (isPlaying) {
    pauseSong();
  } else {
    playSong();
  }
});

// Change song
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);

// Time/song update
audio.addEventListener('timeupdate', updateProgress);

// Click on progress bar
progressContainer.addEventListener('click', setProgress);

// Song ends
audio.addEventListener('ended', nextSong);
