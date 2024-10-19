let tasks = []; // مصفوفة لتخزين المهام
let taskId = 1; // معرف المهام

// تحميل المهام من التخزين المحلي
function loadTasks() {
    const savedTasks = localStorage.getItem('tasks'); 
    if (savedTasks) {
        tasks = JSON.parse(savedTasks);
        taskId = tasks.length > 0 ? tasks[tasks.length - 1].id + 1 : 1; 
    }
}

// حفظ المهام في التخزين المحلي
function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks)); // تحويل المهام إلى JSON وتخزينها
}

// فتح إدارة المهام
function openTaskManager() {
    let choice;
    do {
        choice = prompt(`
        Task Manager Menu:
        1. Add Task
        2. View Tasks
        3. Toggle Task Completion
        4. Edit Task
        5. Delete Task
        6. Exit
        Enter your choice (1-6):
        `);

        if (choice === '1') {
            addTask();
        } else if (choice === '2') {
            viewTasks();
        } else if (choice === '3') {
            toggleTaskCompletion();
        } else if (choice === '4') {
            editTask();
        } else if (choice === '5') {
            deleteTask();
        } else if (choice === '6') {
            console.log('Exiting Task Manager.');
        } else {
            console.log('Invalid choice. Please enter a number between 1 and 6.');
        }

    } while (choice !== '6');
}

// إضافة مهمة جديدة
function addTask() {
    const taskName = prompt('Enter task name:');
    if (taskName) {
        const task = {
            id: taskId++, // استخدام taskId الحالي ثم زيادته
            name: taskName,
            completed: false
        };
        tasks.push(task);
        saveTasks(); // حفظ بعد الإضافة
        console.log(`Task added: "${taskName}"`);
    }
}

// عرض جميع المهام
function viewTasks() {
    if (tasks.length === 0) {
        console.log('No tasks available.');
    } else {
        console.log('Tasks:');
        tasks.forEach(task => {
            console.log(`${task.id}. ${task.name} [${task.completed ? 'Completed' : 'Incomplete'}]`);
        });
    }
}

// تبديل حالة المهمة (مكتملة/غير مكتملة)
function toggleTaskCompletion() {
    const taskIdInput = parseInt(prompt('Enter task ID to toggle completion:'), 10);
    const task = tasks.find(t => t.id === taskIdInput);
    if (task) {
        task.completed = !task.completed;
        saveTasks(); // حفظ بعد التغيير
        console.log(`Task "${task.name}" is now ${task.completed ? 'Completed' : 'Incomplete'}.`);
    } else {
        console.log('Task not found.');
    }
}

// تعديل مهمة
function editTask() {
    const taskIdInput = parseInt(prompt('Enter task ID to edit:'), 10);
    const task = tasks.find(t => t.id === taskIdInput);
    if (task) {
        const newTaskName = prompt('Enter new task name:', task.name);
        if (newTaskName) {
            task.name = newTaskName;
            saveTasks(); // حفظ بعد التعديل
            console.log(`Task ID ${task.id} has been updated to "${newTaskName}".`);
        }
    } else {
        console.log('Task not found.');
    }
}

// حذف مهمة
function deleteTask() {
    const taskIdInput = parseInt(prompt('Enter task ID to delete:'), 10);
    const taskIndex = tasks.findIndex(t => t.id === taskIdInput);
    if (taskIndex !== -1) {
        const removedTask = tasks.splice(taskIndex, 1)[0];
        saveTasks(); // حفظ بعد الحذف
        console.log(`Task "${removedTask.name}" has been deleted.`);
    } else {
        console.log('Task not found.');
    }
}

// تحميل المهام عند بدء التشغيل
loadTasks(); // تحميل المهام عند بدء التشغيل
openTaskManager(); // فتح إدارة المهام بعد تحميل المهام
