import { App } from "classes/App";

interface GlobalState {
  isTransitioning: boolean;
  isTransitioned: boolean;
  app: App | null;
}

export const globalState: GlobalState = {
  isTransitioning: false,
  isTransitioned: true,
  app: null,
};
