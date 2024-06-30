// 랜던번호 지정
// 유저가 번호를 입력한다. 그리고 GO 버튼을 누름
// 만약에 유저가 랜덤번호를 맞추면 , 맞췄습니다!
// 랜덤번호가 < 유저번호 Down!!
// 랜덤번호가 < 유저번호 Up!!
// Reset 버튼을 누르면 게임이 리셋된다.
// 5번의 기회를 사용해서 정답을 못 맞추면 게임이 종료된다. (더이상 추측 불가, 버튼이 Disable)
// 유저가 번호를 범위밖(1~100)의 숫자를 입력하면 알려준다. 기회를 차감하지 않는다.
// 유저가 이전에 입력한 숫자를 입력하면 알려준다. 기회를 차감하지 않는다.

let RandomNum = 0;
let playButton = document.getElementById("play-button");
let userInput = document.getElementById("user-input");
let resultArea = document.getElementById("result-area");

playButton.addEventListener("click", play);

function pickRandomNum(){
    RandomNum = Math.floor(Math.random() * 100)+1;
    console.log(`랜덤번호 ${RandomNum}`);
}

function play() {
    let userValue = userInput.value;
    if(userValue < 1 || userValue > 100) {
        resultArea.textContent = "범위를 벗어난 숫자입니다."
    }else if(userValue < RandomNum) {
        resultArea.textContent = "UP"
    }else if(userValue > RandomNum) {
        resultArea.textContent = "DOWN"
    }else if(userValue = RandomNum) {
        resultArea.textContent = "정답"
    }
}
pickRandomNum()