+"use strict";
const canvas = document.querySelector("#canvas");
const home = document.querySelector(".home");
const c = canvas.getContext("2d");
let block = 25;
const height = 15 * block;
const width = 27 * block;
canvas.height = height;
canvas.width = width;
// y1 and y2 are the y plixel values of the paddels
let y1;
let y2;
let score1;
let score2;
//ballX ballY are the balls x and y values
let ballX;
let ballY;
//ball direction defines at which point the ball is coliding
//pastballdirection tell where last the ball collided
//game starts - ballDirection = 1
// left collision- ballDirection = 2
//right collision - ballDirection = 3
// top collision -ballDirection = 4
//bottom collosion ballDireciton = 5
let ballDirection;
let pastBallDirection;
//game is later used to define an interval
let game;
let interval2;
//a,b,d,e tell which paddel are moving
let a;
let b;
let d;
let e;
//function to update canvas every 4ms to show change
function update() {
  let arr1 = [];
  let arr2 = [];
  c.fillStyle = "black";
  c.fillRect(0, 0, width, height);
  for (let i = 4; i < height; i += 27) {
    c.fillStyle = "lightgrey";
    c.fillRect(width / 2 - 2, i, 4, 17);
  }
  score(score1, width / 4, 45);
  score(score2, width - width / 4, 45);
  //displays paddels and the ball
  board1(y1);
  board2(y2);
  ball();
  //checks if ball is out of boundary and resets the ball to center
  if (ballX > width) {
    ballOutOfBounds(1);
    score1++;
  } else if (ballX + 11 < 0) {
    ballOutOfBounds(0);
    score2++;
  }
  //adds every y cord of paddels into an arr
  for (let i = 0; i < 70; i++) {
    arr1.push(y1 * 3 + i);
    arr2.push(y2 * 3 + i);
  }
  //checks for collision of ball with anything and assigns respective balldirection
  if (
    ballX + 10.5 === width - 34 &&
    (arr2.includes(ballY) || arr2.includes(ballY + 11))
  ) {
    pastBallDirection = ballDirection;
    ballDirection = 3;
  } else if (ballY + 11 === height) {
    pastBallDirection = ballDirection;
    ballDirection = 5;
  } else if (
    ballX === 29.5 &&
    (arr1.includes(ballY) || arr1.includes(ballY + 11))
  ) {
    pastBallDirection = ballDirection;
    ballDirection = 2;
  } else if (ballY === 1) {
    pastBallDirection = ballDirection;
    ballDirection = 4;
  }
  //changes the cord of the ball depending on the ball direction
  moveBall(1);
}
function init() {
  y1 = 10;
  y2 = 10;
  score1 = 0;
  score2 = 0;
  ballX = width / 2;
  ballY = Math.floor(Math.random() * (height - 24)) + 12;
  ballDirection = 1;
  pastBallDirection = 1;
  a = undefined;
  b = undefined;
  d = undefined;
  e = undefined;
}
//creates board
function board1(y) {
  c.fillStyle = "lightgrey";
  c.fillRect(25, y * 3, 10, 70);
}
function board2(y) {
  c.fillStyle = "lightgrey";
  // c.fillRect(463, y * 5, 10, 70);
  c.fillRect(width - 37, y * 3, 10, 70);
}
function score(s, x, y) {
  c.fillStyle = "lightgrey";
  c.font = "bold 40px Courier new";
  c.fillText(s, x, y);
}
//creates ball
function ball() {
  c.fillStyle = "lightgrey";
  c.fillRect(ballX, ballY, 11, 11);
}
// returns the ball to center x at random y after ball is out of bound
function ballOutOfBounds(x) {
  ballX = width / 2;
  ballY = 55;
  ballY = Math.trunc(Math.random() * height - 12);
  ballDirection = 1;
  pastBallDirection = x;
}

//changes ball's cords depending on balldirection
function moveBall(n) {
  if (ballDirection === 1 && pastBallDirection === 0) {
    ballX += n;
  } else if (ballDirection === 1 && pastBallDirection === 1) {
    ballX -= n;
  } else if (ballDirection === 2 && pastBallDirection === 1) {
    ballX += n;
    ballY += n;
  } else if (ballDirection === 2 && pastBallDirection === 4) {
    ballX += n;
    ballY += n;
  } else if (ballDirection === 2 && pastBallDirection === 5) {
    ballX += n;
    ballY -= n;
  } else if (ballDirection === 3 && pastBallDirection === 1) {
    ballX -= n;
    ballY += n;
  } else if (ballDirection === 3 && pastBallDirection === 4) {
    ballX -= n;
    ballY += n;
  } else if (ballDirection === 3 && pastBallDirection === 5) {
    ballX -= n;
    ballY -= n;
  } else if (ballDirection === 4 && pastBallDirection === 2) {
    ballX += n;
    ballY += n;
  } else if (ballDirection === 4 && pastBallDirection === 3) {
    ballX -= n;
    ballY += n;
  } else if (ballDirection === 5 && pastBallDirection === 2) {
    ballX += n;
    ballY -= n;
  } else if (ballDirection === 5 && pastBallDirection === 3) {
    ballX -= n;
    ballY -= n;
  } else if (ballDirection === 5 && pastBallDirection === 4) {
    if (ballX <= width / 2) {
      ballX -= n;
      ballY -= n;
    } else {
      ballX += n;
      ballY -= n;
    }
  } else if (ballDirection === 4 && pastBallDirection === 5) {
    if (ballX <= width / 2) {
      ballX -= n;
      ballY += n;
    } else {
      ballX += n;
      ballY += n;
    }
  }
}
//if movement key is pressed allows for movement
function control() {
  document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowUp") d = 1;
  });
  document.addEventListener("keyup", (e) => {
    if (e.key === "ArrowUp") d = undefined;
  });
  document.addEventListener("keydown", (s) => {
    if (s.key === "ArrowDown") e = 1;
  });
  document.addEventListener("keyup", (s) => {
    if (s.key === "ArrowDown") e = undefined;
  });
}
//defines computer movement for singleplayer
function ai() {
  setInterval(() => {
    if (ballY < y2 * 3 + 34.5 && y2 > 0) {
      y2--;
    } else if (ballY > y2 * 3 + 34.5 && y2 * 3 + 70 < height) {
      y2++;
    }
  }, 15);
}
//changes paddel y cords according to button press
function movePaddel() {
  if (a && y1 > 0) y1--;
  if (b && y1 * 3 + 70 < height) y1++;
  if (d && y2 > 0) y2--;
  if (e && y2 * 3 + 70 < height) y2++;
}
//same task as control function but for left paddel
document.addEventListener("keydown", (e) => {
  if (e.key === "w") a = 1;
});
document.addEventListener("keyup", (e) => {
  if (e.key === "w") a = undefined;
});
document.addEventListener("keydown", (e) => {
  if (e.key === "s") b = 1;
});
document.addEventListener("keyup", (e) => {
  if (e.key === "s") b = undefined;
});
//if clicked on multiplayer starts multiplayer game
document.querySelector(".multiplayer").addEventListener("click", () => {
  canvas.classList.remove("hide");
  document.querySelector(".reset").classList.remove("hide");
  home.classList.add("hide");
  init();
  game = setInterval(update);
  interval2 = setInterval(movePaddel, 10);
  document.querySelector(
    ".info"
  ).innerHTML = `Use W and S keys to move the paddle on the left and <br> Arrow keys for the paddle on the right <br> Press Esc to exit`;
  control();
});
//if clicked singleplayer starts singleplayer game
document.querySelector(".singleplayer").addEventListener("click", () => {
  canvas.classList.remove("hide");
  document.querySelector(".reset").classList.remove("hide");
  home.classList.add("hide");
  init();

  game = setInterval(update);
  interval2 = setInterval(movePaddel, 10);
  document.querySelector(".info").innerHTML =
    "Use W and S keys to move the paddle <br> Press Esc to exit";
  ai();
});
// function for the reset button
document.querySelector(".reset").addEventListener("click", () => {
  init();
});
//logic of the esc button
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    home.classList.remove("hide");
    canvas.classList.add("hide");
    document.querySelector(".reset").classList.add("hide");
    document.querySelector(".info").innerHTML = "";
    clearInterval(game);
    clearInterval(interval2);
    window.clearInterval();
  }
});
