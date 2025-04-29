import { getDataFromSessionStorage } from './fetch.js';
import { showAllPostUser } from './posts.js';
import { renderTodos } from './todos.js';
import { showUserDiv, startBroomAnimation } from './ui.js';

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

      // Event listener for user button clicks
      userElement.addEventListener('click', () => {
        showUserDetails(user, userImage?.image);
        renderTodos(user.id);
        showAllPostUser(user.id);
        startBroomAnimation(event);
      });
      console.log(`Bild för ${user.name}:`, userImage?.image);
    });
    console.log(statusMap);
    sessionStorage.setItem('statusMap', JSON.stringify(statusMap));
    userDiv.appendChild(fragment);
  } catch (error) {
    console.log('Fel vid hämtning av användare: ' + error);
  }
}

// Function to show user details
export function showUserDetails(user, img) {
  const userDiv = document.querySelector('.user-ui');
  const todosContainer = document.querySelector('.todos-container');

  const statusMap = JSON.parse(sessionStorage.getItem('statusMap')) || {};
  const userIndex = user.id;
  console.log(userIndex);

  const color = statusMap[userIndex] || 'yellow';

  userDiv.innerHTML = `<i class="fa-solid fa-circle" style="color: ${color};"></i>
    <br> <h2>${user.name}</h2><br> 
    <img src="${img || 'default.jpg'}" alt="Profilbild" class="profile-pic"><br>
    <p>Username: ${user.username}<br>
    Email: ${user.email}</p>
     <button id="toggle-todos-btn">Toggle Todos</button>
     
  `;

  showUserDiv();

  const toggleBtn = document.getElementById('toggle-todos-btn');
  toggleBtn.addEventListener('click', () => {
    if (
      todosContainer.style.display === 'none' ||
      todosContainer.style.display === ''
    ) {
      todosContainer.style.display = 'block';
    } else {
      todosContainer.style.display = 'none';
    }
  });
}
