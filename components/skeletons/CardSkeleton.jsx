"use client";
export default function CardSkeleton(per_page) {
  return (
    <>
      {/* Desktop Skeleton Row */}
      <tr className="hidden md:table-row border-b border-gray-700 animate-pulse">
        <td className="px-4 py-3">
          <div className="h-10 w-10 bg-gray-800 rounded-full"></div>
        </td>
        {Array.from({ length: per_page-2 }).map((_, i) => (
          <td key={i} className="px-4 py-3">
            <div className="h-4 bg-gray-800 rounded w-full"></div>
          </td>
        ))}
        <td className="px-4 py-3">
          <div className="h-5 w-5 bg-gray-800 rounded-full"></div>
        </td>
      </tr>

      {/* Mobile / Tablet Skeleton Card */}
      <tr className="md:hidden border-b border-gray-800 animate-pulse">
        <td colSpan={6} className="px-4 py-3">
          <div className="flex items-start justify-between gap-3">
            {/* Avatar and Info */}
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-gray-800" />
              <div className="space-y-2">
                <div className="h-3 w-24 bg-gray-800 rounded" />
                <div className="h-3 w-16 bg-gray-700 rounded" />
              </div>
            </div>

            {/* Links */}
            <div className="text-sm space-y-2">
              <div className="h-3 w-28 bg-gray-800 rounded" />
              <div className="h-3 w-24 bg-gray-700 rounded" />
            </div>

            {/* Like button */}
            <div className="w-5 h-5 bg-gray-700 rounded-full" />
          </div>
        </td>
      </tr>
    </>
  );
}
