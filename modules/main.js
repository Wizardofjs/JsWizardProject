import { fetchAndStoreData } from './fetch.js';
import { showPosts } from './posts.js';
import { loadUsers } from './user.js';
import { showComments } from './comments.js';

async function init() {
  await fetchAndStoreData();
  loadUsers();
  showPosts();
  showComments();
}

init();
