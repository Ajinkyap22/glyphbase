import React from "react";

import clsx from "clsx";

const GridIcon = ({ className }: { className?: string }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      viewBox="0 0 24 24"
      className={clsx("size-6", className)}
    >
      <path
        fill="currentColor"
        className="fill-foreground"
        d="M3 11V3h8v8zm0 10v-8h8v8zm10-10V3h8v8zm0 10v-8h8v8zM5 9h4V5H5zm10 0h4V5h-4zm0 10h4v-4h-4zM5 19h4v-4H5zM9 9"
      />
    </svg>
  );
};

export default GridIcon;
