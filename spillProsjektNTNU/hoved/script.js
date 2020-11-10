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
    background(0);
    textFont("VT323");
    textAlign(CENTER);
    fill(`Maroon`);
    if (spiller.y > height + height) {
      textSize(windowWidth / 20);
      text(
        `DU FALT TIL DØDEN!`,
        windowWidth / 3.8,
        windowHeight / 3 - windowHeight / 10
      );
    } else {
      textSize(windowWidth / 22);
      text(`DU DØDE! (UNNGÅ GLASS-SKÅR)`, windowWidth / 3.8, windowHeight / 3 - windowHeight / 10);
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
    } else {}
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
  } else if (keyCode === 40 || keyCode === 83) {
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
$("#dinHighscore").innerHTML = localStorage.getItem(
  "highscore",
  score
);
//Denne funksjonen oppdaterer highscore informasjonen på siden hvis score er større en summen i local storage.
//Hvis score < nåværende highscore, vil den nåværende highscore fortsatt vises
function UpdateScore() {
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

function windowResized() {
  resizeCanvas(windowWidth / 1.9, windowHeight / 1.5);
}

let button = $("#innstillinger");
let kontroller = $("#controls");
let highscoreInfo = $("#leaderboard");
let infoKnapper = $("#knapp-container");
let lokalLager = localStorage.getItem("highscore");
let status = $("#status");
let nedmeny = document.getElementsByClassName("menyinnhold");

//Funksjon som åpner en meny, og lukker den hvis man trykker hvor som helst i vinduet

button.onclick = function(meny) {
  $("#meny").classList.toggle("vis");
};
window.onclick = function(meny) {
  if (!meny.target.matches(".material-icons")) {
  //Innhold i meny
    let innhold = nedmeny
    let index;

    for (index = 0; index < innhold.length; index++) {
  //Viser meny
      let openMeny = innhold[indx];
      if (openMeny.classList.contains("vis")) {
        openMeny.classList.remove("vis");
      }
    }
  }
};
//Funksjon som sjekker om checkbox er checked. Hvis den er checked så vises elementet highscoreinfo og rules,
//hvis ikke så gjemmes disse elementene

function sjekkData() {
  let checkBoxKontroller = $("#hideKontroller");
  if (checkBoxKontroller.checked == false) {
    kontroller.style.visibility = "hidden";
    highscoreInfo.style.visibility = "hidden";

    infoKnapper.style.visibility = "hidden";
  } else {
    kontroller.style.visibility = "visible";
    highscoreInfo.style.visibility = "visible";

    infoKnapper.style.visibility = "visible";
  }
}
//Hvis highscore er større en 10 poeng, så låses fargevalg opp. Derfor vises "Velg farge:"
if (lokalLager >= 10) {
  status.innerHTML = "<br>" + "Velg farge:";
} else {
  status.innerHTML =
    "Få en highscore på 10+ for å låse opp fargevalg!";
}

//Ulike farge-knapper hentes fra index.html


let greenSelect = $("#green"); //Grønn knapp 
let redSelect = $("#red"); // Rød Knapp
let blueSelect = $("#blue"); //Blå Knapp 
let yellowSelect = $("#yellow"); //Gul Knapp 
let rainbowSelect = $("#rainbow"); //Regnbuefarge Knapp

let colorselected = "rgb(0,255,0)"; //Grønn er default farge
let regnbueModus = false; //Regnbuemodus er slått av

//Denne funksjonen fjerner alle rammer fra select knappene
function setBorderNone() {
  greenSelect.style.borderStyle = "none";
  redSelect.style.borderStyle = "none";
  blueSelect.style.borderStyle = "none";
  yellowSelect.style.borderStyle = "none";
  rainbowSelect.style.borderStyle = "none";
}
//Etter klikk sjekker denne funksjonen om highscore er over 10
//Hvis highscore >=10, og man trykker på grønn knapp, vil spill-karakterens farge settes til grønn, 
//knappen får også en ramme rundt seg, og de forrige valgte fargenr mister ramme.
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
//For rød farge
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
//For blå farge
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
//For gul farge
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
//
//Denne funksjonen setter regnbueModus til true, som trigger if setning i spiller.js
//Den gir også regnbueknappen ramme, og fjerner andre rammer. Men aller først sjekker den om
//highscoren til brukeren er >=15
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
