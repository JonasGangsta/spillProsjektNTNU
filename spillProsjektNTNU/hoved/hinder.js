class Hinder {
  constructor() {
    let platform = platformer[Math.floor(Math.random() * platformer.length)];
    this.x1 = platform.x
    this.y1 = platform.y
    this.x2 = platform.x + platform.w / 2
    this.y2 = platform.y
    this.x3 = platform.x + (platform.w / 2) / 2
    this.y3 = platform.y - platform.h * 1.7
    this.farge = `grey`
  }
  tegn() {
    drawingContext.shadowColor = 'green';
    fill(this.farge);
    triangle(this.x1, this.y1, this.x2, this.y2, this.x3, this.y3);
  }
}
