import fs from 'node:fs';
import path from 'node:path';

const articlesDirectory = path.join(process.cwd(), 'src/content/articles');

export function getArticleSlugs(): string[] {
  return fs
    .readdirSync(articlesDirectory)
    .filter((file) => file.endsWith('.mdx'))
    .map((file) => file.replace(/\.mdx$/, ''));
}

export function getArticleSource(slug: string): string {
  return fs.readFileSync(path.join(articlesDirectory, `${slug}.mdx`), 'utf8');
}
