"use client";

import React, { useRef, useEffect } from "react";

import { useRouter, useSearchParams } from "next/navigation";

import { useInfiniteQuery } from "@tanstack/react-query";

import GridView from "@/components/GridView";
import ListView from "@/components/ListView";

import { getEntities } from "@/services/entitiesService";

const LIMIT = 30;

const List = () => {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const page = Number(searchParams.get("page")) || 1;
  const search = searchParams.get("search") || "";
  const category = searchParams.get("category") || "";

  const isList = searchParams.get("view") === "list";

  const favorites =
    category === "Favorites"
      ? JSON.parse(localStorage.getItem("favorites") || "{}")
      : undefined;

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    error,
  } = useInfiniteQuery({
    queryKey: ["list", page, search, category],
    queryFn: ({ pageParam }) =>
      getEntities({
        page: pageParam + 1,
        search,
        category: category === "All" ? "" : category,
        limit: LIMIT,
      }),
    initialPageParam: 0,
    getNextPageParam: (lastPage, pages) => {
      return lastPage.length === LIMIT ? pages.length + 1 : undefined;
    },
    enabled: category !== "Favorites",
  });

  const entities = data?.pages.flat();

  const sentinelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;

        if (entry.isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { root: null, rootMargin: "0px", threshold: 0.5 },
    );

    const sentinel = sentinelRef.current;

    if (sentinel) {
      observer.observe(sentinel);
    }

    return () => {
      if (sentinel) observer.unobserve(sentinel);
    };
  }, [
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    page,
    replace,
    searchParams,
  ]);

  if (error) {
    return (
      <div className="flex h-full w-full flex-col items-center justify-center gap-y-4">
        <p className="text-center text-sm text-foreground/70">
          {error.message}
        </p>

        <p className="text-center text-lg text-foreground/70">
          Error loading entities. Please try again.
        </p>
      </div>
    );
  }

  if (
    entities?.length === 0 &&
    !isFetching &&
    !isFetchingNextPage &&
    !favorites
  ) {
    return (
      <div className="flex h-full w-full flex-col items-center justify-center gap-y-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          className="mr-3 size-24"
        >
          <path
            className="stroke-foreground/60"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M3 8v3a1 1 0 0 0 1 1h3m0-4v8m10-8v3a1 1 0 0 0 1 1h3m0-4v8m-11-6v4a2 2 0 1 0 4 0m0-4a2 2 0 0 0-2-2M3 3l18 18"
          />
        </svg>

        <p className="text-center text-lg text-foreground/70">
          No results found
        </p>
      </div>
    );
  }

  return (
    <div className="h-full w-full overflow-y-auto overflow-x-hidden">
      {isList ? (
        <div className="w-full overflow-x-auto">
          <ListView
            entities={favorites ? Object.values(favorites) : entities}
          />
        </div>
      ) : (
        <GridView entities={favorites ? Object.values(favorites) : entities} />
      )}

      {isFetchingNextPage && (
        <p className="animate-pulse text-center text-foreground/70">
          Loading...
        </p>
      )}

      <div ref={sentinelRef} className="h-10"></div>

      {isFetching && !isFetchingNextPage && (
        <div className="flex h-full w-full items-center justify-center text-foreground">
          <div className="spinner size-20 bg-primary"></div>
        </div>
      )}
    </div>
  );
};

export default List;
