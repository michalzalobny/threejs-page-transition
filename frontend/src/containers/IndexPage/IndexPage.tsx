import React, { useEffect } from 'react';

import { globalState } from 'utils/globalState';
import { CardPreview } from 'components/CardPreview/CardPreview';
import { Head } from 'seo/Head/Head';

import { Props } from './data';

export default function IndexPage(props: Props) {
  const { head, cardsCms } = props;

  useEffect(() => {
    const imagesToPreload = cardsCms.map((card) => card.imageSrc);
    window.requestAnimationFrame(() => {
      if (globalState.canvasApp)
        globalState.canvasApp.imagesToPreload = imagesToPreload;
    });
  }, [cardsCms]);

  return (
    <>
      <Head {...head} />
      <div className="index__wrapper">
        {cardsCms.map((el, key) => (
          <CardPreview
            cardUid={el.uid}
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
