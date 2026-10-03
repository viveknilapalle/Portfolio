import Image from "next/image";
import { cn } from "@/lib/utils";

type ImageFrameProps = {
  src: string;
  alt: string;
  label?: string;
  priority?: boolean;
  sizes?: string;
  aspect?: string;
  fit?: "cover" | "contain";
  className?: string;
  imageClassName?: string;
};

/**
 * Screenshot presented inside a minimal window frame — gives mixed screenshots
 * (Streamlit, MySQL Workbench, Power BI) a consistent presentation.
 */
export function ImageFrame({
  src,
  alt,
  label,
  priority,
  sizes = "(min-width: 1024px) 50vw, 100vw",
  aspect = "aspect-[16/10]",
  fit = "cover",
  className,
  imageClassName,
}: ImageFrameProps) {
  return (
    <div className={cn("overflow-hidden rounded-2xl border border-line bg-surface", className)}>
      <div className="flex h-8 items-center gap-1.5 border-b border-line bg-base-2/80 px-3.5" aria-hidden="true">
        <span className="size-2.5 rounded-full bg-[#ff5f57]/80" />
        <span className="size-2.5 rounded-full bg-[#febc2e]/80" />
        <span className="size-2.5 rounded-full bg-[#28c840]/80" />
        {label && <span className="ml-3 truncate font-mono text-[0.68rem] text-muted">{label}</span>}
      </div>
      <div className={cn("relative overflow-hidden", aspect, fit === "contain" && "bg-white/[0.02]")}>
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes={sizes}
          className={cn(fit === "cover" ? "object-cover object-top" : "object-contain p-3", imageClassName)}
        />
      </div>
    </div>
  );
}
