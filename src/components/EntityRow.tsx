import React, { useState } from "react";

import clsx from "clsx";

import CopyIcon from "@/components/icons/CopyIcon";
import TickIcon from "@/components/icons/TickIcon";

type Props = {
  glyph: string;
  category: string;
  name: string;
  unicode: string;
};

const EntityRow = ({ glyph, category, name, unicode }: Props) => {
  return (
    <tr className="border-b border-outline/50 transition-colors duration-200 hover:bg-foreground/5">
      <td className="p-4 text-center text-2xl">{glyph}</td>

      <td className="p-4 text-center text-foreground/70">{category}</td>

      <td className="p-4 text-center text-foreground/70">
        <span className="inline-flex items-center gap-2">
          <span>{name}</span>

          <CopyButton textToCopy={name} />
        </span>
      </td>

      <td className="p-4 text-center text-foreground/70">
        <span className="inline-flex items-center gap-2">
          <span>{unicode}</span>

          <CopyButton textToCopy={unicode} />
        </span>
      </td>
    </tr>
  );
};

const CopyButton = ({ textToCopy }: { textToCopy: string }) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(textToCopy);

    setIsCopied(true);

    setTimeout(() => {
      setIsCopied(false);
    }, 2000);
  };

  return (
    <button
      onClick={handleCopy}
      disabled={isCopied}
      className="relative size-5"
    >
      <CopyIcon
        className={clsx(
          "absolute inset-0 transition-all duration-200",
          isCopied && "scale-0 opacity-0",
          !isCopied && "scale-100 opacity-100",
        )}
      />

      <TickIcon
        className={clsx(
          "absolute inset-0 transition-all duration-200",
          isCopied && "scale-100 opacity-100",
          !isCopied && "scale-0 opacity-0",
        )}
      />
    </button>
  );
};

export default EntityRow;
