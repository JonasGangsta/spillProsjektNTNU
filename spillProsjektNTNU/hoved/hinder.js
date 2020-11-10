class Hinder { //Lager et class kalt Hinder (glasskår)
  constructor(platform) { //En constructor som tar inn den tilfeldige valgte platformen i script.js
    let tilfeldigPosisjon = (Math.random() * platform.w) / 2; //Tilfeldig posisjon på platformen fra venstre til høyre
    this.x1 = platform.x + tilfeldigPosisjon; //Plusser på verdien for tilfeldigPosisjon
    this.y1 = platform.y;
    this.x2 = platform.x + platform.w / 2 + tilfeldigPosisjon;
    this.y2 = platform.y;
    this.x3 = platform.x + platform.w / 2 / 2 + tilfeldigPosisjon;
    this.y3 = platform.y - platform.h * 1.3 - Math.random() * platform.h; //Tilfeldig høyde på hinderet
    this.farge = `grey`;
  }
  tegn() { //Tegnefunksjonen som lager hinderene med p5js triangle
    drawingContext.shadowColor = "darkgrey";
    drawingContext.shadowOffsetY = 0;
    fill(this.farge);

    triangle(this.x1, this.y1, this.x2, this.y2, this.x3, this.y3);
    stroke(255, 255, 0);
    strokeWeight(0.5);
  }
}
