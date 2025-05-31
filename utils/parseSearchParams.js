export function parseSearchParams(searchParams) {
  return {
    q: searchParams.q || "",
    page: Number(searchParams.page || "1"),
    per_page: Number(searchParams.per_page || "10"),
  };
}
