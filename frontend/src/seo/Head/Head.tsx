import NextHead from 'next/head';
import React from 'react';
import { useRouter } from 'next/router';
import { getFrontHost } from 'utils/functions/getFrontHost';
import { stripHtml } from 'utils/functions/stripHtml';

import { GoogleAnalytics } from '../GoogleAnalytics/GoogleAnalytics';

export interface HeadProps {
  title: string;
  description: string;
  ogType: string;
  ogImageSrc: string;
}

export const Head = (props: HeadProps) => {
  const { title, description, ogType, ogImageSrc } = props;

  const router = useRouter();
  const frontHost = getFrontHost();

  return (
    <NextHead>
      <title>{stripHtml(title)}</title>
      <meta name="description" content={stripHtml(description)} />
      <link rel="icon" href={`${frontHost}/favicon.ico`} />

      <meta property="og:type" content={ogType} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={`${frontHost}${router.pathname}`} />
      {ogImageSrc && <meta property="og:image" content={`${ogImageSrc}`} />}

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />

      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, shrink-to-fit=no"
      />

      <GoogleAnalytics />
    </NextHead>
  );
};
