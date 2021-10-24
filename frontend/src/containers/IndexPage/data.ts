import { GetStaticProps } from 'next';

import { getCards, Card } from 'utils/prismic/queries/getCards';
import { getLayout, Layout } from 'utils/prismic/queries/getLayout';
import { getSeoHead } from 'utils/prismic/queries/getSeoHead';
import { HeadProps } from 'seo/Head/Head';

import { ISR_TIMEOUT } from 'utils/prismic/isrTimeout';

export interface Props {
  cardsCms: Card[];
  head: HeadProps;
  layout: Layout;
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const cards = await getCards();
  const layout = await getLayout();
  const head = await getSeoHead('indexpage');

  return {
    props: {
      cardsCms: cards,
      layout,
      head,
    },
    revalidate: ISR_TIMEOUT,
  };
};
