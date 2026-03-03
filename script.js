// Your challenge (don’t skip)
// Implement at least 2 of these:
// Edit a task ✏️
// Filter: All / Completed / Pending
// Clear all completed
// Show task count
// Keyboard-only support (Enter, Delete)
const form = document.getElementById("todo-form");
const input = document.getElementById("todo-input");
const list = document.getElementById("todo-list");

let todos = JSON.parse(localStorage.getItem("todos")) || [];

renderTodos();

// Add todo
form.addEventListener("submit", function (e) {
  e.preventDefault();

  const text = input.value.trim();
  if (text === "") return;

  todos.push({ text, completed: false });
  saveAndRender();
  input.value = "";
});

// Render todos
function renderTodos() {
  list.innerHTML = "";

  todos.forEach((todo, index) => {
    const li = document.createElement("li");
    li.textContent = todo.text;

    if (todo.completed) li.classList.add("completed");

    // Toggle complete
    li.addEventListener("click", () => {
      todo.completed = !todo.completed;
      saveAndRender();
    });

    // Delete button
    const delBtn = document.createElement("button");
    delBtn.textContent = "❌";
    delBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      todos.splice(index, 1);
      saveAndRender();
    });

    li.appendChild(delBtn);
    list.appendChild(li);
  });
}

// Save + Render
function saveAndRender() {
  localStorage.setItem("todos", JSON.stringify(todos));
  renderTodos();
}
