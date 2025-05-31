"use client";

import { Search } from "lucide-react";
import { X } from "lucide-react";
export default function SearchInputIcon({ open, onOpen, onClose }) {
  return (
    <>
      {open ? (
        <>
          <button onClick={onClose} 
            aria-label="Close search drawer"
            className="text-white md:hidden">
            <X size={24} />
          </button>
        </>
      ) : (
        <>
          <button
            onClick={onOpen}
            aria-label="Open search drawer"
            className="text-white md:hidden"
          >
            <Search size={22} />
          </button>
        </>
      )}
    </>
  );
}
