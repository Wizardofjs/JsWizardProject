import { fetchAndStoreData } from './fetch.js';
import { showPosts } from './posts.js';
import { loadUsers } from './user.js';
import { loadWand } from './ui.js';

async function init() {
  await fetchAndStoreData();
  loadUsers();
  showPosts();
  loadWand();
}

init();
