function createElement(html) {
  const temp = document.createElement('div');
  temp.innerHTML = html;
  return temp.firstElementChild;
}

export default class UserTable {
  elem = null;
  #rows = [];

  constructor(rows) {
    this.#rows = rows;
    this.headers = Object.keys(this.#rows[0]);
    this.data = this.#rows.map(item => Object.values(item));
    this.elem = this.render();
  }

  template() {
    let tdData = [];

    for (let row of this.data) {
      const trData = row.map(v => `<td>${v}</td>`).join('') + '<td><button class="remove-button">X</button></td>';
      tdData.push(trData);
    }

    const table = `
    <table>
        <thead>
            <tr>
                ${this.headers.map(value => `<th>${value}</th>`).join('')}
            </tr>
        </thead>
        <tbody>
              ${tdData.map(value => `<tr>${value}</tr>`).join('')}
        </tbody>
    </table>
    `;

    return table;
  }

  onButtonClick = (event) => {
    if (event.target.className != 'remove-button') {
      return;
    }

    const button = event.target;
    const row = button.closest('tr');

    if (!row) {
      return;
    }

    row.remove();
  }

  render () {
    this.elem = createElement(this.template());

    this.elem.addEventListener('click', this.onButtonClick);

    return this.elem;

  }
}

