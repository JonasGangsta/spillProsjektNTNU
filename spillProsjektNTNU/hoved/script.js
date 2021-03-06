// Deklarerer variabler
const $ = document.querySelector.bind(document); //Gjør at man kan skrive $ istedenfor document.querySelector
const game = $("#game");
const btnContainer = $(".btnContainer");
let mode;
let goal;
let spiller;
let score = 0;
let platformer = [];
let hindere = [];
let hinderTall = 5;
let rohitImg;
let oskarImg

function preload(){  //Laster inn bildene vi skal bruke før siden lastes inn
  rohitImg = loadImage(`https://i.imgur.com/H70l18L.jpg`);
  oskarImg = loadImage(`https://i.imgur.com/IWPO3jQ.jpg`);
  bendikImg = loadImage(`https://i.imgur.com/AUSEom3.jpg`);
  jonasImg = loadImage(`https://i.imgur.com/8n1DUwS.jpg`);

}
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
      text(`TRYKK ENTER FOR Å STARTE`, windowWidth / 3.8, windowHeight / 3); //Lager teksten
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
    } else { //Kjører hvis spilleren døde på en annen måte (glasskår)
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
  if(mode == 3){ //Hvis mode er 3 skal om oss siden vises
    drawingContext.shadowOffsetX = -1;
    drawingContext.shadowOffsetY = 1;
    drawingContext.shadowBlur = 1;
    drawingContext.shadowColor = `black`;
    image(bendikImg, width/30, height/50, width/5, height/2); //p5js funksjon image() for å vise bilder
    image(rohitImg, width/3.6, height/50, width/5, height/2);
    image(oskarImg, width/1.9, height/50, width/5, height/2);
    image(jonasImg, width/1.3, height/50, width/5.5, height/2);
    textAlign(CENTER);
    textSize(windowWidth/35);
    fill(`white`);
    drawingContext.shadowOffsetX = -1;
    drawingContext.shadowOffsetY = 1;
    drawingContext.shadowBlur = 1;
    drawingContext.shadowColor = `black`;
    text(`Bendik`, width/7.5, height/1.6);
    textSize(windowWidth/55);
    fill(`yellow`);
    text(`Prosjektleder`, width/7.5, height/1.4);
    fill(`white`);
    textSize(windowWidth/70);
    text(`bendikoj@stud.ntnu.no`, width/7.5, height/1.25);

    textSize(windowWidth/35);
    text(`Rohit`, width/2.65, height/1.6);
    textSize(windowWidth/55);
    fill(`rgb(50,50,255)`);
    text(`Rapportsjef`, width/2.65, height/1.4);
    fill(`white`);
    textSize(windowWidth/70);
    text(`rohitb@stud.ntnu.no`, width/2.65, height/1.25);

    textSize(windowWidth/35);
    text(`Oskar`, width/1.58, height/1.6);
    textSize(windowWidth/55);
    fill(`rgb(255,100,100)`);
    text(`Programmerer`, width/1.58, height/1.4);
    fill(`white`);
    textSize(windowWidth/70);
    text(`oskarlh@stud.ntnu.no`, width/1.58, height/1.25);

    textSize(windowWidth/35);
    text(`Jonas`, width/1.16, height/1.6);
    textSize(windowWidth/55);
    fill(`rgb(255,100,100)`);
    text(`Programmerer`, width/1.16, height/1.4);
    fill(`white`);
    textSize(windowWidth/70);
    text(`jonasgan@stud.ntnu.no`, width/1.16, height/1.25);

    fill(`rgb(0,255,0)`);
    textSize(windowWidth/30);
    text(`Gruppe 6`, width/2, height/1.075);
  }
  if(mode == 4){ //Hvis mode er 4 skal prosjekt siden vises
    textAlign(LEFT);
    textSize(windowWidth/70);
    fill(`white`);
    drawingContext.shadowOffsetX = -1;
    drawingContext.shadowOffsetY = 1;
    drawingContext.shadowBlur = 1;
    drawingContext.shadowColor = "black";
    text(`I faget Webteknologi og teamarbeid på linjen Digital forretningsutvikling ved NTNU`, 30,60);
    text(`Trondheim, har vi fått en prosjektoppgave hvor vi skal utvikle et spill. `, 30,90);

    text(`Som en gruppe måtte vi først finne ut hva spillet skulle handle om. Diskusjonen `, 30,140);
    text(`angående handlingen forekom midt under fadderuken, og historier derfra ble delt `, 30,170);
    text(`mellom oss. Blant historiene var det spesielt en ting som gjentok seg, nemlig at `, 30,200);
    text(`kveldene endte med nattmat. Vi bestemte oss for at spillet skulle handle om nettopp `, 30,230);
    text(`dette, og at det skulle rettes mot festglade mennesker som er glade i nattmat.`, 30,260);

    text(`Gruppen bestemte seg deretter for å ha et plattformbasert arkadespill etter å ha studert`, 30,310);
    text(`blant annet «Super Mario» og «Space invaders». Vi valgte et plattformbasert spill`, 30,340);
    text(`ettersom det passet gruppens erfaring innen koding. Etter at handlingen og hvilket type`, 30,370);
    text(`spill vi skulle ha ble fastsatt, begynte prosessen for å utvikle «Nattmat»! `, 30,400);
    textSize(windowWidth/40);
    fill(`rgb(0,255,0)`);
    text(`Sjekk ut spillet ved å trykke på «Spill»!   `, 30,460);
    textSize(windowWidth/70);





  }
  if (keyIsDown(37) || keyIsDown(65)) {
    spiller.x -= 4;
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

document.getElementById("dinHighscore").innerHTML = localStorage.getItem(
  "highscore",
  score
);

//Denne funksjonen oppdaterer highscore informasjonen på siden hvis score er større en summen i local storage.
//Hvis score < nåværende highscore, vil den nåværende highscore fortsatt vises
function updateScore() {
  if (score > localStorage.getItem("highscore")) {
    localStorage.setItem("highscore", score);
    document.getElementById("dinHighscore").innerHTML = score;
    if (score >= 10) {
      document.getElementById("status").innerHTML = "Velg farge:";
    }
  } else {
    document.getElementById("dinHighscore").innerHTML = localStorage.getItem(
      "highscore",
      score
    );
  }
}

document.getElementById("dinHighscore").innerHTML = localStorage.getItem(
  "highscore",
  score
);



function windowResized() {
  resizeCanvas(windowWidth / 1.9, windowHeight / 1.5);
}

//Setter fargen til spillknappen til rød fordi den er det første man kommer inn på
document.getElementById("spillKnapp").style.color="red";

//Setter om oss/prosjekt/spill knappens farge til rød når den blir trykket, og de andre til en annen rødfarge. Tilbakemelding
function spillKlikk(){
  mode = 1;
  resetKlikkFarge();
  document.getElementById("spillKnapp").style.color="red";
}

function omOssKlikk(){
  mode = 3;
  resetKlikkFarge();
  document.getElementById("omOssKnapp").style.color="red";
}

function prosjektKlikk(){
  mode = 4;
  resetKlikkFarge();
  document.getElementById("prosjektKnapp").style.color="red";

}
//Setter alle fargene til "rgb(190, 5, 5)"
function resetKlikkFarge(){
  document.getElementById("omOssKnapp").style.color="rgb(190, 5, 5)";
  document.getElementById("spillKnapp").style.color="rgb(190, 5, 5)";
  document.getElementById("prosjektKnapp").style.color="rgb(190, 5, 5)";

}

let button = document.getElementById("innstillinger");
let kontroller = $("#controls");
let rules = document.getElementById("controls");
let highscoreInfo = document.getElementById("leaderboard");
let infoKnapper = document.getElementById("knapp-container");
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
      let openMeny = innhold[index];
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
if (localStorage.getItem("highscore") >= 10) {
  document.getElementById("status").innerHTML = "<br>"+"Velg farge:";
} else {
  document.getElementById("status").innerHTML =
    "Få en highscore på 10+ for å låse opp fargevalg!";
}
//forskjellige fargeknapper

let colorselected = "rgb(0,255,0)";
let regnbueModus = false;
let greenSelect = document.getElementById("green");
let redSelect = document.getElementById("red");
let blueSelect = document.getElementById("blue");
let yellowSelect = document.getElementById("yellow");
let rainbowSelect = document.getElementById("rainbow");

//setter rammen til alle knapper til none
function setBorderNone() {
  greenSelect.style.borderStyle = "none";
  redSelect.style.borderStyle = "none";
  blueSelect.style.borderStyle = "none";
  yellowSelect.style.borderStyle = "none";
  rainbowSelect.style.borderStyle = "none";
}
//funksjonene under endrer fargen til spilleren hvis highscore er større enn ti, eller gir tilbakemelding hvis man ikke har nok poeng
greenSelect.onclick = () => {
  if (localStorage.getItem("highscore") >= 10) {
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
  if (localStorage.getItem("highscore") >= 10) {
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
  if (localStorage.getItem("highscore") >= 10) {
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
  if (localStorage.getItem("highscore") >= 10) {
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
//Regnbuefarge, hvis highscore er større enn 15 trigges en if setning i spiller.js som skifter fargen til spilleren flere ganger i sekundet
//hvis highscore er under 15, vil brukeren få tilbakemelding
rainbowSelect.onclick = () => {
  if (localStorage.getItem("highscore") >= 15) {
    regnbueModus = true;
    setBorderNone();
    rainbowSelect.style.border = "2px solid white";
  } else {
    let colorselected = "rgb(0,255,0)";
    document.getElementById("status").innerHTML =
      "Du trenger 15+ for regnbuefarge :)";
    setTimeout(function () {
      if (localStorage.getItem("highscore") >= 10) {
        document.getElementById("status").innerHTML = "<br>"+"Velg farge:";
      } else document.getElementById("status").innerHTML = "Få en highscore på 10+ for å låse opp fargevalg!";
    }, 2000);
  }
};
//tilbakemelding til brukeren hvis highscore er under 10
function duTrenger10() {
  document.getElementById("status").innerHTML =
    "Du trenger 10+ i highscore for å bytte farge";
  setTimeout(function () {
    if (localStorage.getItem("highscore") >= 10) {
      document.getElementById("status").innerHTML = "<br>"+"Velg farge:";
    } else document.getElementById("status").innerHTML = "Få en highscore på 10+ for å låse opp fargevalg!";
  }, 2000);
}
