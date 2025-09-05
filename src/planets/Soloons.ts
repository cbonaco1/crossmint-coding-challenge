import Planet from "./Planet.js";

type Colors = "blue" | "red" | "purple" | "white";

class Soloons extends Planet {
  color: Colors;

  constructor(baseUrl: string, color: Colors) {
    super(baseUrl);
    this.color = color;
  }
}

export default Soloons;
