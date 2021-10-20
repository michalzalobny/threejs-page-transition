import React from 'react';

import { RichText } from 'components/RichText/RichText';

export interface Props {
  moreLabel: string;
  title: string;
  frontImgSrc: string;
  elIndex: string;
}

export const CardPreview = (props: Props) => {
  const { elIndex, frontImgSrc, moreLabel, title } = props;
  return (
    <div className="card-preview">
      <div className="card-preview__container">
        <div className="card-preview__text-wrapper">
          <figure data-src={frontImgSrc} className="card-preview__img__wrapper">
            <img className="card-preview__img" src={frontImgSrc} alt={title} />
          </figure>
          <h2 className="card-preview__text-wrapper__text">
            <RichText text={title} />
          </h2>
        </div>
      </div>
    </div>
  );
};
