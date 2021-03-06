import {useState} from 'react';
import {Link} from '@shopify/hydrogen/client';

import CartToggle from './CartToggle.client';
import CurrencySelector from './CurrencySelector.client';
import Navigation from './Navigation.client';
import MobileNavigation from './MobileNavigation.client';

import CustomConfig from '/custom.config';

export default function Header({collections, storeName}) {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  return (
    <header className="h-20 lg:h-32" role="banner">
      <div
        style={{
          backgroundImage: `url('${CustomConfig.websiteDomain}/img/metal.jpg')`,
          backgroundRepeat: 'repeat',
          backgroundSize: '120px',
        }}
        className={`bg-local fixed z-20 h-20 lg:h-32 w-full px-6 md:px-8 md:py-6 lg:pt-8 lg:pb-0 mx-auto bg-black ${
          isMobileNavOpen ? '' : 'bg-opacity-95'
        }`}
      >
        <div className="h-full flex lg:flex-col place-content-between">
          <div className="text-center w-full flex justify-between items-center">
            <CurrencySelector />
            <MobileNavigation
              collections={collections}
              isOpen={isMobileNavOpen}
              setIsOpen={setIsMobileNavOpen}
            />
            <Link
              className={`font-black uppercase text-3xl tracking-widest ${CustomConfig.fontPrimaryColor} ${CustomConfig.fontHoverPrimaryColor}`}
              id='store-name'
              to="/"
            >
              {storeName}
            </Link>
            <CartToggle
              handleClick={() => {
                if (isMobileNavOpen) setIsMobileNavOpen(false);
              }}
            />
          </div>
          <Navigation collections={collections} storeName={storeName} />
        </div>
      </div>
    </header>
  );
}
