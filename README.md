# Crossmint Coding Challenge
[https://challenge.crossmint.com/](https://challenge.crossmint.com/)

## Solution
The solution for Part Two leverages TypeScript and Object-Oriented Programming (OOP) principles to draw different types of planets. The `Planet` abstract class provides functionality and attributes common between all types of planets, and child classes `Soloons`, `Cometh`, and `Polyanet` each override any specific functionality. For example, the `draw()` method for `Soloons` needs to pass it's `color` field in the request payload. 

The `PlanetFactory` is responsible for creating an array of planets of a specific type based on the `type` passed as a parameter. The `type` fields come from the response of the `/goal` endpoint. Once the array of planets is populated, each element's `draw()` method is called. This is done in a Polymorphic fashion since the specific `Planet` subclass is unknown.

Part One uses regular JavaScript to construct the grid in a more manual approach. 


## How to run
Part One can be run directly from the `src` folder (since it does not use TypeScript)
```
node src/partOne.js
```

Part Two leverages TypeScript and must be compiled into native JS first.
For development mode:
```
npm run watch
```
Then to test changes:
```
node ./dist/partTwo.js
```

To run the code for Part Two:
```
npm run build
node ./dist/partTwo.js
```

## Feedback
Make it more obvious that clicking "Validate solution" basically submits your answer.

Make testing the non-happy path (invalid placement of Soloons, invalid colors and directions, etc.) easier by providing edge cases or invalid values in the `/goal` endpoint.

Allow the APIs to handle concurrent requests

