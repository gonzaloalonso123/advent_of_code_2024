const { readFile } = require("../utils/readFile");

const removeIndex = (arr, index) => {
  if (index < 0) {
    return arr;
  }
  return arr.filter((_, i) => i !== index);
};

const solve = async (allowedFailures) => {
  const data = await readFile("./data.txt");
  let safeReports = 0;
  data.split("\n").forEach((line, i) => {
    let report = line.split(" ");
    if (isReportSafe(report, allowedFailures)) safeReports++;
  });
  console.log(safeReports);
};

const isReportSafe = (r, f) => {
  let asc;
  let safe = true;
  for (let i = 0; i < r.length - 1; i++) {
    const current = parseInt(r[i]);
    const next = parseInt(r[i + 1]);
    const diff = current - next;

    if (i == 0) asc = diff < 0;
    if ((asc && diff > 0) || (!asc && diff < 0)) {
      safe = false;
    }
    const absoluteDiff = Math.abs(diff);
    if (absoluteDiff > 3 || absoluteDiff < 1) {
      safe = false;
    }

    if (!safe) {
      if (f > 0) return isReportSafe(removeIndex(r, i), f - 1) || isReportSafe(removeIndex(r, i + 1), f - 1) || isReportSafe(removeIndex(r, i - 1), f - 1);
      else break;
    }
  }
  return safe;
};

// part 1
solve(0);
// part 2
solve(1);
