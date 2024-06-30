// 랜덤번호 생성
// 유저는 찬스 횟수를 5~10회 중 선택할 수 있다.
// 유저가 번호를 입력한다. 그리고 GO 버튼을 누름
// 만약에 유저가 랜덤 번호를 맞추면 , 맞췄습니다!
// 랜덤 번호가 < 유저번호 Down!!
// 랜덤 번호가 < 유저번호 Up!!
// Reset 버튼을 누르면 게임이 리셋된다.
// 5번의 기회를 사용해서 정답을 못 맞추면 게임이 종료된다. (더 이상 추측 불가, 버튼이 Disable)
// 유저가 번호를 범위 밖(1~100)의 숫자를 입력하면 알려준다. 기회를 차감하지 않는다.
// 유저가 이전에 입력한 숫자를 입력하면 알려준다. 기회를 차감하지 않는다.

let RandomNum = 0;
let playButton = document.getElementById("play-button");
let userInput = document.getElementById("user-input");
let resultArea = document.getElementById("result-area");
let resetButton = document.getElementById("reset-button");
let chanceSelect = document.getElementById("chance-select");
let historyList = document.getElementById("history-list");
let chances = 5;
let chanceArea = document.getElementById("chance-area");
let history = []; // serValue 값을 배열로 저장

playButton.addEventListener("click", play);
resetButton.addEventListener("click", reset);
chanceSelect.addEventListener("change", setChances);
userInput.addEventListener("click", clearInput); //마우스 클릭시 input 값을 없앤다.

function clearInput() { //마우스 클릭시 input 값을 없앤다.
    userInput.value = '';
}

function pickRandomNum(){
    RandomNum = Math.floor(Math.random() * 100)+1;
    console.log(`랜덤번호 ${RandomNum}`);
}

function updateChanceArea() {
    chanceArea.textContent = `남은 찬스: ${chances}번 입니다.`; //창이 처음 열렸을때 찬스 값을 보여주고, 게임이 진행 되면 값을 반환한다.
}

function setChances() {
    chances = parseInt(chanceSelect.value);
    updateChanceArea();
}

function play() {
    let userValue = userInput.value;

    if(userValue < 1 || userValue > 100) { //유저가 입력한 값이 정상 값인지 체크
        resultArea.textContent = "범위를 벗어난 숫자입니다.1~100 사이 숫자를 입력해주세요"
        return;

    }else if(history.includes(userValue)) { //유저가 입력한 값이 이전에 입력한 값인지 체크
        resultArea.textContent = "이미 입력했던 숫자입니다. 다른 숫자를 입력해 주세요"
        return;

    }else if(userValue < RandomNum) {
        resultArea.textContent = "UP";
    }else if(userValue > RandomNum) {
        resultArea.textContent = "DOWN";
    }else if(userValue = RandomNum) {
        resultArea.textContent = '${userValue} 정답입니다!';
        playButton.disabled = true;
        chanceSelect.disabled = true;
        userInput.disabled = true;
        chanceArea.textContent = `${history.length + 1}번 만에 정답을 맞췄습니다.`;
        return;
    }

    chances--; 
    updateChanceArea(); //게임 진행 시 chances 값을 차감 후 반환한다.
    if (chances <= 0) { //chances="5" 기회가 0이 된다면 반환한다.
        resultArea.textContent = " 게임 오버! 리셋 버튼을 눌러 다시 시작하세요.";
        playButton.disabled = true; //GO 버튼 비활성화
        chanceSelect.disabled = true; //찬스 횟 수 비활성화
    } 

    history.push(userValue); //chances가 차감되고 history에 유저가 입력한 값을 반환한다.
    updateHistoryList(); //유저가 입력한 숫자를 업데이트 한다.
    console.log(history);
    
}

function updateHistoryList() {
    historyList.innerHTML = "";
    history.forEach((value) => {
        let listItem = document.createElement("li");
        listItem.textContent = `${value} = 오답 입니다.`;
        historyList.appendChild(listItem);
    });
}


function reset() {
    userInput.value = ""; //input창 정리
    pickRandomNum(); //새로운 랜덤 번호 생성
    chances = parseInt(chanceSelect.value); // 선택된 기회 수로 초기화
    resultArea.textContent ="새롭게 게임이 시작 되었습니다."; // 텍스트 리셋
    chances = 5; // 기회 초기화
    playButton.disabled = false; // GO 버튼 활성화
    chanceSelect.disabled = false; //찬스 횟 수 활성화
    chanceArea.textContent = `남은 찬스: ${chances}번 입니다.`; // chances값을 새롭게 반환한다.
    history = []; //이전 게임에서 입력했던 값을 리셋
    updateHistoryList(); //유저 입력했던 숫자 리스트 리셋
    userInput.disabled = false;
};

pickRandomNum()
updateChanceArea(); // 초기 남은 기회 수 설정