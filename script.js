const todoInput = document.getElementById('todoInput');
const addTodoButton = document.getElementById('addTodoButton');
const todoList = document.getElementById('todoList');
const themeToggleButton = document.getElementById('themeToggleButton');
const THEME_STORAGE_KEY = 'todo-theme';

function getInitialTheme() {
  const storedTheme = localStorage.getItem(THEME_STORAGE_KEY);

  if (storedTheme === 'light' || storedTheme === 'dark') {
    return storedTheme;
  }

  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function updateThemeToggleButton(currentTheme) {
  const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
  const label = `Switch to ${nextTheme === 'dark' ? 'Dark' : 'Light'}`;
  themeToggleButton.textContent = label;
  themeToggleButton.setAttribute('aria-label', `Switch to ${nextTheme} theme`);
}

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  updateThemeToggleButton(theme);
}

function initializeTheme() {
  applyTheme(getInitialTheme());
}

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

initializeTheme();

themeToggleButton.addEventListener('click', () => {
  const currentTheme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
  const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
  applyTheme(nextTheme);
  localStorage.setItem(THEME_STORAGE_KEY, nextTheme);
});

addTodoButton.addEventListener('click', addTodo);

todoInput.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    addTodo();
  }
});
