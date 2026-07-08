import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Prefixes a root-relative path with the deployment basePath.
 * Needed for plain <a>/<img> paths, since Next.js only auto-applies
 * basePath to next/link, next/image and metadata-driven URLs.
 */
export function withBasePath(path: string) {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? '';
  return `${basePath}${path}`;
}
