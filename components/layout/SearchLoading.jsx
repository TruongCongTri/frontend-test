import CardSkeleton from "@/components/skeletons/CardSkeleton";
import LayoutWrapper from "@/components/layout/LayoutWrapper";
import BreadcrumbSkeleton from "@/components/skeletons/BreadcrumbSkeleton";
import PaginationSkeleton from "@/components/skeletons/PaginationSkeleton";

export default function LoadingSearchPage() {
  return (
    <LayoutWrapper>
      <BreadcrumbSkeleton />
      <p className="mb-2 text-sm text-gray-400">Loading search results...</p>
      <div className="rounded-md border border-gray-700 overflow-hidden">
        <table className="w-full table-fixed text-sm font-mono text-[#00ff88]">
          <thead className="hidden md:table-header-group bg-black text-white">
            <tr>
              {["Avatar", "Login", "Profile", "Repos", "Followers"].map(
                (text, i) => (
                  <th
                    key={i}
                    className="px-4 py-3 text-left border-b border-gray-700"
                  >
                    {text}
                  </th>
                )
              )}

              <th className="px-4 py-3 text-left border-b border-gray-700">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="red"
                  viewBox="0 0 24 24"
                  stroke="red"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3.172 5.172a4 4 0 015.656 0L12 8.343l3.172-3.171a4 4 0 015.656 5.656L12 21 3.172 10.828a4 4 0 010-5.656z"
                  />
                </svg>
              </th>
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: 7 }).map((_, i) => (
              <CardSkeleton key={i} />
            ))}
          </tbody>
        </table>
      </div>
      <PaginationSkeleton />
    </LayoutWrapper>
  );
}
