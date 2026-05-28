const todoInput = document.getElementById('todoInput');
const addTodoButton = document.getElementById('addTodoButton');
const todoList = document.getElementById('todoList');

function createTodoItem(todoText) {
  const listItem = document.createElement('li');
  listItem.className = 'todo-item';

  const textSpan = document.createElement('span');
  textSpan.textContent = todoText;

  const deleteButton = document.createElement('button');
  deleteButton.type = 'button';
  deleteButton.className = 'delete-btn';
  deleteButton.textContent = 'Delete';

  deleteButton.addEventListener('click', () => {
    listItem.remove();
  });

  listItem.appendChild(textSpan);
  listItem.appendChild(deleteButton);
  todoList.appendChild(listItem);
}

function addTodo() {
  const todoText = todoInput.value.trim();

  if (!todoText) {
    return;
  }

  createTodoItem(todoText);
  todoInput.value = '';
  todoInput.focus();
}

addTodoButton.addEventListener('click', addTodo);

todoInput.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    addTodo();
  }
});
