const { readFile } = require("../utils/readFile");

const solve = async () => {
  const data = await readFile("./data.txt");
  const lines = data.split("\n");
  let totalCount = 0;

  lines.forEach((line) => {
    const [result, digitsString] = line.split(": ");
    const digits = digitsString
      .trim()
      .split(" ")
      .map((n) => parseInt(n));
	  
    const works = equationWorks(parseInt(result), digits);
    if (works) totalCount += parseInt(result);
  });

  console.log(totalCount);
};

const equationWorks = (number, array) => {
  if (array.length === 1) {
    return array[0] === number;
  } else {
    const sum = array[0] + array[1];
    const mul = array[0] * array[1];
    return equationWorks(number, [sum, ...array.slice(2)]) || equationWorks(number, [mul, ...array.slice(2)]);
  }
};

solve();
