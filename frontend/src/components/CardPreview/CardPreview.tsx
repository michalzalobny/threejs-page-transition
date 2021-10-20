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
    <div className="card-preview">
      <div
        className={`card-preview__container ${
          elIndex % 2 === 0 && 'card-preview__container--secondary'
        }`}
      >
        <CardContent title={title} moreLabel={moreLabel} />
      </div>

      <figure data-src={frontImgSrc} className="card-preview__img__wrapper">
        <img className="card-preview__img" src={frontImgSrc} alt={title} />
      </figure>
    </div>
  );
};
