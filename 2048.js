let 테이블 = document.getElementById("table");
let 데이터 = [];

function 초기화() {
  let fragment = document.createDocumentFragment();
  [1, 2, 3, 4].forEach(function () {
    let 열데이터 = [];
    데이터.push(열데이터);
    let tr = document.createElement("tr");
    [1, 2, 3, 4].forEach(function () {
      열데이터.push(0);
      let td = document.createElement("td");
      tr.appendChild(td);
    });
    fragment.appendChild(tr);
  });
  테이블.appendChild(fragment);
}
function 랜덤생성() {
  let 빈칸배열 = [];
  데이터.forEach(function (열데이터, i) {
    열데이터.forEach(function (행데이터, j) {
      if (!행데이터) {
        빈칸배열.push([i, j]);
      }
    });
  });
  let 랜덤칸 = 빈칸배열[Math.floor(Math.random() * 빈칸배열.length)];
  데이터[랜덤칸[0]][랜덤칸[1]] = 2;
  그리기();
}
function 그리기() {
  //데이터를 받아서 화면에 출력
  데이터.forEach(function (열데이터, i) {
    열데이터.forEach(function (행데이터, j) {
      if (행데이터 > 0) {
        테이블.children[i].children[j].textContent = 행데이터;
      } else {
        테이블.children[i].children[j].textContent = "";
      }
    });
  });
}

초기화();
랜덤생성();
그리기();
let 드래그시작 = false;
let 시작좌표;
let 드래그중 = false;
let 끝좌표;
window.addEventListener("mousedown", function (e) {
  드래그시작 = true;
  시작좌표 = [e.clientX, e.clientY];
});
window.addEventListener("mousemove", function (e) {
  if (드래그시작) {
    드래그중 = true;
  }
});
window.addEventListener("mouseup", function (e) {
  드래그시작 = false;
  끝좌표 = [e.clientX, e.clientY];
  if (드래그중) {
    let 방향;
    let x좌표 = 끝좌표[0] - 시작좌표[0];
    let y좌표 = 끝좌표[1] - 시작좌표[1];
    if (x좌표 < 0 && Math.abs(x좌표) / Math.abs(y좌표) > 1) {
      방향 = "왼쪽";
    } else if (x좌표 > 0 && Math.abs(x좌표) / Math.abs(y좌표) > 1) {
      방향 = "오른쪽";
    } else if (x좌표 > 0 && Math.abs(x좌표) / Math.abs(y좌표) < 1) {
      방향 = "아래";
    } else if (x좌표 < 0 && Math.abs(x좌표) / Math.abs(y좌표) < 1) {
      방향 = "위";
    }
    console.log(x좌표, y좌표, 방향);
  }
  드래그시작 = false;
  드래그중 = false;

  switch (방향) {
    case "왼쪽":
        break;
    case "오른쪽":
        break;
    case "위":
      let 새데이터 = [
        [],[],[],[]
      ];
      데이터.forEach(function(열데이터,i){
        열데이터.forEach(function(행데이터, j){
          if (행데이터) {
            새데이터[j].push(행데이터);
          }
        })
      });
      [1,2,3,4].forEach(function(행데이터, i){
        [1,2,3,4].forEach(function(열데이터, j){
          데이터[i],[j] = 새데이터[i][j] || 0;
        })
      })
        break;
    case "아래":
        break;
  }
  그리기();
  랜덤생성();
});
