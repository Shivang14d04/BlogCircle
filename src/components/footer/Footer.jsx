import { Link } from "react-router-dom";
import Logo from "../logo";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden py-10 bg-[#F2F4F3] border-t border-[#0A0908]/20">
      <div className="relative z-10 mx-auto max-w-7xl px-4">
        <div className="flex flex-wrap -m-6">
          {/* Logo & Copyright */}
          <div className="w-full p-6 md:w-1/2 lg:w-5/12">
            <div className="flex flex-col justify-between h-full">
              <div className="mb-4 inline-flex items-center">
                <Logo width="120px" />
              </div>
              <p className="text-sm text-[#0A0908]/70">
                &copy; {new Date().getFullYear()} All Rights Reserved by DevUI.
              </p>
            </div>
          </div>

          {/* Company */}
          <div className="w-full p-6 md:w-1/2 lg:w-2/12">
            <h3 className="tracking-wide mb-6 text-sm font-semibold uppercase text-[#0A0908]/70">
              Company
            </h3>
            <ul className="space-y-4">
              {["Features", "Pricing", "Affiliate Program", "Press Kit"].map((item) => (
                <li key={item}>
                  <Link
                    className="text-base font-medium text-[#0A0908] hover:text-[#0A0908]/80 transition-colors duration-200"
                    to="/"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div className="w-full p-6 md:w-1/2 lg:w-2/12">
            <h3 className="tracking-wide mb-6 text-sm font-semibold uppercase text-[#0A0908]/70">
              Support
            </h3>
            <ul className="space-y-4">
              {["Account", "Help", "Contact Us", "Customer Support"].map((item) => (
                <li key={item}>
                  <Link
                    className="text-base font-medium text-[#0A0908] hover:text-[#0A0908]/80 transition-colors duration-200"
                    to="/"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legals */}
          <div className="w-full p-6 md:w-1/2 lg:w-3/12">
            <h3 className="tracking-wide mb-6 text-sm font-semibold uppercase text-[#0A0908]/70">
              Legals
            </h3>
            <ul className="space-y-4">
              {["Terms & Conditions", "Privacy Policy", "Licensing"].map((item) => (
                <li key={item}>
                  <Link
                    className="text-base font-medium text-[#0A0908] hover:text-[#0A0908]/80 transition-colors duration-200"
                    to="/"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
