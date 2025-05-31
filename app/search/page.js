import React, { Suspense } from "react";

import { requireAuth } from "@/components/actions/auth";
import LayoutWrapper from "@/components/layout/LayoutWrapper";

import { searchGithubUsers } from "@/libs/api/apiFunction";
import CardList from "@/components/ui/display/CardList";
import Pagination from "@/components/ui/actions/Pagination";

import { parseSearchParams } from "@/utils/parseSearchParams";
import CardSkeleton from "@/components/skeletons/CardSkeleton";
import BreadcrumbSkeleton from "@/components/skeletons/BreadcrumbSkeleton";
import Breadcrumb from "@/components/navigation/Breadcrumb";
import Loading from "@/components/layout/Loading";

export default async function SearchPage({ searchParams }) {
  // check if user is authenticated
  await requireAuth();
  
  const { q, page, per_page } = parseSearchParams(await searchParams);

  if (!q) {
    return (
      <LayoutWrapper>
        <Breadcrumb />
        <p className="mb-2 text-sm text-gray-400">
          Please enter a search term.
        </p>
      </LayoutWrapper>
    );
  }

  let data = null;
  let error = null;

  try {
    const response = await searchGithubUsers({
      q,
      page: Number(page),
      per_page: Number(per_page),
    });
    data = response.data;
    console.log(data.data.users);
    console.log(data.meta.pagination);
  } catch (err) {
    error = err?.message || "Something went wrong while fetching GitHub users.";
  }

  return (
    <Suspense fallback={<Loading />}>
      <LayoutWrapper>
        <Suspense fallback={<BreadcrumbSkeleton />}>
          <Breadcrumb />
        </Suspense>
        {q && (
          <p className="mb-2 text-sm text-gray-400">
            Showing results for: <strong>{q}</strong>
          </p>
        )}
        {error && <p className="text-red-400 mb-4">❌ {error}</p>}

        <div>
          <Suspense fallback={<CardSkeleton />}>
            <CardList users={data.data.users} />
          </Suspense>
          <Pagination meta={data.meta.pagination} />
        </div>
      </LayoutWrapper>
    </Suspense>
  );
}
