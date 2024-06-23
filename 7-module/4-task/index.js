import createElement from '../../assets/lib/create-element.js';

export default class StepSlider {
  elem = null;
  steps = 0;
  value = 0;

  constructor({ steps, value = 0 }) {
    this.steps = steps;
    this.value = value;
    this.elem = this.render();
  }

  template() {
    const sliderHTMLPrefix = `
    <div class="slider">

      <div class="slider__thumb">
        <span class="slider__value">${this.value}</span>
      </div>

       <div class="slider__progress"></div>
    `;

    let temp = '';
    const template = '<span></span>';
    const active = '<span class="slider__step-active"></span>';

    for (let i=0; i<this.steps; i++) {
      if (this.value === i) {
        temp += active;
      }
      else {
        temp += template
      }
    }

    const sliderHTML = `
        <div class="slider__steps">${temp}</div>
    `;

    const sliderHTMLSuffix = '</div>';

    return sliderHTMLPrefix + sliderHTML + sliderHTMLSuffix
  }

  render() {
    this.elem = createElement(this.template());
    this.elem.addEventListener("click", this.onSliderClick);

    let thumb = this.elem.querySelector('.slider__thumb');
    thumb.ondragstart = (e) => e.preventDefault();
    thumb.addEventListener('pointerdown', this.onDown);

    return this.elem;
  }

  onDown = () => {
    let thumb = this.elem.querySelector('.slider__thumb');

    thumb.addEventListener('pointermove', this.onMove);
    thumb.addEventListener('pointerup', this.onUp, {once: true});
  }

  onMove = (event) => {
    this.elem.classList.add('slider_dragging');

    let left = event.clientX - this.elem.getBoundingClientRect().left;
    let leftRelative = left / this.elem.offsetWidth;

    if (leftRelative < 0) {
      leftRelative = 0;
    }

    if (leftRelative > 1) {
      leftRelative = 1;
    }

    let leftPercents = leftRelative * 100;

    let thumb = this.elem.querySelector('.slider__thumb');
    let progress = this.elem.querySelector('.slider__progress');
    let sliderValue = this.elem.querySelector('.slider__value');

    thumb.style.left = `${leftPercents}%`;
    progress.style.width = `${leftPercents}%`;

    let segments = this.steps - 1;
    let approximateValue = leftRelative * segments;

    this.value = Math.round(approximateValue);
    sliderValue.textContent = this.value;
  }

  onUp = () => {
    let thumb = this.elem.querySelector('.slider__thumb');
    thumb.classList.remove('slider_dragging');

    const sliderEvent = new CustomEvent('slider-change', {
      detail: this.value,
      bubbles: true
    });
    thumb.dispatchEvent(sliderEvent);

    thumb.removeEventListener('pointermove', this.onMove);
  }

  onSliderClick = (event) => {
    let thumb = this.elem.querySelector('.slider__thumb');
    let progress = this.elem.querySelector('.slider__progress');
    let sliderValue = this.elem.querySelector('.slider__value');

    let left = event.clientX - this.elem.getBoundingClientRect().left;
    let leftRelative = left / this.elem.offsetWidth;
    let segments = this.steps - 1;
    let approximateValue = leftRelative * segments;
    let value = Math.round(approximateValue);
    let leftPercents = value / segments * 100;

    thumb.style.left = `${leftPercents}%`;
    progress.style.width = `${leftPercents}%`;
    sliderValue.textContent = value;

    const sliderEvent = new CustomEvent('slider-change', {
      detail: value,
      bubbles: true
    });
    this.elem.dispatchEvent(sliderEvent);
  };
}
