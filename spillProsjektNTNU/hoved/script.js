const $ = document.querySelector.bind(document);
const game = $("#game");
const btnContainer = $(".btnContainer");
let mode; //Bestemmer om spillet har startet
let platformer = [];
let goal;
let spiller;

function setup(){
  mode = 0; // Starter mode på 0, altså er spillet ikke startet enda
  var canvas = createCanvas(windowWidth/1.9, windowHeight/1.5)
  canvas.parent(`game`);
  textSize(windowWidth/20);
  let k= 0;
  for (let i = 0; k < 30; i += 1){
      console.log("Lager platform")
     k++
     platformer[i] = new Platform
     for (let j = 0; j< platformer.length -1; j++){
       if(platformer[i].x+platformer[i].w > platformer[j].x && platformer[i].x < platformer[j].x+platformer[j].w && platformer[i].y+platformer[i].h > platformer[j].y && platformer[i].y < platformer[j].y + platformer[j].h){
         platformer.pop()
         i--
       }
     }
  }
  console.log(platformer)
  goal = new Goal
  spiller = new Spiller
  console.log(goal);
}

function draw(){
  clear()
  if(mode==0){
    if (frameCount % 180 < 110){
      drawingContext.shadowOffsetX = -2.5;
      drawingContext.shadowOffsetY = 2.5;
      drawingContext.shadowBlur = 3;
      drawingContext.shadowColor = 'red';
      background(0)
      fill(`Maroon`)
      textFont("VT323")
      textAlign(CENTER);
      text(`CLICK ENTER TO START`, windowWidth/3.8, windowHeight/3);
    } else {
      background(0)
    }
  }
  if (mode==1){
    drawingContext.shadowOffsetX = -2.5;
    drawingContext.shadowOffsetY = 2.5;
    drawingContext.shadowBlur = 2;
    drawingContext.shadowColor = 'red';
    background(0);
    for (let i = platformer.length -1; i >= 0; i -= 1) {
      platformer[i].tegn();
    }
    goal.tegn();
    spiller.tegn();
    spiller.flytt();
  }
}
function keyPressed(){
  if (keyCode===ENTER) {     //Hvis ENTER trykkes blir mode = 1 og spillet startes
    mode = 1;
  }
  if (keyCode===8) {
    resetSketch();
  }
  if (keyCode === 37) {
       spiller.retning = -1;
    }
  if (keyCode === 39) {
       spiller.retning = 1;
    }
}

function keyReleased() {
    spiller.retning = 0;
}





/* When the user clicks on the button,
toggle between hiding and showing the dropdown content */
let button = document.getElementById("innstillinger");
let rules = document.getElementById("controls");
let highscore = document.getElementById("leaderboard");
button.onclick = function (event) {
  document.getElementById("myDropdown").classList.toggle("show");
};

//Innstillinger ikon vis og gjem regler og highscore
window.onclick = function (event) {
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
