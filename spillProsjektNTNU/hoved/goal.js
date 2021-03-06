class Goal { //Lager et class kalt goal (kebaber)
  constructor() { //En konstructor for kebaben
    let platform = platformer[Math.floor(Math.random() * platformer.length)]; //Velger en tilfeldig platform
    platform.harPoeng = true; //Setter at platformen har et poeng på seg altså slik at det ikke kan genereres et hinder der

    this.x = platform.x + platform.w / 2; //X posisjon
    this.y = platform.y - platform.h / 1.5; //Y posisjon
    this.r = 10; //Radius
    this.farge = `rgb(239, 240, 246))`;
    this.tortilla = `rgb(255,215,174)`;
    this.tomat = `rgb(255, 0, 0)`;
    this.kjott = `rgb(139,69,19)`;
    this.mais = ` rgb(255, 255, 0)`;
  }
  tegn() {
    //skygge som endrer farge
    drawingContext.shadowColor =
      "rgb(0," + Math.floor(Math.random() * 255) + ", 0 )";
    drawingContext.shadowBlur = 30;

    //Kebab design.
    fill(this.farge);
    rect(this.x - 10, this.y - 10, 15, 30);
    fill(this.tortilla);
    rect(this.x - 10, this.y - 13, 15, 10);
    fill(this.tomat);
    rect(this.x - 10, this.y - 14, 6, 6);
    fill(this.kjott);
    rect(this.x - 4, this.y - 12, 5, 5);
    fill(this.mais);
    rect(this.x - 2, this.y - 12, 5, 5);
  }
}
