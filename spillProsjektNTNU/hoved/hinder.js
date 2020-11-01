class Hinder {
  constructor() {
    let platform = platformer[Math.floor(Math.random() * platformer.length)];
    let tilfeldigPosisjon = Math.random()*platform.w/2;
    this.x1 = platform.x + tilfeldigPosisjon
    this.y1 = platform.y
    this.x2 = platform.x + platform.w / 2 + tilfeldigPosisjon
    this.y2 = platform.y
    this.x3 = platform.x + (platform.w / 2) / 2 + tilfeldigPosisjon
    this.y3 = platform.y - platform.h * 1.7
    this.farge = `grey`
  }
  tegn() {
    drawingContext.shadowColor = 'darkgrey';
    drawingContext.shadowOffsetY = 0;
    fill(this.farge);
    triangle(this.x1, this.y1, this.x2, this.y2, this.x3, this.y3);
  }
}
