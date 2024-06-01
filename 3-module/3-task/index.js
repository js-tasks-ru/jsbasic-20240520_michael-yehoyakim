function camelize(str) {
  arr = str.split("-");
  return arr.shift() + arr.map(item => item[0].toUpperCase() + item.slice(1)).join("");
}

camelize('background-color') == 'backgroundColor';
camelize('list-style-image') == 'listStyleImage';
camelize('-webkit-transition') == 'WebkitTransition';
