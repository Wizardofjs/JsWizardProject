import { getDataFromSessionStorage } from './fetch.js';

// Hämta post från session storage

//Funktion för att visa första användare och dess inlägg
export function showPosts() {
  const posts = getDataFromSessionStorage('posts');

  if (posts.length > 0) {
    const postsContainer = document.querySelector('.post');
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

      const header = document.createElement('header');
      const h2 = document.createElement('h2');

      /* Bara för att se vilken användare och vilken post, ta bort vid senare tillfälle */
      h2.textContent = `User: ${post.userId} | Post ID: ${post.id}`;
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
