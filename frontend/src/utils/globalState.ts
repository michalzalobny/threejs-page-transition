import { CanvasApp } from 'classes/CanvasApp';
import { TextureItems } from '../classes/types';

interface GlobalState {
  canvasApp: CanvasApp | null;
  isCanvasAppInit: boolean;
  currentPageId: string | null;
  textureItems: TextureItems;
}

export const globalState: GlobalState = {
  canvasApp: null,
  isCanvasAppInit: false,
  currentPageId: null,
  textureItems: {},
};
