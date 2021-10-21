import { UpdateInfo, Bounds, ExitFn } from 'types';

import { Page } from '../Page';
import { IndexPageCanvas } from './Canvas/IndexPageCanvas';
import { InteractiveScene } from '../../Components/InteractiveScene';
import { Curtain } from '../../HTMLComponents/Curtain';

interface Constructor {
  pageId: string;
}

export class IndexPage extends Page {
  static anmCurtain = '[data-curtain="wrapper"]';

  _pageCanvas: IndexPageCanvas;
  _anmCurtains: Curtain[] = [];

  constructor({ pageId }: Constructor) {
    super({ pageId });

    this._pageCanvas = new IndexPageCanvas({});
    this._pageCanvas.scrollValues = this._scrollValues;
  }

  setRendererBounds(bounds: Bounds) {
    super.setRendererBounds(bounds);

    this._pageCanvas.setRendererBounds(bounds);
  }

  onEnter(el: HTMLElement) {
    super.onEnter(el);

    if (!this._pageEl) return;

    const curtains = Array.from(
      this._pageEl.querySelectorAll(IndexPage.anmCurtain),
    ) as HTMLElement[];

    this._anmCurtains = curtains.map((el) => {
      return new Curtain({ element: el });
    });

    this._pageCanvas.onEnter(el);
  }

  onAssetsLoaded() {
    super.onAssetsLoaded();
    this._pageCanvas.onAssetsLoaded();
  }

  onExit() {
    super.onExit();
    this._pageCanvas.onExit();
  }

  animateIn() {
    super.animateIn();
    this._pageCanvas.animateIn();
  }

  onExitToDetails(props: ExitFn) {
    //It executes the functions that onExit() normally executes (WIP)
    this._animateOut();
    this._removeListeners();
    this._anmCurtains.forEach((el) => {
      el.closeCurtains();
    });
    this._pageCanvas.onExitToDetails(props);
  }

  setInteractiveScene(scene: InteractiveScene) {
    this._pageCanvas.setInteractiveScene(scene);
  }

  _removeListeners() {
    super._removeListeners();

    this._anmCurtains.forEach((el) => {
      el.removeListeners();
    });
  }

  update(updateInfo: UpdateInfo) {
    super.update(updateInfo);
    this._pageCanvas.update(updateInfo);
  }
}
