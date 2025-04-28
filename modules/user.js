// Importerar fetchUsers från fetch modulen
import { getDataFromSessionStorage } from './fetch.js';
import { renderTodos } from './todos.js';
import { showAllPostUser } from './posts.js';

import { showUserDiv } from './ui.js';

// Skapar en async funktion loadUsers()
export function loadUsers() {
  try {
    // Tilldelar variabler
    const images = getDataFromSessionStorage('img');
    const users = getDataFromSessionStorage('users');
    const userDiv = document.querySelector('.others-div');

    // Loopar igenom users och skapar element i HTML
    users.forEach((user, index) => {
      const userElement = document.createElement('button');
      const colors = ['#65ff90', 'gray']; // Uppdaterad grön färg
      const randomColor = colors[Math.floor(Math.random() * colors.length)];
      userElement.classList.add(randomColor === '#65ff90' ? 'green' : 'gray');

      userElement.classList.add('other-user');
      userElement.textContent = `${user.name}`;
      userDiv.appendChild(userElement);

      const userImage = images[index];

      // Skapar en eventlyssnare som anropar en funktion
      userElement.addEventListener('click', () => {
        const userColor = randomColor; // Hämta färgen från den slumpade klassen
        showUserDetails(user, userImage?.image, userColor); // Skicka färgen till funktionen
        renderTodos(user.id);
        showAllPostUser(user.id);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
      console.log(`Bild för ${user.name}:`, userImage?.image);
    });
  } catch (error) {
    console.log('Fel vid hämtning av användare: ' + error);
  }
}

// Funktion som anropas från eventlyssnaren och öppnar mer information om den klickade användaren
export function showUserDetails(user, img, color) {
  const userDiv = document.querySelector('.user-ui');
  userDiv.innerHTML = `<i class="fa-solid fa-circle" style="color: ${color};"></i>
    <br> <h2>${user.name}</h2><br> 
    <img src="${img || 'default.jpg'}" alt="Profilbild" class="profile-pic"><br>
    <p>Username: ${user.username}<br>
    Email: ${user.email}</p>`;
  showUserDiv();
}
