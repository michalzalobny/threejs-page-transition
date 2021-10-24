import React, { useEffect } from 'react';
import { useRouter } from 'next/router';

import { RichText } from 'components/RichText/RichText';
import { globalState } from 'utils/globalState';
import { Head } from 'seo/Head/Head';

import { Props } from './data';

export default function DetailsPage(props: Props) {
  const { card, cardsCms } = props;

  const router = useRouter();

  useEffect(() => {
    const imagesToPreload = cardsCms.map((card) => card.imageSrc);
    window.requestAnimationFrame(() => {
      if (globalState.canvasApp)
        globalState.canvasApp.imagesToPreload = imagesToPreload;
    });
  }, [cardsCms]);

  return (
    <>
      <Head
        description={card.description}
        ogImageSrc={card.imageSrc}
        title={card.name}
        ogType="website"
      />

      <div data-page="wrapper" className="details__wrapper">
        <button className="details__back-btn" onClick={() => router.push('/')}>
          <span
            data-animation="bottomhide"
            className="details__back-btn__label"
          >
            Back
          </span>
        </button>

        <div data-scroll="page">
          <span className="details__title__wrapper">
            <h1 data-animation="bottomhide" className="details__title">
              <RichText text={card.name} />
            </h1>
          </span>

          <figure
            data-curtain-uid={card.uid}
            data-transition="details"
            data-animation="image3d"
            data-src={card.imageSrc}
            className="details__img__wrapper"
          >
            <img src={card.imageSrc} className="details__img" alt={card.name} />
          </figure>
          <div className="details__container">
            <p data-animation="paragraph" className="details__p">
              {card.description}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
