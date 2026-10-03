import { ArrowLeft } from "@/components/icons";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

export const metadata = { title: "Page not found" };

export default function NotFound() {
  return (
    <section className="relative flex min-h-[80dvh] items-center overflow-hidden pt-24">
      <div aria-hidden="true" className="bg-grid pointer-events-none absolute inset-0" />
      <div aria-hidden="true" className="glow-primary pointer-events-none absolute top-0 left-1/2 h-[30rem] w-[40rem] -translate-x-1/2" />
      <Container className="relative text-center">
        <p className="font-mono text-sm text-primary-soft">404 · SELECT * FROM pages WHERE path = ?</p>
        <h1 className="mt-5 text-4xl font-semibold text-fg sm:text-6xl">
          0 rows <span className="text-gradient">returned</span>
        </h1>
        <p className="mx-auto mt-5 max-w-md text-lg text-muted">The page you&apos;re looking for doesn&apos;t exist or has moved.</p>
        <div className="mt-9 flex flex-wrap justify-center gap-3">
          <ButtonLink href="/">
            <ArrowLeft size={16} />
            Back home
          </ButtonLink>
          <ButtonLink href="/projects" variant="secondary">
            Browse projects
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
