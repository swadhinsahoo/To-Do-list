const inputField = document.getElementById('inp');
    const addBtn = document.getElementById('addbtn');
    const allBtn = document.getElementById('allBtn');
    const doneBtn = document.getElementById('doneBtn');
    const todoBtn = document.getElementById('todoBtn');
    const deleteAllBtn = document.getElementById('deleteAllBtn');
    const taskList = document.getElementById('list');

    let todos = [];

    addBtn.addEventListener('click', addTodo);
    allBtn.addEventListener('click', () => showTodos());
    doneBtn.addEventListener('click', () => showTodos(true));
    todoBtn.addEventListener('click', () => showTodos(false));
    deleteAllBtn.addEventListener('click', deleteAllTodos);

    function addTodo() {
      const task = inputField.value.trim();
      if (task) {
        todos.push({ id: Date.now(), task, completed: false });
        displayTodos();
        inputField.value = '';
      }
    }

    function displayTodos() {
      taskList.innerHTML = '';
      todos.forEach(todo => {
        const listItem = document.createElement('li');
        
const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = todo.completed;
        checkbox.addEventListener('change', () => {
          toggleTodoComplete(todo.id);
          displayTodos();
        });

        const taskText = document.createElement('span');
        taskText.textContent = todo.task;
        if (todo.completed) {
          taskText.classList.add('completed-task');
        }
        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.addEventListener('click', () => {
          const newTask = prompt('Enter new task:', todo.task);
          if (newTask && newTask.trim()) {
            todo.task = newTask.trim();
            displayTodos();
          }
        });

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', () => {
          todos = todos.filter(item => item.id !== todo.id);
          displayTodos();
        });

       
        listItem.appendChild(taskText);
         listItem.appendChild(checkbox);
        listItem.appendChild(editButton);
        listItem.appendChild(deleteButton);

        taskList.appendChild(listItem);
      });
    }

    function showTodos(completed = null) {
      taskList.innerHTML = '';
      todos
        .filter(todo => completed === null || todo.completed === completed)
        .forEach(todo => {
          const listItem = document.createElement('li');
          const checkbox = document.createElement('input');
          checkbox.type = 'checkbox';
          checkbox.checked = todo.completed;
          checkbox.addEventListener('change', () => {
            toggleTodoComplete(todo.id);
            displayTodos();
          });

          const taskText = document.createElement('span');
          taskText.textContent = todo.task;
          if (todo.completed) {
            taskText.classList.add('completed-task');
          }

          const editButton = document.createElement('button');
          editButton.textContent = 'Edit';
          editButton.addEventListener('click', () => {
            const newTask = prompt('Enter new task:', todo.task);
            if (newTask && newTask.trim()) {
              todo.task = newTask.trim();
              displayTodos();
            }
          });

          const deleteButton = document.createElement('button');
          deleteButton.textContent = 'Delete';
          deleteButton.addEventListener('click', () => {
            todos = todos.filter(item => item.id !== todo.id);
            displayTodos();
          });

          listItem.appendChild(checkbox);
          listItem.appendChild(taskText);
          listItem.appendChild(editButton);
          listItem.appendChild(deleteButton);

          taskList.appendChild(listItem);
        });
    }

    function toggleTodoComplete(id) {
      todos = todos.map(todo => (todo.id === id ? { ...todo, completed: !todo.completed } : todo));
    }

    function deleteAllTodos() {
      todos = [];
      displayTodos();
    }

    displayTodos();
