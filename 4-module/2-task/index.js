function makeDiagonalRed(table) {
  let rows = table.rows;
  for (let index = 0; index < rows.length; index++) {
    rows[index].cells[index].style.backgroundColor = "red";
  }
}
