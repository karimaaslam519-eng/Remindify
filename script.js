// Load saved tasks

let tasks =
JSON.parse(
localStorage.getItem("tasks")
) || [];

// Statistics Elements

const totalTasks =
document.getElementById(
"totalTasks"
);

const completedTasks =
document.getElementById(
"completedTasks"
);

const pendingTasks =
document.getElementById(
"pendingTasks"
);

// Start App

displayTasks();
updateStats();
createChart();

// Add Reminder

function addTask(){

    let taskName =
    document.getElementById(
    "taskName"
    ).value;

    let taskDate =
    document.getElementById(
    "taskDate"
    ).value;

    if(
        taskName === "" ||
        taskDate === ""
    ){
        alert(
        "Please fill all fields"
        );
        return;
    }

    tasks.push({

        name: taskName,

        date: taskDate,

        completed: false

    });

    addActivity(
    "Added: " + taskName
    );

    saveTasks();

    displayTasks();

    updateStats();

    createChart();

    document.getElementById(
    "taskName"
    ).value = "";

    document.getElementById(
    "taskDate"
    ).value = "";
}

// Display Tasks

function displayTasks(){

    let taskList =
    document.getElementById(
    "taskList"
    );

    taskList.innerHTML = "";

    tasks.forEach(
    (task,index)=>{

        taskList.innerHTML +=

        `
        <li>

            <h3>${task.name}</h3>

            <p>${task.date}</p>

            <button
            onclick="toggleComplete(${index})">

            ${
            task.completed
            ?
            "Completed ✓"
            :
            "Mark Complete"
            }

            </button>

            <button
            onclick="deleteTask(${index})">

            Delete

            </button>

        </li>
        `;
    });
}

// Complete Task

function toggleComplete(index){

    tasks[index].completed =
    !tasks[index].completed;

    saveTasks();

    displayTasks();

    updateStats();

    createChart();
}

// Delete Task

function deleteTask(index){

    addActivity(
    "Deleted: " +
    tasks[index].name
    );

    tasks.splice(index,1);

    saveTasks();

    displayTasks();

    updateStats();

    createChart();
}

// Save Tasks

function saveTasks(){

    localStorage.setItem(

        "tasks",

        JSON.stringify(tasks)

    );
}

// Update Statistics

function updateStats(){

    let completed =
    tasks.filter(
    task =>
    task.completed
    ).length;

    let pending =
    tasks.length -
    completed;

    if(totalTasks){
        totalTasks.innerText =
        tasks.length;
    }

    if(completedTasks){
        completedTasks.innerText =
        completed;
    }

    if(pendingTasks){
        pendingTasks.innerText =
        pending;
    }
}

// Activity Log

function addActivity(message){

    let activityList =
    document.getElementById(
    "activityList"
    );

    if(activityList){

        activityList.innerHTML +=

        `
        <li>
        ${message}
        </li>
        `;
    }
}

// Chart

let chart;

function createChart(){

    const ctx =
    document.getElementById(
    "progressChart"
    );

    if(!ctx){
        return;
    }

    let completed =
    tasks.filter(
    task =>
    task.completed
    ).length;

    let pending =
    tasks.length -
    completed;

    if(chart){
        chart.destroy();
    }

    chart =
    new Chart(ctx,{

        type:"doughnut",

        data:{

            labels:[
                "Completed",
                "Pending"
            ],

            datasets:[{

                data:[
                    completed,
                    pending
                ],

                backgroundColor:[
                    "#8b5cf6",
                    "#4f46e5"
                ],

                borderWidth:0

            }]
        },

        options:{

            responsive:true,

            plugins:{

                legend:{

                    labels:{
                        color:"white"
                    }
                }
            }
        }
    });
}