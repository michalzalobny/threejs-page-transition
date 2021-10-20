import { CanvasApp } from 'classes/CanvasApp';
import { NextRouter } from 'next/router';
import { TextureItems } from 'types';

interface GlobalState {
  canvasApp: CanvasApp | null;
  isCanvasAppInit: boolean;
  currentPageId: string | null;
  textureItems: TextureItems;
  isAppTransitioning: boolean;
  router: NextRouter | null;
}

export const globalState: GlobalState = {
  canvasApp: null,
  isCanvasAppInit: false,
  currentPageId: null,
  textureItems: {},
  isAppTransitioning: false,
  router: null,
};
