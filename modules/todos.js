import { fetchTodos } from "./fetch.js";

export async function renderTodos(userId) {
  try {
    const data = await fetchTodos(userId);
    const todosDiv = document.querySelector(".todos-div");
    console.log("Todos for user:", userId);

    data.forEach((item) => {
      const todosItem = document.createElement("div");
      todosItem.classList.add("todos-item");
      todosDiv.appendChild(todosItem);

      const todosCheckbox = document.createElement("i");
      if (item.completed) {
        todosCheckbox.className = "bx bx-checkbox-checked";
      } else {
        todosCheckbox.className = "bx bx-checkbox";
      }
      todosItem.appendChild(todosCheckbox);

      const todosTitle = document.createElement("p");
      todosTitle.classList.add("todos-title");
      todosTitle.textContent = item.title;
      todosItem.appendChild(todosTitle);
    });
  } catch (error) {
    console.log("Error to render todos", error);
  }
}
