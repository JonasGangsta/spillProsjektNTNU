// Deklarerer variabler
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
let fargeblindmode = 0;

//Setup funksjonen til p5js kjører og lager et canvas
function setup() {
  mode = 0; //Mode = 0 sier at spillet ikke skal startes
  var canvas = createCanvas(windowWidth / 1.9, windowHeight / 1.5);
  canvas.parent(`game`);
  resetSketch(); //Kjører ''resetsketch'' som her starter spillet for første gang
}

//Resetsketch gjør at spillet både vil kunne starte den første banen, men også lage nye baner når man enten dør eller treffer en kebab.
function resetSketch() {
  platformer = []; //Platformer of hindere må resettes slik at funksjonen kan lage nye
  hindere = [];
  let k = 0; //Variablen k må legges til fordi forløkken skal gå gjennom 40 ganger.
  for (let i = 0; k < 40; i++) {  //Loopen itererer til k >= 40
    console.log("Lager platform");
    k++; //Det plusses på en k hver gang løkken kjøres
    platformer[i] = new Platform(); //En platform lages
    for (let j = 0; j < platformer.length - 1; j++) {  //Looper gjennom alle platformenme som har blitt laget minus den som nettop ble laget (lenght -1)
      if (  //Tester om den genererte platformen kolliderer med en av de andre platformene
        platformer[i].x + platformer[i].w > platformer[j].x &&
        platformer[i].x < platformer[j].x + platformer[j].w &&
        platformer[i].y + platformer[i].h * 4 > platformer[j].y &&
        platformer[i].y - platformer[i].h * 2 <
        platformer[j].y + platformer[j].h
      ) { //Hvis de kolliderer, så blir platformen slettet, og det blir trukket fra en i
        platformer.pop();
        i--;
      }
    }
  }
  let platformSpiller = platformer[Math.floor(Math.random() * platformer.length)]; //Tar en tilfeldig platform
  platformSpiller.harSpiller = true; //Platformen som har spilleren endrer verdien harSpiller til true (dette gjøres fordi glasskår og kebaber ikke skal kunne genereres her)
  spiller = new Spiller(platformSpiller); //Posisjonerer spilleren på denne platformen
  goal = new Goal(); //Nytt goal
  for (let i = 0; i <= hinderTall; i++) { //Genererer hinderTall antall glassskår
    let platform = platformer[Math.floor(Math.random() * platformer.length)]; //Tar en tilfeldig platform
    if (platform.harPoeng || platform.harSpiller) { //Hvis denne platformen har et poeng eller en spiller så fortsetter løkken.
      i--;
      continue;
    }
    hindere[i] = new Hinder(platform); //Hvis testen over ble godkjent, så lager den platformen
  }
}

//Draw funksjonen til p5js kjøres, som tegner spillet 60 ganger i sekundet
function draw() {
  clear();
  if (mode == 0) { //Hvis mode = 0 skal startskjermen være på
    if (frameCount % 180 < 110) { //Gjør at teksten blinker, 3s på, litt under 2s av
      drawingContext.shadowOffsetX = -2.5; //Lager skygge på eventuell tekst
      drawingContext.shadowOffsetY = 2.5;
      drawingContext.shadowBlur = 3;
      drawingContext.shadowColor = "red";
      textSize(windowWidth / 20); //Størrelsen på teksten
      background(0); //Bakgrunnsfargen er svart
      fill(`Maroon`); //Stil på teksten
      textFont("VT323");
      textAlign(CENTER);
      text(`CLICK ENTER TO START`, windowWidth / 3.8, windowHeight / 3); //Lager teksten
    } else { //Hvis det ikke vises tekst skal det bare være svart bakgrunn alene
      background(0);
    }
  }
  if (mode == 1) { //Hvis mode = 1 skal spillet kjøres
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
    for (let i = platformer.length - 1; i >= 0; i -= 1) { //For alle platformene som er generert
      platformer[i].tegn(); //Bruker funksjonen definert i hinder.js og tegner platformene
    }
    for (let i = hindere.length - 1; i >= 0; i -= 1) { //Tegner alle hinderene
      hindere[i].tegn();
    }
    goal.tegn();  //Tegner kebab (funksjonen er definert i goal.js)
    spiller.tegn(); //Tegner spilleren
    spiller.flytt(); //Lar spilleren flytte seg
  }
  if (mode == 2) { //Hvis mode = 2 skal dødsskjermen vises
    updateScore(); //Kjører funksjonen som oppdaterer localstorage
    drawingContext.shadowOffsetX = -2.5;
    drawingContext.shadowOffsetY = 2.5;
    drawingContext.shadowBlur = 3;
    drawingContext.shadowColor = "red";
    background(0);
    textFont("VT323");
    textAlign(CENTER);
    fill(`Maroon`);
    if (spiller.y > height + height) { //Kjører hvis spilleren har falt utenfor spillet
      textSize(windowWidth / 20);
      text(
        `DU FALT TIL DØDEN!`,
        windowWidth / 3.8,
        windowHeight / 3 - windowHeight / 10
      );
    } else { //Kjører hvis spilleren døde åp en annen måte (glasskår)
      textSize(windowWidth / 22);
      text(`DU DØDE! (UNNGÅ GLASS-SKÅR)`, windowWidth / 3.8, windowHeight / 3 - windowHeight / 10);
    }
    fill(`Maroon`);
    textSize(windowWidth / 22);
    text( //Tekst som viser spilleren hvordan de kan restarte spillet
      `TRYKK ENTER FOR Å RESTARTE`,
      windowWidth / 3.8,
      windowHeight / 3 + windowHeight / 10
    );

    fill(`green`);

    textSize(windowWidth / 20);
    drawingContext.shadowColor = `lightGreen`;
    if (frameCount % 160 < 90) { //Scoren skal blinke
      text(`SCORE: ${score}`, windowWidth / 3.8, windowHeight / 3);
    } else {}
  }
  if (keyIsDown(37) || keyIsDown(65)) { //Kjøres hvis venstre piltast eller A trykkes/holdes inne
    spiller.x -= 4; //Flytter spilleren mot venstre
    spiller.stille = false;
    spiller.motVenstre = true;
  }
  if (keyIsDown(39) || keyIsDown(68)) { //Kjøres hvis høyre piltast eller D trykkes/holdes inne
    spiller.x += 4; //Flytter spilleren mot høyre
    spiller.stille = false;
    spiller.motHoyre = true;
  }
}

function keyPressed() { //Hvis en piltast trykkes
  if (keyCode === ENTER) { //På enter
    if (mode == 2 || mode == 0) { //Hvis modus er 2 (dødsskjerm) eller 0 (startsskjerm)
      mode = 1; //Sett mode til 0 (starter spillet)
      score = 0; //Nullstiller score
      hinderTall = 5; //Setter hinderTall til vanlig verdi

      resetSketch(); //Resetter sketchen
    }
  } else if (keyCode === 38 || keyCode === 87) { //Hvis man trykker piltast opp eller W hopper spilleren
    spiller.hopp(); //Funksjonen går under classet spiller i spiller.js
  } else if (keyCode === 40 || keyCode === 83) {//Hvis man trykker piltast ned eller S så hopper spilleren nedover
    spiller.ned();
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

function windowResized() { //P5js funksjon som kjøres når størrelsen på vinduet endres
  resizeCanvas(windowWidth / 1.9, windowHeight / 1.5); //Endrer størrelsen på canvaset
}

$("#dinHighscore").innerHTML = localStorage.getItem(
  "highscore",
  score
);

function updateScore() {
  if (score > lokalLager) {
    localStorage.setItem("highscore", score);
    $("#dinHighscore").innerHTML = score;
    if (score >= 10) {
      $("#status").innerHTML = "<br>" + "Velg farge:";
    }
  } else {
    $("#dinHighscore").innerHTML = localStorage.getItem(
      "highscore",
      score
    );
  }
}

let button = $("#innstillinger");
let rules = $("#controls");
let highscoreInfo = $("#leaderboard");
let infoKnapper = $("#knapp-container");
let lokalLager = localStorage.getItem("highscore");
let status = $("#status");

button.onclick = function(event) {
  $("#meny").classList.toggle("show");
};
window.onclick = function(event) {
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
  let checkBoxRules = $("#hideRules");
  if (checkBoxRules.checked == false) {
    rules.style.visibility = "hidden";
    highscoreInfo.style.visibility = "hidden";

    infoKnapper.style.visibility = "hidden";
  } else {
    rules.style.visibility = "visible";
    highscoreInfo.style.visibility = "visible";

    infoKnapper.style.visibility = "visible";
  }
}

if (lokalLager >= 10) {
  status.innerHTML = "<br>" + "Velg farge:";
} else {
  status.innerHTML =
    "Få en highscore på 10+ for å låse opp fargevalg!";
}
//Custom colors

let colorselected = "rgb(0,255,0)";
let regnbueModus = false;
let greenSelect = $("#green");
let redSelect = $("#red");
let blueSelect = $("#blue");
let yellowSelect = $("#yellow");
let rainbowSelect = $("#rainbow");

function setBorderNone() {
  greenSelect.style.borderStyle = "none";
  redSelect.style.borderStyle = "none";
  blueSelect.style.borderStyle = "none";
  yellowSelect.style.borderStyle = "none";
  rainbowSelect.style.borderStyle = "none";
}
greenSelect.onclick = () => {
  if (lokalLager >= 10) {
    colorselected = `rgb(0,255,0)`;
    spiller.farge = "rgb(0,255,0)";
    regnbueModus = false;
    setBorderNone();
    greenSelect.style.border = "2px solid white";
  } else {
    colorselected = `rgb(0,255,0)`;
    spiller.farge = "rgb(0,255,0)";
    duTrenger10();
  }
};
redSelect.onclick = () => {
  if (lokalLager >= 10) {
    colorselected = `red`;
    spiller.farge = "red";
    regnbueModus = false;
    setBorderNone();
    redSelect.style.border = "2px solid white";
  } else {
    colorselected = `rgb(0,255,0)`;
    spiller.farge = "rgb(0,255,0)";
    duTrenger10();
  }
};

blueSelect.onclick = () => {
  if (lokalLager >= 10) {
    colorselected = `blue`;
    spiller.farge = "blue";
    regnbueModus = false;
    setBorderNone();
    blueSelect.style.border = "2px solid white";
  } else {
    colorselected = `rgb(0,255,0)`;
    spiller.farge = "rgb(0,255,0)";
    duTrenger10();
  }
};
yellowSelect.onclick = () => {
  if (lokalLager >= 10) {
    colorselected = `yellow`;
    spiller.farge = "yellow";
    regnbueModus = false;
    setBorderNone();
    yellowSelect.style.border = "2px solid white";
  } else {
    colorselected = `rgb(0,255,0)`;
    spiller.farge = "rgb(0,255,0)";
    duTrenger10();
  }
};

rainbowSelect.onclick = () => {
  if (lokalLager >= 15) {
    regnbueModus = true;
    setBorderNone();
    rainbowSelect.style.border = "2px solid white";
  } else {
    let colorselected = "rgb(0,255,0)";
    status.innerHTML =
      "Du trenger 15+ for regnbuefarge :)";
    setTimeout(function() {
      if (lokalLager >= 10) {
        status.innerHTML = "Velg farge:";
      } else status.innerHTML = "Få en highscore på 10+ for å låse opp fargevalg!";
    }, 2000);
  }
};

function duTrenger10() {
  status.innerHTML =
    "Du trenger 10+ i highscore for å bytte farge";
  setTimeout(function() {
    if (lokalLager >= 10) {
      status.innerHTML = "Velg farge:";
    } else status.innerHTML = "Få en highscore på 10+ for å låse opp fargevalg!";
  }, 2000);
}
