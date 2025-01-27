import React from "react";

const Loader = () => {
  return (
    <div className="flex h-full w-full items-center justify-center text-foreground">
      <div className="spinner size-20 bg-primary"></div>
    </div>
  );
};

export default Loader;
