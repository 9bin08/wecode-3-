let tetris = document.querySelector("#tetris");
let blockArr = [
  [
    "red",
    true,
    [
      [1, 1],
      [1, 1],
    ],
  ],
  [
    "blue",
    true,
    [
      [0, 2, 0],
      [2, 2, 2],
    ],
  ],
  [
    "orange",
    true,
    [
      [3, 3, 0],
      [0, 3, 3],
    ],
  ],
  [
    "skyblue",
    true,
    [
      [0, 4, 4],
      [4, 4, 0],
    ],
  ],
  [
    "yellowgreen",
    true,
    [
      [5, 5, 5],
      [5, 0, 0],
    ],
  ],
  [
    "pink",
    true,
    [
      [6, 6, 6],
      [0, 0, 6],
    ],
  ],
  ["yellow", true, [[7, 7, 7, 7]]],
];
let blockDick = {
  0: ["white", false, []],
  1: [
    "red",
    true,
    [
      [1, 1],
      [1, 1],
    ],
  ],
  2: [
    "blue",
    true,
    [
      [0, 1, 0],
      [1, 1, 1],
    ],
  ],
  3: [
    "orange",
    true,
    [
      [1, 1, 0],
      [0, 1, 1],
    ],
  ],
  4: [
    "skyblue",
    true,
    [
      [0, 1, 1],
      [1, 1, 0],
    ],
  ],
  5: [
    "yellowgreen",
    true,
    [
      [1, 1, 1],
      [1, 0, 0],
    ],
  ],
  6: [
    "pink",
    true,
    [
      [1, 1, 1],
      [0, 0, 1],
    ],
  ],
  7: ["yellow", true, [[1, 1, 1, 1]]],
  //고정된 블럭
  10: ["red", false, []],
  20: ["blue", false, []],
  30: ["orange", false, []],
  40: ["skyblue", false, []],
  50: ["yellowgreen", false, []],
  60: ["pink", false, []],
  70: ["yellow", false, []],
};
let tetrisData = [];
let stopDown = false;
// 블럭 표에 표시하기
function 화면그리기() {
  tetrisData.forEach(function (tr, i) {
    tr.forEach(function (td, j) {
      tetris.children[i].children[j].className = blockDick[td][0];
    });
  });
}
//랜덤 블럭 생성, 시작좌표 설정
function 블록생성기() {
  stopDown = false;
  let 블록 = blockArr[Math.floor(Math.random() * 7)][2];
  console.log(블록);
  블록.forEach(function (tr, i) {
    tr.forEach(function (td, j) {
      tetrisData[i][j + 3] = td;
    });
  });
  화면그리기();
}
//아래부터 기준으로 블럭 한칸씩 내려주기
function 블록내리기() {
  for (let i = tetrisData.length - 1; i >= 0; i--) {
    tetrisData[i].forEach(function (td, j) {
      if (td > 0 && td < 10) {
        if (tetrisData[i + 1] && !stopDown) {
          tetrisData[i + 1][j] = td;
          tetrisData[i][j] = 0;
        } else {
          //땅끝에 도달
          stopDown = true;
          tetrisData[i][j] = td * 10;
        }
      }
    });
  }
  if (stopDown) {
    블록생성기();
  }
  화면그리기();
}

//표 만들기
function 칸만들기() {
  let fragment = document.createDocumentFragment();
  for (let i = 0; i < 20; i++) {
    let tr = document.createElement("tr");
    let arr = [];
    tetrisData.push(arr);
    fragment.appendChild(tr);
    for (let j = 0; j < 10; j++) {
      let td = document.createElement("td");
      tr.appendChild(td);
      arr.push(0);
    }
  }
  console.log(tetris, fragment);
  tetris.appendChild(fragment);
}

// keypress는 방향키가 안먹음!
window.addEventListener("keydown", function (e) {
  console.log(e);
  switch (e.code) {
    case "ArrowRight":
      break;
    case "ArrowLeft":
      break;
    case "ArrowDown":
      break;
    default:
      break;
  }
});
window.addEventListener("keyup", function (e) {
  console.log(e);
  switch (e.code) {
    case "space":
      console.log("space");
      break;
    case "ArrowUp":
      break;
    default:
      break;
  }
});
칸만들기();
블록생성기();
setInterval(블록내리기, 100);
