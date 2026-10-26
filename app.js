const taskAddInputElement = document.getElementById("new-task");
const addButtonElement = document.getElementsByTagName("button")[0];
const incompleteTaskListElement = document.getElementById("incompleteTasks");
const completeTaskListElement = document.getElementById("completed-tasks");

const createNewTaskElement = function (taskString) {
  const listItem = document.createElement("li");
  const checkBox = document.createElement("input");
  const label = document.createElement("label");
  const editInput = document.createElement("input");
  const editButton = document.createElement("button");

  const deleteButton = document.createElement("button");
  const deleteButtonImg = document.createElement("img");

  label.innerText = taskString;
  label.className = "task-input";

  checkBox.type = "checkbox";
  editInput.type = "text";
  editInput.className = "task-input";

  editButton.innerText = "Edit";
  editButton.className = "edit";

  deleteButton.className = "delete";
  deleteButtonImg.src = "./remove.svg";
  deleteButton.appendChild(deleteButtonImg);

  listItem.appendChild(checkBox);
  listItem.appendChild(label);
  listItem.appendChild(editInput);
  listItem.appendChild(editButton);
  listItem.appendChild(deleteButton);
  return listItem;
};

const handleAddNewTask = function () {
  if (!taskAddInputElement.value) return;
  const listItem = createNewTaskElement(taskAddInputElement.value);

  incompleteTaskListElement.appendChild(listItem);
  handleBindTaskEvents(listItem, checkBoxEventHandler);

  taskAddInputElement.value = "";
};

const handleEditTask = function () {
  const listItem = this.parentNode;

  const editInput = listItem.querySelector("input[type=text]");
  const label = listItem.querySelector("label");
  const editBtn = listItem.querySelector(".edit");
  const containsClass = listItem.classList.contains("editMode");
  if (containsClass) {
    label.innerText = editInput.value;
    editBtn.innerText = "Edit";
  } else {
    editInput.value = label.innerText;
    editBtn.innerText = "Save";
  }
  listItem.classList.toggle("editMode");
};
const handleDeleteTask = function () {
  const listItem = this.parentNode;
  const ul = listItem.parentNode;
  ul.removeChild(listItem);
};

const checkBoxEventHandler = function () {
  const listItem = this.parentNode;

  if (this.checked) {
    completeTaskListElement.appendChild(listItem);
  } else {
    incompleteTaskListElement.appendChild(listItem);
  }

  handleBindTaskEvents(listItem, checkBoxEventHandler);
};

addButtonElement.addEventListener("click", handleAddNewTask);

const handleBindTaskEvents = function (taskListItem, checkBoxEventHandler) {
  const checkBox = taskListItem.querySelector("input[type=checkbox]");
  const editButton = taskListItem.querySelector("button.edit");
  const deleteButton = taskListItem.querySelector("button.delete");

  editButton.onclick = handleEditTask;
  deleteButton.onclick = handleDeleteTask;
  checkBox.onchange = checkBoxEventHandler;
};

for (let i = 0; i < incompleteTaskListElement.children.length; i++) {
  handleBindTaskEvents(
    incompleteTaskListElement.children[i],
    checkBoxEventHandler,
  );
}
for (let i = 0; i < completeTaskListElement.children.length; i++) {
  handleBindTaskEvents(
    completeTaskListElement.children[i],
    checkBoxEventHandler,
  );
}
