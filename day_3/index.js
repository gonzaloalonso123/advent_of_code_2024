const { readFile } = require("../utils/readFile");

const regex = /mul\(\d{1,3},\d{1,3}\)/g;

const clean = (matches) =>
  matches.map((m) =>
    m
      .replace(/[^\d,]/g, "")
      .split(",")
      .map((s) => parseInt(s.trim()))
  );

const solve = async () => {
  const data = await readFile("./data.txt");
  const matches = data.match(regex);
  const cleanMatches = clean(matches);

  const result = cleanMatches.reduce((acc, i) => {
    acc += i[0] * i[1];
    return acc;
  }, 0);
  console.log(result);
};

const solve2 = async () => {
  const data = await readFile("./data.txt");
  const fragments = data.split(/do\(\)/g);
  const onlyDos = fragments.map((f) => f.split(/don't\(\)/)[0]).join("");
  const matches = onlyDos.match(regex);
  const cleanMatches = clean(matches);
  const result = cleanMatches.reduce((acc, i) => {
    acc += i[0] * i[1];
    return acc;
  }, 0);
  console.log(result);
};

solve();
solve2();
