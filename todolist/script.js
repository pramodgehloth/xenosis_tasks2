document.addEventListener("DOMContentLoaded", ()=>{
    const storedTasks = JSON.parse(localStorage.getItem('tasks'))

    if(storedTasks){
        storedTasks.forEach((task)=> tasks.push(task))
        updateTasksList()
        updateStats();
    }
})


let tasks = [];

const saveTasks = ()=> {
    localStorage.setItem('tasks', JSON.stringify(tasks))
}

const addTask = () => {
    const taskInput = document.getElementById("taskInput");
    const text = taskInput.value.trim();

    if (text) {
        tasks.push({text: text, completed: false});
        taskInput.value = "";
        updateTasksList();
        updateStats();
        saveTasks()
    }
};
const toggletaskComplete = (index) =>{
    tasks[index].completed = !tasks[index].completed;
    updateTasksList();
    updateStats()
    saveTasks()
};

const deleteTask = (index) => {
    tasks.splice(index, 1);
    updateTasksList();
    updateStats();
    saveTasks()
};

const editTask = (index)=> {
    taskInput.value = tasks[index].text

    tasks.splice(index, 1)
    updateTasksList();
    updateStats();
    saveTasks()
}

const updateStats = ()=>{
    const completeTasks = tasks.filter(task=> task.completed).length
    const totalTasks = tasks.length
    const progress = (completeTasks/totalTasks)*100
    const progressBar = document.getElementById("progress")

    progressBar.style.width = `${progress}%`;

    document.getElementById('numbers').innerText = `${completeTasks} / ${totalTasks}`;
    if(tasks.length && completeTasks == totalTasks){
        blastConfetti();
    }
};

const updateTasksList = ()=> {
    const taskList = document.getElementById("task-list");
    taskList.innerHTML = "";

    tasks.forEach((task, index) => {
        const listItem = document.createElement('li');

        listItem.innerHTML = `
  <div class="taskItem">
            <div class="task ${task.completed ? "completed":""}">
              <input type="checkbox" class="checkbox" ${
                task.completed ? "checked" : ""
            }/>
           <p>${task.text}</p>
             </div>
           <div class="icons">
               <img src="./img/edit.png"  onClick="editTask(${index})" />
               <img src="./img/delllete.png"onClick="deleteTask(${index})" />
            </div>
      </div>
       `;
       listItem.addEventListener("change", () => toggletaskComplete(index));
       taskList.append(listItem);
    });
};

document.getElementById("newTask").addEventListener("click", function(e){
    e.preventDefault();

    addTask();
});

const blastConfetti = ()=> {
    const end = Date.now() + 15 * 1000;

// go Buckeyes!
const colors = ["#bb0000", "#ffffff"];

(function frame() {
  confetti({
    particleCount: 2,
    angle: 60,
    spread: 55,
    origin: { x: 0 },
    colors: colors,
  });

  confetti({
    particleCount: 2,
    angle: 120,
    spread: 55,
    origin: { x: 1 },
    colors: colors,
  });

  if (Date.now() < end) {
    requestAnimationFrame(frame);
  }
})();
}