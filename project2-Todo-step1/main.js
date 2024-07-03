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


let navAll = document.getElementById('nav-all'); // 네비게이션 요소 
let navActive = document.getElementById('nav-active'); // 네비게이션 요소 
let navCompleted = document.getElementById('nav-completed'); // 네비게이션 요소
const underLine = document.getElementById('under-line');
let taskInput = document.getElementById("task-input"); //입력 내용 박스
let addBtn = document.getElementById("add-btn"); //입력 내용 추가 버튼
let taskList = []; //리스트
let taskTime = []; // 시간 리스트



// 현재 시간을 'Y-m-d H:i:s' 형식으로 포맷팅하는 함수
function getCurrentTime() {
    let now = new Date();
    let year = now.getFullYear();
    let month = ('0' + (now.getMonth() + 1)).slice(-2);
    let day = ('0' + now.getDate()).slice(-2);
    let hours = ('0' + now.getHours()).slice(-2);
    let minutes = ('0' + now.getMinutes()).slice(-2);
    // let seconds = ('0' + now.getSeconds()).slice(-2);
    // return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    return `${year}-${month}-${day} ${hours}:${minutes}`;
}

addBtn.addEventListener('click', addTask) //입력 내용 + 버튼 클릭 이벤트

// 할일 추가 함수
function addTask() {
    let task = { // input입력 내용 이외에 (true, false), (UID 랜덤값)을, 각각의 객체로 반환한다.
        uid: randomID(),
        taskContent: taskInput.value,
        dueDate: document.getElementById('due-date').value, // 날짜
        priority: document.getElementById('priority-select').value, // 아이콘
        isComplate: false
    }

    if (task.taskContent.trim() !== "") { //빈 문자열이라면 건너 뛴다.
        let currentTime = getCurrentTime(); // 현재 시간을 가져오기
        taskTime.push(currentTime); // 현재 시간을 추가
        taskList.push(task);
        render();
        taskInput.value = ""; // 할일 입력창 초기화
        document.getElementById('due-date').value = ""; // 데이터 선택 초기화
        document.getElementById('priority-select').value = "Waiting"; // 진행 상태 초기화
    }
}


function render() {
    let resultHTML = '';
    for (let i = 0; i < taskList.length; i++) {

        let priorityClass = `priority-${taskList[i].priority}`;
        let priorityIcon = `<i class="bi  bi-clock priority-icon ${priorityClass}"></i>`;

        if (taskList[i].priority !== 'Waiting') {
            priorityIcon = `<i class="bi bi-clock-fill priority-icon ${priorityClass} animate-icon"></i>`;
        }

        if (taskList[i].isComplate == true) {
            resultHTML += `<div class="todo-item list-group-item d-flex justify-content-between align-items-center completed-bg">
                                <div class="todo-item-box completed-done">
                                    <div>${taskList[i].taskContent}</div>
                                    <div class="todo-item-time"><span>작성일자: ${taskTime[i]}</span> <span>완료 예정일: ${taskList[i].dueDate}</span></div>
                                </div>
                            <div class="btn-group"><button onclick="toggleComplete('${taskList[i].uid}')" class="btn btn-success check-button"><i class="bi bi-arrow-clockwise icon-size-16"></i>
                                </button><button class="btn btn-danger" onclick="confirmDeleteTask('${taskList[i].uid}')">삭제</button></div>
                            </div>
                        </div>`;
        } else {
            resultHTML += `<div class="todo-item list-group-item d-flex justify-content-between align-items-center">
                                <div class="todo-item-box">
                                    <div> ${taskList[i].taskContent} </div>
                                    <div class="todo-item-time"><span>${priorityIcon} ${taskList[i].priority} </span> <span>작성일자: ${taskTime[i]}</span> <span>완료 예정일: ${taskList[i].dueDate}</span></div>
                                </div>
                            <div class="btn-group"><button onclick="toggleComplete('${taskList[i].uid}')" class="btn btn-success check-button"><i class="bi bi-check-lg icon-size-16"></i>
                                </button><button class="btn btn-warning" onclick="editTask('${taskList[i].uid}')">수정</button><button class="btn btn-danger" onclick="confirmDeleteTask('${taskList[i].uid}')">삭제</button></div>
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
            taskList[i].isComplate = !taskList[i].isComplate
            break;
        }
    }
    render();
    console.log(taskList);

}

//삭제 버튼 클릭시 alert 창 뛰우고 확인 시 아래 deleteTask 실행
function confirmDeleteTask(uid) {
    if (confirm('할 일을 삭제하시겠습니까?')) {
        deleteTask(uid);
    }
}


//게시물 삭제 진행
function deleteTask(uid) {
    for (let i = 0; i < taskList.length; i++) {
        if (taskList[i].uid == uid) {
            taskList.splice(i, 1)
            break;
        }
    }
    render();
}

//게시물 수정 모드 
function editTask(uid) {
    let task = taskList.find(task => task.uid == uid);
    if (task) {
        taskInput.value = task.taskContent;
        document.getElementById('due-date').value = task.dueDate;
        document.getElementById('priority-select').value = task.priority;

        // 기존 addTask 대신 updateTask 호출로 변경
        addBtn.removeEventListener('click', addTask);
        addBtn.addEventListener('click', function updateTask() {
            task.taskContent = taskInput.value;
            task.dueDate = document.getElementById('due-date').value;
            task.priority = document.getElementById('priority-select').value;

            render();
            taskInput.value = "";
            document.getElementById('due-date').value = "";
            document.getElementById('priority-select').value = "Waiting";

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

























// 네비게이션 메뉴 클릭 이벤트
navAll.addEventListener('click', () => {
    setActiveNav(navAll);
});

navActive.addEventListener('click', () => {
    setActiveNav(navActive);
});

navCompleted.addEventListener('click', () => {
    setActiveNav(navCompleted);
});

function setActiveNav(activeNav) {
    [navAll, navActive, navCompleted].forEach(nav => {
        nav.classList.remove('active');
    });
    activeNav.classList.add('active');
}

// 네비게이션 메뉴 언더라인 적용
function setActiveNav(activeNav) {
    [navAll, navActive, navCompleted].forEach(nav => {
        nav.classList.remove('active');
    });
    activeNav.classList.add('active');

    // underline 위치 이동
    const navOffsetLeft = activeNav.offsetLeft;
    const navOffsetWidth = activeNav.offsetWidth;

    underLine.style.left = `${navOffsetLeft}px`;
    underLine.style.width = `${navOffsetWidth}px`;
}

// 초기 위치 설정
document.addEventListener('DOMContentLoaded', () => {
    const activeNav = document.querySelector('.nav-link.active');
    if (activeNav) {
        setActiveNav(activeNav);
    }
});