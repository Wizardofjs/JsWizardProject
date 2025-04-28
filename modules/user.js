import { getDataFromSessionStorage } from './fetch.js';
import { showAllPostUser } from './posts.js';
import { renderTodos } from './todos.js';
import { showUserDiv } from './ui.js';

export function loadUsers() {
  try {
    const images = getDataFromSessionStorage('img');
    const users = getDataFromSessionStorage('users');
    const userDiv = document.querySelector('.others-div');
    const fragment = document.createDocumentFragment();

    // Rensa skeleton screens
    userDiv.innerHTML = '';

    // Loopar igenom users och skapar element i HTML
    users.forEach((user, index) => {
      const userElement = document.createElement('button');
      const colors = ['#65ff90', 'gray'];
      const colors = ['#65ff90', 'gray'];
      const randomColor = colors[Math.floor(Math.random() * colors.length)];
      userElement.classList.add(randomColor === '#65ff90' ? 'green' : 'gray');
      userElement.classList.add('other-user');
      userElement.textContent = `${user.name}`;
      fragment.appendChild(userElement);

      const userImage = images[index];

      // Event listener for user button clicks
      userElement.addEventListener('click', () => {
        const userColor = randomColor;
        showUserDetails(user, userImage?.image, userColor);
        renderTodos(user.id);
        showAllPostUser(user.id);
        scrollAllToTop();
      });
      console.log(`Bild för ${user.name}:`, userImage?.image);
    });

    userDiv.appendChild(fragment);
  } catch (error) {
    console.log('Fel vid hämtning av användare: ' + error);
  }
}

// Function to show user details
export function showUserDetails(user, img, color) {
  const userDiv = document.querySelector('.user-ui');
  userDiv.innerHTML = `<i class="fa-solid fa-circle" style="color: ${color};"></i>
    <br> <h2>${user.name}</h2><br> 
    <img src="${img || 'default.jpg'}" alt="Profilbild" class="profile-pic"><br>
    <p>Username: ${user.username}<br>
    Email: ${user.email}</p>`;
  showUserDiv();
}