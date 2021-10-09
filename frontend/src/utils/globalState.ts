import { CanvasApp } from 'classes/CanvasApp';

interface GlobalState {
  canvasApp: CanvasApp | null;
  isCanvasAppInit: boolean;
  currentPageId: string | null;
}

export const globalState: GlobalState = {
  canvasApp: null,
  isCanvasAppInit: false,
  currentPageId: null,
};
