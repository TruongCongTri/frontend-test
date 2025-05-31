"use client";

import { useState, useEffect } from "react";
import CardList from "../ui/display/CardList";
import PhoneDataTable from "../ui/display/PhoneDataTable";

export default function DashboardTabs({ users }) {
  const [activeTab, setActiveTab] = useState("phone");
  const [phoneData, setPhoneData] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem("phone_data");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setPhoneData(parsed);
      } catch (err) {
        console.error("Failed to parse phone_data:", err);
      }
    }
  }, []);

  return (
    <div className="mt-4">
      <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 text-sm text-white mb-4">
        <button
          type="button"
          onClick={() => setActiveTab("phone")}
          className={`px-3 py-2 sm:py-1 rounded sm:rounded-none text-left sm:text-center ${
            activeTab === "phone"
              ? "text-[#00ff88] border-l-4 sm:border-l-0 sm:border-b-2 border-[#00ff88] bg-gray-800 sm:bg-transparent"
              : "text-gray-400 hover:text-[#00ff88] hover:bg-gray-700 sm:hover:bg-transparent"
          }`}
        >
          📱 Phone Info
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("github")}
          className={`px-3 py-2 sm:py-1 rounded sm:rounded-none text-left sm:text-center ${
            activeTab === "github"
              ? "text-[#00ff88] border-l-4 sm:border-l-0 sm:border-b-2 border-[#00ff88] bg-gray-800 sm:bg-transparent"
              : "text-gray-400 hover:text-[#00ff88] hover:bg-gray-700 sm:hover:bg-transparent"
          }`}
        >
          🤖 GitHub Profiles
        </button>
      </div>

      {activeTab === "phone" ? (
        phoneData ? (
          <PhoneDataTable phoneData={phoneData} />
        ) : (
          <p className="text-white">No phone data available.</p>
        )
      ) : (
        <CardList users={users} />
      )}
    </div>
  );
}
