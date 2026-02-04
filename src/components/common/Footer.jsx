import React from "react";
import logo from './../../public/logo.jpg';

const defaultFooterData = {
  brand: {
    name: "ShopVerse",
    logo: logo,
    href: "/",
  },
  columns: [
    {
      title: "Shop",
      links: [
        { label: "New Arrivals", href: "/collections/new" },
        { label: "Best Sellers", href: "/collections/best" },
        { label: "Sale", href: "/collections/sale" },
      ],
    },
    {
      title: "Support",
      links: [
        { label: "Help Center", href: "/help" },
        { label: "Shipping & Returns", href: "/policies/shipping" },
        { label: "Order Tracking", href: "/orders/track" },
      ],
    },
    {
      title: "Company",
      links: [
        { label: "About Us", href: "/about" },
        { label: "Careers", href: "/careers" },
        { label: "Contact", href: "/contact" },
      ],
    },
  ],
  social: [
    {
      label: "Facebook",
      href: "https://facebook.com",
      icon: (
        <svg
          className="w-5 h-5"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            fillRule="evenodd"
            d="M13.135 6H15V3h-1.865a4.147 4.147 0 0 0-4.142 4.142V9H7v3h2v9.938h3V12h2.021l.592-3H12V6.591A.6.6 0 0 1 12.592 6h.543Z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
    {
      label: "Instagram",
      href: "https://instagram.com",
      icon: (
        <svg
          className="w-5 h-5"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M7 2C4.243 2 2 4.243 2 7v10c0 2.757 2.243 5 5 5h10c2.757 0 5-2.243 5-5V7c0-2.757-2.243-5-5-5H7zm0 2h10c1.654 0 3 1.346 3 3v10c0 1.654-1.346 3-3 3H7c-1.654 0-3-1.346-3-3V7c0-1.654 1.346-3 3-3zm11 1a1 1 0 110 2 1 1 0 010-2zM12 7a5 5 0 100 10 5 5 0 000-10zm0 2a3 3 0 110 6 3 3 0 010-6z" />
        </svg>
      ),
    },
    {
      label: "Twitter/X",
      href: "https://twitter.com",
      icon: (
        <svg
          className="w-5 h-5"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M13.795 10.533 20.68 2h-3.073l-5.255 6.517L7.69 2H1l7.806 10.91L1.47 22h3.074l5.705-7.07L15.31 22H22l-8.205-11.467Zm-2.38 2.95L9.97 11.464 4.36 3.627h2.31l4.528 6.317 1.443 2.02 6.018 8.409h-2.31l-4.934-6.89Z" />
        </svg>
      ),
    },
    {
      label: "GitHub",
      href: "https://github.com",
      icon: (
        <svg
          className="w-5 h-5"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            fillRule="evenodd"
            d="M12.006 2a9.847 9.847 0 0 0-6.484 2.44 10.32 10.32 0 0 0-3.393 6.17 10.48 10.48 0 0 0 1.317 6.955 10.045 10.045 0 0 0 5.4 4.418c.504.095.683-.223.683-.494 0-.245-.01-1.052-.014-1.908-2.78.62-3.366-1.21-3.366-1.21a2.711 2.711 0 0 0-1.11-1.5c-.907-.637.07-.621.07-.621.317.044.62.163.885.346.266.183.487.426.647.71.135.253.318.476.538.655a2.079 2.079 0 0 0 2.37.196c.045-.52.27-1.006.635-1.37-2.219-.259-4.554-1.138-4.554-5.07a4.022 4.022 0 0 1 1.031-2.75 3.77 3.77 0 0 1 .096-2.713s.839-.275 2.749 1.05a9.26 9.26 0 0 1 5.004 0c1.906-1.325 2.74-1.05 2.74-1.05.37.858.406 1.828.101 2.713a4.017 4.017 0 0 1 1.029 2.75c0 3.939-2.339 4.805-4.564 5.058a2.471 2.471 0 0 1 .679 1.897c0 1.372-.012 2.477-.012 2.814 0 .272.18.592.687.492a10.05 10.05 0 0 0 5.388-4.421 10.473 10.473 0 0 0 1.313-6.948 10.32 10.32 0 0 0-3.39-6.165A9.847 9.847 0 0 0 12.007 2Z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
  ],
  copyright: {
    year: new Date().getFullYear(),
  },
};


// Main Footer Component

const Footer = ({ data = defaultFooterData }) => {
  const { brand, columns, social, copyright } = data;

  return (
    <footer className="bg-neutral-primary-soft">
      <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
        <div className="md:flex md:justify-between">
          <div className="mb-6 md:mb-0">
            <a href={brand.href} className="flex items-center">
              <img src={brand.logo} className="h-7 me-3" alt={brand.name} />
              <span className="text-heading self-center text-2xl font-semibold whitespace-nowrap">
                {brand.name}
              </span>
            </a>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
            {columns.map((col) => (
              <div key={col.title}>
                <h2 className="mb-6 text-sm font-semibold text-heading uppercase">
                  {col.title}
                </h2>
                <ul className="text-body font-medium">
                  {col.links.map((link) => (
                    <li className="mb-4" key={link.label}>
                      <a href={link.href} className="hover:underline">
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <hr className="my-6 border-default sm:mx-auto lg:my-8" />

        <div className="sm:flex sm:items-center sm:justify-between">
          <span className="text-sm text-body sm:text-center">
            © {copyright.year}{" "}
            <a href={brand.href} className="hover:underline">
              {brand.name}
            </a>
            . All Rights Reserved.
          </span>

          <div className="flex mt-4 sm:justify-center sm:mt-0">
            {social.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-body hover:text-heading ms-5 first:ms-0"
                aria-label={item.label}
              >
                {item.icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};




export default Footer;