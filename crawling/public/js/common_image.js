let _start = 1;
let _searchWord = "설표";
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
    url: "/naver/image",
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
        let txt = item.title;
        if (txt.length > 13) txt = txt.slice(0, 15 - txt.length) + " ... ";
        output += `
                  <li>
                    <a href="${item.link}" target="_blank">
                      <div class="img"><img src="${item.thumbnail}" alt="poster"></div>
                      <div class="info">
                        <h2 class="title">${txt}</h2>
                        <p class="size">이미지 크기 : ${item.sizewidth} x ${item.sizeheight}</p>
                      </div>
                    </a>
                  </li>
                `;
      });
      $(".contents .imgList").append(output);
      let grid = null;
      $(".contents .imgList").imagesLoaded(function () {
        grid = $(".contents .imgList").isotope({
          layoutMode: "masonry",
        });
      });
    },
  });
}

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
    $("#searchButton").trigger("click");
  }
});

$(".more").on("click", function () {
  console.log("more");
  _start += 10;
  loadNews(_start, _searchWord);
});

$(window).on("scroll", function () {
  if ($(window).scrollTop() >= $(document).height() - $(window).height()) {
    console.log("바닥쓰..");
    _start += 10;
    loadNews(_start, _searchWord);
  }
});

loadNews(_start, _searchWord);
