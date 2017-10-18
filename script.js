var MODULE = function() {
  var todos = [];

  var init = function() {
    addTodo();
  }

  var addTodo = function() {
    var addTodoTextInput = document.getElementById('addTodoTextInput');
    var addDeadlineInput = document.getElementById('addDeadlineInput');
    todos.push({
      todoText: addTodoTextInput.value,
      completed: false
    });
    addTodoTextInput.value = '';
    displayTodos();
  }

  var deleteTodo = function(position) {
    todos.splice(position, 1);
    displayTodos();
  }

  var displayDoneTodos = function() {
    todos.forEach(function(todo, position){
      if (todo.completed) {
        console.log('todo.completed');
      }
      displayTodos();
    });
  }

  var displayTodos = function() {
    var todosUl = document.querySelector('ul');
    todosUl.innerHTML = '';
    todos.forEach(function(todo, position) {
      var todoLi = document.createElement('li');
      todoLi.className = 'task';
      var todoText = '';
      todoText = todo.todoText;
      var deadlineText = todo.deadline;
      todoLi.id = position;
      todoLi.textContent = todoText;
      todoLi.prepend(createCheckbox());
      todoLi.appendChild(createDeadline(deadlineText));
      todoLi.appendChild(createDeleteButton());
      todosUl.appendChild(todoLi);
      if (todo.completed) {
        todoLi.className = 'checked';
        document.getElementsByClassName('checkbox').checked = true;
      }
    }, this);
  }

  var createCheckbox = function() {
    var checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.className = 'checkbox';
    return checkbox;
  };

  var createDeadline = function(deadlineText) {
    var spanDeadline = document.createElement('span');
    spanDeadline.textContent = deadlineText;
    return spanDeadline;
  };

  var createDeleteButton = function() {
    var deleteButton = document.createElement('button');
    deleteButton.textContent = 'Х';
    deleteButton.className = 'deleteButton';
    return deleteButton;
  };

  var setUpEventListeners = function() {
    var todosUl = document.querySelector('ul');
    todosUl.addEventListener('click', function(event) {
      var elementClicked = event.target;
      if (elementClicked.className === 'deleteButton') {
       deleteTodo(parseInt(elementClicked.parentNode.id));
     }
   });
    todosUl.addEventListener('click', function(event) {
      var elementClicked = event.target;
      if (elementClicked.className === 'checkbox') {
        event.target.parentNode.classList.toggle('checked');
        todos.forEach(function(val, i){
          if (val.todoText === event.target.parentNode.textContent.slice(0, -1)) {
            console.log('val.completed = ' + val.completed);
            val.completed = !val.completed;
          }
        });
      }
    });
  }();

  return {
    init: init,
    addTodo: addTodo,
    displayDoneTodos: displayDoneTodos
  };

} ();

document.getElementById('addButton').onclick = function () {
  MODULE.init();
};



