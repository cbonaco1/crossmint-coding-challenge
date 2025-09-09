import axios from "axios";
const API_DOMAIN = "https://challenge.crossmint.io/api";
const CANDIDATE_ID= "74b00bbc-16c7-4fa5-83ba-b4e2c4d0e9a3";
import PlanetFactory from "./planets/PlanetFactory.js"; // NICE_TO_HAVE - remove extensions
import Planet from "./planets/Planet.js";

async function main() {
  const planets:Array<{planet: Planet, row: number, column: number, type: string}> = [];
  try {
    const { data } = await getGoal();
    // NICE_TO_HAVE - check if data.goal is a 2-D array of strings
    if (data.goal) {
      data.goal.forEach((rows:Array<string>, rowIndex: number) => {
        rows.forEach((planetType:string, colIndex: number) => {
          try {
            const planet = PlanetFactory.createPlanet(planetType);
            if (planet && planet.validatePlacement(data.goal, rowIndex, colIndex)) {
              planets.push({
                planet,
                row: rowIndex,
                column: colIndex,
                type: planetType
              });
            }
          } catch (error) {
            console.log("Error creating planet: ", error);
          }
        })
      });
    }

    // making calls concurrently was returning 429 - too many requests
    // if this wasn't the case, concurrent calls would look something like:
    /**
      const draws = planets.map(({ planet, row, column }) => planet.draw(row, column));
      try {
        await Promise.all(draws);
        // OR Promise.allSettled(draws) to keep drawing even if some fail
      } catch (error) {
        // handle error
      }
    */
    let i = 0;
    const intervalId = setInterval(async () => {
      if (i === planets.length) {
        clearInterval(intervalId)
      } else {
        const plnt = planets[i]
        if (plnt) {
          const { planet, row, column, type } = plnt;
          try {
            await planet.draw(row, column);
            i++;
          } catch (error) {
            console.log("Error drawing ", type);
            if (axios.isAxiosError(error)) {
              console.log("Status:", error.response?.status);
              console.log("Data: ", error.response?.data);
            } else {
              console.log(error);
            }
          }
        }
      }
    }, 2000)

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
