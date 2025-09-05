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

  draw(): void {
    // make POST call to this.baseUrl
    console.log("drawing something")
  }
  
  erase(): void {
    // make DELETE call to this.baseUrl
  }
}
