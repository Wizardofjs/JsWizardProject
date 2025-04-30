import { fetchAndStoreData } from './fetch.js';
import { showPosts } from './posts.js';
import { loadUsers } from './user.js';
import { loadWand, loadMusic } from './ui.js';
import { showComments } from './comments.js';
import { startPage } from './ui.js';

async function init() {
  try {
    await fetchAndStoreData();
    loadUsers();
    showPosts();
    loadWand();
    loadMusic();
    showComments();
  } catch (error) {
    console.error('Fel vid initiering:', error);
  }
  startPage();
}
init();
