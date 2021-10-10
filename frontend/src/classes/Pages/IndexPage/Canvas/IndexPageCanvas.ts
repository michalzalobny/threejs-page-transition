import { UpdateInfo, Bounds, AnimateProps } from '../../../types';
import { Scroll } from '../../../Singletons/Scroll';

interface Constructor {
  scroll: Scroll;
}

export class IndexPageCanvas {
  _scroll: Scroll;
  constructor(props: Constructor) {
    this._scroll = props.scroll;
  }
}
