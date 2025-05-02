import {
  startPage,
  loadWand,
  renderSkeletonScreens,
  removeLoadingBar,
} from './ui.js';
import { fetchAndStoreData } from './fetch.js';
import { showPosts } from './posts.js';
import { loadUsers } from './user.js';
import { showComments } from './comments.js';

async function init() {
  try {
    renderSkeletonScreens();
    await fetchAndStoreData();
    loadUsers();
    showPosts();
    loadWand();
    showComments();
    removeLoadingBar(); // Ta bort laddningsindikatorn efter att data är laddad
  } catch (error) {
    console.error('Fel vid initiering:', error);
  }
  startPage();
}
init();
