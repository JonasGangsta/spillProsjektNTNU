const $ = document.querySelector.bind(document);
const game = $("#game");
const btnContainer = $(".btnContainer");

function startFunksjon() {}
function prosjektFunksjon() {
  btnContainer.innerHTML = `<div style="font-size: 300%;" ><p>Programmering: Jonas Andorsen</p> <p>Prosjektleder: Bendik</p><div class="knappHover"><p onclick="resetFunksjon()" style="border: solid; border-color: maroon; margin-left: 40%; margin-right: 40%; margin-top: 5%;">Menu</p></div></div>`;
}
function creditsFunksjon() {
  btnContainer.innerHTML = `<div style="font-size: 300%;" ><p>Programmering: Jonas Andorsen</p> <div class="knappHover"><p>Prosjektleder: Bendik</p><p onclick="resetFunksjon()" style="border: solid; border-color: maroon; margin-left: 40%; margin-right: 40%; margin-top: 5%;">Menu</p></div></div>`;
}
function resetFunksjon() {
  btnContainer.innerHTML = `  <div class="knappHover" onclick=startFunksjon()><p>Start</p></div>
  <div class="knappHover" onclick=prosjektFunksjon()><p>Prosjekt</p></div>
  <div class="knappHover" onclick=creditsFunksjon()><p>Credits</p></div>`;
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


 
