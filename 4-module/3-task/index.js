function highlight(table) {
  // do stuff for Age (index 1)
  const tbody = table.querySelector("tbody");

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
      row.style.textDecoration = "line-through";
    }

    // handle Gender
    genderElement = row.cells[2];
    if (genderElement.textContent === "m") {
      row.classList.add("male");
    } else {
      row.classList.add("female");
    }

    // handle Status
    statusElement = row.cells[3];
    if (statusElement.hasAttribute("data-available")) {
      if (statusElement.dataset.available === "true") {
        row.classList.add("available");
      }
      else {
        row.classList.add("unavailable");
      }
    }
    else {
      row.hidden = true;
    }
  }
}
