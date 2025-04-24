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
  const audio = document.createElement('audio');
  audio.src = './audio/Our-Mountain.mp3';
  audio.type = 'audio/mpeg';
  audio.autoplay = true;
  audio.loop = true;

  audio.volume = 0;
  document.body.appendChild(audio);

  const stopBtn = document.createElement('button');
  stopBtn.innerHTML = '<i class="fas fa-pause"></i>'; // Initially set to "Pause"
  const header = document.querySelector('.header'); // Select the header element

  if (header) {
    header.appendChild(stopBtn); // Append the button to the header
  }

  document.body.addEventListener(
    'click',
    () => {
      let vol = 0;
      const fadeIn = setInterval(() => {
        if (vol < 0.02) {
          vol += 0.0003; // Softer fade effect
          audio.volume = Math.min(vol, 0.02);
        } else {
          clearInterval(fadeIn);
        }
      }, 200); // 200ms interval = about 4 seconds for the fade-in
    },
    { once: true }
  );

  stopBtn.addEventListener('click', () => {
    if (audio.paused) {
      audio.play();
      stopBtn.innerHTML = '<i class="fas fa-pause"></i>'; // Change button text to "Pause" when playing
    } else {
      audio.pause();
      stopBtn.innerHTML = '<i class="fas fa-play"></i>'; // Change button text to "Play" when paused
    }
  });
}
