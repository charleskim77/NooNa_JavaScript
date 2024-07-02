// 유저가 값을 입력한다.
// +버튼을 클릭라면, 할 일이 추가된다.
// delete 버튼을 누르면 할일을 삭제할 건지 alert창으로 묻는다.
// check 버튼을 누르면 할일이 끝나면서 밑줄이 간다.
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


addBtn.addEventListener('click', addTask) //입력 내용 + 버튼 클릭 이벤트

        // 할일 추가 함수
        function addTask() {
            let taskContent = taskInput.value; //입력 된 컨텐츠
            if (taskContent.trim() !== "") {
                taskList.push(taskContent);
                taskTime.push(now); // 현재 시간을 추가
                render();
            }
        }


function render() {
    let resultHTML = '';
    for (let i = 0; i < taskList.length; i++) {
        resultHTML += `<div class="todo-item list-group-item d-flex justify-content-between align-items-center"><span>${taskList[i]}</span><span>${taskTime[i]}</span>
                <div class="btn-group"><button class="btn btn-success check-button">✔</button><button class="btn btn-danger">삭제</button></div>
            </div>`;
    }
    document.getElementById("task-board").innerHTML = resultHTML;
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