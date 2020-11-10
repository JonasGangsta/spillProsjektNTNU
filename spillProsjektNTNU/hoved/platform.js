class Platform { //Lager et class kalt Platform
  constructor() { //Constructor som definerer egenskaper til platformene
    this.x = Math.random() * (width - width / 10) //Tilfeldig xpos innenfor canvaset
    this.y = Math.random() * (height - width / 30 - height / 15) + (height / 15) //Tilfeldig ypos innenfor canvaset
    this.w = width / 10;
    this.h = height / 30;
    this.farge = `maroon`;
    this.harPoeng = false;
    this.harSpiller = false;
  }
  tegn() { //Tegnefunksjonen med p5js rectangle
    drawingContext.shadowOffsetX = -2.5;
    drawingContext.shadowOffsetY = 2.5;
    drawingContext.shadowBlur = 2;
    drawingContext.shadowColor = 'red';
    fill(this.farge);
    rect(this.x, this.y, this.w, this.h);
  }
}
