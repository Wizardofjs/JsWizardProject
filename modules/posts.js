import { getDataFromSessionStorage } from './fetch.js';

//Funktion för att visa första användare och dess inlägg
export function showPosts() {
  const posts = getDataFromSessionStorage('posts');
  const users = getDataFromSessionStorage('users');

  if (posts.length > 0) {
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

    // Visa varje användare och dess post.
    // Här ska ett id skapas för kommentarer alt. i HTML sidan.
    uniquePosts.forEach((post) => {
      const article = document.createElement('article');
      article.classList.add('post');

      // Varje artikel får ett user och post ID
      article.setAttribute('post-id', post.id);
      article.setAttribute('user-id', post.userId);

      const header = document.createElement('header');
      const h2 = document.createElement('h2');

      // Hitta användarnamn baserat på userId
      const user = users.find((user) => user.id === post.userId);
      const username = user ? user.name : `User ${post.userId}`;

      h2.textContent = `${username}`;
      header.appendChild(h2);
      article.appendChild(header);

      const pContent = document.createElement('p');
      pContent.innerHTML = post.body.replace(/\n/g, '<br>');
      article.appendChild(pContent);

      postsContainer.appendChild(article);
    });
  } else {
    console.log('No posts data available in sessionStorage.');
  }
}
