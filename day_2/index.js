const { readFile } = require("../utils/readFile");

const solve = async () => {
  const data = await readFile("./data.txt");
  let safeReports = 0;
  data.split("\n").forEach((line, i) => {
    const report = line.split(" ");
    const isSafe = isReportSafe(report);
    if (isSafe) {
      safeReports++;
    }
  });
  console.log(safeReports);
};

const isReportSafe = (r) => {
  let asc;
  const first = parseInt(r[0]);
  const second = parseInt(r[1]);
  if (first > second) {
    asc = false;
  } else if (second > first) {
    asc = true;
  } else {
    return false;
  }

  for (let i = 1; i < r.length; i++) {
    const current = parseInt(r[i]);
    const previous = parseInt(r[i - 1]);
    const diff = current - previous;
    if ((asc && diff < 0) || (!asc && diff > 0)) {
      return false;
    }
    const absoluteDiff = Math.abs(diff);
    if (absoluteDiff > 3 || absoluteDiff < 1) {
      return false;
    }
  }

  return true;
};

solve();
