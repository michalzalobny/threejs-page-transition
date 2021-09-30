import { CanvasApp } from 'classes/CanvasApp';
import { ReactRouterHandler } from 'classes/ReactRouteHandler';

interface GlobalState {
  isTransitioning: boolean;
  isTransitioned: boolean;
  canvasApp: CanvasApp | null;
  reactRouterHandler: ReactRouterHandler | null;
  isPageTrackerActive: boolean;
}

export const globalState: GlobalState = {
  isTransitioning: false,
  isTransitioned: true,
  canvasApp: null,
  reactRouterHandler: null,
  isPageTrackerActive: false,
};
