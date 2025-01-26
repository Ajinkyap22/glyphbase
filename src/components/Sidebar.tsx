"use client";

import React from "react";

import { useRouter, useSearchParams } from "next/navigation";

import clsx from "clsx";

import { useSidebar } from "@/providers/SidebarProvider";

const categories = [
  "All",
  "Favorites",
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
  const { isOpen, toggleSidebar } = useSidebar();

  const handleCategoryClick = (category: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("category", category);

    push(`?${params.toString()}`);
  };

  return (
    <>
      <aside
        className={clsx(
          "fixed z-30 flex h-screen flex-col gap-6 overflow-auto border-r border-outline/50 bg-background p-6 transition-transform md:relative md:max-w-60 md:translate-x-0 md:bg-background/50 lg:min-w-64",
          isOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <h2 className="text-lg font-semibold tracking-wide text-foreground/80">
          Categories
        </h2>

        <ul className="flex flex-col gap-2">
          {categories.map((category) => (
            <li
              key={category}
              onClick={() => handleCategoryClick(category)}
              className={clsx(
                "w-full cursor-pointer rounded-lg px-4 py-2.5 text-left transition-shadow duration-200",
                "text-sm font-medium",
                currentCategory === category &&
                  "bg-primary text-white shadow-sm",
                currentCategory !== category &&
                  "text-foreground/70 hover:bg-foreground/5 hover:text-foreground",
              )}
            >
              {category}
            </li>
          ))}
        </ul>
      </aside>

      {/* overlay */}
      {isOpen && (
        <div
          onClick={toggleSidebar}
          className="fixed inset-0 z-20 h-full w-full bg-foreground/50 md:hidden"
        ></div>
      )}
    </>
  );
};

export default Sidebar;
