import Prefix from 'prefix';

interface Constructor {
  element: HTMLElement;
}

export class Animation {
  _delay: number;
  _element: HTMLElement;
  _transformPrefix = Prefix('transform');
  _observer: void | null = null;
  isVisible = false;

  constructor({ element }: Constructor) {
    const { animationdelay = '0' } = element.dataset;

    this._delay = Number(animationdelay);

    this._element = element;

    if ('IntersectionObserver' in window) {
      this.createObserver();
    }
  }

  createObserver() {
    this._observer = new window.IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          this.animateIn();
        } else {
          this.animateOut();
        }
      });
    }).observe(this._element);
  }

  animateIn() {
    this.isVisible = true;
  }

  animateOut() {
    this.isVisible = false;
  }

  onResize() {}
}
