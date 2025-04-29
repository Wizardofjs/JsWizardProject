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
  h2.classList.add('username');

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
  const postsContainer = document.querySelector('.feed-div');
  const fragment = document.createDocumentFragment();

  // Rensa skeleton screens
  postsContainer.innerHTML = '';

  if (Array.isArray(posts) && posts.length > 0) {
    // Object för att hålla koll på vilken användare
    const seenUsers = new Set();

    // Filter to show one post per user
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

      // Add event listener for username click inside the post element
      const usernameElement = postElement.querySelector('header h2');
      if (usernameElement) {
        usernameElement.addEventListener('click', () => {
          const userImage = images.find(
            (_img, index) => users[index]?.id === user.id
          );
          showAllPostUser(user.id);
          showUserDetails(user, userImage?.image);
          renderTodos(user.id);
          scrollAllToTop();
        });
      }

      fragment.appendChild(postElement);
    });

    postsContainer.appendChild(fragment);
  } else {
    console.log('No posts data available in sessionStorage.');
  }
}

// Function to show all posts from a user
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
      const userHeader = document.createElement('h2');
      userHeader.textContent = `${user.name}`;

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
  scrollAllToTop();
}
