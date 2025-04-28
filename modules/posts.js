import { getDataFromSessionStorage } from './fetch.js';
import { showComments } from './comments.js';
import { showUserDetails } from './user.js';
import { renderTodos } from './todos.js';
import { scrollAllToTop } from './ui.js';

// Funktion för att skapa och returnera post-element
function createPostElement(post, user, showUsername = true) {
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

// Funktion för att visa första användare och dess inlägg
export function showPosts() {
  const posts = getDataFromSessionStorage('posts');
  const users = getDataFromSessionStorage('users');
  const images = getDataFromSessionStorage('img');
  if (Array.isArray(posts) && posts.length > 0) {
    const postsContainer = document.querySelector('.feed-div');
    postsContainer.innerHTML = '';

    // Object för att hålla koll på vilken användare
    const seenUsers = new Set();

    // Filtrera 1 post per användare
    const uniquePosts = posts.filter((post) => {
      if (!seenUsers.has(post.userId)) {
        seenUsers.add(post.userId);
        return true;
      }
      return false;
    });

    uniquePosts.forEach((post) => {
      const user = users.find((user) => user.id === post.userId);
      const postElement = createPostElement(post, user);

      // Lägg till eventlistener för att visa alla inlägg från användaren
      const usernameElement = postElement.querySelector('header h2');
      if (usernameElement) {
        usernameElement.addEventListener('click', () => {
          const userImage = images.find(
            (img, index) => users[index]?.id === user.id
          ); // Match image to user
          const colors = ['#65ff90', 'gray']; // Same colors as in user.js
          const randomColor = colors[Math.floor(Math.random() * colors.length)]; // Random color
          showAllPostUser(user.id); // Show all posts for the user
          showUserDetails(user, userImage?.image, randomColor); // Pass user, image, and color
          renderTodos(user.id);
          scrollAllToTop();
        });
      }

      postsContainer.appendChild(postElement);
    });
  } else {
    console.log('No posts data available in sessionStorage.');
  }
}

// Funktion för att visa alla inlägg från en användare
export function showAllPostUser(userId) {
  const posts = getDataFromSessionStorage('posts');
  const users = getDataFromSessionStorage('users');
  if (Array.isArray(posts) && posts.length > 0) {
    const postsContainer = document.querySelector('.feed-div');
    postsContainer.innerHTML = '';

    const user = users.find((u) => u.id === userId);
    if (user) {
      const header = document.createElement('header');
      header.classList.add('user-header');
      const userHeader = document.createElement('h2');
      userHeader.textContent = `${user.name}`;

      header.appendChild(userHeader);
      postsContainer.appendChild(header);
    }

    posts
      .filter((post) => post.userId === userId)
      .forEach((post) => {
        const user = users.find((u) => u.id === post.userId);
        postsContainer.appendChild(createPostElement(post, user, false));
      });

    showComments();
  } else {
    console.log('No posts data available in sessionStorage.');
  }
  scrollAllToTop();
}
