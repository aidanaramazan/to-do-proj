let tasks = [];
let deletedTasks = [];

function addTask() {
  const taskInput = document.getElementById("taskInput");
  const taskText = taskInput.value.trim();

  if (taskText !== "") {
    const task = {
      id: Date.now(),
      text: taskText,
      done: false,
    };

    tasks.push(task);
    renderTasks();
    taskInput.value = "";
  }
}

function toggleTaskDone(taskId) {
  const task = tasks.find(t => t.id === taskId);
  task.done = !task.done;
  renderTasks();
}

function deleteTask(taskId) {
  const task = tasks.find(t => t.id === taskId);
  tasks = tasks.filter(t => t.id !== taskId);
  deletedTasks.push(task);
  renderTasks();
  renderDeletedTasks();
}

function restoreTask(taskId) {
  const task = deletedTasks.find(t => t.id === taskId);
  deletedTasks = deletedTasks.filter(t => t.id !== taskId);
  tasks.push(task);
  renderDeletedTasks();
  renderTasks();
}

function renderTasks() {
  const taskList = document.getElementById("taskList");
  taskList.innerHTML = "";

  tasks.forEach(task => {
    const taskElement = document.createElement("div");
    taskElement.className = "task";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.done;
    checkbox.addEventListener("change", () => toggleTaskDone(task.id));
    taskElement.appendChild(checkbox);

    const taskText = document.createElement("span");
    if (task.done) {
      taskText.className = "deleted";
    }
    taskText.innerText = task.text;
    taskElement.appendChild(taskText);

    const deleteIcon = document.createElement("span");
    deleteIcon.className = "bin";
    deleteIcon.innerHTML = "&#128465;";
    deleteIcon.addEventListener("click", () => deleteTask(task.id));
    taskElement.appendChild(deleteIcon);

    taskList.appendChild(taskElement);
  });
}

function renderDeletedTasks() {
  const deletedList = document.getElementById("deletedList");
  deletedList.innerHTML = "";

  deletedTasks.forEach(task => {
    const taskElement = document.createElement("div");
    taskElement.className = "task deleted";

    const restoreIcon = document.createElement("span");
    restoreIcon.className = "bin";
    restoreIcon.innerHTML = "&#128472;";
    restoreIcon.addEventListener("click", () => restoreTask(task.id));
    taskElement.appendChild(restoreIcon);

    const taskText = document.createElement("span");
    taskText.innerText = task.text;
    taskElement.appendChild(taskText);
    deletedList.appendChild(taskElement);
  });
}