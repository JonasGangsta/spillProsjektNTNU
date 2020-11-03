const $ = document.querySelector.bind(document);
const game = $("#game");
const btnContainer = $(".btnContainer");
let mode;
let goal;
let spiller;
let score = 0;
let platformer = [];
let hindere = [];
let hinderTall = 5;

function setup() {
  mode = 0;
  var canvas = createCanvas(windowWidth / 1.9, windowHeight / 1.5);
  canvas.parent(`game`);
  resetSketch();
}
function resetSketch() {
  platformer = [];
  hindere = [];
  let k = 0;
  for (let i = 0; k < 40; i++) {
    console.log("Lager platform");
    k++;
    platformer[i] = new Platform();
    for (let j = 0; j < platformer.length - 1; j++) {
      if (
        platformer[i].x + platformer[i].w > platformer[j].x &&
        platformer[i].x < platformer[j].x + platformer[j].w &&
        platformer[i].y + platformer[i].h * 4 > platformer[j].y &&
        platformer[i].y - platformer[i].h * 2 <
          platformer[j].y + platformer[j].h
      ) {
        platformer.pop();
        i--;
      }
    }
  }
  let platformSpiller =
    platformer[Math.floor(Math.random() * platformer.length)];
  platformSpiller.harSpiller = true;
  spiller = new Spiller(platformSpiller);
  goal = new Goal();
  for (let i = 0; i <= hinderTall; i++) {
    let platform = platformer[Math.floor(Math.random() * platformer.length)];
    if (platform.harPoeng || platform.harSpiller) {
      i--;
      continue;
    }
    hindere[i] = new Hinder(platform);
  }
}
function draw() {
  clear();
  if (mode == 0) {
    if (frameCount % 180 < 110) {
      drawingContext.shadowOffsetX = -2.5;
      drawingContext.shadowOffsetY = 2.5;
      drawingContext.shadowBlur = 3;
      drawingContext.shadowColor = "red";
      textSize(windowWidth / 20);
      background(0);
      fill(`Maroon`);
      textFont("VT323");
      textAlign(CENTER);
      text(`CLICK ENTER TO START`, windowWidth / 3.8, windowHeight / 3);
    } else {
      background(0);
    }
  }
  if (mode == 1) {
    background(0);
    textSize(windowWidth / 30);
    fill(`green`);
    textFont("VT323");
    textAlign(CENTER);
    drawingContext.shadowOffsetX = -2.5;
    drawingContext.shadowOffsetY = 2.5;
    drawingContext.shadowBlur = 3;
    drawingContext.shadowColor = `lightgreen`;
    text(`Score: ${score}`, windowWidth / 3.8, windowHeight / 25);
    for (let i = platformer.length - 1; i >= 0; i -= 1) {
      platformer[i].tegn();
    }
    for (let i = hindere.length - 1; i >= 0; i -= 1) {
      hindere[i].tegn();
    }
    goal.tegn();
    spiller.tegn();
    spiller.flytt();
  }
  if (mode == 2) {
    background(0);
    drawingContext.shadowOffsetX = -2.5;
    drawingContext.shadowOffsetY = 2.5;
    drawingContext.shadowBlur = 3;
    drawingContext.shadowColor = "red";
    textSize(windowWidth / 20);
    background(0);
    fill(`Maroon`);
    textFont("VT323");
    textAlign(CENTER);
    text(`DU DØDE`, windowWidth / 3.8, windowHeight / 3 - windowHeight / 10);
    text(
      `TRYKK ENTER FOR RESTART`,
      windowWidth / 3.8,
      windowHeight / 3 + windowHeight / 10
    );
    fill(`green`);
    drawingContext.shadowColor = `lightGreen`;
    if (frameCount % 160 < 90) {
      text(`SCORE: ${score}`, windowWidth / 3.8, windowHeight / 3);
    } else {
    }
  }
  if (keyIsDown(37)) {
    spiller.x -= 4;
    spiller.stille = false;
    spiller.motVenstre = true;
  }
  if (keyIsDown(39)) {
    spiller.x += 4;
    spiller.stille = false;
    spiller.motHoyre = true;
  }
}
function keyPressed() {
  if (keyCode === ENTER) {
    if (mode == 2 || mode == 0) {
      mode = 1;
      score = 0;
      hinderTall = 5;

      resetSketch();
    }
  } else if (keyCode === 38) {
    spiller.hopp();
    spiller.armer = -15;
    setTimeout(function () {
      spiller.armer = 0;
    }, 700);
  } else if (keyCode === 40) {
    spiller.ned();
    spiller.armer = -15;
    setTimeout(function () {
      spiller.armer = 0;
    }, 400);
  }
}
function keyReleased() {
  if (keyCode === 37) {
    spiller.stille = true;
    spiller.motVenstre = false;
  }
  if (keyCode === 39) {
    spiller.stille = true;
    spiller.motHoyre = false;
  }
}

function windowResized() {
  resizeCanvas(windowWidth / 1.9, windowHeight / 1.5);
}
let button = document.getElementById("innstillinger");
let rules = document.getElementById("controls");
let highscore = document.getElementById("leaderboard");
button.onclick = function (event) {
  document.getElementById("meny").classList.toggle("show");
};
window.onclick = function (event) {
  if (!event.target.matches(".material-icons")) {
    let nedmeny = document.getElementsByClassName("menyinnhold");
    let i;
    for (i = 0; i < nedmeny.length; i++) {
      let openMeny = nedmeny[i];
      if (openMeny.classList.contains("show")) {
        openMeny.classList.remove("show");
      }
    }
  }
};
function sjekkData() {
  let checkBox = document.getElementById("hideRules");
  if (checkBox.checked == false) {
    rules.style.visibility = "hidden";
    highscore.style.visibility = "hidden";
    document.getElementById("title").style.visibility = "hidden";
  } else {
    rules.style.visibility = "visible";
    highscore.style.visibility = "visible";
    document.getElementById("title").style.visibility = "visible";
  }
}
