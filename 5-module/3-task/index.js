function initCarousel() {
  const numberOfSlides = 4;

  const innerCarouselElement = document.body.querySelector(".carousel__inner");

  let arrowRightElement = document.body.querySelector(".carousel__arrow_right");
  let arrowLeftElement = document.body.querySelector(".carousel__arrow_left");

  let slideWidth = innerCarouselElement.offsetWidth;

  // initial state
  arrowLeftElement.style.display = 'none';

  arrowLeftElement.addEventListener("click", () => {
    arrowRightElement.style.display = '';

    let transform = getComputedStyle(innerCarouselElement).transform;
    let move = new DOMMatrix(transform).m41;
    move += slideWidth;
    innerCarouselElement.style.transform = 'translateX(' + move + 'px)';

    if (move === 0) {
      arrowLeftElement.style.display = 'none';
    }
  });

  arrowRightElement.addEventListener("click", () => {
    arrowLeftElement.style.display = '';

    let transform = getComputedStyle(innerCarouselElement).transform;
    let move = new DOMMatrix(transform).m41;
    move -= slideWidth;
    innerCarouselElement.style.transform = 'translateX(' + move + 'px)';

    if (move === -3*slideWidth) {
      arrowRightElement.style.display = 'none';
    }

  });
}
