function initCarousel() {
  // need to get the inner carusel element
  // need to get the left and right buttons

  // need to check what transform position the inner is
  // offsetwidth is 988, if transform on 988 - hide left button, if it's 988 + 3*988, hide right button
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
