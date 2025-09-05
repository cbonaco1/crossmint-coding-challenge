import Cometh from "./planets/Cometh.js"; // TODO - look into removing extensions

function main() {
  const com1 = new Cometh("/api", 'down');
  com1.draw();
}

main();
