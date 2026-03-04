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
const countEl = document.getElementById("todo-count");

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

  // update counter text
  if (countEl) {
    countEl.textContent = todos.length === 1 ? "1 task" : `${todos.length} tasks`;
  }

  todos.forEach((todo, index) => {
    const li = document.createElement("li");
    li.textContent = todo.text;

    if (todo.completed) li.classList.add("completed");

    // Toggle complete
    li.addEventListener("click", () => {
      todo.completed = !todo.completed;
      saveAndRender();
    });

    // Edit button
    const editBtn = document.createElement("button");
    editBtn.textContent = "✏️";
    editBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      startEdit(index, li);
    });

    // Delete button
    const delBtn = document.createElement("button");
    delBtn.textContent = "❌";
    delBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      todos.splice(index, 1);
      saveAndRender();
    });

    li.appendChild(editBtn);
    li.appendChild(delBtn);
    list.appendChild(li);
  });
}

// Helper to start editing a task
function startEdit(index, li) {
  const todo = todos[index];
  const inputEl = document.createElement("input");
  inputEl.type = "text";
  inputEl.value = todo.text;
  inputEl.classList.add("editing");

  // replace li contents with input and keep buttons
  li.textContent = "";
  li.appendChild(inputEl);

  // keep buttons for save/cancel if desired
  inputEl.focus();

  function finishEdit(save) {
    if (save) {
      const newText = inputEl.value.trim();
      if (newText !== "") {
        todo.text = newText;
      }
    }
    saveAndRender();
  }

  inputEl.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      finishEdit(true);
    } else if (e.key === "Escape") {
      finishEdit(false);
    }
  });

  inputEl.addEventListener("blur", () => {
    finishEdit(true);
  });
}

// Save + Render
function saveAndRender() {
  localStorage.setItem("todos", JSON.stringify(todos));
  renderTodos();
}
