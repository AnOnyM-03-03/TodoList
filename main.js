const btn = document.querySelector('#add-task-wrapper'),
   input = document.querySelector('#description-task'),
   wrapper = document.querySelector('.todos-wrapper');

// const task = {
//    description: 'sdfsdfs',
//    completed: false,
// };

let tasks;
let todoItemElems;

// условие, в localStorage ничего нет, то значит массив пустой , иначе мы будем localStorage добавлять новые значения
!localStorage.tasks
   ? (tasks = [])
   : (tasks = JSON.parse(localStorage.getItem('tasks')));

// функция таск которая в this.description записывает значение из description которая берется из input.value
function Task(description) {
   this.description = description;
   this.completed = false;
}

const createTemplate = (task, index) => {
   return `
 <div class="todo-item ${task.completed ? 'checked' : ''}">
    <div class="description">${task.description}</div>
    <div class="buttons">
        <input onclick='completeTask(${index})' type="checkbox" class="btn-complete" ${
      task.completed ? 'checked' : ''
   }>
        <button onclick='deleteTask(${index})' class="btn-delete">Delete</button>
    </div>
</div>

 `;
};

// функция для добавления задач на экран
const addToDos = () => {
   // для зачистки поля с задачами
   wrapper.innerHTML = '';
   //    если длина массива больше 0, значит что там что-то есть мы проходимся про этому массиву и на экран добавляем функцию по созданию блока
   if (tasks.length > 0) {
      tasks.forEach((task, index) => {
         wrapper.innerHTML += createTemplate(task, index);
      });

      todoItemElems = document.querySelectorAll('.todo-item');
   }
};

// вызывая функцию мы сначала очищаем полнолстью поле, пробегаем по нашему массиву и если что-то есть то мы это загружаем на страницу
addToDos();

// функция для записывания в локальную историю, для записи нужно преобразовать формат в JSON
const updateStorage = () => {
   localStorage.setItem('tasks', JSON.stringify(tasks));
};

// функция для проверки активночти чека
const completeTask = (index) => {
   //    console.log(index);
   tasks[index].completed = !tasks[index].completed;
   if (tasks[index].completed) {
      todoItemElems[index].classList.add('checked');
   } else {
      todoItemElems[index].classList.remove('checked');
   }
   updateStorage();
   addToDos();
};

const deleteTask = (index) => {
   todoItemElems[index].classList.add('delition');
   setTimeout(() => {
      tasks.splice(index, 1);
      updateStorage();
      addToDos();
   }, 500);
};

// при клике на кнопку будем пушить в массив который мы создали значения из инпута
btn.addEventListener('click', () => {
   tasks.push(new Task(input.value));
   //    console.log(tasks);
   //    при клике на кнопку очищаем инпут
   input.value = '';
   updateStorage();
   addToDos();
});
