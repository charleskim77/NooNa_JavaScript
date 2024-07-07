let names; // 전역 변수로 names 선언

const myCodes = {
    base: `
names = [
    "Steven Paul Jobs",
    "Bill Gates",
    "Mark Elliot Zuckerberg",
    "Elon Musk",
    "Jeff Bezos",
    "Warren Edward Buffett",
    "Larry Page",
    "Larry Ellison",
    "Tim Cook",
    "Lloyd Blankfein",
];
    `,
    1: `
let upperCaseNames = names.map(name => name.toUpperCase());
console.log(upperCaseNames);
    `,
    2: `
let firstNames = names.map(name => {
    let nameParts = name.split(' ');
    return nameParts.slice(0, -1).join(' ');
});
console.log(firstNames);
    `,
    3: `
let lastNames = names.map(name => {
let nameParts = name.split(' ');
    return nameParts[nameParts.length - 1];
});
console.log(lastNames);
    `,
    4: `
let initial = names.map(name => {
    return name.split(' ')
        .map(part => part[0])
        .join('');
});
console.log(initial);
    `,
    5: `
let namesWithA = names.filter(name => 
  name.includes('a')
);
console.log(namesWithA);
    `,
    6: `
let consecutiveLetters = names.filter(name => {
    let splitName = name.split("");
    return splitName.some((letter, index) => letter == splitName[index + 1]);
  })
  console.log(consecutiveLetters);
    `,
    7: `
let NameOver20Chars = names.some(name => name.length >= 20);
console.log("전체 이름의 길이가 20자 이상인 사람이 있는가?", NameOver20Chars);

if (NameOver20Chars) {
    let longNames = names.filter(name => name.length >= 20);
    console.log("20자 이상인 이름:", longNames);
}
    `,
    8: `
let allNamesOver20Chars = names.every(name => name.length >= 20);
console.log("모두의 전체 이름의 길이가 20자 이상인가?", allNamesOver20Chars);
    `,
    9: `
let namesHaveA = names.every(name => name.includes('a'));
console.log("모두의 이름에 a가 포함되어 있는가?", namesHaveA);
    `,
    10: `
name20CharsOver = names.find(name => name.length >= 20);
console.log(name20CharsOver);
    `,
    11: `
let middleName = names.find(name => name.split(' ').length === 3);
    console.log("미들네임이 포함된 첫 번째 사람:",middleName);

let allMiddleName = names.filter(name => name.split(' ').length === 3);
console.log("미들네임이 포함된 모든 사람들:", allMiddleName);
    `,
    12: `
let long20Name = names.findIndex(name => name.length >= 20);
    console.log("전체 이름의 길이가 20자 이상인 첫 번째 사람의 인덱스:", long20Name);
    `,
    13: `
let MiddleNameFind = names.findIndex(name => name.split(' ').length === 3);
    console.log("미들네임이 포함된 첫 번째 사람의 인덱스:", MiddleNameFind);
    `
};









// 기본 names 배열 정의
eval(myCodes.base);

// 각 코드를 해당하는 요소에 표시
document.getElementById('codeDisplay').textContent = myCodes.base;
document.getElementById('codeDisplay1').textContent = myCodes[1];
document.getElementById('codeDisplay2').textContent = myCodes[2];
document.getElementById('codeDisplay3').textContent = myCodes[3];
document.getElementById('codeDisplay4').textContent = myCodes[4];
document.getElementById('codeDisplay5').textContent = myCodes[5];
document.getElementById('codeDisplay6').textContent = myCodes[6];
document.getElementById('codeDisplay7').textContent = myCodes[7];
document.getElementById('codeDisplay8').textContent = myCodes[8];
document.getElementById('codeDisplay9').textContent = myCodes[9];
document.getElementById('codeDisplay10').textContent = myCodes[10];
document.getElementById('codeDisplay11').textContent = myCodes[11];
document.getElementById('codeDisplay12').textContent = myCodes[12];
document.getElementById('codeDisplay13').textContent = myCodes[13];

// 코드 실행 함수
function executeCode(codeString, resultElementId, buttonElement) {
    let output = [];
    const originalLog = console.log;
    console.log = (...args) => {
        output.push(args.map(arg => JSON.stringify(arg, null, 2)).join(' '));
    };

    try {
        eval(codeString);
    } catch (error) {
        output.push('Error: ' + error.message);
    }

    console.log = originalLog;

    const resultElement = document.getElementById(resultElementId);
    resultElement.textContent = output.join('\n');
    hljs.highlightElement(resultElement);

    // 버튼 상태 변경
    buttonElement.textContent = '감추기';
    buttonElement.classList.add('hide');
}

// 결과 감추기 함수
function hideResult(resultElementId, buttonElement) {
    document.getElementById(resultElementId).textContent = '';
    buttonElement.textContent = '코드 실행';
    buttonElement.classList.remove('hide');
}

// 버튼 클릭 이벤트 리스너 추가
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.sbox[data-problem-number]').forEach((box) => {
        const button = box.querySelector('.pre-button');
        const resultElement = box.querySelector('code[id^="codeResult"]');
        const problemNumber = box.getAttribute('data-problem-number');

        if (button && resultElement && problemNumber) {
            button.addEventListener('click', () => {
                if (button.classList.contains('hide')) {
                    hideResult(resultElement.id, button);
                } else {
                    const codeToExecute = myCodes[problemNumber];
                    if (typeof codeToExecute === 'string') {
                        executeCode(codeToExecute, resultElement.id, button);
                    } else {
                        resultElement.textContent = `Error: No valid code found for problem ${problemNumber}`;
                        hljs.highlightElement(resultElement);
                        button.textContent = '감추기';
                        button.classList.add('hide');
                    }
                }
            });
        }
    });

    // 초기 구문 강조 적용
    document.querySelectorAll('pre code').forEach((el) => {
        hljs.highlightElement(el);
    });
});