import axios from "axios";
import Planet from "./Planet.js";

export type Directions = 'up' | 'down' | 'left' | 'right';

class Cometh extends Planet {
  direction: Directions;
  apiRoute: string;

  constructor(direction: Directions) {
    super();
    if (!this.validateDirection(direction)) {
      throw new Error(`Invalid direction ${direction} for Cometh`);
    } else {
      this.apiRoute = "/comeths";
      this.direction = direction;
    }
  }

  /**
   * Cometh' draw() method needs to also pass direction param
   * 
   * @param row 
   * @param column 
   * @returns Promise<{}>
   */
  async draw(row: number, column: number): Promise<{}> {
    return new Promise((resolve, reject) => {
      axios.post(this.api(), {
        row,
        column,
        direction: this.direction.toLowerCase(),
        candidateId: this.candidateId
      })
      .then(response => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      })
    })
  }

  /**
   * Valid direction for Cometh
   * @param direction 
   * @returns boolean
   */
  private validateDirection(direction: string): boolean {
    const d = direction.toLowerCase();
    return d === 'up' || d === 'down' || d === 'left' || d === 'right';
  }
}

export default Cometh;
