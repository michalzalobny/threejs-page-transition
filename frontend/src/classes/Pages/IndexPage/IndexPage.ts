import { Page } from '../Page';

interface Constructor {
  pageId: string;
}

export class IndexPage extends Page {
  constructor({ pageId }: Constructor) {
    super({ pageId });
  }
}
