//Document is the DOM can be accessed in the console with document.window.
// Tree is from the top, html, body, p etc.

//Problem: User interaction does not provide the correct results.
//Solution: Add interactivity so the user can manage daily tasks.
//Break things down into smaller steps and take each step at a time.

// Event handling, user interaction is what starts the code execution.

const taskAddInputElement = document.getElementById("new-task"); //Add a new task.
const addButtonElement = document.getElementsByTagName("button")[0]; //first button
const incompleteTaskListElement = document.getElementById("incompleteTasks"); //ul of #incompleteTasks
const completeTaskListElement = document.getElementById("completed-tasks"); //completed-tasks

//New task list item
const createNewTaskElement = function (taskString) {
  const listItem = document.createElement("li");

  //input (checkbox)
  const checkBox = document.createElement("input"); //checkbx
  //label
  const label = document.createElement("label"); //label
  //input (text)
  const editInput = document.createElement("input"); //text
  //button.edit
  const editButton = document.createElement("button"); //edit button

  //button.delete
  const deleteButton = document.createElement("button"); //delete button
  const deleteButtonImg = document.createElement("img"); //delete button image

  label.innerText = taskString;
  label.className = "task-input";

  //Each elements, needs appending
  checkBox.type = "checkbox";
  editInput.type = "text";
  editInput.className = "task-input";

  editButton.innerText = "Edit"; //innerText encodes special characters, HTML does not.
  editButton.className = "edit";

  deleteButton.className = "delete";
  deleteButtonImg.src = "./remove.svg";
  deleteButton.appendChild(deleteButtonImg);

  //and appending.
  listItem.appendChild(checkBox);
  listItem.appendChild(label);
  listItem.appendChild(editInput);
  listItem.appendChild(editButton);
  listItem.appendChild(deleteButton);
  return listItem;
};

const handleAddNewTask = function () {
  //Create a new list item with the text from the #new-task:
  if (!taskAddInputElement.value) return;
  const listItem = createNewTaskElement(taskAddInputElement.value);

  //Append listItem to incompleteTaskHolder
  incompleteTaskListElement.appendChild(listItem);
  handleBindTaskEvents(listItem, checkBoxEventHandler);

  taskAddInputElement.value = "";
};

//Edit an existing task.

const handleEditTask = function () {
  const listItem = this.parentNode;

  const editInput = listItem.querySelector("input[type=text]");
  const label = listItem.querySelector("label");
  const editBtn = listItem.querySelector(".edit");
  const containsClass = listItem.classList.contains("editMode");
  //If class of the parent is .editmode
  if (containsClass) {
    //switch to .editmode
    //label becomes the inputs value.
    label.innerText = editInput.value;
    editBtn.innerText = "Edit";
  } else {
    editInput.value = label.innerText;
    editBtn.innerText = "Save";
  }

  //toggle .editmode on the parent.
  listItem.classList.toggle("editMode");
};

//Delete task.
const handleDeleteTask = function () {
  const listItem = this.parentNode;
  const ul = listItem.parentNode;
  //Remove the parent list item from the ul.
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
//Mark task completed

//The glue to hold it all together.

//Set the click handler to the addTask function.
addButtonElement.addEventListener("click", handleAddNewTask);

const handleBindTaskEvents = function (taskListItem, checkBoxEventHandler) {
  const checkBox = taskListItem.querySelector("input[type=checkbox]");
  const editButton = taskListItem.querySelector("button.edit");
  const deleteButton = taskListItem.querySelector("button.delete");

  //Bind editTask to edit button.
  editButton.onclick = handleEditTask;
  //Bind deleteTask to delete button.
  deleteButton.onclick = handleDeleteTask;
  //Bind taskCompleted to checkBoxEventHandler.
  checkBox.onchange = checkBoxEventHandler;
};

//cycle over incompleteTaskHolder ul list items
//for each list item
for (let i = 0; i < incompleteTaskListElement.children.length; i++) {
  //bind events to list items chldren(tasksCompleted)
  handleBindTaskEvents(
    incompleteTaskListElement.children[i],
    checkBoxEventHandler,
  );
}

//cycle over completedTasksHolder ul list items
for (let i = 0; i < completeTaskListElement.children.length; i++) {
  //bind events to list items chldren(tasksIncompleted)
  handleBindTaskEvents(
    completeTaskListElement.children[i],
    checkBoxEventHandler,
  );
}

// Issues with usability don't get seen until they are in front of a human tester.

//prevent creation of empty tasks.

//Change edit to save when you are in edit mode.
