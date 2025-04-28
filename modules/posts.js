// post.js
import { getDataFromSessionStorage } from './fetch.js';
import { createPostElement } from './user.js'; // Import createPostElement from user.js
import { showComments } from './comments.js';
import { showUserDetails } from './user.js';
import { renderTodos } from './todos.js';
import { scrollAllToTop } from './ui.js';

// Function for displaying posts
export function showPosts() {
  const posts = getDataFromSessionStorage('posts');
  const users = getDataFromSessionStorage('users');
  const images = getDataFromSessionStorage('img');
  if (Array.isArray(posts) && posts.length > 0) {
    const postsContainer = document.querySelector('.feed-div');
    postsContainer.innerHTML = '';

    // Object for tracking users
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
            (img, index) => users[index]?.id === user.id
          );
          const colors = ['#65ff90', 'gray']; // Same colors as in user.js
          const randomColor = colors[Math.floor(Math.random() * colors.length)];
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

// Function to show all posts from a user
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
