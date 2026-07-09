import type { Topic } from '@/types/content';

/**
 * Wraps a static topic array with lookup helpers. Every hub section
 * (Architecture today, Design Patterns/SOLID/Security/Performance next)
 * calls this once so list and detail pages share one implementation.
 */
export function createTopicCollection<T extends Topic>(topics: T[]) {
  return {
    getAll: (): T[] => topics,
    getBySlug: (slug: string): T | undefined => topics.find((topic) => topic.slug === slug),
    getSlugs: (): string[] => topics.map((topic) => topic.slug),
  };
}
