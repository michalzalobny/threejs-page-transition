import React from 'react';
import clsx from 'clsx';

import { LinkHandler } from 'components/LinkHandler/LinkHandler';
import { useRouter } from 'next/router';
import sharedStyles from 'utils/sharedStyles.module.scss';

import styles from './Layout.module.scss';

export const Layout = () => {
  const router = useRouter();

  return (
    <>
      <div className={styles.authorWrapper}>
        <span className={sharedStyles.text}>
          NextJS page tansitions with ThreeJS by
        </span>
        <span className={styles.contactSpacer} />
        <LinkHandler isExternal elHref="https://creativeprojects.vercel.app/">
          <span
            className={clsx(
              sharedStyles.text,
              sharedStyles.textBold,
              sharedStyles.textUnderline,
            )}
          >
            Michal Zalobny
          </span>
        </LinkHandler>
      </div>

      <div className={styles.inspiredWrapper}>
        <LinkHandler isExternal elHref="https://www.nowherehq.com/#home">
          <span className={clsx(sharedStyles.text, sharedStyles.textUnderline)}>
            Inspired by Nowhere
          </span>
        </LinkHandler>
      </div>

      <div className={styles.gitWrapper}>
        <LinkHandler
          isExternal
          elHref="https://github.com/javusScriptus/threejs-page-transition/tree/master/frontend"
        >
          <span className={clsx(sharedStyles.text, sharedStyles.textUnderline)}>
            GitHub repo
          </span>
        </LinkHandler>
      </div>
    </>
  );
};
