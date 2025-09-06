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
}

export default Soloons;
