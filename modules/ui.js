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
    const emojis = ['✨', '★', '✦', '✧', '✪', '✩'];

    for (let i = 0; i < 8; i++) {
      const star = document.createElement('div');
      star.className = 'star';
      star.textContent = emojis[Math.floor(Math.random() * emojis.length)];
      star.style.color = colors[Math.floor(Math.random() * colors.length)];
      star.style.left = `${e.clientX + window.scrollX - 1}px`; // Adjust for scroll and hotspot
      star.style.top = `${e.clientY + window.scrollY - 1}px`; // Adjust for scroll and hotspot

      // Random offset for confetti effect
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
    scrollAllToTop();
  });
}

//Visa välkomstinfon i vänsterkolumnen
function showWelcomeInfo() {
  const leftContainer = document.getElementsByClassName('left-container')[0];
  const welcomeDiv = document.querySelector('.welcome-div');
  if (leftContainer) {
    leftContainer.style.display = 'none';
    welcomeDiv.style.display = 'block';
  }
}

//Visa user-div infon i vänsterkolumnen
export function showUserDiv() {
  const leftContainer = document.getElementsByClassName('left-container')[0];
  const welcomeDiv = document.querySelector('.welcome-div');
  if (leftContainer) {
    leftContainer.style.transform = 'translateX(-1000px)';
    leftContainer.style.display = 'block';
    welcomeDiv.style.display = 'none';
    setTimeout(() => {
      leftContainer.style.transform = 'translateX(0px)';
    }, 200);
  }
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

export function scrollAllToTop() {
  // Scrolla window direkt
  window.scrollTo({ top: 0, behavior: 'smooth' });

  // Vänta ett ögonblick så att DOM-hantering (t.ex. posts/todos) hinner uppdateras
  setTimeout(() => {
    const scrollTargets = [
      document.querySelector('.feed-div'),
      document.querySelector('.left-container'),
    ];

    scrollTargets.forEach((el) => {
      if (el) {
        el.scrollTo({ top: 0, behavior: 'smooth' });
      }
    });
  }, 50); // Justera till 100ms vid behov
}

export function startBroomAnimation() {
  // Create broom div
  const broomDiv = document.createElement('div');
  broomDiv.classList.add('broom');

  // Create image
  const img = document.createElement('img');
  img.src = 'img/broom.png';
  img.alt = "Witch's Broom";
  img.classList.add('broom-image');

  // Append image to div
  broomDiv.appendChild(img);

  // Append div to body
  document.body.appendChild(broomDiv);

  // Trigger animation after a short delay to ensure rendering
  setTimeout(() => {
    broomDiv.classList.add('animate-broom');
  }, 50);
}
