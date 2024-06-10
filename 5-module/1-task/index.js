function hideSelf() {
  const buttonElement = document.body.querySelector(".hide-self-button");
  buttonElement.addEventListener('click', () => {
      buttonElement.hidden = true;
    }
  );
}
