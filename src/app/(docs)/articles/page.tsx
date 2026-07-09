import type { Metadata } from 'next';
import Link from 'next/link';
import { compileMDX } from 'next-mdx-remote/rsc';
import { ArrowRight } from 'lucide-react';
import { getArticleSlugs, getArticleSource } from '@/lib/articles';
import type { ArticleFrontmatter } from '@/types/content';
import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export const metadata: Metadata = {
  title: 'Technical Articles',
  description: 'Long-form writing on Android architecture, performance and enterprise engineering practice.',
};

async function getArticles() {
  const slugs = getArticleSlugs();
  const articles = await Promise.all(
    slugs.map(async (slug) => {
      const source = getArticleSource(slug);
      const { frontmatter } = await compileMDX<ArticleFrontmatter>({ source, options: { parseFrontmatter: true } });
      return { slug, frontmatter };
    }),
  );
  return articles.sort((a, b) => (a.frontmatter.date < b.frontmatter.date ? 1 : -1));
}

export default async function ArticlesPage() {
  const articles = await getArticles();

  return (
    <div>
      <p className="text-xs font-medium uppercase tracking-[0.2em] text-primary-light">Documentation</p>
      <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">Technical Articles</h1>
      <p className="mt-4 max-w-2xl text-foreground/70">
        Field notes on Android architecture, performance and enterprise engineering practice.
      </p>

      <div className="mt-10 space-y-5">
        {articles.map(({ slug, frontmatter }) => (
          <Link key={slug} href={`/articles/${slug}`}>
            <Card className="group transition-colors hover:border-primary/40">
              <CardHeader>
                <CardTitle className="flex items-center justify-between gap-4">
                  <span>{frontmatter.title}</span>
                  <ArrowRight className="h-4 w-4 shrink-0 text-foreground/30 transition-transform group-hover:translate-x-1 group-hover:text-primary-light" />
                </CardTitle>
                <CardDescription>{frontmatter.description}</CardDescription>
              </CardHeader>
              <CardFooter className="flex flex-wrap gap-2">
                {frontmatter.tags?.map((tag) => (
                  <Badge key={tag} variant="outline">
                    {tag}
                  </Badge>
                ))}
              </CardFooter>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
