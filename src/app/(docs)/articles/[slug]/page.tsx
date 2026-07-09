import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { compileMDX } from 'next-mdx-remote/rsc';
import { getArticleSlugs, getArticleSource } from '@/lib/articles';
import type { ArticleFrontmatter } from '@/types/content';
import { mdxComponents } from '@/components/mdx-components';
import { Badge } from '@/components/ui/badge';

export function generateStaticParams() {
  return getArticleSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  if (!getArticleSlugs().includes(params.slug)) return {};
  const source = getArticleSource(params.slug);
  const { frontmatter } = await compileMDX<ArticleFrontmatter>({ source, options: { parseFrontmatter: true } });
  return { title: frontmatter.title, description: frontmatter.description };
}

export default async function ArticlePage({ params }: { params: { slug: string } }) {
  if (!getArticleSlugs().includes(params.slug)) notFound();

  const source = getArticleSource(params.slug);
  const { content, frontmatter } = await compileMDX<ArticleFrontmatter>({
    source,
    components: mdxComponents,
    options: { parseFrontmatter: true },
  });

  return (
    <article>
      <p className="text-xs font-medium uppercase tracking-[0.2em] text-primary-light">
        {new Date(frontmatter.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
      </p>
      <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">{frontmatter.title}</h1>
      <p className="mt-4 max-w-2xl text-foreground/70">{frontmatter.description}</p>
      <div className="mt-5 flex flex-wrap gap-2">
        {frontmatter.tags?.map((tag) => (
          <Badge key={tag} variant="outline">
            {tag}
          </Badge>
        ))}
      </div>

      <div className="mdx-content mt-10 max-w-2xl text-foreground/70">{content}</div>
    </article>
  );
}
