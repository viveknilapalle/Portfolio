import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

type GalleryImage = { src: string; alt: string; caption?: string };

/** Screenshot gallery; the first image spans the full width for visual rhythm. */
export function Gallery({ images }: { images: GalleryImage[] }) {
  if (images.length === 0) return null;

  return (
    <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2">
      {images.map((image, index) => {
        const wide = index === 0 && images.length !== 2;
        return (
          <Reveal as="li" key={image.src} delay={index * 0.05} className={cn(wide && "sm:col-span-2")}>
            <figure className="group overflow-hidden rounded-2xl border border-line bg-surface">
              <a href={image.src} target="_blank" rel="noopener noreferrer" className="block" aria-label={`Open full-size image: ${image.alt}`}>
                <div className={cn("relative overflow-hidden bg-base-2", wide ? "aspect-[16/9]" : "aspect-[4/3]")}>
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    sizes={wide ? "(min-width: 1024px) 900px, 100vw" : "(min-width: 640px) 450px, 100vw"}
                    className="object-contain p-2 transition-transform duration-700 ease-out-soft group-hover:scale-[1.02]"
                  />
                </div>
              </a>
              {image.caption && (
                <figcaption className="border-t border-line px-4 py-3 text-sm text-muted">{image.caption}</figcaption>
              )}
            </figure>
          </Reveal>
        );
      })}
    </ul>
  );
}
