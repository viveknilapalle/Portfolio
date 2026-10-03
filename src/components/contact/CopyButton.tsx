"use client";

import { useEffect, useState } from "react";
import { Check, Copy } from "@/components/icons";
import { cn } from "@/lib/utils";

export function CopyButton({ value, label, className }: { value: string; label: string; className?: string }) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const timer = setTimeout(() => setCopied(false), 2000);
    return () => clearTimeout(timer);
  }, [copied]);

  async function copy() {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
    } catch {
      // Clipboard can be unavailable (insecure context, permissions); the value is visible to copy manually.
    }
  }

  return (
    <button
      type="button"
      onClick={copy}
      className={cn(
        "relative z-10 inline-flex size-9 items-center justify-center rounded-full border border-line text-fg-2 transition-colors hover:border-primary-soft/60 hover:text-fg",
        className,
      )}
      aria-label={copied ? `${label} copied` : `Copy ${label}`}
    >
      {copied ? <Check size={16} className="text-emerald-300" /> : <Copy size={16} />}
      <span role="status" className="sr-only">
        {copied ? "Copied to clipboard" : ""}
      </span>
    </button>
  );
}
