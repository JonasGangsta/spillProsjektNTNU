class Spiller { //Lager et class kalt spiller
  constructor(platform) { //En constructor som tar inn den tilfeldige valgte platformen i script.js
    this.x = platform.x + platform.w / 2; //Definerer x posisjonen på spilleren halveis inn på en platform
    this.y = platform.y - platform.h * 2; //Definerer y posisjonen på spilleren
    this.w = platform.w / 4; //Bredde
    this.h = platform.h * 2; //Høyde
    this.farge = colorselected;
    this.svart = `black`;
    this.retning = 0;
    this.gravity = 0.2; //Verdi for tyngdekraft
    this.gravitySpeed = 0; //Tyngdekraftfarten starter på 0
    this.armer = 0;
    this.stille = true;
    this.motVenstre = false;
    this.motHoyre = false;
    this.randomColor = 0;
  }

  tegn() {
    if (regnbueModus === true) {
      if (frameCount % 20 < 1) {
        this.randomColor =
          "rgb(" + random(255) + ", " + random(255) + ", " + random(255) + ")";
      }
      this.farge = this.randomColor;
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

  flytt() { //Funksjonen flytt som står for posisjon/bevegelse til spilleren
    let platformCollision = spiller.gravitySpeed < 0 ? false : spiller.kollisjon(); //Tester om spilleren hopper oppover (gravityspeed < 0), for da skal den ikke kollidere med platformen
    if (!platformCollision) { //Hvis ikke kollisjon
      this.gravitySpeed += this.gravity; //Oppdaterer gravityspeed med 0.2 hver gang p5js kjører draw()
      this.y += this.gravitySpeed; //Plusser på gravityspeed slik at spilleren går nedover og etter hvert aksellererer
    }
    if (this.x < 0) { //Hvis spillerens x verdi er < 0
      this.x = width; //Flyttes til høyre
    } else if (this.x > width) { //Hvis spillerens x verdi er > bredden på canvaset
      this.x = 0; //Flyttes til venstre
    }
    for (let i = 0; i < hindere.length; i++) { //Kjører for alle hinderene
      if ( //Test for om spilleren kolliderer med hinderene
        hindere[i].x2 - (hindere[i].x2 - hindere[i].x1) * 0.06 > spiller.x &&
        hindere[i].x1 + (hindere[i].x2 - hindere[i].x1) * 0.06 <
        spiller.x + spiller.w &&
        hindere[i].y1 > spiller.y &&
        hindere[i].y3 + (hindere[i].x2 - hindere[i].x1) * 0.2 <
        spiller.y + spiller.h
      ) {
        mode = 2; //Mode = 2 som betyr at spilleren dør
      }
    }
    if (spiller.y > height + height) { //Hvis spilleren sin høyde er under canvaset (+ ekstra høyde slik at spilleren kan falle litt)
      mode = 2; //Mode = 2 som betyr at spilleren dør
      }
    if ( //Sjekker om spilleren er over en kebab (goal)
      goal.x + goal.r > spiller.x &&
      goal.y + goal.r > spiller.y - spiller.h / 6 &&
      goal.x - goal.r < spiller.x + spiller.w &&
      goal.y - goal.r < spiller.y + spiller.h
    ) {
      score += 1; //Man får 1 i score
      hinderTall += 1; //Det blir 1 mer hinder
      resetSketch(); //Sketchen resettes (ny bane)
    }
  }
  hopp() { //Hoppe funksjon
    if (spiller.kollisjon()) { //Hvis spilleren kolliderer med platform
      spiller.gravitySpeed = -spiller.h / 6.14; //Oppdaterer gravitySpeed slik at spilleren går oppover hvis den ikke er på en platform
      spiller.y = spiller.y - spiller.h / 2.1; //Et lite ''dytt'' for å få spilleren til å gå oppover
      spiller.armer = -15;
      setTimeout(function() {
        spiller.armer = 0;
      }, 700);
    }
  }
  ned() { //Hoppe ned funksjon
    if (spiller.kollisjon()) {
      spiller.gravitySpeed = 2; //Litt startsfart nedover
      spiller.y += 16; //Flytter spilleren nedover slik at den er under platformen og kan falle (16 er 1 pixel over høyden platformen/spilleren sjekkes mot i kollisjon())
      spiller.armer = -15;
      setTimeout(function() {
        spiller.armer = 0;
      }, 400);
    }
  }
  kollisjon() { //Sjekker om spilleren kolliderer med en platform
    for (let i = 0; i < platformer.length; i++) {
      if (
        platformer[i].x + platformer[i].w > spiller.x &&
        platformer[i].x < spiller.x + spiller.w &&
        platformer[i].y + 15 > spiller.y + spiller.h - 1 &&
        platformer[i].y < spiller.y + spiller.h
      ) {
        this.gravitySpeed = 0; //Spillerens gravitySpeed settes til 0, og den vil da stå stille i y-verdi.
        return true; //Spilleren kolliderer
      }
    }
  }
}
