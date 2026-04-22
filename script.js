/**
 * SELECTING ELEMENTS
 */
const input = document.getElementById('todo-input');
const addBtn = document.getElementById('add-btn');
const todoList = document.getElementById('todo-list');

/**
 * INITIALIZATION: Load saved tasks when the script runs
 */
document.addEventListener('DOMContentLoaded', () => {
    const savedTodos = getLocalData();
    savedTodos.forEach(task => createTodoElement(task));
});

/**
 * CORE LOGIC: Adding a new task
 */
function handleAddTask() {
    const taskValue = input.value.trim();

    if (taskValue === "") {
        // Simple shake effect if input is empty
        input.parentElement.style.animation = "shake 0.2s ease-in-out 2";
        setTimeout(() => input.parentElement.style.animation = "", 400);
        return;
    }

    createTodoElement(taskValue);
    saveToLocal(taskValue);
    
    input.value = ""; // Clear input
    input.focus();    // Return focus for next task
}

/**
 * UI LOGIC: Creating the task item in HTML
 */
function createTodoElement(taskText) {
    const li = document.createElement('li');
    
    // Structure of the list item
    li.innerHTML = `
        <span class="task-text">${taskText}</span>
        <button class="delete-btn" aria-label="Delete Task">✕</button>
    `;

    // Event: Toggle Completion
    li.querySelector('.task-text').addEventListener('click', function() {
        this.parentElement.classList.toggle('completed');
    });

    // Event: Delete Task with Animation
    li.querySelector('.delete-btn').addEventListener('click', function() {
        li.style.transform = "scale(0.8)";
        li.style.opacity = "0";
        
        setTimeout(() => {
            removeFromLocal(taskText);
            li.remove();
        }, 300);
    });

    todoList.appendChild(li);
}

/**
 * PERSISTENCE LOGIC: LocalStorage Handlers
 */
function saveToLocal(todo) {
    let todos = getLocalData();
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
}

function getLocalData() {
    const data = localStorage.getItem("todos");
    return data ? JSON.parse(data) : [];
}

function removeFromLocal(todoText) {
    let todos = getLocalData();
    const updatedTodos = todos.filter(t => t !== todoText);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
}

/**
 * EVENT LISTENERS
 */
addBtn.addEventListener('click', handleAddTask);

input.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        handleAddTask();
    }
});