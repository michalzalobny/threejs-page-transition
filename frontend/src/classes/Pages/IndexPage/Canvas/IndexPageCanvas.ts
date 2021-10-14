import { PageCanvas } from '../../PageCanvas';
import { InteractiveScene } from '../../../InteractiveScene';
import { Image3D } from './Components/Image3D';
import { Bounds, UpdateInfo } from '../../../types';

import { globalState } from 'utils/globalState';

interface Constructor {}

export class IndexPageCanvas extends PageCanvas {
  static anmImage3D = '[data-animation="image3d"]';

  _anmImages3D: Image3D[] = [];

  constructor(props: Constructor) {
    super({});
  }

  setInteractiveScene(scene: InteractiveScene) {
    super.setInteractiveScene(scene);
  }

  onEnter(el: HTMLElement) {
    super.onEnter(el);

    if (!this._pageEl) {
      return;
    }

    const medias = Array.from(
      this._pageEl.querySelectorAll(IndexPageCanvas.anmImage3D),
    ) as HTMLElement[];

    this._anmImages3D = medias.map((el) => {
      return new Image3D({ geometry: this._planeGeometry, domEl: el });
    });

    this._anmImages3D.forEach((el) => {
      if (this._interactiveScene) {
        this._scrollValues && el.setScrollValues(this._scrollValues);
        el.rendererBounds = this._rendererBounds;
        this._interactiveScene.add(el);
      }
    });
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

  onExit() {}

  update(updateInfo: UpdateInfo) {
    super.update(updateInfo);

    this._anmImages3D.forEach((el) => {
      el.update(updateInfo);
    });
  }
}
