class Pet {
    constructor(name) {
      this.name = name;
      this.hunger = 100;
      this.happiness = 100;
      this.energy = 100;
      this.alive = true;
  
      this.interval = setInterval(() => this.decreaseStats(), 3000); // 3 másodperc
      this.render();
    }
  
    decreaseStats() {
      if (!this.alive) return;
  
      this.hunger -= 5;
      this.happiness -= 5;
      this.energy -= 5;
  
      if (this.hunger <= 0 || this.happiness <= 0 || this.energy <= 0) {
        this.die();
      }
  
      this.render();
    }
  
    feed() {
      if (!this.alive) return;
      this.hunger = Math.min(this.hunger + 15, 100);
      this.render();
    }
  
    play() {
      if (!this.alive) return;
      this.happiness = Math.min(this.happiness + 15, 100);
      this.energy -= 10;
      this.render();
    }
  
    sleep() {
      if (!this.alive) return;
      this.energy = Math.min(this.energy + 20, 100);
      this.hunger -= 5;
      this.render();
    }
  
    die() {
      this.alive = false;
      clearInterval(this.interval);
      document.getElementById("pet-info").innerHTML = `
      <img id="pet-image" src="dead.png"/>
      <h2>${this.name} meghalt... 😢</h2>`;
    }
  
    render() {
      if (!this.alive) return;
    
      // Átlag alapján vált képet
      const averageStat = (this.hunger + this.happiness + this.energy) / 3;
      let imageSrc = "";
    
      if (averageStat > 50) {
        imageSrc = "happy.png";
      } else if (averageStat <= 50 && this.alive) {
        imageSrc = "sad.png";
      } else {
        imageSrc = "dead.png";
      }
    
      const container = document.getElementById("pet-info");
      container.innerHTML = `
        <img id="pet-image" src="${imageSrc}" alt="Tama" />
        <h2>${this.name}</h2>
        <div class="visuals">
          <div class="stat hunger">Éhség: <span id="hunger-value">${this.hunger}</span></div>
          <div class="stat happiness">Boldogság: <span id="happiness-value">${this.happiness}</span></div>
          <div class="stat energy">Energia: <span id="energy-value">${this.energy}</span></div>
        </div>
      `;
    }
  
    updatePetImage(averageStat) {
      const petImage = document.getElementById("pet-image");
      
      if (averageStat > 50) {
        // Boldog állapot
        petImage.src = "happy.png"; // cseréld le egy boldog Tama képre
      } else if (averageStat <= 50 && this.alive) {
        // Szorongó állapot
        petImage.src = "sad.png"; // cseréld le egy szorongó Tama képre
      } else if (!this.alive) {
        // Halott állapot
        petImage.src = "dead.png"; // cseréld le egy halott Tama képre
      }
    }
  }
  
  // Példányosítás
  const tama = new Pet("Tama");