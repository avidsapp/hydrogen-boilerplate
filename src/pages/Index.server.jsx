import {
  useShopQuery,
  flattenConnection,
  ProductProviderFragment,
  Image,
} from '@shopify/hydrogen';
import gql from 'graphql-tag';

import {Link} from '../components/Link.client';
import Layout from '../components/Layout.server';
import FeaturedCollection from '../components/FeaturedCollection.server';
import ProductCard from '../components/ProductCard.server';
import Welcome from '../components/Welcome.server';

function GradientBackground() {
  return (
    <div className="fixed top-0 w-full h-3/5 overflow-hidden">
      <div className="absolute w-full h-full bg-gradient-to-b from-black via-gray-900 to-transparent z-10" />
    </div>
  );
}

export default function Index({country = {isoCode: 'US'}}) {
  const {data} = useShopQuery({
    query: QUERY,
    variables: {
      country: country.isoCode,
    },
  });

  const collections = data ? flattenConnection(data.collections) : [];

  // var index = collections.findIndex(featured => featured.value === "featured");
  const featuredProductsCollection = collections[0];
  const onSaleCollection = collections[1];

  const featuredProducts = featuredProductsCollection
    ? flattenConnection(featuredProductsCollection.products)
    : null;
  const onSaleProducts = onSaleCollection
    ? flattenConnection(onSaleCollection.products)
    : null;

  const featuredCollection =
    collections && collections.length > 1 ? collections[0] : collections[0];

  return (
    <Layout hero={<GradientBackground />}>
      <div className="relative mb-12">
        <Welcome />

        {featuredProductsCollection ? (
          <>
          <div className="bg-white p-12 shadow-xl rounded-xl mb-10">
            <div className="flex justify-between items-center mb-8 text-md font-medium">
              <span className="text-black uppercase">
                {featuredProductsCollection.title}
              </span>
              <span className="hidden md:inline-flex">
                <Link
                  to={`/collections/${featuredProductsCollection.handle}`}
                  className="text-blue-600 hover:underline"
                >
                  Shop all
                </Link>
              </span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
              {featuredProducts.map((product) => (
                <div key={product.id}>
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
            <div className="md:hidden text-center">
              <Link
                to={`/collections/${featuredCollection.handle}`}
                className="text-blue-600"
              >
                Shop all
              </Link>
            </div>
          </div>
          </>
        ) : null}

        {onSaleCollection ? (
          <>
          <div className="bg-white p-12 shadow-xl rounded-xl mb-10">
            <div className="flex justify-between items-center mb-8 text-md font-medium">
              <span className="text-black uppercase">
                {onSaleCollection.title}
              </span>
              <span className="hidden md:inline-flex">
                <Link
                  to={`/collections/${onSaleCollection.handle}`}
                  className="text-blue-600 hover:underline"
                >
                  Shop all
                </Link>
              </span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
              {onSaleProducts.map((product) => (
                <div key={product.id}>
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
            <div className="md:hidden text-center">
              <Link
                to={`/collections/${onSaleCollection.handle}`}
                className="text-blue-600"
              >
                Shop all
              </Link>
            </div>
          </div>
          </>
        ) : null}

        {/* <FeaturedCollection collection={featuredCollection} /> */}
      </div>
    </Layout>
  );
}

const QUERY = gql`
  query indexContent(
    $country: CountryCode
    $numCollections: Int = 250
    $numProducts: Int = 3
    $numProductMetafields: Int = 0
    $numProductVariants: Int = 250
    $numProductMedia: Int = 1
    $numProductVariantMetafields: Int = 10
    $numProductVariantSellingPlanAllocations: Int = 0
    $numProductSellingPlanGroups: Int = 0
    $numProductSellingPlans: Int = 0
  ) @inContext(country: $country) {
    collections(first: $numCollections) {
      edges {
        node {
          descriptionHtml
          description
          handle
          id
          title
          image {
            ...ImageFragment
          }
          products(first: $numProducts) {
            edges {
              node {
                ...ProductProviderFragment
              }
            }
          }
        }
      }
    }
  }

  ${ProductProviderFragment}
  ${Image.Fragment}
`;
