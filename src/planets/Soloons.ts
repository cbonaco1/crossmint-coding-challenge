import axios from "axios";
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

  /**
   * Soloons' draw() method needs to also pass color param
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
        color: this.color.toLowerCase(),
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
   * Soloons can only be placed adjacent to Polyanets
   * @returns {boolean}
   */
  validatePlacement(grid:Array<Array<string>>, rowIndex: number, colIndex:number):boolean {
    const POLYANET = "POLYANET";
    let valid = false;
    const left = grid[rowIndex]?.[colIndex - 1];
    const right = grid[rowIndex]?.[colIndex + 1];
    const above = grid[rowIndex - 1]?.[colIndex];
    const below = grid[rowIndex + 1]?.[colIndex];
    const topRight = grid[rowIndex - 1]?.[colIndex + 1];
    const topLeft = grid[rowIndex - 1]?.[colIndex - 1];
    const bottomRight = grid[rowIndex + 1]?.[colIndex + 1];
    const bottomLeft = grid[rowIndex + 1]?.[colIndex - 1];

    if(left === POLYANET || right === POLYANET) {
      valid = true;
    } else if(above === POLYANET || below === POLYANET) {
      valid = true;
    } else if(topRight === POLYANET || topLeft === POLYANET || bottomLeft === POLYANET || bottomRight === POLYANET) {
      valid = true;
    }
    return valid;
  }
}

export default Soloons;
