"use client";

import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { HISTORY_KEY, MAX_HISTORY_ITEMS } from "@/constant/enum";

export default function SearchInput() {
  const [query, setQuery] = useState("");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [history, setHistory] = useState([]);
  const inputRef = useRef(null);
  const router = useRouter();

  // Load history on mount
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem(HISTORY_KEY)) || [];
    setHistory(saved);
  }, []);

  const saveHistory = (item) => {
    const updatedHistory = [item, ...history.filter((t) => t !== item)].slice(
      0,
      MAX_HISTORY_ITEMS
    );
    localStorage.setItem(HISTORY_KEY, JSON.stringify(updatedHistory));
    setHistory(updatedHistory);
  };

  const handleSearch = () => {
    const trimmed = query.trim();
    if (!trimmed) return;
    saveHistory(trimmed);

    router.push(`/search?q=${encodeURIComponent(trimmed)}`);
    setDrawerOpen(false);
  };

  // Auto-focus input when drawer opens
  useEffect(() => {
    if (drawerOpen && inputRef.current) {
      setTimeout(() => inputRef.current.focus(), 200); // slight delay for transition
    }
  }, [drawerOpen]);

  return (
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
  );
}
