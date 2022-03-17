$("#cities").on("change", function () {
  // console.log($(this).val());
  const sendData = {
    city: $(this).val(),
  };

  // 통합대기환경지수 = 좋음(0~50)	보통(51~100)	나쁨(101~250)	매우나쁨(251~)
  // 미세먼지 PM10(㎍/㎥)	24hr주1)	0	30	/31	80/	81	150	/151	600
  // 초미세먼지 PM2.5(㎍/㎥)	24hr주2)	0	15 /	16	35	/36	75/	76	500

  $.ajax({
    url: "/air",
    type: "post",
    data: sendData,
    dataType: "json",
    success: function (res) {
      // console.log(res);
      output = "";
      $.each(res, (idx, item) => {
        // 미세..
        // let pm10Val = item.pm10Value;
        let pm10level = pm10lev(item.pm10Value);
        pm10Imoji = levToImoji(pm10level);
        // 초미세..
        // let pm25Val = item.pm25Value;
        let pm25level = pm25lev(item.pm25Value);
        pm25Imoji = levToImoji(pm25level);
        let walkImoji = goWalk(pm10level, pm25level);
        output += `
                <li>
                  <h2>${item.sidoName} ${item.stationName}</h2>
                  <p>미세먼지 : ${item.pm10Value} / ${pm10Imoji}</p>
                  <p>초미세먼지 : ${item.pm25Value} / ${pm25Imoji}</p>
                  <p class="walk">외출 추천 : ${walkImoji}</p>
                </li>
                  `;
      });
      // console.log(output);
      $(".contents ul").html(output);
      gsap.from(".contents ul li", { opacity: 0, stagger: 0.1, duration: 1 });
    },
  });
});

function pm10lev(pm10Val) {
  if (pm10Val === null || pm10Val === "-") {
    pm10level = 0;
  } else if (pm10Val < 31) {
    pm10level = 1;
  } else if (pm10Val < 81) {
    pm10level = 2;
  } else if (pm10Val < 151) {
    pm10level = 3;
  } else {
    pm10level = 4;
  }
  return pm10level;
}

function pm25lev(pm25Val) {
  if (pm25Val === null || pm25Val === "-") {
    pm25level = 0;
  } else if (pm25Val < 16) {
    pm25level = 1;
  } else if (pm25Val < 36) {
    pm25level = 2;
  } else if (pm25Val < 76) {
    pm25level = 3;
  } else {
    pm25level = 4;
  }
  return pm25level;
}

function levToImoji(level) {
  imoji = "";
  switch (level) {
    case 0:
      imoji = "-";
      break;
    case 1:
      imoji = "&#x1F60A";
      break;
    case 2:
      imoji = "&#x1F610";
      break;
    case 3:
      imoji = "&#x1F623";
      break;
    case 4:
      imoji = "&#x1F635";
      break;
  }
  return imoji;
}

function goWalk(lev10, lev25) {
  if (lev10 + lev25 < 5 && lev10 < 3 && lev25 < 3) {
    walkImoji = "&#x1F646";
  } else {
    walkImoji = "&#x1F645";
  }
  return walkImoji;
}
