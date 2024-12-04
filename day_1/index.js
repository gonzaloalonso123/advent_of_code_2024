const { readFile } = require("../utils/readFile");

const solve = async () => {
  let list_1 = [];
  let list_2 = [];
  let diff = 0;
  const data = await readFile("./data.txt");

  data.split("\n").forEach((line) => {
    const [l1, l2] = line.split(/\s+/);
    list_1.push(parseInt(l1));
    list_2.push(parseInt(l2));
  });

  list_1 = list_1.sort((a, b) => a - b);
  list_2 = list_2.sort((a, b) => a - b);

  for (let i = 0; i < list_1.length; i++) {
    console.log(list_1[i], list_2[i]);
    diff += Math.abs(list_1[i] - list_2[i]);
  }

  console.log("diff", diff);


  //part 2

  let similarities = 0;

  for (let i = 0; i < list_1.length; i++) {
	let numberOfTimes = 0;
	list_2.forEach(n => {
		if(n === list_1[i]) {
			numberOfTimes += 1;
		}
	})
	similarities += list_1[i] * numberOfTimes;
  }

  console.log("similarities", similarities);
};

solve();
