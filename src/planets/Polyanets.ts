import Planet from "./Planet.js";

class Polyanets extends Planet {
  apiRoute: string;

  constructor() {
    super();
    this.apiRoute = "/polyanets";
  }
}

export default Polyanets;
