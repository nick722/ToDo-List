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
      deadline: addDeadlineInput.value,
      completed: false
    });
    addTodoTextInput.value = '';
    addDeadlineInput.value = '';
    displayTodos(todos);
  }

  var deleteTodo = function(position) {
    todos.splice(position, 1);
    displayTodos(todos);
  }

  var displayAllTodos = function(){
    displayTodos(todos);
  }

  var displayDoneTodos = function() {
    var doneTodos = todos.filter(function(task){
      return task.completed;
    });
    displayTodos(doneTodos);
  }

  var displayUndoneTodos = function() {
    var undoneTodos = todos.filter(function(task){
      return !task.completed;
    });
    displayTodos(undoneTodos);
  }

  var displayTasksForTomorrow = function() {
    var tasksForTomorrow = todos.filter(function(task){
      var deadline = Date.parse(task.deadline)
      var date = new Date().setHours(3, 0, 0, 0) + 86400000;
      return deadline === date;
    });
    displayTodos(tasksForTomorrow);
  }

  var displayTasksForWeek = function() {
    var tasksForWeek = todos.filter(function(task){
      var deadline = Date.parse(task.deadline);
      var date = new Date().setHours(3, 0, 0, 0);
      return date + 604800000 >= deadline && date <= deadline;
    });
    displayTodos(tasksForWeek);
  }

  var displayTodos = function(tasks) {
    var todosUl = document.querySelector('ul');
    todosUl.innerHTML = '';
    tasks.forEach(function(todo, position) {
      var todoLi = document.createElement('li');
      var todoText = todo.todoText;
      var deadlineText = todo.deadline;
      todoLi.id = position;
      todoLi.textContent = todoText;
      //
      var checkbox = createCheckbox();
      todoLi.prepend(checkbox);
      if (todo.completed) {
        todoLi.className = 'checked';
        checkbox.checked = true;
        // todoLi.firstElementChild.setAttribute('checked', 'checked');
      } else {
        todoLi.className = 'task';
      }
      todoLi.appendChild(createDeadline(deadlineText));
      todoLi.appendChild(createDeleteButton());
      todosUl.appendChild(todoLi);
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
          console.log('event.target.parentNode.id = ' + event.target.parentNode.id);
          console.log('i = ' + i);
            if (parseInt(event.target.parentNode.id) === i) {
              console.log('event.target.parentNode.id === i');
              val.completed = !val.completed;
            }
          });

      }
    });
  }();

  return {
    init: init,
    addTodo: addTodo,
    displayAllTodos: displayAllTodos,
    displayDoneTodos: displayDoneTodos,
    displayUndoneTodos: displayUndoneTodos,
    displayTasksForTomorrow: displayTasksForTomorrow,
    displayTasksForWeek: displayTasksForWeek
  };

} ();

document.getElementById('addButton').onclick = function () {
  MODULE.init();
};


