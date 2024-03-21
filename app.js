// we initialize with an empty array to hold tasks that will be added through the form
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];//this checks if the tasks are existing and if not then it will initialize with an empty array

//initiliaze the variables
const taskManager = document.querySelector(".button-1");
const form = document.getElementById("taskForm");
const title = document.getElementById("title");
const description = document.getElementById("description");
const time = document.getElementById("time");
const confirmbtn = document.querySelector(".button");
const clearTasksbtn = document.querySelector(".clear");


 //a function that toggles the input form when you click add task
function toggleForm() {
    var form = document.getElementById("taskForm");
    form.style.display = form.style.display === "none" ? "block" : "none";
}

function addTask(event) {
    event.preventDefault(); // Prevent form submission

    const taskTitle = title.value.trim();
    const taskDescription = description.value.trim();
    const taskTime = time.value.trim();

    if (taskTitle !== '' && taskDescription !== '' && taskTime !== '') {
        const newTask = {
            title: taskTitle,
            description: taskDescription,
            time: taskTime,
            completed: false
        };

        tasks.push(newTask); // Add the new task to the tasks array
        localStorage.setItem('tasks', JSON.stringify(tasks)); // Store tasks in local storage
        renderTasks(); // Render tasks again after adding the new task
        form.reset(); // Reset the form after adding task
        toggleForm(); // Hide the form after adding task
    }
};

     //create a function to save tasks to local storage
     function saveTasks(){
        const taskListitems = document.querySelectorAll(".task-list li");
        taskListitems.forEach(function(taskItem){
            tasks.push({html:taskItem.innerHTML});

      })
      }
    // Function to render tasks
    //create a function to get tasks from local storage and display
    function renderTasks() {
        const taskContainer = document.getElementById("taskContainer");
        taskContainer.innerHTML = ""; // Clear the existing task container
    
        tasks.forEach((task, index) => {
            const taskCard = document.createElement("div");
            taskCard.classList.add("task-card");
    
            taskCard.innerHTML = `
                <h3>${task.title}</h3>
                <p>${task.description}</p>
                <p>Due Date: ${task.time}</p>
                <input type="checkbox" id="task${index}" ${task.completed ? 'checked' : ''}>
                <button class="edit-btn" onclick="editTask(${index})">Edit</button>
                <button class="delete-btn" onclick="deleteTask(${index})">Delete</button>
            `;
    
            taskContainer.appendChild(taskCard);
        });
    }
     
//create a function to edit, delete and mark task as completed
    function editTask(index) {
        const task = tasks[index];

        // Pre-fill form fields with task details
        title.value = task.title;
        description.value = task.description;
        time.value = task.time;

        // Toggle the form to appear for editing
        toggleForm();

        // Event listener for form submission to save the edited task
        form.addEventListener("submit", function(event) {
            event.preventDefault(); // Prevent form submission

            const newTitle = title.value.trim();
            const newDescription = description.value.trim();
            const newTime = time.value.trim();

            if (newTitle !== '' && newDescription !== '' && newTime !== '') {
                tasks[index] = {
                    title: newTitle,
                    description: newDescription,
                    time: newTime,
                    completed: task.completed
                };
                localStorage.setItem('tasks', JSON.stringify(tasks)); // Update local storage
                renderTasks(); // Re-render tasks after editing
                form.reset(); // Reset the form
                toggleForm(); // Hide the form after editing
            } else {
                alert("Please fill in all fields."); // Notify user if any field is empty
            }
        });
    }
    // Function to delete a task
    function deleteTask(index) {
        tasks.splice(index, 1); // Remove task from tasks array
        localStorage.setItem('tasks', JSON.stringify(tasks)); // Update local storage
        renderTasks(); // Render tasks again after deletion
    }

    //create a function to clear all tasks
    function clearTasks() {
        tasks = []; // Empty the tasks array
        localStorage.removeItem('tasks'); // Remove tasks from local storage
        renderTasks(); // Render tasks again after clearing
    }
    //add event listener for loading tasks when the page loads
    form.addEventListener("submit", addTask);
    window.addEventListener("load", renderTasks);