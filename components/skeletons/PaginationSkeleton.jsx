export default function PaginationSkeleton() {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-6 animate-pulse font-mono w-full">
      {/* Left side (per page) */}
      <div className="flex items-center gap-2">
        <div className="h-4 w-32 bg-gray-800 rounded-sm" />
        <div className="h-8 w-20 bg-gray-700 rounded-sm" />
      </div>

      {/* Right side (pagination nav) */}
      <div className="flex items-center gap-4">
        <div className="h-4 w-16 bg-gray-800 rounded-sm" />
        <div className="h-4 w-24 bg-gray-700 rounded-sm" />
        <div className="h-4 w-16 bg-gray-800 rounded-sm" />
      </div>
    </div>
  );
}
