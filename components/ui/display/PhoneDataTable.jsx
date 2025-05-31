"use client";

import { useState } from "react";

export default function PhoneDataTable({ phoneData }) {
  const rows = [
    ["country", phoneData.country],
    ["countryCode", `+${phoneData.countryCode}`],
    ["nationalNumber", `0${phoneData.nationalNumber}`],
    ["international", phoneData.international],
    ["withoutPlus", phoneData.withoutPlus],
  ];

  const formatRow = (col1, col2) => {
    const pad = (text, len) =>
      text.length > len ? text.slice(0, len) : text.padEnd(len, " ");
    return `| ${pad(col1, 15)} | ${pad(col2, 43)} |`;
  };
  const formatRowSM = (col1, col2) => {
    const pad = (text, len) =>
      text.length > len ? text.slice(0, len) : text.padEnd(len, " ");
    return `| ${pad(col1, 10)} | ${pad(col2, 29)} |`;
  };
  const tableText =
    `+-----------------+-------------------------------------+` +
    `\n| ${"Field".padEnd(15)} | ${"Value".padEnd(35)} |` +
    `\n+-----------------+-------------------------------------+` +
    rows.map(([key, value]) => `\n${formatRow(key, value)}`).join("") +
    `\n+-----------------+-------------------------------------+`;

  const [copiedRow, setCopiedRow] = useState(null);
  const [copiedAll, setCopiedAll] = useState(false);

  const copyToClipboard = async (text, index = null) => {
    try {
      await navigator.clipboard.writeText(text);
      if (index === null) {
        setCopiedAll(true);
        setTimeout(() => setCopiedAll(false), 1500);
      } else {
        setCopiedRow(index);
        setTimeout(() => setCopiedRow(null), 1500);
      }
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const shareText = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: "Phone Data",
          text: tableText,
        });
      } else {
        await copyToClipboard(tableText);
      }
    } catch (err) {
      console.error("Failed to share:", err);
    }
  };

  return (
    <div className=" mt-2 text-sm w-full">
      {/* Buttons - Desktop*/}
      <div className="hidden md:flex justify-end gap-2 mb-2">
        <button
          onClick={() => copyToClipboard(tableText)}
          className="px-2 py-1 border border-white text-white rounded hover:bg-white hover:text-black transition"
        >
          {copiedAll ? "✅ Copied" : "📋 Copy All"}
        </button>
        <button
          onClick={shareText}
          className="px-2 py-1 border border-white text-white rounded hover:bg-white hover:text-black transition"
        >
          🔗 Share
        </button>
      </div>

      {/* Table Output */}
      <div className="hidden sm:block overflow-x-auto md:overflow-visible">
        <pre className="text-[#00ff88] font-mono text-sm bg-black p-3 rounded border border-gray-700 w-full">
          +-----------------+---------------------------------------------+
          {"\n"}
          <code>{formatRow("Key", "Value")}</code>
          {"\n"}
          +-----------------+---------------------------------------------+
          {rows.map(([key, value], index) => (
            <div key={index} className="flex items-center gap-4 relative">
              <code>{formatRow(key, value)}</code>
              <div
                onClick={() => copyToClipboard(value, index)}
                className="absolute text-xs top-0 right-4 px-1 py-0.5 border hover:text-white"
              >
                {copiedRow === index ? "✅" : "📋"}
              </div>
            </div>
          ))}
          +-----------------+---------------------------------------------+
        </pre>
      </div>

      {/* Table Output - mobile/tablet */}
      <div className="sm:hidden overflow-x-auto md:overflow-visible">
        <pre className="text-[#00ff88] font-mono text-sm bg-black p-3 rounded border border-gray-700 w-full ">
          +------------+-------------------------------+{"\n"}
          <code>{formatRowSM("Key", "Value")}</code>
          {"\n"}+------------+-------------------------------+
          {rows.map(([key, value], index) => (
            <div key={index} className="flex items-center gap-2 relative">
              <code>{formatRowSM(key, value)}</code>
              <div
                onClick={() => copyToClipboard(value, index)}
                className="absolute text-xs top-0 right-4 px-1 py-0.5 border hover:text-white"
                title="Copy"
              >
                {copiedRow === index ? "✅" : "📋"}
              </div>
            </div>
          ))}
          +------------+-------------------------------+
        </pre>
      </div>

      {/* Floating Action Buttons (FAB) for Mobile/Tablet */}
      <div className="fixed top-130 right-6 z-30 md:hidden space-y-2 space-x-2">
        <button
          onClick={() => copyToClipboard(tableText)}
          className="w-12 h-12 rounded-full bg-[#00ff88] text-black shadow-lg hover:scale-105 transition-transform"
          title="Copy All"
        >
          📋
        </button>
        <button
          onClick={shareText}
          className="w-12 h-12 rounded-full bg-[#00ff88] text-black shadow-lg hover:scale-105 transition-transform"
          title="Share"
        >
          🔗
        </button>
      </div>
    </div>
  );
}
