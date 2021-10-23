import { Bounds, UpdateInfo, ExitFn } from 'types';
import { globalState } from 'utils/globalState';

import { PageCanvas } from '../../PageCanvas';
import { InteractiveScene } from '../../../Components/InteractiveScene';
import { Image3D } from './Components/Image3D';

interface Constructor {}

export class IndexPageCanvas extends PageCanvas {
  static anmImage3D = '[data-animation="image3d-landing"]';

  _anmImages3D: Image3D[] = [];

  constructor(props: Constructor) {
    super({});
  }

  setInteractiveScene(scene: InteractiveScene) {
    super.setInteractiveScene(scene);
  }

  _destroyItems() {
    this._anmImages3D.forEach((item) => {
      item.destroy();
    });
    this._anmImages3D = [];
    this._planeGeometry.dispose();
  }

  onEnter(el: HTMLElement) {
    super.onEnter(el);

    if (!this._pageEl) return;

    this._destroyItems();

    const medias = Array.from(
      this._pageEl.querySelectorAll(IndexPageCanvas.anmImage3D),
    ) as HTMLElement[];

    this._anmImages3D = medias.map((el) => {
      const parentDomEl = el.parentNode as HTMLElement;
      return new Image3D({
        geometry: this._planeGeometry,
        domEl: el,
        parentDomEl,
      });
    });

    this._anmImages3D.forEach((el) => {
      if (this._interactiveScene) {
        this._scrollValues && el.setScrollValues(this._scrollValues);
        el.rendererBounds = this._rendererBounds;
        this._interactiveScene.add(el);
      }
    });

    this.onAssetsLoaded();
  }

  setRendererBounds(bounds: Bounds) {
    super.setRendererBounds(bounds);

    this._anmImages3D.forEach((el) => {
      el.rendererBounds = this._rendererBounds;
    });
  }

  onAssetsLoaded() {
    super.onAssetsLoaded();
    this._anmImages3D.forEach((el) => {
      const figureSrc = el._domEl.dataset.src;
      if (figureSrc) el.textureItem = globalState.textureItems[figureSrc];
    });
  }

  onExit = () => {
    //RAF delays photo swap
    window.requestAnimationFrame(() => {
      this._destroyItems();
    });
  };

  animateIn() {
    this._anmImages3D.forEach((el, key) => {
      el.animateIn();
    });
  }

  onExitToDetails({ targetId, parentFn }: ExitFn) {
    //WIP (we need to get the exact element to animate)
    this._anmImages3D.forEach((el, key) => {
      el.isTransitioning = true;

      const endAnimationFn = () => {
        this.onExit();
        parentFn();
      };

      if (el.elId === targetId) {
        el.onExitToDetails(endAnimationFn);
      } else {
        el.hideBanner();
      }
    });
  }

  update(updateInfo: UpdateInfo) {
    super.update(updateInfo);

    this._anmImages3D.forEach((el) => {
      el.update(updateInfo);
    });
  }
}
