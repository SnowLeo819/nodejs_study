// this
// javascript 에서의 this 는 누가 호출하는가에 따라 달라진다..

const people = {
  name: "박준경",
  say: function () {
    console.log(this);
  },
};

people.say();

let sayPeople = people.say;
sayPeople();
