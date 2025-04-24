/* export function loadWand() {
  document.addEventListener('click', function (e) {
    const star = document.createElement('div');
    star.className = 'star';
    star.textContent = '✨';
    star.style.left = `${e.clientX}px`;
    star.style.top = `${e.clientY}px`;

    document.body.appendChild(star);

    setTimeout(() => {
      star.remove();
    }, 600);
  });
} */
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
  document.getElementById("header").addEventListener('click', () => {
    showPosts();
    showComments();
    showWelcomeInfo();
  })
}

//Visa välkomstinfon i vänsterkolumnen
function showWelcomeInfo() {
  const userInfo = document.getElementsByClassName('user-div')[0];
if (userInfo) {
  userInfo.style.display = 'none';
}
  //const welcomeInfo = document.getElementById('welcome-div');
  //welcomeInfo.style.display = 'block';
}

//Visa user-div infon i vänsterkolumnen
export function showUserDiv() {
  const userInfo = document.getElementsByClassName('user-div')[0];
  if (userInfo) {
    userInfo.style.display = 'block';
  }
  //const welcomeInfo = document.getElementById('welcome-div');
  //welcomeInfo.style.display = 'none';
}