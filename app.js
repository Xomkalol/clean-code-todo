const taskAddInputElement = document.getElementById("new-task");
const addButtonElement = document.getElementsByTagName("button")[0];
const incompleteTaskListElement = document.getElementById("incompleteTasks");
const completeTaskListElement = document.getElementById("completed-tasks");

const createElement = (tag, className, text) => {
  const element = document.createElement(tag);

  if (className) element.className = className;
  if (text) element.textContent = text;

  return element;
};

const createNewTaskElement = function (taskString) {
  const listItem = document.createElement("li");

  const checkBox = createElement("input");
  checkBox.type = "checkbox";

  const label = createElement("label", "task-input", taskString);

  const editInput = createElement("input", "task-input");
  editInput.type = "text";

  const editButton = createElement("button", "edit", "Edit");

  const deleteButton = createElement("button", "delete");
  const deleteButtonImg = createElement("img");
  deleteButtonImg.src = "./remove.svg";
  deleteButton.appendChild(deleteButtonImg);

  listItem.append(checkBox, label, editInput, editButton, deleteButton);

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
