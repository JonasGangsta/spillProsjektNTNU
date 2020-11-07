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
    UpdateScore();

    drawingContext.shadowOffsetX = -2.5;
    drawingContext.shadowOffsetY = 2.5;
    drawingContext.shadowBlur = 3;
    drawingContext.shadowColor = "red";
    textSize(windowWidth / 20);
    background(0);

    textFont("VT323");
    textAlign(CENTER);
    fill(`Maroon`);
    if (spiller.y > height + height) {
      text(
        `DU FALT TIL DØDEN!`,
        windowWidth / 3.8,
        windowHeight / 3 - windowHeight / 10
      );
    } else {
      text(`DU DØDE!`, windowWidth / 3.8, windowHeight / 3 - windowHeight / 10);
    }
    fill(`Maroon`);
    textSize(windowWidth / 22);
    text(
      `TRYKK ENTER FOR Å RESTARTE`,
      windowWidth / 3.8,
      windowHeight / 3 + windowHeight / 10
    );

    fill(`green`);

    textSize(windowWidth / 20);
    drawingContext.shadowColor = `lightGreen`;
    if (frameCount % 160 < 90) {
      text(`SCORE: ${score}`, windowWidth / 3.8, windowHeight / 3);
    } else {
    }
  }
  if (keyIsDown(37) || keyIsDown(65)) {
    spiller.x -= 4;
    spiller.stille = false;
    spiller.motVenstre = true;
  }
  if (keyIsDown(39) || keyIsDown(68)) {
    spiller.x += 4;
    spiller.stille = false;
    spiller.motHoyre = true;
  }
}
function keyPressed() {
  if (keyCode === ENTER) {
    if (mode == 2 || mode == 3 || mode == 0) {
      mode = 1;
      score = 0;
      hinderTall = 5;

      resetSketch();
    }
  } else if (keyCode === 38 || keyCode === 87) {
    spiller.hopp();
    spiller.armer = -15;
    setTimeout(function () {
      spiller.armer = 0;
    }, 700);
  } else if (keyCode === 40 || keyCode === 83) {
    spiller.ned();
    spiller.armer = -15;
    setTimeout(function () {
      spiller.armer = 0;
    }, 400);
  }
}
function keyReleased() {
  if (keyCode === 37 || keyCode === 65) {
    spiller.stille = true;
    spiller.motVenstre = false;
  }
  if (keyCode === 39 || keyCode === 68) {
    spiller.stille = true;
    spiller.motHoyre = false;
  }
}
document.getElementById("dinHighscore").innerHTML = localStorage.getItem(
  "highscore",
  score
);

function UpdateScore() {
  if (score > localStorage.getItem("highscore")) {
    localStorage.setItem("highscore", score);
    document.getElementById("dinHighscore").innerHTML = score;
    if (score >= 15) {
      document.getElementById("status").innerHTML = "Velg farge:";
    }
  } else {
    document.getElementById("dinHighscore").innerHTML = localStorage.getItem(
      "highscore",
      score
    );
  }
}

function windowResized() {
  resizeCanvas(windowWidth / 1.9, windowHeight / 1.5);
}
let button = document.getElementById("innstillinger");
let rules = document.getElementById("controls");
let highscoreInfo = document.getElementById("leaderboard");
let infoKnapper = document.getElementById("knapp-container");

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
    highscoreInfo.style.visibility = "hidden";

    infoKnapper.style.visibility = "hidden";
  } else {
    rules.style.visibility = "visible";
    highscoreInfo.style.visibility = "visible";

    infoKnapper.style.visibility = "visible";
  }
}

if (localStorage.getItem("highscore") >= 15) {
  document.getElementById("status").innerHTML = "Velg farge:";
} else {
  document.getElementById("status").innerHTML =
    "Få en highscore på 15+ for å låse opp fargevalg!";
}
//Custom colors

let colorselected = "rgb(0,255,0)";
let regnbueModus = false;
let greenSelect = document.getElementById("green");
let redSelect = document.getElementById("red");
let blueSelect = document.getElementById("blue");
let yellowSelect = document.getElementById("yellow");
let rainbowSelect = document.getElementById("rainbow");

function setBorderNone() {
  greenSelect.style.borderStyle = "none";
  redSelect.style.borderStyle = "none";
  blueSelect.style.borderStyle = "none";
  yellowSelect.style.borderStyle = "none";
  rainbowSelect.style.borderStyle = "none";
}
greenSelect.onclick = () => {
  if (localStorage.getItem("highscore") >= 15) {
    colorselected = `rgb(0,255,0)`;
    spiller.farge = "rgb(0,255,0)";
    regnbueModus = false;
    setBorderNone();
    greenSelect.style.border = "2px solid white";
  } else {
    colorselected = `rgb(0,255,0)`;
    spiller.farge = "rgb(0,255,0)";
    duTrenger15();
  }
};
redSelect.onclick = () => {
  if (localStorage.getItem("highscore") >= 15) {
    colorselected = `red`;
    spiller.farge = "red";
    regnbueModus = false;
    setBorderNone();
    redSelect.style.border = "2px solid white";
  } else {
    colorselected = `rgb(0,255,0)`;
    spiller.farge = "rgb(0,255,0)";
    duTrenger15();
  }
};

blueSelect.onclick = () => {
  if (localStorage.getItem("highscore") >= 15) {
    colorselected = `blue`;
    spiller.farge = "blue";
    regnbueModus = false;
    setBorderNone();
    blueSelect.style.border = "2px solid white";
  } else {
    colorselected = `rgb(0,255,0)`;
    spiller.farge = "rgb(0,255,0)";
    duTrenger15();
  }
};
yellowSelect.onclick = () => {
  if (localStorage.getItem("highscore") >= 15) {
    colorselected = `yellow`;
    spiller.farge = "yellow";
    regnbueModus = false;
    setBorderNone();
    yellowSelect.style.border = "2px solid white";
  } else {
    colorselected = `rgb(0,255,0)`;
    spiller.farge = "rgb(0,255,0)";
    duTrenger15();
  }
};

rainbowSelect.onclick = () => {
  if (localStorage.getItem("highscore") >= 20) {
    regnbueModus = true;
    setBorderNone();
    rainbowSelect.style.border = "2px solid white";
  } else {
    let colorselected = "rgb(0,255,0)";
    document.getElementById("status").innerHTML =
      "Du trenger 20+ for regnbuefarge :)";
    setTimeout(function () {
      if (localStorage.getItem("highscore") >= 15) {
        document.getElementById("status").innerHTML = "Velg farge:";
      } else document.getElementById("status").innerHTML = "Få en highscore på 15+ for å låse opp fargevalg!";
    }, 2000);
  }
};

function duTrenger15() {
  document.getElementById("status").innerHTML =
    "Du trenger 15+ i highscore for å bytte farge";
  setTimeout(function () {
    if (localStorage.getItem("highscore") >= 15) {
      document.getElementById("status").innerHTML = "Velg farge:";
    } else document.getElementById("status").innerHTML = "Få en highscore på 15+ for å låse opp fargevalg!";
  }, 2000);
}
