class Spiller {
  constructor(x,y){
    let platform = platformer[Math.floor(Math.random() * platformer.length)]
    this.x = platform.x + platform.w/2;
    this.y = platform.y - platform.h*2;
    this.w = platform.w/4;
    this.h = platform.h*2;
    this.farge = `rgb(0,255,0)`
    this.retning = 0;
  }
  tegn(){
    drawingContext.shadowColor = 'green';
    fill(this.farge);
    rect(this.x, this.y, this.w, this.h)
  }
  flytt(){
    let collision = false;
    for(let i = 0; i < platformer.length; i++){
      if(platformer[i].x+platformer[i].w > spiller.x && platformer[i].x < spiller.x+spiller.w && platformer[i].y+platformer[i].h > spiller.y && platformer[i].y < spiller.y + spiller.h){
        collision = true;
      }
    }
    if (!collision){
      spiller.y = spiller.y + 3;
    }
    if (this.x > 0 && this.x < width){
      this.x += this.retning*4;
    }  else if(this.x < 0){
        this.x += 5;
    }  else if(this.x > width){
        this.x -= 5;
    }
  }
}
