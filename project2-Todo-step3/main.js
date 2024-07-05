// 유저가 값을 입력한다.
// +버튼을 클릭라면, 할 일이 추가된다.
// delete 버튼을 누르면 할일을 삭제할 건지 alert창으로 묻는다.
// check 버튼을 누르면 할일이 끝나면서 밑줄이 간다.
// 1. check 버튼을 클릭하는 순간 true, false
// 2. true 이면 끝난걸로 간주하고 밑줄 보여주기
// 3. false 이면 진행중인걸로 간주하고 그대로 둔다.
// nav메뉴에 진행중, 끝남 탭을 누르면 언더바가 이동한다.
// 끝남탭은, 끝난 아이템만 보여주고, 진행중은 진행중인 아이템만 보여준다.
// 전체탭을 누르면 다시 전체아이템을 보여준다.


let navAll = document.getElementById('nav-all'); // 할일
let navActive = document.getElementById('nav-active'); // 해야할일
let navCompleted = document.getElementById('nav-completed'); // 완료한일
let underLine = document.getElementById('under-line'); // 버튼 언더라인
let taskInput = document.getElementById("task-input"); // 입력 내용 박스
let addBtn = document.getElementById("add-btn"); // 입력 내용 추가 버튼
let taskList = []; //리스트
let taskTime = []; // 시간 리스트
let currentTab = 'all'; // 현재 선택된 탭을 추적하는 변수

// 현재 시간을 'Y-m-d H:i:s' 형식으로 포맷팅하는 함수
function getCurrentTime() {
    let now = new Date();
    let year = now.getFullYear();
    let month = ('0' + (now.getMonth() + 1)).slice(-2);
    let day = ('0' + now.getDate()).slice(-2);
    let hours = ('0' + now.getHours()).slice(-2);
    let minutes = ('0' + now.getMinutes()).slice(-2);
    return `${year}-${month}-${day} ${hours}:${minutes}`;
}

//입력 내용 + 버튼 클릭 이벤트
addBtn.addEventListener('click', addTask);

// 할일 추가 함수
function addTask() {
    let task = {
        uid: randomID(),
        taskContent: taskInput.value,
        dueDate: document.getElementById('due-date').value, // 날짜 추가
        priority: document.getElementById('priority-select').value, // 일정 구분 추가
        isComplate: false
    }

    if (task.taskContent.trim() !== "") { //빈 문자열이라면 값을 넘기지 않는다.
        let currentTime = getCurrentTime(); // 현재 시간을 가져오기
        taskTime.push(currentTime); // 현재 시간을 추가
        taskList.push(task);
        render();
        taskInput.value = ""; // 할일 입력창 초기화
        document.getElementById('due-date').value = ""; // 데이터 선택 초기화
        document.getElementById('priority-select').value = "common";// 일정 구분 초기화
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

//할일 전체 목록의 UID값을 비교해서 동일한 UID값을 가진 항목의 isComplate를 fales에서 tru로 변경해준다.
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

// 삭제 버튼 클릭시 alert 창 띄우고 효과음 재생, 확인 시 아래 deleteTask 실행
function confirmDeleteTask(uid) {
    deleteSound.play(); // 효과음 재생
    if (confirm('할 일을 삭제하시겠습니까?')) {
        deleteTask(uid);
    }
}

//게시물 삭제 진행
function deleteTask(uid) {
    taskList = taskList.filter(task => task.uid != uid);
    render();
}

//게시물 수정 모드 
function editTask(uid) {
    let task = taskList.find(task => task.uid == uid);
    if (task) {
        taskInput.value = task.taskContent;
        document.getElementById('due-date').value = task.dueDate;
        document.getElementById('priority-select').value = task.priority;

        // 입력창 배경색을 노란색으로 변경
        taskInput.style.backgroundColor = "#ffc107";
        document.getElementById('due-date').style.backgroundColor = "#ffc107";
        document.getElementById('priority-select').style.backgroundColor = "#ffc107";

        // 기존 addTask 대신 updateTask 호출로 변경
        addBtn.removeEventListener('click', addTask);
        addBtn.addEventListener('click', function updateTask() {
            task.taskContent = taskInput.value;
            task.dueDate = document.getElementById('due-date').value;
            task.priority = document.getElementById('priority-select').value;

            render();
            taskInput.value = "";
            document.getElementById('due-date').value = "";
            document.getElementById('priority-select').value = "common";

            // 입력창 배경색을 원래대로 변경            
            taskInput.style.backgroundColor = "";
            document.getElementById('due-date').style.backgroundColor = "";
            document.getElementById('priority-select').style.backgroundColor = "";

            // 다시 addTask로 이벤트 리스너 변경
            addBtn.removeEventListener('click', updateTask);
            addBtn.addEventListener('click', addTask);
        });
    }
}

// 랜덤 ID 생성 함수
function randomID() {
    return Math.random().toString(36).substr(2, 16);
}

// priority 값을 한글로 변환
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

// 일정별 아이콘 
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

//현재 시간 출력
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
setInterval(displayDateTime, 1000); // 1초마다 갱신