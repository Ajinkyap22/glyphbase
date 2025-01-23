"use client";

import React from "react";

import Image from "next/image";
import { useSearchParams, useRouter } from "next/navigation";

import { useTheme } from "next-themes";

import GridIcon from "@/components/icons/GridIcon";
import HamburgerIcon from "@/components/icons/HamburgerIcon";
import ListIcon from "@/components/icons/ListIcon";

import Moon from "@/icons/moon.svg";
import Sun from "@/icons/sun.svg";

import { useDebouncedCallback } from "@/hooks/useDebouncedCallback";

import { useSidebar } from "@/providers/SidebarProvider";

const Header = () => {
  const { theme, setTheme } = useTheme();
  const searchParams = useSearchParams();
  const { replace } = useRouter();

  const isList = searchParams.get("view") === "list";

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const { toggleSidebar } = useSidebar();

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
    <div className="sticky top-0 z-10 flex items-center gap-x-3 border-b border-outline/20 bg-background/80 px-3 py-4 shadow-sm backdrop-blur-sm transition-shadow duration-300 md:px-6">
      <button
        className="shrink-0 rounded-md border border-outline p-1.5 md:hidden md:p-2.5"
        onClick={toggleSidebar}
      >
        <HamburgerIcon />
      </button>

      <input
        type="search"
        placeholder="Search by name or unicode"
        className="w-full rounded-lg border border-outline bg-background px-4 py-2 outline-none"
        defaultValue={searchParams.get("search") || ""}
        onChange={handleSearch.debouncedCallback}
      />

      <button
        title="Toggle view"
        onClick={toggleView}
        className="shrink-0 rounded-md border border-outline p-1.5 hover:bg-foreground/5 md:p-2.5"
      >
        {isList ? <GridIcon /> : <ListIcon />}
      </button>

      <button
        title="Toggle theme"
        onClick={toggleTheme}
        className="shrink-0 rounded-md border border-outline p-1.5 hover:bg-foreground/5 md:p-2.5"
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
