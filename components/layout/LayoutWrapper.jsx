import React from "react";

export default function LayoutWrapper({ children }) {
  return <div className="pt-24 md:pt-20 p-6 max-w-xl mx-auto">{children}</div>;
}
