"use client";

import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Search, X } from "lucide-react";

export default function SearchInput() {
  const [query, setQuery] = useState("");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const inputRef = useRef(null);
  const router = useRouter();

  const handleSearch = () => {
    if (!query.trim()) return;
    router.push(`/search?q=${encodeURIComponent(query.trim())}`);
    setDrawerOpen(false);
  };

  // Auto-focus input when drawer opens
  useEffect(() => {
    if (drawerOpen && inputRef.current) {
      setTimeout(() => inputRef.current.focus(), 100); // slight delay for transition
    }
  }, [drawerOpen]);

  return (
    <>
      {/* Desktop View */}
      <div className="hidden md:flex gap-2 items-center">
        <input
          type="text"
          placeholder="Search GitHub..."
          className="px-3 py-1 bg-black text-[#00ff88] border border-gray-600 rounded-sm focus:ring-2 ring-[#00ff88]"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        />
        <button
          onClick={handleSearch}
          disabled={!query.trim()}
          className={`px-3 py-1 bg-black text-white border border-gray-600 rounded-sm ${
            !query.trim() ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
          }`}
        >
          Search
        </button>
      </div>

      {/* Mobile / Tablet View */}
      <button
        className="md:hidden text-white"
        onClick={() => setDrawerOpen(true)}
        aria-label="Open search"
      >
        <Search size={22} />
      </button>

      {/* Drawer */}
      {drawerOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40"
            onClick={() => setDrawerOpen(false)}
          />

          <div className="fixed top-0 right-0 w-4/5 max-w-sm h-full bg-black text-white z-50 p-4 shadow-lg border-l border-gray-700 flex flex-col justify-start">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-terminalGreen">
                Search
              </h2>
              <button
                onClick={() => setDrawerOpen(false)}
                className="text-white"
              >
                <X size={24} />
              </button>
            </div>

            <input
              ref={inputRef}
              type="text"
              placeholder="Search GitHub..."
              className="px-3 py-2 bg-black text-[#00ff88] border border-gray-600 rounded-sm focus:ring-2 ring-[#00ff88] mb-4"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            />

            <button
              onClick={handleSearch}
              disabled={!query.trim()}
              className={`w-full py-2 bg-terminalGreen text-black rounded-sm font-semibold ${
                !query.trim()
                  ? "opacity-50 cursor-not-allowed"
                  : "cursor-pointer"
              }`}
            >
              Search
            </button>
          </div>
        </>
      )}
    </>
  );
}
