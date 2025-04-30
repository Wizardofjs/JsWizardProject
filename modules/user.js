import { getDataFromSessionStorage } from './fetch.js';
import { showAllPostUser } from './posts.js';
import { renderTodos } from './todos.js';
import { showUserDiv, startBroomAnimation, scrollAllToTop } from './ui.js';


window.addEventListener('resize', moveUsersToDropdown);

export function loadUsers() {
  try {
    const images = getDataFromSessionStorage('img');
    const users = getDataFromSessionStorage('users');
    const userDiv = document.querySelector('.others-div');
    const fragment = document.createDocumentFragment();
    const statusMap = {};

    // Rensa skeleton screens
    userDiv.innerHTML = '';

    // Loopar igenom users och skapar element i HTML
    users.forEach((user, index) => {
      const userElement = document.createElement('button');
      const colors = ['#65ff90', 'gray'];
      const randomColor = colors[Math.floor(Math.random() * colors.length)];
      userElement.classList.add(randomColor === '#65ff90' ? 'green' : 'gray');
      statusMap[index + 1] = randomColor;
      userElement.classList.add('other-user');
      userElement.textContent = `${user.name}`;
      fragment.appendChild(userElement);

      const userImage = images[index];

      // Event listener för klick på användare
      userElement.addEventListener('click', () => {
        showUserDetails(user, userImage?.image);
        renderTodos(user.id);
        showAllPostUser(user.id);
        startBroomAnimation(event);
      });
    });

    sessionStorage.setItem('statusMap', JSON.stringify(statusMap));
    userDiv.appendChild(fragment);
  } catch (error) {
    console.log('Fel vid hämtning av användare: ' + error);
  }
}

// Funktion för att visa detaljer om användaren
export function showUserDetails(user, img) {
  const userDiv = document.querySelector('.user-ui');
  const todosContainer = document.querySelector('.todos-container');

  const statusMap = JSON.parse(sessionStorage.getItem('statusMap')) || {};
  const userIndex = user.id;
  const color = statusMap[userIndex] || 'yellow';

  userDiv.innerHTML = `
    <br> <h2>${user.name}<i class="fa-solid fa-circle" style="color: ${color};"></i></h2><br> 
    <img src="${img || 'default.jpg'}" alt="Profilbild" class="profile-pic"><br>
    <p>Username: ${user.username}<br>
    Email: ${user.email}</p>
    <button id="toggle-todos-btn">Todo List <i class="fa fa-arrow-down" aria-hidden="true"></i></button>
  `;

  showUserDiv();

  // Initiera todo container baserat på skärmstorleken
  const isFullscreen = window.innerWidth >= 768; 
  todosContainer.style.display = isFullscreen ? 'block' : 'none';
  todosContainer.classList.toggle('show', isFullscreen);

  const toggleBtn = document.getElementById('toggle-todos-btn');
  toggleBtn.innerHTML = isFullscreen
    ? 'Todo List <i class="fa fa-arrow-up" aria-hidden="true"></i>'
    : 'Todo List <i class="fa fa-arrow-down" aria-hidden="true"></i>';

  // Event listener för toggle knapp
  toggleBtn.addEventListener('click', () => {
    const isHidden = !todosContainer.classList.contains('show');

    if (isHidden) {
      todosContainer.style.display = 'block';
      setTimeout(() => {
        todosContainer.classList.add('show');
      }, 10);
      toggleBtn.innerHTML =
        'Todo List <i class="fa fa-arrow-up" aria-hidden="true"></i>';
    } else {
      todosContainer.classList.remove('show');
      setTimeout(() => {
        todosContainer.style.display = 'none';
      }, 400);
      toggleBtn.innerHTML =
        'Todo List <i class="fa fa-arrow-down" aria-hidden="true"></i>';
    }
  });

  // Hanterar window resize för att uppdatera synligheten
  window.addEventListener('resize', () => {
    const isNowFullscreen = window.innerWidth >= 1000;
    if (isNowFullscreen) {
      // Fullscreen: show container by default
      todosContainer.style.display = 'block';
      todosContainer.classList.add('show');
      toggleBtn.innerHTML =
        'Todo List <i class="fa fa-arrow-up" aria-hidden="true"></i>';
    } else {
      // Gömmer containern i mobilläge
      todosContainer.style.display = 'none';
      todosContainer.classList.remove('show');
      toggleBtn.innerHTML =
        'Todo List <i class="fa fa-arrow-down" aria-hidden="true"></i>';
    }
  });
  setTimeout(() => {
    scrollAllToTop(); //Scrolla upp efter uppdatering av DOM
  }, 100)
}



const dropdownBtn = document.querySelector('.dropdown-btn');
const dropdownContent = document.querySelector('.dropdown-content');

// Eventlyssnare för att toggla visning av dropdown
dropdownBtn.addEventListener('click', () => {
  dropdownContent.classList.toggle('show'); 
  

  if (dropdownContent.classList.contains('show')) {
    moveUsersToDropdown(true);
  } else {
    moveUsersToDropdown(false);
  }
});

// Stänger dropdown om man klickar utanför
window.addEventListener('click', (e) => {
  if (!dropdownBtn.contains(e.target) && !dropdownContent.contains(e.target)) {
    dropdownContent.classList.remove('show'); 
    moveUsersToDropdown(false); 
  }
});

// Funktion som anropas för att flytta användarna till eller från dropdownen
function moveUsersToDropdown(isOpen) {
    const dropdownContent = document.querySelector('.dropdown-content');
    const othersDiv = document.querySelector('.others-div');
    const userButtons = document.querySelectorAll('.other-user');
    
    if (window.innerWidth <= 1000) {
      if (isOpen) {
        userButtons.forEach(button => {
          dropdownContent.appendChild(button);
        });
      } else {
        userButtons.forEach(button => {
          othersDiv.appendChild(button);
        });
      }

      if (othersDiv) othersDiv.style.display = 'none';
    } else {
      userButtons.forEach(button => {
        othersDiv.appendChild(button);
      });

      if (othersDiv) othersDiv.style.display = 'block';

      dropdownContent.classList.remove('show');
    }
}