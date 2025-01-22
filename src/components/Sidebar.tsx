"use client";

import React from "react";

import { useRouter, useSearchParams } from "next/navigation";

import clsx from "clsx";

const categories = [
  "All",
  "Arrows",
  "Technical Symbols",
  "Currency",
  "Punctuation",
  "Mathematical Symbols",
  "Latin Letters",
  "Greek Letters",
  "Geometric Shapes",
  "Miscellaneous Symbols",
  "Other",
];

const Sidebar = () => {
  const { push } = useRouter();
  const searchParams = useSearchParams();
  const currentCategory = searchParams.get("category") || "All";

  const handleCategoryClick = (category: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("category", category);

    push(`?${params.toString()}`);
  };

  return (
    <aside className="flex min-w-64 flex-col gap-6 border-r border-outline/50 bg-background/50 p-6 transition-colors duration-300">
      <h2 className="text-lg font-semibold tracking-wide text-foreground/80">
        Categories
      </h2>

      <ul className="flex flex-col gap-2">
        {categories.map((category) => (
          <li
            key={category}
            onClick={() => handleCategoryClick(category)}
            className={clsx(
              "w-full cursor-pointer rounded-lg px-4 py-2.5 text-left transition-all duration-200",
              "text-sm font-medium",
              currentCategory === category && "text-white bg-primary shadow-sm",
              currentCategory !== category &&
                "text-foreground/70 hover:bg-foreground/5 hover:text-foreground",
            )}
          >
            {category}
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default Sidebar;
