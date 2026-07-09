import Footer from '@/components/Footer';
import DocsNavbar from '@/components/docs/DocsNavbar';
import DocsSidebar from '@/components/docs/DocsSidebar';

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <DocsNavbar />
      <div className="container-narrow grid gap-10 px-6 py-12 sm:px-10 lg:grid-cols-[220px_1fr] lg:px-16 lg:py-16">
        <aside className="hidden lg:block">
          <div className="sticky top-28">
            <p className="mb-4 px-3 text-xs font-medium uppercase tracking-[0.2em] text-foreground/40">
              Documentation
            </p>
            <DocsSidebar />
          </div>
        </aside>
        <main className="min-w-0">{children}</main>
      </div>
      <Footer />
    </>
  );
}
