"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef, memo, JSX } from "react";
import { useSession, signOut } from "next-auth/react";
import { FaList, FaBars, FaTimes } from "react-icons/fa";
import { MdPersonOutline } from "react-icons/md";
import { throttle } from "lodash";

import SearchBar from "../atoms/SearchBar";
import { LOGO } from "@/constants/images";

const LEFT_MENU = [
  "Dashboard",
  "Alerts",
  "Disaster Map",
  "Safety Guidelines",
  "Rescue Center",
];
const RIGHT_MENU = ["News", "Data & Analytics", "Resources"];

const dropdownComponents: Record<string, JSX.Element> = {
  Dashboard: <p className="text-gray-600">Dashboard details coming soon.</p>,
  Alerts: <p className="text-gray-600">Alerts will be displayed here.</p>,
  "Disaster Map": <p className="text-gray-600">Interactive map coming soon.</p>,
};

function Navbar() {
  const { data: session } = useSession();
  const pathname = usePathname();

  const [scrollState, setScrollState] = useState({
    isScrolled: false,
    showSearchBar: false,
  });
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isHome = pathname === "/";
  const isWhiteBg = scrollState.isScrolled || activeMenu !== null;
  const showMenu = !isHome || (isHome && !scrollState.isScrolled);

  // define throttle function with proper type
  const handleScroll = useRef<() => void>(
    throttle(() => {
      if (window.location.pathname === "/") {
        const scrollY = window.scrollY;
        setScrollState({
          isScrolled: scrollY > 50,
          showSearchBar: scrollY > 400,
        });
      }
    }, 100)
  ).current;

  useEffect(() => {
    if (!isHome) {
      setScrollState({ isScrolled: true, showSearchBar: true });
      return;
    }
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHome, handleScroll]);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-colors duration-300 ${
        isWhiteBg ? "bg-white shadow-md" : "bg-transparent"
      }`}
      onMouseLeave={() => setActiveMenu(null)}
    >
      {/* Top bar */}
      <div
        className={`flex justify-between items-center px-4 md:px-10 lg:px-36 py-5 ${
          isWhiteBg ? "text-black" : "text-white"
        }`}
      >
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Image
            src={LOGO.light}
            alt="Logo"
            width={270}
            height={40}
            priority
            className={`transition duration-300 ${
              !isWhiteBg ? "invert brightness-0" : ""
            }`}
          />
        </Link>

        {/* Search bar (only for md+) */}
        <div
          className={`hidden md:block transition-all duration-300 ${
            scrollState.showSearchBar ? "opacity-100 w-1/2" : "opacity-0 w-0"
          } overflow-hidden`}
        >
          <SearchBar />
        </div>

        {/* Desktop right controls */}
        <div className="hidden md:flex items-center gap-4 md:gap-6 text-sm font-bold uppercase">
          <div className="hidden md:flex items-center gap-2">
            <span>Vietnam</span>
          </div>

          {!session ? (
            <Link
              href="/login"
              className="flex items-center gap-2 bg-primary px-4 py-2 rounded-full text-white hover:bg-orange-600 font-bold uppercase"
            >
              <MdPersonOutline size={20} />
              Sign In
            </Link>
          ) : (
            <button
              onClick={() => signOut({ callbackUrl: "/login" })}
              className="bg-red-600 px-4 py-2 rounded text-white font-bold uppercase hover:bg-red-700"
            >
              Logout
            </button>
          )}
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden text-xl"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Desktop menu items */}
      {showMenu && (
        <div className="hidden md:flex w-full px-4 md:px-10 lg:px-36 py-2 justify-between text-sm font-bold uppercase">
          <div className="flex gap-6">
            {LEFT_MENU.map((item, index) => (
              <button
                key={index}
                onMouseEnter={() => setActiveMenu(item)}
                className={`hover:text-primary transition flex items-center gap-2 ${
                  isWhiteBg ? "text-black" : "text-white"
                }`}
              >
                {index === 0 && <FaList className="w-4 h-4" />}
                {item}
              </button>
            ))}
          </div>

          <div className="hidden md:flex gap-6">
            {RIGHT_MENU.map((item, index) => (
              <button
                key={index}
                onMouseEnter={() => setActiveMenu(item)}
                className={`hover:text-primary transition ${
                  isWhiteBg ? "text-black" : "text-white"
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Mobile menu panel */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white w-full px-4 py-4 shadow-md border-t">
          <div className="flex flex-col gap-4">
            {LEFT_MENU.concat(RIGHT_MENU).map((item, index) => (
              <button
                key={index}
                onClick={() => setActiveMenu(item)}
                className="text-black font-bold text-left hover:text-primary transition"
              >
                {item}
              </button>
            ))}

            {!session ? (
              <Link
                href="/login"
                className="flex items-center gap-2 bg-primary px-4 py-2 rounded-full text-white hover:bg-orange-600 font-bold uppercase"
              >
                <MdPersonOutline size={20} />
                Sign In
              </Link>
            ) : (
              <button
                onClick={() => signOut({ callbackUrl: "/login" })}
                className="bg-red-600 px-4 py-2 rounded text-white font-bold uppercase hover:bg-red-700"
              >
                Logout
              </button>
            )}
          </div>
        </div>
      )}

      {/* Dropdown menu */}
      {activeMenu && (
        <div className="absolute left-0 w-full bg-white max-h-[75vh] shadow-lg border-t z-50">
          <div className="container mx-auto px-4 md:px-10 lg:px-36 py-8">
            {dropdownComponents[activeMenu] || (
              <p className="text-gray-600">
                Content for {activeMenu} will be available soon.
              </p>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

export default memo(Navbar);
