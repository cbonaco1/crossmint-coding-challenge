import Planet from "./Planet.js";

export type Colors = "blue" | "red" | "purple" | "white";

class Soloons extends Planet {
  color: Colors;
  apiRoute: string;

  constructor(color: Colors) {
    super();
    this.apiRoute = "/soloons";
    this.color = color;
  }

  // override draw() method to include color
}

export default Soloons;
