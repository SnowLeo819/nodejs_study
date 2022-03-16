console.log("Hello Node.js");
// alert("hello")  - node.js에 포함된 객체가 아니므로 사용 불가

console.log(Math.round(62.9));
// 브라우저의 js 와 node.js 는 사용객체에 다른점도 많다.

let fruits = "과일";
// let fruits = "다른 과일";  let 중복사용 불가
var temp = "정보";
var temp = "다른 정보";
//  var 중복사용 가능 function scope

console.log(fruits);
console.log(temp);

//  변수 var / let / const
//  var 중복사용 가능 function scope
//  let, const 중복사용 불가 block scope ("{}")
