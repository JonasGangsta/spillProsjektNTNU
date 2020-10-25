class Platform {
  constructor(){
    this.x = Math.random()*(width-width/10)
    this.y = Math.random()*(height-width/30)
    this.w = width/10;
    this.h = height/30;
    this.farge = `maroon`;
  }
  tegn(){
    fill(this.farge);
    rect(this.x, this.y, this.w, this.h);
  }
}
