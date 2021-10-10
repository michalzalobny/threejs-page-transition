import { Page } from '../Page';

interface Constructor {
  pageId: string;
}

export class DetailsPage extends Page {
  constructor({ pageId }: Constructor) {
    super({ pageId });
  }
}
