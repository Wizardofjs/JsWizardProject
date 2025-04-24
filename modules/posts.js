import { getDataFromSessionStorage } from './fetch.js';
import { showComments } from './comments.js';

const posts = getDataFromSessionStorage('posts');
const users = getDataFromSessionStorage('users');

// Funktion för att skapa och returnera post-element
function createPostElement(post, user) {
  const article = document.createElement('article');
  article.classList.add('post');
  article.setAttribute('post-id', post.id);
  article.setAttribute('user-id', post.userId);

  const header = document.createElement('header');
  const h2 = document.createElement('h2');
  const username = user ? user.name : 'Okänd användare';

  h2.textContent = username;
  header.appendChild(h2);
  article.appendChild(header);

  const pContent = document.createElement('p');
  pContent.innerHTML = post.body.replace(/\n/g, '<br>');
  article.appendChild(pContent);

  return article;
}

// Funktion för att visa första användare och dess inlägg
export function showPosts() {
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
      postsContainer.appendChild(createPostElement(post, user));
    });
  } else {
    console.log('No posts data available in sessionStorage.');
  }
}

// Funktion för att visa alla inlägg från en användare
export function showAllPostUser(userId) {
  if (Array.isArray(posts) && posts.length > 0) {
    const postsContainer = document.querySelector('.feed-div');
    postsContainer.innerHTML = '';

    posts
      .filter((post) => post.userId === userId)
      .forEach((post) => {
        const user = users.find((u) => u.id === post.userId);
        postsContainer.appendChild(createPostElement(post, user));
      });

    showComments();
  } else {
    console.log('No posts data available in sessionStorage.');
  }
}
