import Prismic from '@prismicio/client';

import { client } from 'utils/prismic/client';
import { HeadProps } from 'seo/Head/Head';

const queryPage = async (name: string) =>
  client.query(Prismic.Predicates.at('document.type', name));

export const getSeoHead = async (name: string): Promise<HeadProps> => {
  const page = await queryPage(name);

  const head: HeadProps = {
    description: page.results[0].data.body[0].primary.description,
    ogImageSrc: page.results[0].data.body[0].primary.image.url,
    ogType: page.results[0].data.body[0].primary.type,
    title: page.results[0].data.body[0].primary.title,
  };

  return head;
};
