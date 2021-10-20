import React from 'react';

import { CardContent } from 'components/CardContent/CardContent';

export interface Props {
  moreLabel: string;
  title: string;
  frontImgSrc: string;
  elIndex: number;
}

export const CardPreview = (props: Props) => {
  const { elIndex, frontImgSrc, moreLabel, title } = props;
  return (
    <div data-curtain="wrapper" className="card-preview">
      <div
        className={`card-preview__container ${
          elIndex % 2 === 0 && 'card-preview__container--secondary'
        }`}
      >
        <div className="card-preview__curtains-wrapper">
          <div className="card-preview__curtains-wrapper__ghost-color">
            <CardContent whiteColor title={title} moreLabel={moreLabel} />
          </div>
          <div
            data-curtain="top"
            className="card-preview__curtains-wrapper__top"
          >
            <div className="card-preview__curtains-wrapper__top__wrapper">
              <div className="card-preview__curtains-wrapper__top__wrapper__wrapper">
                <CardContent title={title} moreLabel={moreLabel} />
              </div>
            </div>
          </div>

          <div
            data-curtain="bottom"
            className="card-preview__curtains-wrapper__bottom"
          >
            <div className="card-preview__curtains-wrapper__bottom__wrapper">
              <div className="card-preview__curtains-wrapper__bottom__wrapper__wrapper">
                <CardContent title={title} moreLabel={moreLabel} />
              </div>
            </div>
          </div>
        </div>
      </div>

      <figure data-src={frontImgSrc} className="card-preview__img__wrapper">
        <img className="card-preview__img" src={frontImgSrc} alt={title} />
      </figure>
    </div>
  );
};
