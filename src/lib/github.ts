export type GithubRepo = {
  name: string;
  description: string | null;
  htmlUrl: string;
  stars: number;
  language: string | null;
  updatedAt: string;
};

type GithubRepoResponse = {
  name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  language: string | null;
  updated_at: string;
  fork: boolean;
  archived: boolean;
};

/**
 * Fetches real public repos from the GitHub REST API at build time (this
 * runs once during `next build` for the static export - never at request
 * time). Fails gracefully to an empty list rather than breaking the build
 * if the API is unreachable or rate-limited.
 */
export async function getPublicRepos(username: string): Promise<GithubRepo[]> {
  try {
    const response = await fetch(
      `https://api.github.com/users/${username}/repos?sort=updated&per_page=12&type=owner`,
      { headers: { Accept: 'application/vnd.github+json' } },
    );

    if (!response.ok) return [];

    const repos: GithubRepoResponse[] = await response.json();

    return repos
      .filter((repo) => !repo.fork && !repo.archived)
      .map((repo) => ({
        name: repo.name,
        description: repo.description,
        htmlUrl: repo.html_url,
        stars: repo.stargazers_count,
        language: repo.language,
        updatedAt: repo.updated_at,
      }));
  } catch {
    return [];
  }
}
