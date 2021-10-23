import Prefix from 'prefix';

interface Constructor {
  observerElement?: HTMLElement | null;
  element: HTMLElement;
  shouldObserve?: boolean;
}

export class Animation {
  _observerElement: HTMLElement;
  _element: HTMLElement;
  _transformPrefix = Prefix('transform');
  _observer: IntersectionObserver;
  _triggerOnce = true;
  _shouldObserve: boolean;

  constructor({ observerElement, shouldObserve = true, element }: Constructor) {
    this._element = element;

    if (observerElement) this._observerElement = observerElement;
    else this._observerElement = this._element;

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
    this._observer.unobserve(this._observerElement);
    this._observer.observe(this._observerElement);
  }

  animateIn() {}

  animateOut() {}

  onResize() {}
}
