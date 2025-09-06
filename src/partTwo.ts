import axios from "axios";
const API_DOMAIN = "https://challenge.crossmint.io/api";
const CANDIDATE_ID= "74b00bbc-16c7-4fa5-83ba-b4e2c4d0e9a3";
import PlanetFactory from "./planets/PlanetFactory.js"; // NICE_TO_HAVE - remove extensions
import Planet from "./planets/Planet.js";

async function main() {
  const planets:Array<Planet> = [];
  try {
    const { data } = await getGoal();
    if (data.goal) {
      data.goal.forEach((rows:Array<string>, rowIndex: number) => {
        // check if row is an array
        rows.forEach((column:string, colIndex: number) => {
          console.log("----")
          console.log(`Row ${rowIndex} - Col ${colIndex} ---> ${column}`);
          const planet = PlanetFactory.createPlanet(column);
          if (planet) {
            planets.push(planet);
          }
        })
      });
    }
    console.log(`Creating ${planets.length} planets`)
  } catch (error) {
    console.log("Error fetching goal:")
    if (axios.isAxiosError(error)) {
       console.log("Status:", error.response?.status);
       console.log("Data: ", error.response?.data);
    } else {
      console.log(error);
    }
  }
}

const getGoal = async () => {
  return await axios.get(`${API_DOMAIN}/map/${CANDIDATE_ID}/goal`);
}

main();
