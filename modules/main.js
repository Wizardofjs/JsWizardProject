import { fetchAndStoreData } from './fetch.js';
import { showPosts } from './posts.js';
import { loadUsers } from './user.js';

async function init() {
  await fetchAndStoreData();
  loadUsers();
  showPosts();
}

init();
