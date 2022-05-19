const wrapper = document.querySelector('.todos-wrapper'),
   btnAddTask = document.querySelector('#add-task-wrapper'),
   input = document.querySelector('#description-task');

input.focus();

let tasks;
let todoItem;
//5 проверка на наличие объекта в localStorage еслм он пуст то значит массив наш пустой и мы добавляем новые значения,но если в нем что-то есть то мы будем добавлять уже новые значения

!localStorage.tasks
   ? (tasks = [])
   : (tasks = JSON.parse(localStorage.getItem('tasks')));

//1 создать функцию конструктор для создания объекта

function Task(title) {
   this.title = title;
   this.completed = false;
}
//2  поставить обработчик клика на кнопку и отправка данных из инпута в наш массив

//4 Добавляем функцию addStorage для того чтобы при написании нового таска он сохранялся в localStorage

//8 добавляем функцию showTasks при клике на кнопку

btnAddTask.addEventListener('click', () => {

   if (!input.value) return;
   tasks.push(new Task(input.value));

   addStorage();
   fillHtmlList();
   input.value = '';
});

document.addEventListener('keydown', (e) => {

   if (e.key === 'Enter') {

      if (!input.value) return;
      tasks.push(new Task(input.value));

      addStorage();
      fillHtmlList();
      input.value = '';
   }
});

//7 функция для создания самого блока
const showTasks = (task, index) => {
   return `
           <div class="todo-item ${task.completed ? 'checked' : ''}">
              <div class="title">${task.title}</div>
              <div class="buttons">
                  <input onclick="completeTask(${index})" type="checkbox" class="btn-complete" 
                  ${task.completed ? 'checked' : ''}>
                  <button onclick="deleteTask(${index})"class="btn-delete">Delete</button>
              </div>
          </div>
           `;
};

//3 Создание функции для отправки данных в архив в виде JSON

const addStorage = () => {
   localStorage.setItem('tasks', JSON.stringify(tasks));
};

//6 функция для отправки значений в блок
// 6.1 сначала полностьб зачищаем наш блок
// 6.2 пробегаемся по нашему массиву и если он не пустой то мы в наш блок добавляем таск

const fillHtmlList = () => {
   wrapper.innerHTML = '';

   if (tasks.length > 0) {
      tasks.forEach((task, i) => {
         wrapper.innerHTML += showTasks(task, i);
      });
      todoItem = document.querySelectorAll('.todo-item');
   }
};
fillHtmlList();

//9 создаем функцию для отметки таска затем вызываем функцию для сохранения в localStorage и показа на странице

const completeTask = (index) => {
   tasks[index].completed = !tasks[index].completed;

   if (tasks[index].completed) {
      todoItem[index].classList.add('checked');
   } else {
      todoItem[index].classList.remove('checked');
   }

   addStorage();
   fillHtmlList();
};

//10 delete task

const deleteTask = (index) => {
   todoItem[index].classList.add('delition');

   setTimeout(() => {
      tasks.splice(index, 1);
      addStorage();
      fillHtmlList();
   }, 500);
};
