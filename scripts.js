const taskInput = document.getElementById("taskInput");
const addTaskButton = document.getElementById("addTaskButton");
const taskList = document.getElementById("taskList");
const taskDetails = document.getElementById("taskDetails");
const taskText = document.getElementById("taskText");
const creationDate = document.getElementById("creationDate");

// Charger les tâches depuis le stockage local au chargement de la page
document.addEventListener("DOMContentLoaded", () => {
    loadTasksFromLocalStorage();
});

addTaskButton.addEventListener("click", () => {
    const taskTextValue = taskInput.value.trim();
    if (taskTextValue !== "") {
        const taskItem = createTaskItem(taskTextValue);
        taskList.appendChild(taskItem);
        taskInput.value = "";
        saveTasksToLocalStorage();
    }
});

function createTaskItem(taskText, isCompleted = false) {
    const taskItem = document.createElement("li");
    taskItem.textContent = taskText;

    const buttonsContainer = document.createElement("div");
    buttonsContainer.className = "buttons-container";

    const deleteButton = createButton("Supprimer", "delete-button", () => {
        taskList.removeChild(taskItem);
        hideTaskDetails();
        saveTasksToLocalStorage();
    });

    const completeButton = createButton("Valider", "complete-button", () => {
        taskItem.classList.toggle("completed");
        updateTaskDetails(taskText, taskItem.classList.contains("completed"));
        saveTasksToLocalStorage();
    });

    const infoButton = createButton("Informations", "info-button", () => {
        showTaskDetails(taskText, new Date().toLocaleString());
    });

    buttonsContainer.appendChild(infoButton);
    buttonsContainer.appendChild(completeButton);
    buttonsContainer.appendChild(deleteButton);

    taskItem.appendChild(buttonsContainer);

    if (isCompleted) {
        taskItem.classList.add("completed");
    }

    return taskItem;
}

function createButton(text, className, onClick) {
    const button = document.createElement("button");
    button.textContent = text;
    button.className = className;
    button.addEventListener("click", onClick);
    return button;
}

function showTaskDetails(text, date) {
    taskText.textContent = "Tâche : " + text;
    creationDate.textContent = "Date de création : " + date;
    taskDetails.style.display = "block";
}

function hideTaskDetails() {
    taskDetails.style.display = "none";
}

function updateTaskDetails(text, isCompleted) {
    taskText.textContent = "Tâche : " + text;
    creationDate.textContent = "Statut : " + (isCompleted ? "Validée" : "En attente");
}

function saveTasksToLocalStorage() {
    const tasks = [];
    taskList.querySelectorAll("li").forEach(taskItem => {
        tasks.push({
            text: taskItem.textContent,
            completed: taskItem.classList.contains("completed")
        });
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasksFromLocalStorage() {
    const tasksData = JSON.parse(localStorage.getItem("tasks")) || [];
    tasksData.forEach(taskData => {
        const taskItem = createTaskItem(taskData.text, taskData.completed);
        taskList.appendChild(taskItem);
    });
}

hideTaskDetails();