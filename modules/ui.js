import { showPosts } from './posts.js';
import { showComments } from './comments.js';

export function loadWand() {
  document.addEventListener('click', function (e) {
    const colors = [
      '#ff4d4d',
      '#ffd11a',
      '#4dff4d',
      '#4dd2ff',
      '#bf80ff',
      '#ff66cc',
    ];
    const emojis = ['✨', '★', '✦', '✧', '✪', '✩']; // fun mix, or just stick to ✨

    for (let i = 0; i < 8; i++) {
      const star = document.createElement('div');
      star.className = 'star';
      star.textContent = emojis[Math.floor(Math.random() * emojis.length)];
      star.style.color = colors[Math.floor(Math.random() * colors.length)];
      star.style.left = `${e.clientX}px`;
      star.style.top = `${e.clientY}px`;

      // Random offset to make it feel more "confetti-like"
      const xOffset = (Math.random() - 0.5) * 200 + 'px';
      const yOffset = (Math.random() - 0.5) * 300 + 'px';
      star.style.setProperty('--x', xOffset);
      star.style.setProperty('--y', yOffset);

      document.body.appendChild(star);

      setTimeout(() => star.remove(), 1000);
    }
  });
}

//Funktion för att visa startsidan när header klickas
export function startPage() {
  document.getElementById('headline').addEventListener('click', () => {
    showPosts();
    showComments();
    showWelcomeInfo();
  });
}

//Visa välkomstinfon i vänsterkolumnen
function showWelcomeInfo() {
  const userInfo = document.getElementsByClassName('user-div')[0];
  const welcomeDiv = document.querySelector('.welcome-div');
  if (userInfo) {
    userInfo.style.display = 'none';
    welcomeDiv.style.display = 'block';
  }
  //const welcomeInfo = document.getElementById('welcome-div');
  //welcomeInfo.style.display = 'block';
}

//Visa user-div infon i vänsterkolumnen
export function showUserDiv() {
  const userInfo = document.getElementsByClassName('user-div')[0];
  const welcomeDiv = document.querySelector('.welcome-div');
  if (userInfo) {
    userInfo.style.display = 'block';
    welcomeDiv.style.display = 'none';
  }
  //const welcomeInfo = document.getElementById('welcome-div');
  //welcomeInfo.style.display = 'none';
}

// Testar lite spännande musik (:

export function loadMusic() {
  // Create audio element
  const audio = document.createElement('audio');
  audio.src = './audio/Our-Mountain.mp3';
  audio.type = 'audio/mpeg';
  audio.loop = true;
  audio.volume = 0;
  document.body.appendChild(audio);

  const playBtn = document.getElementById('wand');
  const pauseBtn = document.getElementById('hat');

  let isPlaying = false;
  let isFadingIn = false;

  // Preload the audio
  audio.preload = 'auto'; // Ensures the audio file is preloaded

  // Wait for the audio to be ready to play
  audio.addEventListener('canplaythrough', () => {
    playBtn.disabled = false; // Enable play button once audio is ready
  });

  playBtn.addEventListener('click', () => {
    if (!isPlaying && !isFadingIn) {
      audio.play().catch((err) => console.error('Audio play error:', err)); // Handle potential error

      let vol = 0;
      isFadingIn = true;
      const fadeIn = setInterval(() => {
        if (vol < 0.02) {
          vol += 0.0003;
          audio.volume = Math.min(vol, 0.02);
        } else {
          clearInterval(fadeIn);
          isFadingIn = false;
        }
      }, 200);

      isPlaying = true;
    }
  });

  pauseBtn.addEventListener('click', () => {
    if (isPlaying) {
      audio.pause();
      isPlaying = false;
    }
  });
}
