import axios from "axios";

// Parent class for other Planets
export default abstract class Planet {
  baseUrl: string;
  candidateId: string;
  abstract apiRoute: string;

  constructor() {
    this.baseUrl = "https://challenge.crossmint.io/api";
    this.candidateId = "74b00bbc-16c7-4fa5-83ba-b4e2c4d0e9a3";
  }

  api(): string {
    return `${this.baseUrl}${this.apiRoute}`;
  }

  /**
   * Draw the planet, given the row and column.
   * Base implementation only passes row, column, and candidateId params.
   * Child classes may override this if they need different params or logic.
   * 
   * @param row 
   * @param column 
   * @returns Promise<{}>
   */
  async draw(row: number, column: number): Promise<{}> {
    /**
     * One possible enhancement here would be to pass params 
     * to pass into the POST request (since lots of the code in Soloon and Cometh's draw() methods are the same).
     * However, the tradeoff is you would lose the ability to call draw()
     * in a Polymorphic fashion. Would need to know which subclass
     * of Planet we're drawing and pass appropriate params (color, direction)
     */
    return new Promise((resolve, reject) => {
      axios.post(this.api(), {
        row,
        column,
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
  
  erase(row: number, column: number): void {
    // make DELETE call to this.baseUrl
    // i think delete is same for all
  }
}
