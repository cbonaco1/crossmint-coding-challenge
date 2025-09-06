import Planet from "./Planet.js";

export type Directions = 'up' | 'down' | 'left' | 'right';

class Cometh extends Planet {
  direction: Directions;
  apiRoute: string;

  constructor(direction: Directions) {
    super();
    this.apiRoute = "/comeths";
    this.direction = direction;
  }

  // override draw() method to include direction
}

export default Cometh;
