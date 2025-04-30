export function renderTodos(userId) {
  try {
    const dataAll = JSON.parse(sessionStorage.getItem('todos'));
    const todos = dataAll.filter((item) => item.userId === userId);
    const todosDiv = document.querySelector('.todos-div');

    todosDiv.innerHTML = '';

    todos.forEach((item) => {
      const todosItem = document.createElement('div');
      todosItem.classList.add('todos-item');

      const todosCheckbox = document.createElement('i');
      if (item.completed) {
        todosCheckbox.className = 'bx bx-check-square';
        todosCheckbox.style.color = '#F9F404';
      } else {
        todosCheckbox.className = 'bx bx-square';
        todosCheckbox.style.color = '#8E8B03';
      }

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

let sortToggle = false;

export function sortTodos(sortToggle) {
  const todosDiv = document.querySelector('.todos-div');
  const todosItems = todosDiv.querySelectorAll('.todos-item');

  todosItems.forEach((item) => {
    const checkbox = item.querySelector('i');
    const isChecked = checkbox.classList.contains('bx-check-square');

    if (sortToggle) {
      item.style.order = isChecked ? -1 : 0;
    } else {
      item.style.order = isChecked ? 0 : -1;
    }
  });
}

document.querySelector('#sort-todos-button').addEventListener('click', () => {
  sortToggle = !sortToggle;
  sortTodos(sortToggle);
});
