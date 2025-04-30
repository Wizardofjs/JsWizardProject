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
      star.style.left = `${e.clientX + window.scrollX - 1}px`; 
      star.style.top = `${e.clientY + window.scrollY - 1}px`; 


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

export function scrollAllToTop() {
  const isMobile = window.innerWidth <= 768;
  //På mobil, används document.documentElement.scrollTo för att säkerställa att hela dokumentet scrollas
  if (isMobile) {
    document.documentElement.scrollTo({ top: 0, behavior: 'smooth' }); // Scrolla hela sidan på mobil
    document.body.scrollTo({ top: 0, behavior: 'smooth' }); // Fallback till body, om det behövs
  } else {
    //För desktop, används window.scrollTo()
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  //Ge lite tid för att vänta på att innehållet ska laddas ordentligt (särskilt för bilder och användardata)
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
  }, 150); 
}

export function startBroomAnimation(event) {
  if (!event || !event.clientX || !event.clientY) return;

  const broomDiv = document.createElement('div');
  broomDiv.classList.add('broom');

  const img = document.createElement('img');
  img.src = 'img/broom.png';
  img.alt = "Witch's Broom";
  img.classList.add('broom-image');

  broomDiv.appendChild(img);
  document.body.appendChild(broomDiv);

  broomDiv.style.left = `${event.clientX}px`;
  broomDiv.style.top = `${event.clientY}px`;

  setTimeout(() => {
    broomDiv.classList.add('animate-broom');
  }, 50);

  broomDiv.addEventListener('animationend', () => {
    broomDiv.remove();
  });
}
