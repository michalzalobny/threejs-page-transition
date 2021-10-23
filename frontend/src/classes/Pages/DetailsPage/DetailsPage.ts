import { UpdateInfo, Bounds, ExitFn } from 'types';

import { Page } from '../Page';
import { DetailsPageCanvas } from './Canvas/DetailsPageCanvas';
import { InteractiveScene } from '../../Components/InteractiveScene';

interface Constructor {
  pageId: string;
}

export class DetailsPage extends Page {
  _pageCanvas: DetailsPageCanvas;

  constructor({ pageId }: Constructor) {
    super({ pageId });

    this._pageCanvas = new DetailsPageCanvas({});
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

  animateIn() {
    super.animateIn();
    this._pageCanvas.animateIn();
  }

  onExitToIndex(props: ExitFn) {
    const { parentFn, targetId } = props;
    //It executes the functions that onExit() normally executes (WIP)
    this._animateOut();

    this._removeListeners();

    const updatedParentFn = () => {
      parentFn();
      this._resetScrollValues();
    };

    this._pageCanvas.onExitToIndex({ parentFn: updatedParentFn, targetId });
  }

  setInteractiveScene(scene: InteractiveScene) {
    this._pageCanvas.setInteractiveScene(scene);
  }

  update(updateInfo: UpdateInfo) {
    super.update(updateInfo);
    this._pageCanvas.update(updateInfo);
  }
}
