import React, { useEffect } from 'react';

import { globalState } from 'utils/globalState';
import { CardPreview } from 'components/CardPreview/CardPreview';

import { Props } from './data';

export default function IndexPage(props: Props) {
  const { cardsCms } = props;

  useEffect(() => {
    const imagesToPreload = cardsCms.map((card) => card.imageSrc);
    window.requestAnimationFrame(() => {
      if (globalState.canvasApp)
        globalState.canvasApp.imagesToPreload = imagesToPreload;
    });
  }, [cardsCms]);

  return (
    <>
      <div className="index__wrapper">
        {cardsCms.map((el, key) => (
          <CardPreview
            key={el.uid}
            title={el.name}
            frontImgSrc={el.imageSrc}
            moreLabel="more"
            elIndex={key + 1}
          />
        ))}
      </div>
    </>
  );
}
