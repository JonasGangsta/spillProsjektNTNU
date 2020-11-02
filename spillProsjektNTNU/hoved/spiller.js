class Spiller {
  constructor(x,y){
    let platform = platformer[Math.floor(Math.random() * platformer.length)];
    this.x = platform.x + platform.w/2;
    this.y = platform.y - platform.h*2;
    this.w = platform.w/4;
    this.h = platform.h*2;
    this.farge = `rgb(0,255,0)`
    this.retning = 0;
    this.speedY = 0;
    this.gravity = 0.2;
    this.gravitySpeed = 0;
  }
  tegn(){
    drawingContext.shadowColor = 'green';
    fill(this.farge);
    rect(this.x, this.y, this.w, this.h)
  }flytt() {
    let platformCollision = false;
    for(let i = 0; i < platformer.length; i++){
      if(platformer[i].x+platformer[i].w > spiller.x &&
          platformer[i].x < spiller.x+spiller.w &&
          platformer[i].y+10 > spiller.y+spiller.h - 1 &&
          platformer[i].y < spiller.y + spiller.h){
            platformCollision = true;
            this.gravitySpeed = 0;
      }
    }
    if (!platformCollision){
      this.gravitySpeed += this.gravity;
      this.y += this.speedY + this.gravitySpeed;
    }
    if (this.x > 0 && this.x < width){
      this.x += this.retning*4;
    }  else if(this.x < 0){
        this.x += 5;
    }  else if(this.x > width){
        this.x -= 5;
    }
    if(spiller.y > height+(height/10)){
      mode = 2;
    }
    if(goal.x + goal.r > spiller.x &&
        goal.y + goal.r > spiller.y &&
        goal.x - goal.r < spiller.x + spiller.w &&
        goal.y - goal.r < spiller.y + spiller.h){
          score += 1;
          hinderTall +=1;
          resetSketch();
        }
  }
}
