import {useShopQuery, flattenConnection, Image} from '@shopify/hydrogen';
import gql from 'graphql-tag';

import Header from './Header.client';
import Footer from './Footer.server';
import {useCartUI} from './CartUIProvider.client';
import Cart from './Cart.client';

import CustomConfig from '/custom.config';

export default function Layout({children, hero}) {
  const {data} = useShopQuery({
    query: QUERY,
    variables: {
      numCollections: 250,
    },
    cache: {
      maxAge: 60,
      staleWhileRevalidate: 60 * 10,
    },
  });
  const {isCartOpen, closeCart} = useCartUI();
  const collections = data ? flattenConnection(data.collections) : null;
  const products = data ? flattenConnection(data.products) : null;
  const storeName = data ? data.shop.name : '';

  return (
    <>
      <div className="absolute top-0 left-0">
        <a
          href="#mainContent"
          className="p-4 focus:block sr-only focus:not-sr-only"
        >
          Skip to content
        </a>
      </div>
      <div className={`min-h-screen max-w-screen ${CustomConfig.fontPrimaryColor} font-sans`}>
        <Header collections={collections} storeName={storeName} />
        {/* eslint-disable-next-line @shopify/jsx-prefer-fragment-wrappers */}
        <div>
          <div
            className={`z-50 fixed top-0 bottom-0 left-0 right-0 bg-black transition-opacity duration-400 ${
              isCartOpen ? 'opacity-20' : 'opacity-0 pointer-events-none'
            }`}
            onClick={isCartOpen ? closeCart : null}
          />
          <Cart />
        </div>
        <main role="main" id="mainContent" className="relative bg-gray-50">
          {hero}
          <div className="mx-auto max-w-7xl p-4 md:py-5 md:px-8">
            {children}
          </div>
        </main>
        <Footer collection={collections[0]} product={products[0]} />
      </div>
    </>
  );
}

const QUERY = gql`
  query indexContent($numCollections: Int!) {
    shop {
      name
    }
    collections(first: $numCollections) {
      edges {
        node {
          description
          handle
          id
          title
          image {
            ...ImageFragment
          }
        }
      }
    }
    products(first: 1) {
      edges {
        node {
          handle
        }
      }
    }
  }
  ${Image.Fragment}
`;
