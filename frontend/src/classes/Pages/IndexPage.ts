import { Page } from './Page';

interface Constructor {
  wrapper: string;
  pageId: string;
}

export class IndexPage extends Page {
  constructor({ pageId, wrapper }: Constructor) {
    super({ pageId, wrapper });
  }
}
