import React from 'react';

import { CardContent } from 'components/CardContent/CardContent';

export interface Props {
  moreLabel: string;
  title: string;
  frontImgSrc: string;
  elIndex: number;
  cardUid: string;
}

export const CardPreview = (props: Props) => {
  const { cardUid, elIndex, frontImgSrc, moreLabel, title } = props;
  return (
    <div
      data-curtain-uid={cardUid}
      data-curtain="wrapper"
      data-observer="none"
      className="card-preview"
    >
      <div
        className={`card-preview__container ${
          elIndex % 2 === 0 && 'card-preview__container--secondary'
        }`}
      >
        <div
          data-morelabel="hover"
          data-curtain="hover"
          className="card-preview__placeholder"
        >
          <CardContent
            elIndex={elIndex}
            whiteColor
            title={title}
            moreLabel={moreLabel}
          />

          <div className="card-preview__curtains-wrapper">
            <div
              data-curtain="top"
              className="card-preview__curtains-wrapper__top"
            >
              <div className="card-preview__curtains-wrapper__top__wrapper">
                <div className="card-preview__curtains-wrapper__top__wrapper__wrapper">
                  <CardContent
                    elIndex={elIndex}
                    title={title}
                    moreLabel={moreLabel}
                  />
                </div>
              </div>
            </div>

            <div
              data-curtain="bottom"
              className="card-preview__curtains-wrapper__bottom"
            >
              <div className="card-preview__curtains-wrapper__bottom__wrapper">
                <div className="card-preview__curtains-wrapper__bottom__wrapper__wrapper">
                  <CardContent
                    elIndex={elIndex}
                    title={title}
                    moreLabel={moreLabel}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <figure
        data-curtain-uid={cardUid}
        data-transition={cardUid}
        data-animation="image3d-landing"
        data-src={frontImgSrc}
        className="card-preview__img__wrapper"
      >
        <img className="card-preview__img" src={frontImgSrc} alt={title} />
      </figure>
    </div>
  );
};
