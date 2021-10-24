import Prismic from '@prismicio/client';

import { client } from 'utils/prismic/client';

export interface Layout {
  readmore: string;
}

const queryLayout = async () =>
  client.query(Prismic.Predicates.at('document.type', 'layout'));

export const getLayout = async (): Promise<Layout> => {
  const queriedLayout = await queryLayout();

  const layout: Layout = queriedLayout.results[0].data;

  return layout;
};
