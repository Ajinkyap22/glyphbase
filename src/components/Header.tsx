"use client";

import React from "react";

import Image from "next/image";
import { useSearchParams, useRouter } from "next/navigation";

import { useTheme } from "next-themes";

import GridIcon from "@/components/icons/GridIcon";
import ListIcon from "@/components/icons/ListIcon";

import Moon from "@/icons/moon.svg";
import Sun from "@/icons/sun.svg";

import { useDebouncedCallback } from "@/hooks/useDebouncedCallback";

const Header = () => {
  const { theme, setTheme } = useTheme();
  const searchParams = useSearchParams();
  const { replace } = useRouter();

  const isList = searchParams.get("view") === "list";

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const handleSearch = useDebouncedCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;

      const params = new URLSearchParams(searchParams);

      if (value) {
        params.set("search", value);
      } else {
        params.delete("search");
      }

      replace(`?${params.toString()}`);
    },
    500,
  );

  const toggleView = () => {
    const params = new URLSearchParams(searchParams);
    params.set("view", isList ? "grid" : "list");
    replace(`?${params.toString()}`);
  };

  return (
    <div className="sticky top-0 z-10 flex items-center gap-x-3 border-b border-outline/20 bg-background/80 px-6 py-4 shadow-sm backdrop-blur-sm transition-all duration-300">
      <input
        type="search"
        placeholder="Search by name or unicode"
        className="w-full rounded-lg border border-outline bg-background px-4 py-2 outline-none transition-colors duration-300"
        defaultValue={searchParams.get("search") || ""}
        onChange={handleSearch.debouncedCallback}
      />

      <button
        title="Toggle view"
        onClick={toggleView}
        className="shrink-0 rounded-md border border-outline p-2.5 transition-colors duration-300 hover:bg-foreground/5"
      >
        {isList ? <GridIcon /> : <ListIcon />}
      </button>

      <button
        title="Toggle theme"
        onClick={toggleTheme}
        className="shrink-0 rounded-md border border-outline p-2.5 transition-all duration-300 hover:bg-foreground/5"
      >
        {theme === "dark" ? (
          <Image src={Sun} alt="Sun" className="size-6" />
        ) : (
          <Image src={Moon} alt="Moon" className="size-6" />
        )}
      </button>
    </div>
  );
};

export default Header;
