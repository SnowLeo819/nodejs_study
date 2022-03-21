$.ajax({
  url: "/daum/news",
  method: "GET",
  success: function (res) {
    console.log(res);
    let output = "";
    const newsList = res;
    $.each(newsList, (idx, item) => {
      output += `
        <li>
          <div class="txtBox">
            <div class="company">
              <img src="${item.company}"></div>
              <span class="category">${item.category}</span>
            </div>
            <div class="news">
              <a href="${item.url}" target="_blank">
                <h2>${item.news}</h2>
              </a>
              <a class="img" href="${item.url}" target="_blank">
                <img src="${item.img}">
              </a>
          </div>
        </li>
      `;
    });
    $(".newsList").html(output);
  },
});
