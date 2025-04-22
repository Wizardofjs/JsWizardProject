import { showPosts } from "./posts.js";
import { loadUsers } from "./user.js";
import { showPosts } from './posts.js';


async function fetchData(url) {
  const response = await fetch(url);
  return response.ok ? response.json() : null;
}

export async function fetchAndStoreData() {
  const postsData = await fetchData(
    'https://jsonplaceholder.typicode.com/posts'
    'https://jsonplaceholder.typicode.com/posts'
  );
  const commentsData = await fetchData(
    'https://jsonplaceholder.typicode.com/comments'
    'https://jsonplaceholder.typicode.com/comments'
  );
  const todosData = await fetchData(
    'https://jsonplaceholder.typicode.com/todos'
    'https://jsonplaceholder.typicode.com/todos'
  );
  const usersData = await fetchData(
    'https://jsonplaceholder.typicode.com/users'
    'https://jsonplaceholder.typicode.com/users'
  );

  if (postsData) sessionStorage.setItem('posts', JSON.stringify(postsData));
  if (postsData) sessionStorage.setItem('posts', JSON.stringify(postsData));
  showPosts();
  /* Tillfällig lösning för att köra funktion efter att fetch sparats i session */
  if (commentsData)
<<<<<<< HEAD
    sessionStorage.setItem("comments", JSON.stringify(commentsData));
  if (todosData) sessionStorage.setItem("todos", JSON.stringify(todosData));
  if (usersData) sessionStorage.setItem("users", JSON.stringify(usersData));
  loadUsers();
=======
    sessionStorage.setItem('comments', JSON.stringify(commentsData));
  if (todosData) sessionStorage.setItem('todos', JSON.stringify(todosData));
  if (usersData) sessionStorage.setItem('users', JSON.stringify(usersData));
>>>>>>> c4379e295f4df6df7959a358875d92fa106a5f95

  console.log('Data fetched and stored in sessionStorage');
}

export function getDataFromSessionStorage(key) {
  const data = sessionStorage.getItem(key);
  return data ? JSON.parse(data) : [];
}
