let navAll = document.getElementById('nav-all');
let navActive = document.getElementById('nav-active');
let navCompleted = document.getElementById('nav-completed');
let underLine = document.getElementById('under-line');
let taskInput = document.getElementById("task-input");
let addBtn = document.getElementById("add-btn");
let taskList = [];
let taskTime = [];
let currentTab = 'all'; // 현재 선택된 탭을 추적하는 변수 추가

function getCurrentTime() {
    let now = new Date();
    let year = now.getFullYear();
    let month = ('0' + (now.getMonth() + 1)).slice(-2);
    let day = ('0' + now.getDate()).slice(-2);
    let hours = ('0' + now.getHours()).slice(-2);
    let minutes = ('0' + now.getMinutes()).slice(-2);
    return `${year}-${month}-${day} ${hours}:${minutes}`;
}

addBtn.addEventListener('click', addTask);

function addTask() {
    let task = {
        uid: randomID(),
        taskContent: taskInput.value,
        dueDate: document.getElementById('due-date').value,
        priority: document.getElementById('priority-select').value,
        isComplate: false
    }

    if (task.taskContent.trim() !== "") {
        let currentTime = getCurrentTime();
        taskTime.push(currentTime);
        taskList.push(task);
        render();
        taskInput.value = "";
        document.getElementById('due-date').value = "";
        document.getElementById('priority-select').value = "common";
    }
}

function render() {
    let filteredTasks;
    switch(currentTab) {
        case 'active':
            filteredTasks = taskList.filter(task => !task.isComplate);
            break;
        case 'completed':
            filteredTasks = taskList.filter(task => task.isComplate);
            break;
        default:
            filteredTasks = taskList;
    }
    renderFilteredTasks(filteredTasks);
}

function renderFilteredTasks(filteredTasks) {
    let resultHTML = '';
    for (let i = 0; i < filteredTasks.length; i++) {
        let priorityClass = `priority-${filteredTasks[i].priority}`;
        let priorityIcon = getPriorityIcon(filteredTasks[i].priority);
        let priorityText = getPriorityInKorean(filteredTasks[i].priority);

        if (filteredTasks[i].isComplate) {
            resultHTML += `<div class="todo-item list-group-item d-flex justify-content-between align-items-center completed-bg">
                                <div class="todo-box completed-done">
                                    <div><input type="checkbox" class="form-check-input me-2 task-checkbox" data-uid="${filteredTasks[i].uid}"></div>
                                    <div class="todo-item-box">
                                        <div> ${filteredTasks[i].taskContent} </div>
                                        <div class="todo-item"><span class="todo-item-icon">${priorityIcon} ${priorityText} </span> <span>작성일자: ${taskTime[i]}</span> <span>완료 예정일: ${filteredTasks[i].dueDate}</span></div>
                                    </div>
                                </div>
                                <div class="btn-group"><button onclick="toggleComplete('${filteredTasks[i].uid}')" class="btn btn-success check-button"><i class="bi bi-check-lg icon-size-16"></i>
                                    </button><button class="btn btn-warning" onclick="editTask('${filteredTasks[i].uid}')">수정</button><button class="btn btn-danger" onclick="confirmDeleteTask('${filteredTasks[i].uid}')">삭제</button>
                                </div>
                            </div>`;
        } else {
            resultHTML += `<div class="todo-item list-group-item d-flex justify-content-between align-items-center">
                                <div class="todo-box">
                                    <div><input type="checkbox" class="form-check-input me-2 task-checkbox" data-uid="${filteredTasks[i].uid}"></div>
                                    <div class="todo-item-box">
                                        <div> ${filteredTasks[i].taskContent} </div>
                                        <div class="todo-item"><span class="todo-item-icon">${priorityIcon} ${priorityText} </span> <span>작성일자: ${taskTime[i]}</span> <span>완료 예정일: ${filteredTasks[i].dueDate}</span></div>
                                    </div>
                                </div>
                                <div class="btn-group"><button onclick="toggleComplete('${filteredTasks[i].uid}')" class="btn btn-success check-button"><i class="bi bi-check-lg icon-size-16"></i>
                                    </button><button class="btn btn-warning" onclick="editTask('${filteredTasks[i].uid}')">수정</button><button class="btn btn-danger" onclick="confirmDeleteTask('${filteredTasks[i].uid}')">삭제</button>
                                </div>
                            </div>`;
        }
    }
    document.getElementById("task-board").innerHTML = resultHTML;
}

function toggleComplete(uid) {
    for (let i = 0; i < taskList.length; i++) {
        if (taskList[i].uid == uid) {
            taskList[i].isComplate = !taskList[i].isComplate;
            break;
        }
    }
    render();
}

const deleteSound = document.getElementById('deleteSound');

function confirmDeleteTask(uid) {
    deleteSound.play();
    if (confirm('할 일을 삭제하시겠습니까?')) {
        deleteTask(uid);
    }
}

function deleteTask(uid) {
    taskList = taskList.filter(task => task.uid != uid);
    render();
}

function editTask(uid) {
    let task = taskList.find(task => task.uid == uid);
    if (task) {
        taskInput.value = task.taskContent;
        document.getElementById('due-date').value = task.dueDate;
        document.getElementById('priority-select').value = task.priority;

        taskInput.style.backgroundColor = "#ffc107";
        document.getElementById('due-date').style.backgroundColor = "#ffc107";
        document.getElementById('priority-select').style.backgroundColor = "#ffc107";

        addBtn.removeEventListener('click', addTask);
        addBtn.addEventListener('click', function updateTask() {
            task.taskContent = taskInput.value;
            task.dueDate = document.getElementById('due-date').value;
            task.priority = document.getElementById('priority-select').value;

            render();
            taskInput.value = "";
            document.getElementById('due-date').value = "";
            document.getElementById('priority-select').value = "common";

            taskInput.style.backgroundColor = "";
            document.getElementById('due-date').style.backgroundColor = "";
            document.getElementById('priority-select').style.backgroundColor = "";

            addBtn.removeEventListener('click', updateTask);
            addBtn.addEventListener('click', addTask);
        });
    }
}

function randomID() {
    return Math.random().toString(36).substr(2, 16);
}

function getPriorityInKorean(priority) {
    const priorities = {
        'common': '일반일정',
        'important': '중요일정',
        'family': '가족행사',
        'work': '회사일정',
        'school': '학교일정',
        'anniversary': '기념일'
    };
    return priorities[priority] || '일반일정';
}

function getPriorityIcon(priority) {
    const icons = {
        'common': '<i class="bi bi-clock priority-icon text-secondary"></i>',
        'important': '<i class="bi bi-exclamation-circle priority-icon text-danger"></i>',
        'family': '<i class="bi bi-house priority-icon text-primary"></i>',
        'work': '<i class="bi bi-briefcase priority-icon text-warning"></i>',
        'school': '<i class="bi bi-pencil priority-icon text-info"></i>',
        'anniversary': '<i class="bi bi-heart priority-icon text-danger"></i>'
    };
    return icons[priority] || icons['common'];
}

document.querySelector('#nav-item-today').addEventListener('click', (e) => {
    e.preventDefault();
    let today = new Date().toISOString().split('T')[0];
    let todayTasks = taskList.filter(task => task.dueDate === today);
    renderFilteredTasks(todayTasks);
});

['common', 'important', 'family', 'work', 'school', 'anniversary'].forEach(priority => {
    document.querySelector(`#nav-item-${priority}`).addEventListener('click', (e) => {
        e.preventDefault();
        let filteredTasks = taskList.filter(task => task.priority === priority);
        renderFilteredTasks(filteredTasks);
    });
});

navAll.addEventListener('click', () => {
    currentTab = 'all';
    setActiveNav(navAll);
    render();
});

navActive.addEventListener('click', () => {
    currentTab = 'active';
    setActiveNav(navActive);
    render();
});

navCompleted.addEventListener('click', () => {
    currentTab = 'completed';
    setActiveNav(navCompleted);
    render();
});

function setActiveNav(activeNav) {
    [navAll, navActive, navCompleted].forEach(nav => {
        nav.classList.remove('active');
    });
    activeNav.classList.add('active');

    const navOffsetLeft = activeNav.offsetLeft;
    const navOffsetWidth = activeNav.offsetWidth;

    underLine.style.left = `${navOffsetLeft}px`;
    underLine.style.width = `${navOffsetWidth}px`;
}

document.addEventListener('DOMContentLoaded', () => {
    const activeNav = document.querySelector('.nav-link.active');
    if (activeNav) {
        setActiveNav(activeNav);
    }
});

let selectAllCheckbox = document.getElementById('select-all');
let deleteSelectedBtn = document.getElementById('delete-selected');

selectAllCheckbox.addEventListener('change', toggleSelectAll);
deleteSelectedBtn.addEventListener('click', deleteSelected);

function toggleSelectAll() {
    let isChecked = selectAllCheckbox.checked;
    document.querySelectorAll('.task-checkbox').forEach(checkbox => {
        checkbox.checked = isChecked;
    });
}

function deleteSelected() {
    deleteSound.play();
    if (confirm('선택한 항목을 삭제하시겠습니까?')) {
        let selectedTasks = document.querySelectorAll('.task-checkbox:checked');
        selectedTasks.forEach(checkbox => {
            deleteTask(checkbox.dataset.uid);
        });
        selectAllCheckbox.checked = false;
    }
}

function displayDateTime() {
    let now = new Date();
    let year = now.getFullYear();
    let month = now.toLocaleString('default', { month: 'short' });
    let date = now.getDate();
    let day = now.toLocaleString('default', { weekday: 'short' });
    let time = now.toLocaleTimeString('en-US', { timeZone: 'Asia/Seoul' });
    let dateString = year + '년' + ' ' + month + ' ' + date + '일 ' + '(' + day + ') ';
    let timeString = time;
    document.getElementById('date').innerHTML = dateString;
    document.getElementById('time').innerHTML = timeString;
}
setInterval(displayDateTime, 1000);