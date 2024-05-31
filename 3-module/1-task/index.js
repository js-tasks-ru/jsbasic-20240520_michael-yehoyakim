/*
function namify(users) {
  const names = [];
  for (const user of users) {
    names.push(user.name);
  }

  return names;
}
*/

/*
function namify(users) {
  const names = [];
  for ({name} of users) {
    names.push(name);
  }
  return names;
}*/

function namify(users) {
  return users.map(user => user.name);
}

let vasya = { name: 'Вася', age: 25 };
let petya = { name: 'Петя', age: 30 };
let masha = { name: 'Маша', age: 28 };

let users = [ vasya, petya, masha ];

let names = namify(users); // ['Вася', 'Петя', 'Маша']
