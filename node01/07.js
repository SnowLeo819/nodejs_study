// 구조 분해 할당
let [a, b] = [10, 20];
console.log(a);
console.log(b);

const obj = {
  name: "박지형",
  age: 30,
  msg: "hello",
};

const name = obj.name;
const age = obj.age;
const msg = obj.msg;
console.log(name + ", " + age + ", " + msg);
console.log("=======");
const { name: newName, age: newAge, msg: newMsg } = obj;
console.log(newName + ", " + newAge + ", " + newMsg);
// console.log("=======");
// const { name, age, msg } = obj;
// console.log(name + ", " + age + ", " + msg);

let [name01, name02, ...rest] = ["박지형", "박준경", "최재영", "김재혁", "윤재석", "김태관"];
console.log(name01);
console.log(name02);
console.log(rest[0]);
console.log(rest[1]);
