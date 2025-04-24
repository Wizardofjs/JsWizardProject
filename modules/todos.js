export async function renderTodos(userId) {
  try {
    const dataAll = JSON.parse(sessionStorage.getItem('todos'));
    const data = dataAll.filter((item) => item.userId === userId);
    const todosDiv = document.querySelector('.todos-div');
    console.log('Todos for user:', userId);

    todosDiv.innerHTML = '';

    data.forEach((item) => {
      const todosItem = document.createElement('div');
      todosItem.classList.add('todos-item');

      const todosCheckbox = document.createElement('i');

      item.completed
        ? (todosCheckbox.className = 'bx bx-checkbox-checked')
        : (todosCheckbox.className = 'bx bx-checkbox');

      const todosTitle = document.createElement('p');
      todosTitle.classList.add('todos-title');
      todosTitle.textContent = item.title;

      todosDiv.appendChild(todosItem);
      todosItem.appendChild(todosCheckbox);
      todosItem.appendChild(todosTitle);
    });
  } catch (error) {
    console.error('Error to render todos', error);
  }
}
