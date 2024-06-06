function highlight(table) {
  // do stuff for Age (index 1)
  const tbody = document.body.querySelector("tbody");

  const rows = tbody.rows;

  let ageElement = null;
  let age = 0;

  let genderElement = null;

  let statusElement = null;

  // check Age
  for (let row of rows) {

    // handle Age
    ageElement = row.cells[1];
    age = parseInt(ageElement.textContent, 10) || 0;

    if (age < 18) {
      ageElement.style.textDecoration = "line-through";
    }

    // handle Gender
    genderElement = row.cells[2];
    if (genderElement.textContent === "m") {
      genderElement.className = "male";
    } else {
      genderElement.className = "female";
    }

    // handle Status
    statusElement = row.cells[3];
    if (statusElement.hasAttribute("data-available")) {
      if (statusElement.dataset.available === "true") {
        statusElement.className = "available";
      }
      else {
        statusElement.className = "unavailable";
      }
    }
    else {
      statusElement.hidden = true;
    }
  }
}
