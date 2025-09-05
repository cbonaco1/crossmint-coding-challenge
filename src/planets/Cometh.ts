import Planet from "./Planet.js";

type Directions = 'up' | 'down' | 'left' | 'right';

class Cometh extends Planet {
  direction: Directions;

  constructor(baseUrl: string, direction: Directions) {
    super(baseUrl);
    this.direction = direction;
  }
}

export default Cometh;
