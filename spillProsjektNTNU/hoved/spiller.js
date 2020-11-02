class Spiller {
  constructor(platform) {
    this.x = platform.x + platform.w / 2;
    this.y = platform.y - platform.h * 2;
    this.w = platform.w / 4;
    this.h = platform.h * 2;
    this.farge = `rgb(0,255,0)`;
    this.svart = `black`;
    this.retning = 0;
    this.gravity = 0.2;
    this.gravitySpeed = 0;
    this.armer = 0;
    this.stille = true;
    this.motVenstre = false;
    this.motHoyre = false;
    this.teste = "#0b6301";
  }

  tegn() {
    //skygge
    if (this.stille == true) {
      drawingContext.shadowColor = "green";

      //Farge for figur
      fill(this.farge);

      //Armer
      rect(this.x + 15, this.y + this.armer, 10, 20);

      rect(this.x - 6, this.y + this.armer, 10, 20);

      //Kropp
      rect(this.x, this.y, this.w, this.h);
      fill("blue");
      //Ben
      rect(this.x, this.y + 17, 10, 20);
      rect(this.x + 10, this.y + 17, 9, 20);
      //Hode
      fill("#F1C27D");
      ellipse(this.x + 10, this.y - 5, 20, 20);
      fill(this.svart);
      //Øyne
      ellipse(this.x + 5, this.y - 5, 3, 3);
      ellipse(this.x + 15, this.y - 5, 3, 3);
      //Munn
      arc(this.x + 10, this.y - 2, 8, 8, 0, PI);
      arc(this.x + 10, this.y - 10, 20, 20, PI, TWO_PI);

      rect(this.x, this.y - 12, 20, 2);
      fill("#F1C27D");
      arc(this.x + 10, this.y - 12, 7, 5, PI, TWO_PI);
    } else if (this.motVenstre == true) {
      drawingContext.shadowColor = "green";

      //Farge for figur
      fill(this.farge);
      //Armer

      rect(this.x - 2, this.y + this.armer, 10, 20);

      //Kropp
      rect(this.x, this.y, 15, this.h);

      //Ben
      fill("blue");
      rect(this.x + 0, this.y + 17, 10, 20);
      rect(this.x + 6, this.y + 17, 9, 20);
      fill(this.farge);
      rect(this.x + 11, this.y + this.armer, 10, 20);
      //Hode
      fill("#F1C27D");
      ellipse(this.x + 10, this.y - 5, 15, 20);
      fill(this.svart);
      //Øyne

      ellipse(this.x + 9, this.y - 5, 3, 3);
      ellipse(this.x + 4, this.y - 5, 2, 2);
      //Munn
      arc(this.x + 6, this.y - 2, 8, 8, 0, PI);
      arc(this.x + 10, this.y - 10, 15, 20, PI, TWO_PI);

      fill(this.svart);
      rect(this.x + 3, this.y - 12, 23, 2);
      fill("#F1C27D");
      arc(this.x + 7, this.y - 12, 6, 4, PI, TWO_PI);
    } else if (this.motHoyre == true) {
      drawingContext.shadowColor = "green";

      //Farge for figur
      fill(this.farge);
      //Armer

      rect(this.x + 11, this.y + this.armer, 10, 20);
      //Kropp
      rect(this.x, this.y, 15, this.h);

      //Ben
      fill("blue");
      rect(this.x + 4, this.y + 17, 10, 20);
      rect(this.x + 2, this.y + 17, 9, 20);

      fill(this.farge);
      rect(this.x - 2, this.y + this.armer, 10, 20);
      //Hode
      fill("#F1C27D");
      ellipse(this.x + 10, this.y - 5, 15, 20);
      fill(this.svart);
      //Øyne

      ellipse(this.x + 10, this.y - 5, 3, 3);
      ellipse(this.x + 15, this.y - 5, 2, 2);

      //Munn
      arc(this.x + 13, this.y - 2, 8, 8, 0, PI);
      arc(this.x + 10, this.y - 10, 15, 20, PI, TWO_PI);
      rect(this.x - 4, this.y - 12, 23, 2);
      fill("#F1C27D");
      arc(this.x + 13, this.y - 12, 6, 4, PI, TWO_PI);
    }
  }

  flytt() {
    let platformCollision =
      spiller.gravitySpeed < 0 ? false : spiller.kollisjon();
    if (!platformCollision) {
      this.gravitySpeed += this.gravity;
      this.y += this.gravitySpeed;
    }
    if (this.x < 0) {
      this.x += 5;
    } else if (this.x > width - this.w) {
      this.x -= 5;
    }
    for (let i = 0; i < hindere.length; i++) {
      if (
        hindere[i].x2 - 7 > spiller.x &&
        hindere[i].x1 + 7 < spiller.x + spiller.w &&
        hindere[i].y1 > spiller.y &&
        hindere[i].y3 + 25 < spiller.y + spiller.h
      ) {
        mode = 2;
      }
    }
    if (spiller.y > height + height / 10) {
      mode = 2;
    }
    if (
      goal.x + goal.r > spiller.x &&
      goal.y + goal.r > spiller.y &&
      goal.x - goal.r < spiller.x + spiller.w &&
      goal.y - goal.r < spiller.y + spiller.h
    ) {
      score += 1;
      hinderTall += 1;
      resetSketch();
    }
  }
  hopp() {
    if (spiller.kollisjon()) {
      spiller.gravitySpeed = -7;
      spiller.y = spiller.y - 20;
    }
  }
  ned() {
    if (spiller.kollisjon()) {
      spiller.gravitySpeed = 2;
      spiller.y += 11;
    }
  }
  kollisjon() {
    for (let i = 0; i < platformer.length; i++) {
      if (
        platformer[i].x + platformer[i].w > spiller.x &&
        platformer[i].x < spiller.x + spiller.w &&
        platformer[i].y + 10 > spiller.y + spiller.h - 1 &&
        platformer[i].y < spiller.y + spiller.h
      ) {
        this.gravitySpeed = 0;
        return true;
      }
    }
  }
}
