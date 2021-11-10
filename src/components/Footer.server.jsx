import {Link} from './Link.client';
import { SocialIcon } from 'react-social-icons';

import CustomConfig from '/custom.config';

export default function Footer({collection, product}) {
  return (
    <footer role="contentinfo">
      <div className="relative bg-white border-t border-b border-black border-opacity-5">
        <div className="mx-auto max-w-7xl px-4 py-14 md:px-8 grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* eslint-disable-next-line @shopify/jsx-prefer-fragment-wrappers */}
          <div>
            <h2 className="text-md font-medium uppercase mb-4">Community</h2>
            <ul className="mt-8 space-y-0 footer-social-icons">
              <li className="text-sm font-medium text-gray-600 hover:text-gray-900">
                <SocialIcon
                  url={CustomConfig.instagramUrl}
                />
                Instagram
              </li>
              <li className="text-sm font-medium text-gray-600 hover:text-gray-900">
                <SocialIcon
                  url={CustomConfig.facebookUrl}
                />
                Facebook
              </li>
            </ul>
          </div>
          {/* eslint-disable-next-line @shopify/jsx-prefer-fragment-wrappers */}
          <div>
            <h2 className="text-md font-medium uppercase mb-4">Platform</h2>
            <ul className="mt-8 space-y-4">
              <li className="flex items-center text-sm font-medium text-gray-600 hover:text-gray-900">
                <Link to="/">Home</Link>
              </li>
              <li className="flex items-center text-sm font-medium text-gray-600 hover:text-gray-900">
                <Link to={`/products`}>Shop</Link>
              </li>
              <li className="flex items-center text-sm font-medium text-gray-600 hover:text-gray-900">
                <Link to={`/schools`}>Schools</Link>
              </li>
              <li className="flex items-center text-sm font-medium text-gray-600 hover:text-gray-900">
                <Link to={`/art`}>Art</Link>
              </li>
            </ul>
          </div>
          {/* eslint-disable-next-line @shopify/jsx-prefer-fragment-wrappers */}
          <div>
            <h2 className="text-md font-medium uppercase mb-4">Support</h2>
            <ul className="mt-8 space-y-4">
              <li className="flex items-center text-sm font-medium text-gray-600 hover:text-gray-900">
                <a href="https://shopify.dev/custom-storefronts/hydrogen">
                  Donate
                </a>
              </li>
              <li className="flex items-center text-sm font-medium text-gray-600 hover:text-gray-900">
                <Link to="/contact">Contact Us</Link>
              </li>
              <li className="flex items-center text-sm font-medium text-gray-600 hover:text-gray-900">
                <Link to="/contact">Privacy Policy</Link>
              </li>
              <li className="flex items-center text-sm font-medium text-gray-600 hover:text-gray-900">
                <Link to="/contact">Terms of Service</Link>
              </li>
              <li className="flex items-center text-sm font-medium text-gray-600 hover:text-gray-900">
                <Link to="/contact">Return Policy</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="py-6 px-4 md:px-8 bg-gray-50 text-center" id="footer"
        style={{
          backgroundImage: `url('${CustomConfig.websiteDomain}/img/metal.jpg')`,
          backgroundRepeat: 'repeat',
          backgroundSize: '120px',
        }}
      >
        <p>© {new Date().getFullYear()} {CustomConfig.companyName} | All Rights Reserved | <Link to="/support">Support</Link></p>
      </div>
    </footer>
  );
}
