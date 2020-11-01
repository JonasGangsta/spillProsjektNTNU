const $ = document.querySelector.bind(document);
const game = $("#game");
const btnContainer = $(".btnContainer");
let mode; //Bestemmer om spillet har startet
let goal;
let spiller;
let score = 0;
let platformer = [];
let hindere = [];
let hinderTall = 5;

function setup() {
  mode = 0; // Starter mode på 0, altså er spillet ikke startet enda
  var canvas = createCanvas(windowWidth / 1.9, windowHeight / 1.5)
  canvas.parent(`game`);
  resetSketch();
}

function resetSketch() {
  platformer = [];
  hindere = [];
  let k = 0;
  for (let i = 0; k < 40; i++) {
    console.log("Lager platform")
    k++
    platformer[i] = new Platform
    for (let j = 0; j < platformer.length - 1; j++) {
      if (platformer[i].x + platformer[i].w > platformer[j].x &&
        platformer[i].x < platformer[j].x + platformer[j].w &&
        platformer[i].y + platformer[i].h*4 > platformer[j].y &&
        platformer[i].y-platformer[i].h*2 < platformer[j].y + platformer[j].h) {
        platformer.pop()
        i--
      }
    }
  }
  goal = new Goal
  spiller = new Spiller
  for (let i = 0; i <= hinderTall; i++) {
    hindere[i] = new Hinder
  }
}

function draw() {
  clear()
  if (mode == 0) {
    if (frameCount % 180 < 110) {
      drawingContext.shadowOffsetX = -2.5;
      drawingContext.shadowOffsetY = 2.5;
      drawingContext.shadowBlur = 3;
      drawingContext.shadowColor = 'red';
      textSize(windowWidth / 20);
      background(0)
      fill(`Maroon`)
      textFont("VT323")
      textAlign(CENTER);
      text(`CLICK ENTER TO START`, windowWidth / 3.8, windowHeight / 3);
    } else {
      background(0)
    }
  }
  if (mode == 1) {
    background(0);
    textSize(windowWidth / 30);
    fill(`green`);
    textFont("VT323")
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
    drawingContext.shadowColor = 'red';
    textSize(windowWidth / 20);
    background(0)
    fill(`Maroon`)
    textFont("VT323")
    textAlign(CENTER);
    text(`YOU DIED`, windowWidth / 3.8, windowHeight / 3 - windowHeight / 10);
    text(`CLICK ENTER TO RESTART`, windowWidth / 3.8, windowHeight / 3 + windowHeight / 10);
    fill(`green`);
    drawingContext.shadowColor = `lightGreen`;
    if (frameCount % 160 < 90) {
      text(`SCORE: ${score}`, windowWidth / 3.8, windowHeight / 3);
    } else {

    }
  }
}

function keyPressed() {
  if (keyCode === ENTER) { //Hvis ENTER trykkes blir mode = 1 og spillet startes
    if (mode == 2 || mode == 0) {
      mode = 1;
      score = 0;
      resetSketch();
    }
  } else if (keyCode === 37) {
    spiller.retning = -1;
  } else if (keyCode === 39) {
    spiller.retning = 1;
  } else if (keyCode === 32) {
    hopp();
  }
}

function keyReleased() {
  spiller.retning = 0;
}

function windowResized() {
  resizeCanvas(windowWidth / 1.9, windowHeight / 1.5);
}

/* When the user clicks on the button,
toggle between hiding and showing the dropdown content */
let button = document.getElementById("innstillinger");
let rules = document.getElementById("controls");
let highscore = document.getElementById("leaderboard");
button.onclick = function(event) {
  document.getElementById("myDropdown").classList.toggle("show");
};

//Innstillinger ikon vis og gjem regler og highscore
window.onclick = function(event) {
  if (!event.target.matches(".material-icons")) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains("show")) {
        openDropdown.classList.remove("show");
      }
    }
  }
  console.log(dropdowns);
};

function sjekkData() {
  let checkBox = document.getElementById("hideRules");
  if (checkBox.checked == false) {
    rules.style.display = "none";
    highscore.style.display = "none";
  } else {
    rules.style.display = "block";
    highscore.style.display = "block";
  }
}
