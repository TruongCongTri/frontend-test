"use client";

import { useRouter } from "next/navigation";

export default function ProfileButton({
  country,
  countryCode,
  nationalNumber,
}) {
  const router = useRouter();

  const handleClick = () => {
    router.push("/dashboard");
  };

  return (
    <div
      className="flex items-center gap-2 cursor-pointer"
      onClick={handleClick}
    >
      <img
        src={`https://flagcdn.com/24x18/${country.toLowerCase()}.png`}
        alt={`${country} flag`}
        width={24}
        height={18}
      />
      {/* Full phone info on desktop (md+) */}
      <span className="hidden md:inline text-sm text-gray-300 hover:underline whitespace-nowrap">
        +{countryCode} - 0{nationalNumber}
      </span>

      {/* Last 4 digits only on mobile/tablet (< md) */}
      <span className="inline md:hidden text-sm text-gray-300 whitespace-nowrap">
        ****{nationalNumber.slice(-4)}
      </span>
    </div>
  );
}
