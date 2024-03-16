//add event listener for loading tasks when the page loads
window.addEventListener('load',function(){
    loadTasks();
});

function toggleForm() {
    var form = document.getElementById("taskForm");
    form.style.display = form.style.display === "none" ? "block" : "none";
}


function clearTasks() {
    var taskList = document.querySelectorAll(".task-list li");
    taskList.forEach(function(taskItem) {
        taskItem.remove();
 
    });
    //clear tasks in the local storage
    localStorage.removeItem('tasks');
}
//function for loading tasks when the form is loaded
function loadTasks(){
    var savedTasks = JSON.parse(localStorage.getItem("tasks"));
    if (savedTasks){
        savedTasks.forEach(function(task){
            var taskListItem = document.createElement("li");
            taskListItem.innerHTML = task.html;
            document.querySelectorAll(".task-list").appendChild(taskListItem);
        });
    }
}

document.getElementById("taskForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent form submission
    
    // Get input values
    var title = document.getElementById("title").value;
    var description = document.getElementById("description").value;
    var time = document.getElementById("time").value;

    // Create task item
    // Check if we're editing an existing task
    var editMode = false;
    var existingTask = document.querySelector("#taskList li[data-editing='true']");
    if (existingTask) {
        // Update existing task
        existingTask.innerHTML = "<span>" + title + "</span> <button onclick='editTask(this)'>Edit</button> <button onclick='deleteTask(this)'>Delete</button>";
        existingTask.removeAttribute("data-editing");
        editMode = true;
    } else {
         // Create task summary item
        var taskListItem = document.createElement("li");
        taskListItem.innerHTML = "<input type='checkbox' onchange='toggleCompletion(this)'> <span>" + title + "</span> <button onclick='editTask(this)'>Edit</button> <button onclick='deleteTask(this)'>Delete</button>";

        // Append task summary item to the task list
        document.querySelector(".task-list").appendChild(taskListItem);
    }
    //saving tasks to local storage whatever is being added
    var taskListitems = document.querySelectorAll(".task-list li");
    var tasks = [];
    taskListitems.forEach(function(taskItem){
        tasks.push({html:taskItem.innerHTML});
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
    
    // Clear form fields
    document.getElementById("taskForm").reset();

    if (editMode) {
        toggleForm(); // Hide the form after editing
    }
});

function editTask(button) {
    var taskListItem = button.parentNode;
    var titleSpan = taskListItem.querySelector("span");
    document.getElementById("title").value = titleSpan.textContent;
    // You can populate other form fields here if needed
    taskListItem.setAttribute("data-editing", "true");
    toggleForm(); // Show the form for editing
}

function deleteTask(button) {
    button.parentNode.remove();
    //deleting from local storage
    var taskListitems = document.querySelectorAll(".task-list li");
    var tasks = [];
    taskListitems.forEach(function(taskItem){
        tasks.push({html:taskItem.innerHTML});
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}
function toggleCompletion(checkbox) {
    var taskItem = checkbox.parentNode;
    if (checkbox.checked) {
        taskItem.classList.add("completed");
    } else {
        taskItem.classList.remove("completed");
    }
    var taskListitems = document.querySelectorAll(".task-list li");
    var tasks = [];
    taskListitems.forEach(function(taskItem){
        tasks.push({html:taskItem.innerHTML});
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}