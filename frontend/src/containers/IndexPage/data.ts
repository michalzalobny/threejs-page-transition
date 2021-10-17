import { GetStaticProps } from 'next';
import Prismic from '@prismicio/client';
// import Prismic from 'prismic-javascript';

import { client } from 'utils/prismic/client';

import { ISR_TIMEOUT } from 'utils/prismic/isrTimeout';

// interface PageData {
//   head: HeadProps;
//   name: string;
// }

// export interface IndexPageProps {
//   pageData: PageData;
// }

// async function getPageData(locale: string) {
//   return cmsApiClient
//     .query({
//       query: gql`
//       {
//         indexPages(where: { language: { code: "${locale}" } }) {
//           head {
//             title,
//             description,
//             ogType,
//             ogImage {
//               url
//             }
//           },
//           name
//         }
//       }
//     `,
//     })
//     .then((response) => response.data.indexPages[0]);
// }

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  // const pageData = await getPageData(locale);

  const t = await client.query(
    Prismic.Predicates.at('document.type', 'layout'),
  );

  const a = await client.query(Prismic.Predicates.at('document.type', 'card'));

  return {
    props: {
      t: t.results,
      a: a.results,
      // pageData,
    },
    revalidate: ISR_TIMEOUT,
  };
};
