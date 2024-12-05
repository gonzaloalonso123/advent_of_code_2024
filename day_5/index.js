const { readFile } = require("../utils/readFile");

const solve = async () => {
  const data = await readFile("./data.txt");

  const [rulesString, updatesString] = data.split("\n\n");
  const rules = rulesString.split("\n").reduce((acc, r) => {
    const [n1, n2] = r.split("|");
    if (acc[n1]) {
      acc[n1].push(n2);
    } else {
      acc[n1] = [n2];
    }
    return acc;
  }, {});

  const updates = updatesString.split("\n").map((l) => l.split(","));
  let count = 0;
  for (const update of updates) {
    let isValid = true;
    for (const [index, page] of update.entries()) {
      for (let i = index + 1; i < update.length; i++) {
        if (!rules[page].includes(update[i])) {
          isValid = false;
        }
      }
    }
    if (isValid) {
      count += parseInt(update[Math.floor(update.length / 2)]);
    }
  }

  console.log(count);
};

solve();
