"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { X } from "lucide-react";
import { HISTORY_KEY, MAX_HISTORY_ITEMS } from "@/constant/enum";

export default function SearchDrawer({ open, onClose }) {
  const [query, setQuery] = useState("");
  const [history, setHistory] = useState([]);
  const inputRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    if (open) {
      inputRef.current?.focus();
    }
  }, [open]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem(HISTORY_KEY) || "[]");
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
    onClose();
  };

  return (
    <>
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm transition-opacity duration-300"
          onClick={onClose}
        />
      )}
      <div
        className={`fixed top-15.5 right-0 z-40 w-4/5 h-full max-w-sm bg-black text-white p-4 border-l border-gray-700 transform  ${
          open ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 ease-in-out flex flex-col justify-start shadow-lg`}
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-terminalGreen">Search</h2>
          {/* <button onClick={onClose} className="text-white">
              <X size={24} />
            </button> */}
        </div>

        {/* Input */}
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
          className={`w-full py-2 bg-terminalGreen text-black rounded-sm font-semibold mb-4 ${
            !query.trim() ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
          }`}
        >
          Search
        </button>

        {/* Search History */}
        {history.length > 0 && (
          <div className="mt-2">
            <h3 className="text-sm text-gray-400 mb-2">Recent Searches</h3>
            <ul className="flex flex-col gap-2">
              {history.map((item, i) => (
                <li
                  key={i}
                  className="text-[#00ff88] hover:underline cursor-pointer text-sm"
                  onClick={() => handleSuggestionClick(item)}
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </>
  );
}
