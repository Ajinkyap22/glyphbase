"use client";

import React from "react";

import Image from "next/image";
import { useSearchParams, useRouter } from "next/navigation";

import { useTheme } from "next-themes";

import Moon from "@/icons/moon.svg";
import Sun from "@/icons/sun.svg";

import { useDebouncedCallback } from "@/hooks/useDebouncedCallback";

const Header = () => {
  const { theme, setTheme } = useTheme();
  const searchParams = useSearchParams();
  const { replace } = useRouter();

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
    500
  );

  return (
    <div className="flex items-center gap-x-2 sticky top-0 bg-background py-3 px-6 z-10 transition-colors duration-300">
      <input
        type="search"
        placeholder="Search by name or unicode"
        className="w-full rounded-lg border border-outline bg-background px-4 py-2 outline-none transition-colors duration-300"
        defaultValue={searchParams.get("search") || ""}
        onChange={handleSearch.debouncedCallback}
      />

      <button
        onClick={toggleTheme}
        className="p-2 rounded-md hover:bg-foreground/5"
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
