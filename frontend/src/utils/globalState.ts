import { CanvasApp } from 'classes/CanvasApp';

interface GlobalState {
  canvasApp: CanvasApp | null;
  isPageTrackerActive: boolean;
  isCanvasAppInit: boolean;
}

export const globalState: GlobalState = {
  canvasApp: null,
  isPageTrackerActive: false,
  isCanvasAppInit: false,
};
