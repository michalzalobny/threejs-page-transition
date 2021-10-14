import { Page } from '../Page';
import { IndexPageCanvas } from './Canvas/IndexPageCanvas';
import { InteractiveScene } from '../../InteractiveScene';
import { UpdateInfo, Bounds } from '../../types';

interface Constructor {
  pageId: string;
}

export class IndexPage extends Page {
  _pageCanvas: IndexPageCanvas;

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

  setInteractiveScene(scene: InteractiveScene) {
    this._pageCanvas.setInteractiveScene(scene);
  }

  update(updateInfo: UpdateInfo) {
    super.update(updateInfo);
    this._pageCanvas.update(updateInfo);
  }
}
