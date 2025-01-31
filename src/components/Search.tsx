import React from "react";

import { useSearchParams, useRouter } from "next/navigation";

import { useQuery } from "@tanstack/react-query";

import Suggestions from "@/components/Suggestions";

import { getSuggestions } from "@/services/entitiesService";

import { useDebouncedCallback } from "@/hooks/useDebouncedCallback";

import type { Suggestion } from "@/types/Suggestions";

const Search = () => {
  const searchParams = useSearchParams();
  const { replace } = useRouter();

  const search = searchParams.get("search") || "";
  const { data: suggestions, isFetching } = useQuery({
    queryKey: ["suggestions", search],
    queryFn: () => getSuggestions({ search }),
    enabled: !!search,
  });

  const handleSearch = useDebouncedCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value.trim();

      const params = new URLSearchParams(searchParams);

      if (value) {
        params.set("search", value);
      } else {
        params.delete("search");
      }

      replace(`?${params.toString()}`);
    },
    300,
  );

  const handleSuggestionClick = (suggestion: Suggestion) => {
    const params = new URLSearchParams(searchParams);
    params.set("search", suggestion.value);

    replace(`?${params.toString()}`);
  };

  return (
    <div className="group relative flex flex-1 flex-col gap-y-2">
      <input
        type="search"
        placeholder="Search by name, unicode or description"
        className="w-full rounded-lg border border-outline bg-background px-4 py-2 outline-none"
        defaultValue={searchParams.get("search") || ""}
        onChange={handleSearch.debouncedCallback}
      />

      {suggestions && !!search && (
        <Suggestions
          suggestions={suggestions}
          handleSuggestionClick={handleSuggestionClick}
        />
      )}

      {isFetching && (
        <div className="absolute left-0 top-12 z-10 flex w-full items-center justify-center gap-y-1 rounded-lg border border-outline bg-background">
          <div className="spinner size-20 bg-primary"></div>
        </div>
      )}
    </div>
  );
};

export default Search;
