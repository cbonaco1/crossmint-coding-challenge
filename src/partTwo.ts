export default class Planet {
  baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  draw(): void {
    // make POST call to this.baseUrl
    console.log("something")
  }
  
  erase(): void {
    // make DELETE call to this.baseUrl
  }
}
