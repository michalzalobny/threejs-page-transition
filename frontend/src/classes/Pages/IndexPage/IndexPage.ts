import { Page } from '../Page';
import { IndexPageCanvas } from './Canvas/IndexPageCanvas';

interface Constructor {
  pageId: string;
}

export class IndexPage extends Page {
  _pageCanvas: IndexPageCanvas;

  constructor({ pageId }: Constructor) {
    super({ pageId });

    this._pageCanvas = new IndexPageCanvas({});
  }
}
