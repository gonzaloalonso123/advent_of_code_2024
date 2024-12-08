const { readFile } = require("../utils/readFile");
const fs = require("fs");
const directions = ["up", "right", "down", "left"];

const solve = async () => {
  const data = await readFile("./data.txt");
  const matrix = data.split("\n").map((l) => l.split(""));
  let count = 1;
  let d = 0;
  let p = [0, 0];
  matrix.forEach((row, index) => {
    const guard = row.findIndex((el) => el === "^");
    if (guard !== -1) {
      p = [index, guard];
    }
  });

  while (true) {
    let newPos = "";
    switch (directions[d]) {
      case "up":
        newPos = [p[0] - 1, p[1]];
        break;
      case "right":
        newPos = [p[0], p[1] + 1];
        break;
      case "down":
        newPos = [p[0] + 1, p[1]];
        break;
      case "left":
        newPos = [p[0], p[1] - 1];
        break;
    }

    if (newPos[0] >= 0 && newPos[0] < matrix.length && newPos[1] >= 0 && newPos[1] < matrix[0].length) {
      const matrixPos = matrix[newPos[0]][newPos[1]];
      if (matrixPos == "#") {
        d = (d + 1) % 4;
      } else {
        p = newPos;
        if (matrixPos != "X") {
          matrix[newPos[0]][newPos[1]] = "X";
          count++;
        }
      }
    } else {
      break;
    }
  }


  console.log(count);
  fs.writeFileSync("matrix.txt", matrix.map((r) => r.join("")).join("\n"));
};

solve();
