import Prefix from 'prefix';

interface Constructor {
  element: HTMLElement;
}

export class Animation {
  _element: HTMLElement;
  _transformPrefix = Prefix('transform');
  _observer: void | null = null;
  _canAnimate = false;
  isVisible = false;

  constructor({ element }: Constructor) {
    this._element = element;

    if ('IntersectionObserver' in window) {
      this.createObserver();
    }
  }

  createObserver() {
    this._observer = new window.IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (this._canAnimate) {
          if (entry.isIntersecting) {
            this.animateIn();
          } else {
            this.animateOut();
          }
        }
      });
    }).observe(this._element);
  }

  animateIn() {
    this._canAnimate = true;
    this.isVisible = true;
  }

  animateOut() {
    this.isVisible = false;
  }

  onResize() {}
}
