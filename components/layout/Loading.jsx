import React from "react";

export default function Loading() {
  return (
    <div>
      <div className="min-h-screen flex items-center justify-center bg-black text-terminalGreen font-mono text-sm px-4">
        <div className="w-full max-w-md animate-pulse">
          <div className="flex items-center">
            <div className="mb-2">C:\GitHub\Search&gt; Fetching results...</div>
            <span className="ml-1 w-2 h-5 bg-terminalGreen animate-blink"></span>
          </div>
          <div className="mb-1">█ █ █ Loading GitHub data...</div>
          <div className="h-2 w-1/2 bg-terminalGreen/70 mb-1"></div>
          <div className="h-2 w-1/3 bg-terminalGreen/50 mb-1"></div>
          <div className="h-2 w-2/3 bg-terminalGreen/40"></div>
        </div>
      </div>
    </div>
  );
}
