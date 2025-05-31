"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";

const PATH_TITLES = {
  "": "OTP Terminal",
  login: "Signin",
  search: "Search GitHub",
  dashboard: "Dashboard",
};

const formatSegment = (segment) =>
  segment.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());

export default function Breadcrumb() {
  const pathname = usePathname();

  const segments = pathname.split("/").filter(Boolean);
  const isHome = segments.length === 0;

  const base = "C:\\Skipli\\Github";

  const trail = segments.map((seg, i) => {
    const display = PATH_TITLES[seg] || formatSegment(seg);
    const href = "/" + segments.slice(0, i + 1).join("/");
    const isLast = i === segments.length - 1;

    return (
      <span
        key={i}
        className="inline-flex items-center space-x-2 animate-fade-in"
      >
        {i !== 0 && <span className="text-white">{" \\ "}</span>}
        {isLast ? (
          <span className="text-[#00ff88]">{display}</span>
        ) : (
          <Link href={href} className="text-white hover:underline">
            {display}
          </Link>
        )}
      </span>
    );
  });

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: segments.map((seg, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: PATH_TITLES[seg] || formatSegment(seg),
      item: `https://your-domain.com/${segments.slice(0, index + 1).join("/")}`,
    })),
  };
  return (
    <>
      <h1 className="text-lg mb-6 font-mono">
        {isHome ? (
          <span className="text-[#00ff88]">{base}</span>
        ) : (
          <>
            <Link href="/" className="text-white hover:underline">
              {base}
            </Link>
            <span className="text-white">{"> "}</span>
            {trail}
          </>
        )}
      </h1>

      {/* JSON-LD SEO */}
      {segments && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              itemListElement: segments.map((seg, i) => ({
                "@type": "ListItem",
                position: i + 1,
                name: PATH_TITLES[seg] || formatSegment(seg),
                item: `https://yourdomain.com/${segments
                  .slice(0, i + 1)
                  .join("/")}`,
              })),
            }),
          }}
        />
      )}
    </>
  );
}
