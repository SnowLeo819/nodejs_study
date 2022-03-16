// 기본형 함수  (기본값 설정해두기.. )
function add(num01, num02 = 100) {
  return num01 + num02;
}

// 익명함수
const add02 = function (num01, num02) {
  return num01 + num02;
};

// 익명함수 변환(arrow function)
const add03 = (num01, num02) => {
  return num01 + num02;
};

console.log(add(100, 1));
console.log(add(100));
console.log(add02(100, 2));
console.log(add03(100, 3));

// 두개의 수 입력 -> 작은 수 출력하는 함수.. min 만들기
function min(a, b) {
  if (a > b) {
    return b;
  } else if (a < b) {
    return a;
  } else {
    return "두 값이 동일합니다";
  }
}

let minTest = (a, b) => (a < b ? a : b);

function min02(a, b) {
  return a < b ? a : b < a ? b : "두 값 일치";
}
const min03 = (a, b) => {
  return a < b ? a : b < a ? b : "일치(min03)";
};

let test = (a, b) => {
  return a < b ? a : b < a ? b : "일치(min03)";
};

console.log(min(50, 50));
console.log(min02(50, 50));
console.log(min03(50, 50));

// return문 생략 가능.. 한줄일땐 중괄호{} 도 생략가능..
// 매개변수 1개일땐 변수 괄호도 생략가능
// 2배 만드는 double
const double = (temp) => temp * 2;

console.log(double(2.2655));
