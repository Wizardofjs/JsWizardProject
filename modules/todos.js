export async function renderTodos(userId) {
  try {
    const dataAll = JSON.parse(sessionStorage.getItem('todos'));
    const data = dataAll.filter((item) => item.userId === userId);
    const todosDiv = document.querySelector('.todos-div');
    console.log('Todos for user:', userId);

    data.forEach((item) => {
      const todosItem = document.createElement('div');
      todosItem.classList.add('todos-item');
      todosDiv.appendChild(todosItem);

      const todosCheckbox = document.createElement('i');
      if (item.completed) {
        todosCheckbox.className = 'bx bx-checkbox-checked';
      } else {
        todosCheckbox.className = 'bx bx-checkbox';
      }
      todosItem.appendChild(todosCheckbox);

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
    console.log('Error to render todos', error);
    console.error('Error to render todos', error);
  }
}
