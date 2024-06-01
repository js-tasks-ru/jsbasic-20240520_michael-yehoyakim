function showSalary(users, age) {
  return users
    .filter(user => user.age <= age)
    .map(user => `${user.name}, ${user.balance}`)
    .join("\n");
}

/* Объект одного пользователя
let user1 = {
  "balance": "$1,825.65",
  "picture": "https://placehold.it/32x32",
  "age": 21,
  "name": "Golden Branch",
  "gender": "male",
  "greeting": "Hello, Golden Branch! You have 7 unread messages.",
  "favouriteFruit": "banana"
};

let user2 = {
  "balance": "$7,425.80",
  "picture": "https://placehold.it/32x32",
  "age": 13,
  "name": "Pes Mo",
  "gender": "male",
  "greeting": "Hello, Golden Branch! You have 7 unread messages.",
  "favouriteFruit": "banana"
};

// Массив пользователей
let users = [user1, user2];

console.log(showSalary(users, 2))
*/
