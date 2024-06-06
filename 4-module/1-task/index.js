function makeFriendsList(friends) {

  const ulElement = document.createElement("ul");
  let friendsTemplate = ``;

  for (let {firstName, lastName} of friends) {
    friendsTemplate += `<li>${firstName} ${lastName}</li>`;
  }

  ulElement.innerHTML = friendsTemplate;
  return ulElement;
}
