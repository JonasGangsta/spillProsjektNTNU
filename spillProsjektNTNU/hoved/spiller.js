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
    this.armer = 0; //Armer = 0 når karakteren står på bakken. Hvis brukeren hopper opp eller ned, vil denne verdien øke. Resultatet blir at armene løftes.
    this.stille = true;
    this.motVenstre = false;
    this.motHoyre = false;
    this.randomColor = 0;
  }

  tegn() {
    //Setter spillerens farge til tilfeldige farger hvis regnbueModus = true
    if (regnbueModus === true) {
      if (frameCount % 20 < 1) {
        this.randomColor =
          "rgb(" + random(255) + ", " + random(255) + ", " + random(255) + ")";
      }
      this.farge = this.randomColor;
    }

    //Modell som tegnes hvis karakteren står stille


    if (this.stille == true) {
      //Skygget til karakteren har samme farge
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
    } 

    //Karakter som tegnes hvis karakteren beveger seg mot venstre
    
    else if (this.motVenstre == true) {
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
      fill("#F1C27D"); //Farge for ansikt
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
    } 
    
    //Karakter som tegnes hvis karakteren beveger seg mot høyre

    else if (this.motHoyre == true) {
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
      this.x = width;
    } else if (this.x > width) {
      this.x = 0;
    }
    for (let i = 0; i < hindere.length; i++) {
      if (
        hindere[i].x2 - (hindere[i].x2 - hindere[i].x1) * 0.06 > spiller.x &&
        hindere[i].x1 + (hindere[i].x2 - hindere[i].x1) * 0.06 <
        spiller.x + spiller.w &&
        hindere[i].y1 > spiller.y &&
        hindere[i].y3 + (hindere[i].x2 - hindere[i].x1) * 0.2 <
        spiller.y + spiller.h
      ) {
        mode = 2;
      }
    }
    if (spiller.y > height + height) {
      mode = 2;
    }
    if (
      goal.x + goal.r > spiller.x &&
      goal.y + goal.r > spiller.y - spiller.h / 6 &&
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
      spiller.gravitySpeed = -spiller.h / 6.14;
      spiller.y = spiller.y - spiller.h / 2.1;
      spiller.armer = -15; //Løfter armene. Setter armverdien til -15. Etter 700 millisekunder settes armverdien til 0 igjen og armene senkes.
      setTimeout(function() {
        spiller.armer = 0;
      }, 700);
    }
  }
  ned() {
    if (spiller.kollisjon()) {
      spiller.gravitySpeed = 2;
      spiller.y += 16;
      spiller.armer = -15; //Løfter armene. Setter armverdien til -15. Etter 700 millisekunder settes armverdien til 0 igjen og armene senkes.
      setTimeout(function() {
        spiller.armer = 0;
      }, 400);
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
