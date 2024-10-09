const submitFormElMonday = document.querySelector(".main-container .Monday button");
const submitFormElTuesday = document.querySelector(".main-container .Tuesday button");
const submitFormElWednesday = document.querySelector(".main-container .Wednesday button");
const submitFormElThursday = document.querySelector(".main-container .Thursday button");
const submitFormElFriday = document.querySelector(".main-container .Friday button");
const submitFormElSaturday = document.querySelector(".main-container .Saturday button");
const submitFormElSunday = document.querySelector(".main-container .Sunday button"); // Новый обработчик для воскресенья

// Обработчик событий для кнопки понедельника
submitFormElMonday.addEventListener('click', function (event) {
    event.preventDefault();
    const inputValue = document.querySelector(".main-container .Monday input").value;
    addTask(inputValue, 'Monday');
});

// Обработчик событий для кнопки вторника
submitFormElTuesday.addEventListener('click', function (event) {
    event.preventDefault();
    const inputValue = document.querySelector(".main-container .Tuesday input").value;
    addTask(inputValue, 'Tuesday');
});

// Обработчик событий для кнопки среды
submitFormElWednesday.addEventListener('click', function (event) {
    event.preventDefault();
    const inputValue = document.querySelector(".main-container .Wednesday input").value;
    addTask(inputValue, 'Wednesday');
});

// Обработчик событий для кнопки четверга
submitFormElThursday.addEventListener('click', function (event) {
    event.preventDefault();
    const inputValue = document.querySelector(".main-container .Thursday input").value;
    addTask(inputValue, 'Thursday');
});

// Обработчик событий для кнопки пятницы
submitFormElFriday.addEventListener('click', function (event) {
    event.preventDefault();
    const inputValue = document.querySelector(".main-container .Friday input").value;
    addTask(inputValue, 'Friday');
});

// Обработчик событий для кнопки субботы
submitFormElSaturday.addEventListener('click', function (event) {
    event.preventDefault();
    const inputValue = document.querySelector(".main-container .Saturday input").value;
    addTask(inputValue, 'Saturday');
});

// Обработчик событий для кнопки воскресенья
submitFormElSunday.addEventListener('click', function (event) {
    event.preventDefault();
    const inputValue = document.querySelector(".main-container .Sunday input").value;
    addTask(inputValue, 'Sunday');
});

// Общая функция для добавления задачи
function addTask(inputValue, day) {
    if (inputValue.trim() === "") return; // Игнорируем пустые строки

    let tasks = JSON.parse(localStorage.getItem(day)) || {};
    let i = Object.keys(tasks).length;
    
    tasks[i] = inputValue;
    localStorage.setItem(day, JSON.stringify(tasks));
    
    document.querySelector(`.main-container .${day} input`).value = ''; // Очищаем поле ввода
    addTaskToPage(inputValue, i, day); // Добавляем задачу на страницу
}

// Функция для добавления задачи на страницу
function addTaskToPage(taskText, taskId, day) {
    const newDiv = document.createElement('div');
    const newTextParagraph = document.createElement("p");
    const buttonDelete = document.createElement("button");

    newTextParagraph.textContent = taskText;
    newDiv.classList.add("nTask");
    buttonDelete.textContent = 'X';
    buttonDelete.setAttribute('data-id', taskId);
    buttonDelete.setAttribute('data-day', day);

    newDiv.appendChild(newTextParagraph);
    newDiv.appendChild(buttonDelete);
    document.querySelector(`.main-container .${day}`).appendChild(newDiv);

    buttonDelete.addEventListener('click', function(event) {
        event.preventDefault();
        deleteTask(taskId, newDiv, day);
    });
}

// Функция для загрузки задач при загрузке страницы
function addTasks(day) {
    let tasksData = JSON.parse(localStorage.getItem(day)) || {};
    Object.entries(tasksData).forEach(([key, value]) => {
        addTaskToPage(value, key, day);
    });
}

// Функция для удаления задачи
function deleteTask(taskId, taskElement, day) {
    let tasks = JSON.parse(localStorage.getItem(day)) || {};
    delete tasks[taskId];
    localStorage.setItem(day, JSON.stringify(tasks));
    taskElement.remove();
}

addTasks('Monday');
addTasks('Tuesday');
addTasks('Wednesday');
addTasks('Thursday');
addTasks('Friday');
addTasks('Saturday');
addTasks('Sunday');
