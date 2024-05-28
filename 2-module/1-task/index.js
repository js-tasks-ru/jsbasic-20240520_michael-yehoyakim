function sumSalary(salaries) {
  let salariesSum = 0;
  for (let key in salaries) {
    if (key !== "currency" && key !== "month" && key !== "isPayed") {
      if (isNaN(salaries[key]) && salaries[key] !== Infinity && salaries[key] !== -Infinity) {
        salariesSum += salaries[key];
      }
    }
  }

  return salariesSum;
}


    let salaries = {
      John: 1000,
      Ann: 1600,
      Pete: 1300,
      Bob: NaN,
      Peter: Infinity,
      Ivan: -Infinity,
      month: 'December',
      currency: 'USD',
      isPayed: false
    };

console.log(sumSalary(salaries));
