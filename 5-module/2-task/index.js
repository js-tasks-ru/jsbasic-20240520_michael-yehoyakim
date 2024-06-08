function toggleText() {
  const buttonElement = document.body.querySelector(".toggle-text-button");
  buttonElement.addEventListener("click", () => {
      const textElement = document.body.querySelector("#text");
      textElement.hidden = !textElement.hidden;
    }
  );
}
