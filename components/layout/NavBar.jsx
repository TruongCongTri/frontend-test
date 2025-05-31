"use client";

import { useState } from "react";
import Link from "next/link";
import LoginButton from "@/components/ui/actions/LoginButton";
import LogoutButton from "@/components/ui/actions/LogoutButton";
import SearchInput from "@/components/form/fields/SearchInput";
import SearchInputIcon from "@/components/form/fields/SearchIcon";
import SearchDrawer from "./SearchDrawer";
import ProfileButton from "@/components/ui/actions/ProfileButton";
import { Menu, X } from "lucide-react";

export default function NavBar({ isAuthenticated = false, phoneData = null }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [drawerOpen, setSearchOpen] = useState(false);
  const handleClose = () => setMenuOpen(false);
  const handleSearchClose = () => setSearchOpen(false);
  const handleSearchOpen = () => {
    setSearchOpen(true);
    setMenuOpen(false); // close nav if opening search
  };
  const handleMenu = () => {
    setMenuOpen(!menuOpen); // toggle mobile nav
    setSearchOpen(false); // close search drawer if opening nav
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black border-b border-gray-700 px-4 py-3 shadow-md backdrop-blur-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="text-white font-bold text-xl"
            onClick={handleClose}
          >
            <span className="md:hidden">GS</span>
            <span className="hidden md:inline">Github Search</span>
          </Link>
          {/* Search - Desktop */}
          <div className="hidden md:block">
            {isAuthenticated && (
              <div className="max-w-[150px] md:max-w-md">
                <SearchInput />
              </div>
            )}
          </div>
          <div>
            <div className="flex items-center gap-2">
              {/* Mobile Search Icon */}
              {isAuthenticated && (
                <SearchInputIcon
                  open={drawerOpen}
                  onClose={handleSearchClose}
                  onOpen={handleSearchOpen}
                />
              )}

              {/* Desktop & Tablet/Mobile Nav - Always visible */}
              <div className="flex items-center gap-4">
                {isAuthenticated && (
                  <>
                    {phoneData && (
                      <ProfileButton
                        country={phoneData.country}
                        countryCode={phoneData.countryCode}
                        nationalNumber={phoneData.nationalNumber}
                      />
                    )}
                  </>
                )}
                {!isAuthenticated ? (
                  <LoginButton />
                ) : (
                  <div className="hidden md:block">
                    <LogoutButton />
                  </div>
                )}
              </div>
              {/* Toggle Nav - Tablet/Mobile */}
              <div className="md:hidden">
                <button
                  // onClick={() => setMenuOpen(!menuOpen)}
                  onClick={handleMenu}
                  className="text-white"
                  aria-label="Toggle navigation"
                >
                  {menuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Side Drawer */}
      <div
        className={`fixed -top-2 right-0 z-40 h-full w-4/5 max-w-sm bg-black border-l border-gray-700 transform ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 ease-in-out sm:hidden shadow-lg flex flex-col justify-between`}
      >
        {/* Top - Header + Links */}
        <div>
          <div className="flex justify-between items-center p-4 border-b border-gray-600">
            <span className="text-lg text-terminalGreen font-bold">Menu</span>
            <button onClick={handleClose} className="text-white">
              <X size={24} />
            </button>
          </div>

          <div className="flex flex-col gap-4 p-4">
            <Link
              href="/"
              onClick={handleClose}
              className="text-white hover:text-terminalGreen"
            >
              Home
            </Link>

            {isAuthenticated && (
              <Link
                href="/dashboard"
                onClick={handleClose}
                className="text-white hover:text-terminalGreen"
              >
                Dashboard
              </Link>
            )}
          </div>
        </div>

        {/* Bottom - Auth Button */}
        <div className="p-4 border-t border-gray-600 flex justify-end gap-2">
          {isAuthenticated && (
            <>
              {phoneData && (
                <div className="mt-2">
                  <ProfileButton
                    country={phoneData.country}
                    countryCode={phoneData.countryCode}
                    nationalNumber={phoneData.nationalNumber}
                  />
                </div>
              )}
            </>
          )}
          {!isAuthenticated ? <LoginButton /> : <LogoutButton />}
        </div>
      </div>

      {/* Backdrop */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/50 backdrop-blur-sm sm:hidden transition-opacity duration-300"
          onClick={handleClose}
        />
      )}

      {/* Search Drawer (Mobile/Tablet) */}
      {isAuthenticated && (
        <SearchDrawer open={drawerOpen} onClose={() => setSearchOpen(false)} />
      )}
    </>
  );
}
