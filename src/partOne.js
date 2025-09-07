const axios = require('axios');
const API_DOMAIN = "https://challenge.crossmint.io/api";
const CANDIDATE_ID= "74b00bbc-16c7-4fa5-83ba-b4e2c4d0e9a3";

/**
 * I would re-write this to leverage the TS classes I built in Part Two,
 * however I'm unable to go back to my map and validate my solution
 */
async function partOne() {
  const offset = 2; // start from 2 rows/cols in
  const rowAndColLength = 11;
  const topLeftGrid = getTopLeftDiagnol(offset, rowAndColLength);
  const bottomLeftGrid = getBottomLeftDiagnol(offset, rowAndColLength);
  
  // Making concurrent calls returned 429 - Too Many Requests
  // so now we are making the calls sequentially with a 2 second timeout in between
  try {
    for (const cell of [...topLeftGrid, ...bottomLeftGrid]) {
      await addPoly(...cell);
    }
  } catch (error) {
    console.log("Error: ", error);
  }
}

// start from top left and move to bottom right
function getTopLeftDiagnol(offset, length) {
  let row = 0 + offset;
  let col = 0 + offset;
  const grid = [];

  while (row <= length - 1 - offset) {
    grid.push([row, col])
    // console.log(`Row ${row} -- Col ${col}`);
    // apiCalls.push(addPoly(row, col));
    row++;
    col++;
  }

  return grid;
}

// start from bottom left and move to top right
function getBottomLeftDiagnol(offset, length) {
  let row = length - 1 - offset;
  let column = 0 + offset;
  const grid = [];

  while (column <= length - 1 - offset) {
    grid.push([row, column]);
    row--;
    column++;
  }

  return grid;
}

async function addPoly(row, column) {
  const requestBody = {
    row,
    column,
    candidateId: CANDIDATE_ID,
  };

  return new Promise((resolve) => {
    // native fetch was returning error
    // RequestContentLengthMismatchError: Request body length does not match content-length header
    // switching to axios resolved this - not sure why
    axios.post(`${API_DOMAIN}/polyanets`, requestBody, {
      headers: {
       'Content-Type': 'application/json' 
      }
    })
    .then(() => {
      setTimeout(resolve, 2000);
    })
    // NOTE - I would add error handling logic here,
    // but I clicked "Validate solution" before adding this logic,
    // so unfortunately I wouldn't be able to test any new code
    // after validating.
  });  
}

partOne();
