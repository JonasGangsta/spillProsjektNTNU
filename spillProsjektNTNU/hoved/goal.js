class Goal {
  constructor() {
    let platform = platformer[Math.floor(Math.random() * platformer.length)]
    this.x = platform.x + platform.w / 2;
    this.y = platform.y - platform.h / 1.5;
    this.r = 10;
    this.farge = `rgb(0,255,0)`
  }
  tegn() {
    drawingContext.shadowColor = 'green';
    fill(this.farge);
    ellipse(this.x, this.y, this.r);
  }
}
