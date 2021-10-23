import React from 'react';

import { RichText } from 'components/RichText/RichText';

export interface Props {
  moreLabel: string;
  title: string;
  whiteColor?: boolean;
}

export const CardContent = (props: Props) => {
  const { whiteColor, moreLabel, title } = props;
  return (
    <div className="card-content">
      <div className="card-content__text-wrapper">
        <h2
          data-observer="none"
          data-animation="bottomhide"
          className={`card-content__text-wrapper__text ${
            whiteColor && 'card-content__text-wrapper__text--white'
          }`}
        >
          <RichText text={title} />
        </h2>
      </div>
    </div>
  );
};
