import React, { useRef } from "react";

import type { Suggestion } from "@/types/Suggestions";

type Props = {
  suggestions: Suggestion[];
  handleSuggestionClick: (suggestion: Suggestion) => void;
};

const Suggestions = ({ suggestions, handleSuggestionClick }: Props) => {
  const listRef = useRef<HTMLUListElement>(null);

  const handleClick = (suggestion: Suggestion) => {
    handleSuggestionClick(suggestion);
    listRef.current?.blur();
  };

  return (
    <ul
      ref={listRef}
      tabIndex={0}
      className="absolute left-0 top-12 z-10 hidden w-full flex-col gap-y-1 rounded-lg border border-outline bg-background group-focus-within:flex"
    >
      {suggestions.map((suggestion) => (
        <li
          className="flex cursor-pointer items-center gap-x-2.5 px-4 py-2 hover:bg-foreground/5"
          key={suggestion.id}
          onClick={() => handleClick(suggestion)}
        >
          <span className="text-sm text-foreground/60" key={suggestion.id}>
            {suggestion.value}
          </span>

          <span className="rounded border border-outline bg-foreground/5 px-1.5 text-xs text-foreground/50">
            {suggestion.matchedField}
          </span>
        </li>
      ))}

      {suggestions.length === 0 && (
        <p className="px-4 py-2 text-sm text-foreground/60">No results found</p>
      )}
    </ul>
  );
};

export default Suggestions;
