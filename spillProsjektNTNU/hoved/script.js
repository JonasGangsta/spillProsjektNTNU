const $ = document.querySelector.bind(document);
const game = $("#game");
const btnContainer = $(".btnContainer");

function startFunksjon(){

}
function prosjektFunksjon(){
  btnContainer.innerHTML= `<div style="font-size: 300%;" ><p>Programmering: Jonas Andorsen</p> <p>Prosjektleder: Bendik</p><div class="knappHover"><p onclick="resetFunksjon()" style="border: solid; border-color: maroon; margin-left: 40%; margin-right: 40%; margin-top: 5%;">Menu</p></div></div>`
}
function creditsFunksjon(){
  btnContainer.innerHTML= `<div style="font-size: 300%;" ><p>Programmering: Jonas Andorsen</p> <div class="knappHover"><p>Prosjektleder: Bendik</p><p onclick="resetFunksjon()" style="border: solid; border-color: maroon; margin-left: 40%; margin-right: 40%; margin-top: 5%;">Menu</p></div></div>`
}
function resetFunksjon(){
  btnContainer.innerHTML = `  <div class="knappHover" onclick=startFunksjon()><p>Start</p></div>
  <div class="knappHover" onclick=prosjektFunksjon()><p>Prosjekt</p></div>
  <div class="knappHover" onclick=creditsFunksjon()><p>Credits</p></div>`
}
