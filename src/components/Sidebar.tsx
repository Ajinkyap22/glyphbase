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
    <aside className="min-w-64 border-r border-outline p-4 flex flex-col gap-4 transition-colors duration-300">
      <h2 className="font-semibold text-foreground/80">Categories</h2>

      <ul className="flex flex-col gap-1.5">
        {categories.map((category) => (
          <li
            key={category}
            onClick={() => handleCategoryClick(category)}
            className={clsx(
              "w-full rounded-md px-3 py-2 text-left cursor-pointer",
              currentCategory === category && "bg-primary text-white",
              currentCategory !== category && "hover:bg-foreground/5"
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
