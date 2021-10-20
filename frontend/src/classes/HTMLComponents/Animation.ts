import Prefix from 'prefix';

interface Constructor {
  element: HTMLElement;
  shouldObserve?: boolean;
}

export class Animation {
  _element: HTMLElement;
  _transformPrefix = Prefix('transform');
  _observer: IntersectionObserver;
  _triggerOnce = true;
  _shouldObserve: boolean;

  constructor({ shouldObserve = true, element }: Constructor) {
    this._element = element;
    this._shouldObserve = shouldObserve;
    this._observer = new IntersectionObserver(this._handleIntersection);
  }

  _handleIntersection = (
    entries: IntersectionObserverEntry[],
    observer: IntersectionObserver,
  ) => {
    if (!this._shouldObserve) return;

    entries.forEach((entry) => {
      if (entry.intersectionRatio > 0) {
        this.animateIn();
        if (this._triggerOnce) observer.unobserve(entry.target);
      } else {
        this.animateOut();
      }
    });
  };

  initObserver() {
    this._observer.unobserve(this._element);
    this._observer.observe(this._element);
  }

  animateIn() {}

  animateOut() {}

  onResize() {}
}
