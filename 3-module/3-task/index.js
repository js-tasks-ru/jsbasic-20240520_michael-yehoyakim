function camelize(str) {
  arr = str.split("-");
  return arr.shift() + arr.map(item => item[0].toUpperCase() + item.slice(1)).join("");
}
