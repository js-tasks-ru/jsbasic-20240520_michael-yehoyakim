function makeFriendsList(friends) {
  // need to create a template
  // then add the create an element from a template and return it

  const ulElement = document.createElement("ul");

  let listTemplate = ``;

  for (let {firstName, lastName} of friends) {
    listTemplate += `<li>${firstName} ${lastName}</li>`;
  }

  ulElement.innerHTML = listTemplate;

  return ulElement


}



let friends = [
    {
        firstName: 'Artsiom',
        lastName: 'Mezin'
    },
    {
        firstName: 'Ilia',
        lastName: 'Kantor'
    },
    {
        firstName: 'Christopher',
        lastName: 'Michael'
    }
];

makeFriendsList(friends);
