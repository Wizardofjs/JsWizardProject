// user.js
import { getDataFromSessionStorage } from './fetch.js';
import { showAllPostUser } from './posts.js';
import { renderTodos } from './todos.js';
import { showUserDiv } from './ui.js';

export function loadUsers() {
  try {
    const images = getDataFromSessionStorage('img');
    const users = getDataFromSessionStorage('users');
    const userDiv = document.querySelector('.others-div');

    // Clear userDiv to avoid duplicates
    userDiv.innerHTML = '';

    // Loop through users and create buttons
    users.forEach((user, index) => {
      const userElement = document.createElement('button');
      const colors = ['#65ff90', 'gray'];
      const randomColor = colors[Math.floor(Math.random() * colors.length)];
      userElement.classList.add(randomColor === '#65ff90' ? 'green' : 'gray');
      userElement.classList.add('other-user');
      userElement.textContent = `${user.name}`;
      userDiv.appendChild(userElement);

      const userImage = images[index];

      // Event listener for user button clicks
      userElement.addEventListener('click', () => {
        showUserDetails(user, userImage?.image, randomColor);
        renderTodos(user.id);
        showAllPostUser(user.id);
      });
    });

    // Event delegation for post username clicks
    const postsContainer = document.querySelector('.feed-div');
    postsContainer.addEventListener('click', (event) => {
      const usernameElement = event.target.closest('.post header h2');
      if (usernameElement) {
        const postElement = usernameElement.closest('.post');
        const userId = postElement.getAttribute('user-id');
        const user = users.find((u) => u.id == userId);
        const userImage = images[user.id - 1]; // Adjust for zero-based index
        const colors = ['#65ff90', 'gray'];
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        showUserDetails(user, userImage?.image, randomColor);
        showAllPostUser(user.id);
        renderTodos(user.id);
      }
    });
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

// Create and return post element
export function createPostElement(post, user, showUsername = true) {
  const article = document.createElement('article');
  article.classList.add('post');
  article.setAttribute('post-id', post.id);
  article.setAttribute('user-id', post.userId);

  const header = document.createElement('header');
  const h2 = document.createElement('h2');

  // Only show username if showUsername is true
  if (showUsername) {
    const username = user ? user.name : 'Okänd användare';
    h2.textContent = username;
  }
  header.appendChild(h2);
  article.appendChild(header);

  const pContent = document.createElement('p');
  pContent.innerHTML = post.body.replace(/\n/g, '<br>');
  article.appendChild(pContent);

  return article;
}
