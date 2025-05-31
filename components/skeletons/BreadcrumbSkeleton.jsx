'use client';
export default function BreadcrumbSkeleton() {
  return (
    <div className="flex gap-4  mb-6">
      <div className="h-6 w-40 bg-gray-800 rounded animate-pulse" />
      <div className="h-6 w-30 bg-gray-800 rounded animate-pulse" />
    </div>
  );
}
