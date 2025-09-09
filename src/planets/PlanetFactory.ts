import Planet from "./Planet.js";
import Cometh, { Directions } from "./Cometh.js";
import Soloon, { Colors } from "./Soloons.js";
import Polyanets from "./Polyanets.js";

class PlantFactory {
  static createPlanet(type: string): Planet | null {
    const comethRegex = /^[A-Z]+_COMETH$/;
    const soloonRegex = /^[A-Z]+_SOLOON$/;
    let planet:Planet | null = null;
    
    if (comethRegex.test(type)) {
      const direction = type.split("_")[0];
      planet = new Cometh(direction as Directions);
    } else if (soloonRegex.test(type)){
      const color = type.split("_")[0];
      planet = new Soloon(color as Colors);
    } else if(type === "POLYANET") {
      planet = new Polyanets();
    } else if(type === "SPACE") {
      // space, do nothing
    } else {
      console.log("INVALID PLANET TYPE - ", type);
    }

    return planet;
  }
}

export default PlantFactory;
