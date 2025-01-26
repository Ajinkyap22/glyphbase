import React, { useState } from "react";

type Props = {
  name: string;
  glyph: string;
  unicode: string;
  description: string;
};

const EntityCard = ({ name, glyph, unicode, description }: Props) => {
  return (
    <div className="flex flex-col items-center gap-1.5 rounded-lg border border-outline bg-background/50 p-2.5 hover:border-outline/50 hover:shadow-outline">
      {/* glyph */}
      <span className="text-4xl">{glyph}</span>

      {/* description */}
      <span className="break-all text-center text-xs text-foreground/60">
        {description}
      </span>

      <hr className="w-full border-outline" />

      {/* name */}
      <div className="group relative flex w-full flex-col items-center gap-1">
        <div className="flex flex-col items-center gap-1 opacity-100 transition-opacity duration-300 group-hover:opacity-0">
          <span className="break-all text-center text-sm font-medium">
            {name}
          </span>

          <span className="text-[10px] text-foreground/60">HTML Entity</span>
        </div>

        <CopyButton name="Copy Entity" textToCopy={name} />
      </div>

      <hr className="w-full border-outline" />

      {/* unicode */}
      <div className="group relative flex w-full flex-col items-center gap-1">
        <div className="flex flex-col items-center gap-1 opacity-100 group-hover:opacity-0">
          <span className="break-all text-center text-sm font-medium">
            {unicode}
          </span>

          <span className="text-[10px] text-foreground/60">Unicode</span>
        </div>

        <CopyButton name="Copy Unicode" textToCopy={unicode} />
      </div>
    </div>
  );
};

const CopyButton = ({
  name,
  textToCopy,
}: {
  name: string;
  textToCopy: string;
}) => {
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
      className="border-tertiary absolute flex h-full w-full items-center justify-center rounded-md border border-outline bg-background/80 opacity-0 transition-opacity duration-300 hover:bg-background group-hover:opacity-100"
    >
      <span className="text-xs">{isCopied ? "Copied!" : name}</span>
    </button>
  );
};

export default EntityCard;
