const socket = io();
console.log(socket);

// emit() 명령어로 이벤트를 보낼 수 있음..
// socket.emit("chatting", { name: "박지형", msg: "Hello!" });
socket.on("chatting", (data) => {
  // console.log(data);
  const { name, time, msg } = data; // 구조분해로 data. 안붙이고 사용하기
  const attachClass = name === $("#nickName").val() ? "me" : "other";
  const img = name === $("#nickName").val() ? "profile" : "profile02";
  $(".chattingBox .list").append(
    `
      <li class="${attachClass}">
        <div class="profile">
          <img src="../images/${img}.png" alt="" />
          <span class="nickName">${name}</span>
        </div>
        <div class="msgBox">
          <div class="msg">${msg}</div>
          <span class="time">${time}</span>
        </div>
      </li>
    `
  );
  // 글 쓰면 맨 아래로
  $(".chattingBox").scrollTop($(".chattingBox .list").height());
});

function sendMsg() {
  const chattingItem = { name: $("#nickName").val(), msg: $("#msg").val() };
  socket.emit("chatting", chattingItem);
  $("#msg").val("");
  $("#msg").focus();
  $(".btnSend").removeClass("on");
}

$(".btnSend").on("click", () => {
  //name = $("#nickName").val();
  //msg = $("#msg").val();
  sendMsg();
});

$("#msg").on("keydown", (e) => {
  console.log(e.keyCode + " 입력");
  if ($("#msg").val() !== "") {
    $(".btnSend").addClass("on");
  }

  if (e.keyCode === 13) {
    if ($("#msg").val() === "" || $("#msg").val() === "\n") {
      $("#msg").val("");
      $(".btnSend").removeClass("on");
      return;
    }
    sendMsg();
  }
});
