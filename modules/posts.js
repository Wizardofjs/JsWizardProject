import { getDataFromSessionStorage } from './fetch.js';
import { showComments } from './comments.js';
import { showUserDetails } from './user.js';
import { renderTodos } from './todos.js';

// Funktion för att skapa och returnera post-element
function createPostElement(post, user, showHeader = true) {
  const article = document.createElement('article');
  article.classList.add('post');
  article.setAttribute('post-id', post.id);
  article.setAttribute('user-id', post.userId);

  if (showHeader) {
    const header = document.createElement('header');
    const h2 = document.createElement('h2');
    h2.classList.add('username');
    const username = user ? user.name : 'Okänd användare';
    h2.textContent = username;
    header.appendChild(h2);
    article.appendChild(header);
  }

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
  const postsContainer = document.querySelector('.feed-div');
  const fragment = document.createDocumentFragment();

  // Rensa skeleton screens
  postsContainer.innerHTML = '';

  if (Array.isArray(posts) && posts.length > 0) {
    // Objekt för att hålla koll på vilken användare
    const seenUsers = new Set();

    // Filter för att visa ett inlägg per användare
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

      // Eventlistener för klick på användare inuti ett inlägg
      const usernameElement = postElement.querySelector('header h2');
      if (usernameElement) {
        usernameElement.addEventListener('click', () => {
          const userImage = images.find(
            (_img, index) => users[index]?.id === user.id
          );
          showAllPostUser(user.id);
          showUserDetails(user, userImage?.image);
          renderTodos(user.id);
        });
      }

      fragment.appendChild(postElement);
    });

    postsContainer.appendChild(fragment);
  } else {
    console.log('No posts data available in sessionStorage.');
  }
}

// Funktion för att visa alla inlägg från en användare
export function showAllPostUser(userId) {
  const posts = getDataFromSessionStorage('posts');
  const users = getDataFromSessionStorage('users');
  const postsContainer = document.querySelector('.feed-div');
  const fragment = document.createDocumentFragment();

  postsContainer.innerHTML = '';

  if (Array.isArray(posts) && posts.length > 0) {
    const user = users.find((u) => u.id === userId);
    if (user) {
      const header = document.createElement('header');
      header.classList.add('user-header');

      const backButton = document.createElement('button');
      backButton.innerHTML = '<i class="fa-solid fa-arrow-left"></i>';
      backButton.classList.add('back-button');
      backButton.addEventListener('click', () => {
        location.reload();
      });

      const userHeader = document.createElement('h2');
      userHeader.textContent = `All post of ${user.name}`;

      header.appendChild(backButton);

      header.appendChild(userHeader);
      fragment.appendChild(header);
    }

    posts
      .filter((post) => post.userId === userId)
      .forEach((post) => {
        const user = users.find((u) => u.id === post.userId);
        fragment.appendChild(createPostElement(post, user, false));
      });

    postsContainer.appendChild(fragment);
    showComments();
  } else {
    console.log('No posts data available in sessionStorage.');
  }
}
