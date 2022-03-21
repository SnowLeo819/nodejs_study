let _start = 1;
let _searchWord = "배트맨";
let loadStop = false;
function loadNews(pstart, psearchWord) {
  console.log(loadStop);
  if (loadStop === true) return;
  console.log(pstart + "==" + psearchWord);
  const sendData = {
    start: pstart,
    searchWord: psearchWord,
  };
  $.ajax({
    url: "/naver/movie",
    data: sendData,
    success: function (res) {
      const newsList = res.items;
      const total = res.total;
      // console.log(newsList);
      // 검색데이터 끝났을 때
      if (newsList.length < 10) loadStop = true;
      let output = "";
      $.each(newsList, function (idx, item) {
        // 이미지 없으면 notfound 이미지로 넣기
        let image = item.image;
        if (image === "" || image === null) image = "../images/notfound.png";
        // 구분기호 지우기..
        let director = item.director.replaceAll("|", ", ").slice(0, -2);
        let actor = item.actor.replaceAll("|", ", ").slice(0, -2);
        output += `
                  <li>
                    <a href="${item.link}" target="_blank">
                      <div class="img"><img src="${image}" alt="poster"></div>
                      <div class="info">
                        <h2 class="title">${item.title} - ${item.subtitle}</h2>
                        <p class="director">감독 : ${director}</p>
                        <p class="actor">출연 : ${actor}</p>
                        <p class="rate">평점 : ${item.userRating}</p>
                        <p class="date">개봉일 : ${item.pubDate}</p>
                      </div>
                    </a>
                  </li>
                `;
      });
      $(".contents ul").append(output);
    },
  });
}

// function checkImg(img) {
//   if (img === "" || img === null) {
//     image = "../images/notfound.png";
//   } else {
//     image = img;
//   }
// }

function checkSearchWord() {
  if ($("#searchWord").val().trim() === "") {
    alert("검색어를 입력해 주세요");
    $("$searchWord").val("");
    return;
  }
}

$("#searchButton").on("click", function () {
  checkSearchWord();
  $(".contents ul").html("");
  loadStop = false;
  _start = 1;
  _searchWord = $("#searchWord").val();
  loadNews(_start, _searchWord);
});

$("#searchWord").on("keyup", function (e) {
  if (e.keyCode === 13) {
    // _start = 1;
    // _searchWord = $("#searchWord").val();
    // loadNews(_start, _searchWord);
    $("#searchButton").trigger("click");
  }
});

$(".more").on("click", function () {
  console.log("more");
  _start += 10;
  loadNews(_start, _searchWord);
});

$(window).on("scroll", function () {
  // console.log("scrolltop==" + $(window).scrolltop());
  // console.log("doc==" + $(document).height());
  if ($(window).scrollTop() >= $(document).height() - $(window).height()) {
    console.log("바닥쓰..");
    _start += 10;
    loadNews(_start, _searchWord);
  }
});

loadNews(_start, _searchWord);
