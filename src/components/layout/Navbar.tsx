"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Close, Download, Menu } from "@/components/icons";
import { buttonClasses } from "@/components/ui/Button";
import { isActivePath, navItems } from "@/lib/navigation";
import { cn } from "@/lib/utils";

type NavbarProps = {
  firstName: string;
  lastName: string;
  resume: string;
};

export function Navbar({ firstName, lastName, resume }: NavbarProps) {
  const pathname = usePathname();
  // The menu is "open for a path": navigating anywhere closes it without an effect.
  const [openedAt, setOpenedAt] = useState<string | null>(null);
  const open = openedAt === pathname;
  const [scrolled, setScrolled] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // While the mobile menu is open: lock page scroll, close on Escape, keep focus inside.
  useEffect(() => {
    if (!open) return;
    const header = headerRef.current;
    document.body.style.overflow = "hidden";
    header?.querySelector<HTMLElement>("#mobile-menu a")?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpenedAt(null);
        toggleRef.current?.focus();
        return;
      }
      if (event.key !== "Tab" || !header) return;
      const focusable = [
        toggleRef.current,
        ...header.querySelectorAll<HTMLElement>("#mobile-menu a"),
      ].filter((el): el is HTMLElement => Boolean(el));
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <header
      ref={headerRef}
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-300",
        open ? "border-b border-line bg-base" : scrolled ? "border-b border-line bg-base/80 backdrop-blur-xl" : "border-b border-transparent",
      )}
    >
      <nav aria-label="Main" className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between gap-4 px-5 sm:px-8">
        <Link href="/" className="font-display text-[1.05rem] font-semibold tracking-tight text-fg">
          {firstName} <span className="text-gradient">{lastName}</span>
        </Link>

        <ul className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => {
            const active = isActivePath(pathname, item.href);
            return (
              <li key={item.href} className="relative">
                <Link
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "relative z-10 block rounded-full px-3.5 py-1.5 text-sm transition-colors duration-200",
                    active ? "text-fg" : "text-muted hover:text-fg",
                  )}
                >
                  {item.label}
                </Link>
                {active && (
                  <motion.span
                    layoutId="nav-active"
                    aria-hidden="true"
                    className="absolute inset-0 rounded-full border border-line-strong bg-white/[0.06]"
                    transition={{ type: "spring", stiffness: 420, damping: 34 }}
                  />
                )}
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-2">
          <a href={resume} target="_blank" rel="noopener noreferrer" className={buttonClasses({ variant: "secondary", size: "sm", className: "max-sm:hidden" })}>
            <Download size={15} />
            Resume
          </a>
          <button
            ref={toggleRef}
            type="button"
            className="inline-flex size-10 items-center justify-center rounded-full border border-line text-fg transition-colors hover:bg-white/5 md:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpenedAt(open ? null : pathname)}
          >
            {open ? <Close size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            className="h-[calc(100dvh-4rem)] overflow-y-auto border-t border-line md:hidden"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "calc(100dvh - 4rem)" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <ul className="flex flex-col gap-1 px-5 pt-6 pb-10">
              {navItems.map((item, index) => {
                const active = isActivePath(pathname, item.href);
                return (
                  <motion.li
                    key={item.href}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.04 * index + 0.05 }}
                  >
                    <Link
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "flex items-center justify-between rounded-2xl px-4 py-3.5 font-display text-2xl font-medium transition-colors",
                        active ? "bg-primary/12 text-fg" : "text-fg-2 hover:bg-white/5 hover:text-fg",
                      )}
                    >
                      {item.label}
                      {active && <span aria-hidden="true" className="size-2 rounded-full bg-accent" />}
                    </Link>
                  </motion.li>
                );
              })}
              <li className="mt-6 grid grid-cols-2 gap-3">
                <Link href="/contact" className={buttonClasses({ variant: "secondary" })}>
                  Contact
                </Link>
                <a href={resume} target="_blank" rel="noopener noreferrer" className={buttonClasses()}>
                  <Download size={16} />
                  Resume
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
