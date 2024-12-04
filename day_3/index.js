const { readFile } = require("../utils/readFile");

const solve = async () => {
  const data = await readFile("./data.txt");
  const regex = /mul\(\d{1,3},\d{1,3}\)/g;
  const matches = data.match(regex);
  const clean = matches.map((m) =>
    m
      .replace(/[^\d,]/g, "")
      .split(",")
      .map((s) => parseInt(s.trim()))
  );

  const result = clean.reduce((acc, i) => {
    console.log(i);
    acc += i[0] * i[1];
    return acc;
  }, 0);
  console.log(result);
};

solve();
