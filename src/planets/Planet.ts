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
