let text = document.getElementById("textarea");
const btn = document.getElementById("btn");
let canvas = document.querySelector("canvas");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

btn.addEventListener("click", vowelChecker);
let count = 0;

function vowelChecker() {
  let Text = text.value.toLowerCase();

  for (i = 0; i < Text.length; i++) {
    let letter = Text.charAt(i);
    if (isVowel(letter)) {
      count++;
    }
  }
  const result = document.getElementById("result");
  result.innerHTML = `<span>${count}</span> Vowels`;
}

function isVowel(letter) {
  const vowel = ["a", "e", "i", "o", "u"];
  return vowel.includes(letter);
}

// canva

var c = canvas.getContext("2d");
let mouse = {
  x: undefined,
  y: undefined,
};
let colorArray = [
  "#22092C",
  "#872341",
  "#A6CF98",
  "#5272F2",
  "#ED7D31",
  "#072541",
];
let maxRadius = 40;
let minRadius = 2;
window.addEventListener("mousemove", function (event) {
  mouse.x = event.x;
  mouse.y = event.x;
});

window.addEventListener("resize", function () {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  init();
});

class Circle {
  constructor(x, y, radius, dx, dy) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.minRadius = radius;
    this.color = colorArray[Math.floor(Math.random() * colorArray.length)];
  }
  draw = function () {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.fillStyle = this.color;
    // c.stroke();
    c.fill();
  };
  update = function () {
    if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {
      this.dx = -this.dx;
    }
    if (this.y + this.radius > innerHeight || this.y - this.radius < 0) {
      this.dy = -this.dy;
    }
    this.x += this.dx;
    this.y += this.dy;

    if (
      mouse.x - this.x < 50 &&
      mouse.x - this.x > -50 &&
      mouse.y - this.y < 50 &&
      mouse.y - this.y > -50
    ) {
      if (this.radius < maxRadius) {
        this.radius += 1;
      }
    } else if (this.radius > this.minRadius) {
      this.radius -= 1;
    }

    this.draw();
  };
}

let circleArray = [];
function init() {
  for (let i = 0; i < 150; i++) {
    let x = Math.random() * window.innerWidth;
    let y = Math.random() * window.innerHeight;
    let dx = Math.random() - 0.5;
    let dy = Math.random() - 0.5;
    let radius = Math.random() * 3 + 1;
    circleArray.push(new Circle(x, y, radius, dx, dy));
  }
}
function animate() {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, innerWidth, innerHeight);
  for (let i = 0; i < circleArray.length; i++) {
    circleArray[i].update();
  }
}
init();
animate();
