async function fetchData(url) {
  const response = await fetch(url);
  return response.ok ? await response.json() : null;
}

export async function fetchAndStoreData() {
  const postsData = await fetchData(
    'https://jsonplaceholder.typicode.com/posts'
  );
  const commentsData = await fetchData(
    'https://jsonplaceholder.typicode.com/comments'
  );
  const todosData = await fetchData(
    'https://jsonplaceholder.typicode.com/todos'
  );
  const usersData = await fetchData(
    'https://jsonplaceholder.typicode.com/users'
  );

  const imgData = await fetchData('https://hp-api.onrender.com/api/characters');

  if (postsData) {
    sessionStorage.setItem('posts', JSON.stringify(postsData));
  }

  if (commentsData) {
    sessionStorage.setItem('comments', JSON.stringify(commentsData));
  }

  if (todosData) {
    sessionStorage.setItem('todos', JSON.stringify(todosData));
  }

  if (usersData) {
    sessionStorage.setItem('users', JSON.stringify(usersData));
  }

  if (imgData) {
    sessionStorage.setItem('img', JSON.stringify(imgData));
  }
}

export function getDataFromSessionStorage(key) {
  const data = sessionStorage.getItem(key);
  return data ? JSON.parse(data) : [];
}
