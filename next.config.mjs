/**
 * Static export configuration for GitHub Pages.
 * basePath/assetPrefix are derived automatically in CI from GITHUB_REPOSITORY
 * so the same config works for a project page (username.github.io/repo)
 * or a user/org page (username.github.io) without manual edits.
 */
const repoName = process.env.GITHUB_REPOSITORY?.split('/')?.[1] ?? '';
const isUserOrOrgPage = repoName.endsWith('.github.io');
const basePath = process.env.GITHUB_ACTIONS && repoName && !isUserOrOrgPage ? `/${repoName}` : '';

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath,
  assetPrefix: basePath,
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
};

export default nextConfig;
