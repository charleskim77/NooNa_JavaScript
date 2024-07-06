// #1
let myCode1 = `
// 1. 문제
let name="noona's fruit store";
let fruits = ["banana","apple","mango"];
let address="Seoul";
let store = {name:name, fruits:fruits, address:address};
console.log("1번 문제 :", store);

// 1. 답
const store2 = { name, fruits, address };
console.log("1번 문제 :", store2);
`;

// #2
let myCode2 = `
// 2. 문제
let name="noona's fruit store";
let fruits = ["banana","apple","mango"];
let address="Seoul";
let store = {name:name, fruits:fruits, address:address};

// 2. 답
let myinfo = \`제 가게 이름은 \${name} 입니다. 위치는 \${address} 에 있습니다\`;
console.log("2번 문제 :", myinfo);
`;


// #3
let myCode3 = `
// 3. 문제 
function calculate(obj){    // 함수 안을 바꾸시오
    return obj.a+obj.b+obj.c
}
console.log("3번 문제 :",calculate({a: 1, b: 2, c: 3}));

// 3. 답 
function calculate2(obj2) {
    let { a, b, c, d } = obj2;
    return a + b + c + d;
}
console.log("3번 문제 :", calculate2({a: 1, b: 2, c: 3, d: 10}));
`;


// #4
let myCode4 = `
// 4. 문제 
// let name="noona store"
// let fruits = ["banana","apple","mango"]
// let address = {
//     country:"Korea",
//     city:"Seoul"
// }

// function findStore(obj) {
//     return name==="noona store" && city === "Seoul"
// }
// console.log(findStore({name,fruits,address}))


let name = "noona store"
let fruits = ["banana", "apple", "mango"]
let address = {
    country: "Korea",
    city: "Seoul"
}
// 4. 답
function findStore(obj) {
    let { name, address: { city } } = obj;
    return name === "noona store" && city === "Seoul"}
    console.log("4번 문제 :", findStore({ name, fruits, address }))


function findStore2({ name, address: { city } }) {
    return name === "noona store" && city === "Seoul"}
console.log("4번 문제 :", findStore2({ name, fruits, address }))

`;


// #5
let myCode5 = `
// 5. 문제
// function getNumber(){
//     let array = [1,2,3,4,5,6]    // 여기서부터 바꾸시오
//     return {first,third,forth}
// }
// console.log(getNumber()) //  결과값 { first: 1, third: 3, forth: 4 }

// 5. 답
// destructuring을 사용 array에서 추출
function getNumber(){
    let array = [1,2,3,4,5,6,7,8,9,10]
    let [first, , third, forth, , six, ,  ,  , ten] = array  // 2, 5, 7, 8, 9 건너뛰기
    return {first, third, forth, six, ten}
}
console.log("5번 문제 :",getNumber())
`;


// #6
let myCode6 = `
// 6. 문제
function getCalendar(first, ...rest) {
    return (
        first === "January" &&
        rest[0] === "February" &&
        rest[1] === "March" &&
        rest[2] === undefined
    );
}
console.log("6번 문제 :", getCalendar() ? "true 입니다" : "false 입니다");

// 6. 답
console.log("6번 문제 :", getCalendar("January", "February", "March") ? "true 입니다" : "false 입니다");
`;



// #7
let myCode7 = `
// 7. 문제
function getMinimum(){
    let a= [45,23,78]
    let b = [54,11,9]
    return Math.min() // 여기를 바꾸시오
}
console.log("7번 문제 :", getMinimum())

// 7. 답
//Math.min() 두 어레이 값들중 가장 작은 값을 반환
function getMinimum2(){
    let a = [45, 23, 78]
    let b = [54, 11, 4]
    return Math.min(...a, ...b)
}
console.log("7번 문제 :", getMinimum2())

//Math.max() 3개의 어레이 값들중 가장 큰 값을 반환
function getMaxmum(){
    let a = [45, 23, 78]
    let b = [54, 11, 4]
    let c = [554, 111, 104]
    return Math.max(...a, ...b, ...c)
}
console.log("7번 문제 :", getMaxmum())

`;


// #8
let myCode8 = `
// 8. 문제
function sumNumber() {
    // 여기서부터 바꾸시오
    const sum = function (a, b) {
        return a + b;
    };
    return sum(40, 10);
}
console.log("8번 문제 :",sumNumber());

// 8. 답
function sumNumber2() {
    const sum = (a, b) => a + b;
        return (40 + 20);
}
console.log("8번 문제 :", sumNumber2());

`;


// #9
let myCode9 = `
// 9. 문제
function sumNumber() {
    //여기를 바꾸시오
    return addNumber(1)(2)(3);

    function addNumber(a) {
        return function (b) {
            return function (c) {
                return a + b + c;
            };
        };
    }
}
console.log("9번 문제 :",sumNumber());


// 9. 답
let sumNumber2 = () => {
    let addNumber2 = (a => b => c => a + b + c);
    return addNumber2(3)(5)(7);
}
console.log("9번 문제 :",sumNumber2())

function sumNumber3() {
    let addNumber3 = a => b => c => a + b + c;
    return addNumber3(1)(125)(3);
}
console.log("9번 문제 :", sumNumber3());
`;



// 각 코드를 해당하는 요소에 표시
document.getElementById('codeDisplay').textContent = myCode1;
document.getElementById('codeDisplay2').textContent = myCode2;
document.getElementById('codeDisplay3').textContent = myCode3;
document.getElementById('codeDisplay4').textContent = myCode4;
document.getElementById('codeDisplay5').textContent = myCode5;
document.getElementById('codeDisplay6').textContent = myCode6;
document.getElementById('codeDisplay7').textContent = myCode7;
document.getElementById('codeDisplay8').textContent = myCode8;
document.getElementById('codeDisplay9').textContent = myCode9;

// 코드 실행 (콘솔에서 결과 확인 가능)
eval(myCode1);
eval(myCode2);
eval(myCode3);
eval(myCode4);
eval(myCode5);
eval(myCode6);
eval(myCode7);
eval(myCode8);
eval(myCode9);



