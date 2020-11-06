class Spiller {
  constructor(platform) {
    this.x = platform.x + platform.w / 2;
    this.y = platform.y - platform.h * 2;
    this.w = platform.w / 4;
    this.h = platform.h * 2;
    this.farge = colorselected;
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
    if (colorselected == true) {
      this.farge =
        "rgb(" +
        Math.floor(Math.random() * 255) +
        "," +
        Math.floor(Math.random() * 255) +
        ", " +
        Math.floor(Math.random() * 255) +
        " )";
    }
    //skygge
    if (this.stille == true) {
      drawingContext.shadowColor = this.farge;

      //Farge for figur
      fill(this.farge);

      //Armer
      rect(this.x + this.w, this.y + this.armer, this.w / 3, this.h / 2);

      rect(this.x - this.w / 3, this.y + this.armer, this.w / 3, this.h / 2);

      //Kropp
      rect(this.x, this.y, this.w, this.h);
      fill("blue");
      //Ben
      rect(this.x, this.y + this.h / 2, this.w / 2, this.h / 2);
      rect(this.x + this.w / 2, this.y + this.h / 2, this.w / 2, this.h / 2);
      //Hode
      fill("#F1C27D");
      ellipse(this.x + this.w / 2, this.y - this.h / 6, this.w, this.w);
      fill(this.svart);
      //Øyne
      ellipse(this.x + this.w / 4, this.y - this.h / 6, this.w / 5, this.w / 5);
      ellipse(
        this.x + this.w / 2 + this.w / 4,
        this.y - this.h / 6,
        this.w / 5,
        this.w / 5
      );

      //Munn
      arc(
        this.x + this.w / 2,
        this.y - this.h / 15,
        this.w / 2,
        this.w / 2,
        0,
        PI
      );
    } else if (this.motVenstre == true) {
      drawingContext.shadowColor = this.farge;

      //Farge for figur
      fill(this.farge);

      //Venstre Arm
      rect(
        this.x - this.w / 4 + this.w / 6,
        this.y + this.armer,
        this.w / 4,
        this.h / 2
      );

      //Kropp
      rect(this.x + this.w / 6, this.y, this.w - this.w / 4, this.h / 2);

      //Høyre arm
      rect(
        this.x + this.w - this.w / 6,
        this.y + this.armer,
        this.w / 4,
        this.h / 2
      );

      fill("blue");
      //Ben
      rect(this.x + this.w / 6, this.y + this.h / 2, this.w / 2, this.h / 2);
      rect(
        this.x + this.w / 2 - this.w / 6,
        this.y + this.h / 2,
        this.w / 2,
        this.h / 2
      );
      //Hode
      fill("#F1C27D");
      ellipse(this.x + this.w / 2, this.y - this.h / 6, this.w, this.w);
      fill(this.svart);
      //Øyne
      ellipse(this.x + this.w / 8, this.y - this.h / 6, this.w / 7, this.w / 7);
      ellipse(
        this.x + this.w / 8 + this.w / 4,
        this.y - this.h / 6,
        this.w / 5,
        this.w / 5
      );
      //Munn
      arc(
        this.x + this.w / 4,
        this.y - this.h / 15,
        this.w / 2.5,
        this.w / 2.5,
        0,
        PI
      );
    } else if (this.motHoyre == true) {
      drawingContext.shadowColor = this.farge;

      //Farge for figur
      fill(this.farge);

      //Armer
      rect(
        this.x + this.w - this.w / 6,
        this.y + this.armer,
        this.w / 4,
        this.h / 2
      );

      //Kropp
      rect(this.x + this.w / 6, this.y, this.w - this.w / 4, this.h / 2);

      rect(
        this.x - this.w / 4 + this.w / 6,
        this.y + this.armer,
        this.w / 4,
        this.h / 2
      );
      fill("blue");
      //Ben
      rect(
        this.x + this.w / 2 - this.w / 6,
        this.y + this.h / 2,
        this.w / 2,
        this.h / 2
      );
      rect(this.x + this.w / 6, this.y + this.h / 2, this.w / 2, this.h / 2);

      //Hode
      fill("#F1C27D");
      ellipse(this.x + this.w / 2, this.y - this.h / 6, this.w, this.w);
      fill(this.svart);
      //Øyne
      ellipse(
        this.x + this.w / 3 + this.w / 3,
        this.y - this.h / 6,
        this.w / 5,
        this.w / 5
      );
      ellipse(
        this.x + this.w - this.w / 10,
        this.y - this.h / 6,
        this.w / 7,
        this.w / 7
      );
      //Munn
      arc(
        this.x + this.w / 2 + this.w / 4,
        this.y - this.h / 15,
        this.w / 2.5,
        this.w / 2.5,
        0,
        PI
      );
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
    if (spiller.y > height + height) {
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
      spiller.y += 16;
    }
  }
  kollisjon() {
    for (let i = 0; i < platformer.length; i++) {
      if (
        platformer[i].x + platformer[i].w > spiller.x &&
        platformer[i].x < spiller.x + spiller.w &&
        platformer[i].y + 15 > spiller.y + spiller.h - 1 &&
        platformer[i].y < spiller.y + spiller.h
      ) {
        this.gravitySpeed = 0;
        return true;
      }
    }
  }
}
