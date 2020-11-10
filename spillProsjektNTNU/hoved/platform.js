class Platform {
  constructor() {
    this.x = Math.random() * (width - width / 10)
    this.y = Math.random() * (height - width / 30 - height / 15) + (height / 15)
    this.w = width / 10;
    this.h = height / 30;
    this.farge = `maroon`;
    this.harPoeng = false;
    this.harSpiller = false;
  }
  tegn() {
    drawingContext.shadowOffsetX = -2.5;
    drawingContext.shadowOffsetY = 2.5;
    drawingContext.shadowBlur = 2;
    drawingContext.shadowColor = 'red';
    fill(this.farge);
    rect(this.x, this.y, this.w, this.h);
  }
}
