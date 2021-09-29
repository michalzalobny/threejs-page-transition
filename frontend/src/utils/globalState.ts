import { App } from "classes/App";
import { ReactRouterHandler } from "classes/ReactRouteHandler";

interface GlobalState {
  isTransitioning: boolean;
  isTransitioned: boolean;
  app: App | null;
  reactRouterHandler: ReactRouterHandler | null;
  isPageTrackerActive: boolean;
}

export const globalState: GlobalState = {
  isTransitioning: false,
  isTransitioned: true,
  app: null,
  reactRouterHandler: null,
  isPageTrackerActive: false,
};
