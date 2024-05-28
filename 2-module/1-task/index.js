function sumSalary(salaries) {
  let salariesSum = 0;
  for (let key in salaries) {
    if (key != "currency" && key != "month" && key != "isPayed") {
      if (salaries[key] != NaN && salaries[key] != Infinity && salaries[key] != -Infinity) {
        salariesSum += salaries[key];
      }
    }
  }

  return salariesSum;
}
