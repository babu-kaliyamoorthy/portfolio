export type ProjectEnrichment = {
  tech: string[];
  relatedDocs: { label: string; href: string }[];
};

/**
 * Maps a project name (from src/data/resume.ts `projects`) to real tech and
 * documentation cross-links, derived from the matching `experience` entry's
 * actual tech/highlights - not invented. Projects with no matching
 * experience entry are intentionally left unenriched rather than guessed at.
 */
export const projectEnrichment: Record<string, ProjectEnrichment> = {
  'ENBD X': {
    tech: ['Kotlin', 'Compose', 'MVVM', 'Hilt', 'Coroutines', 'Flow', 'Retrofit'],
    relatedDocs: [
      { label: 'MVVM', href: '/architecture/mvvm' },
      { label: 'Dependency Injection (Hilt)', href: '/architecture/dependency-injection' },
      { label: 'Coroutines', href: '/learn/coroutines' },
    ],
  },
  'TSB Bank UK': {
    tech: ['Kotlin', 'RxJava', 'Retrofit', 'REST', 'XML'],
    relatedDocs: [
      { label: 'Biometric Authentication', href: '/security/biometric-authentication' },
      { label: 'Testing on Android', href: '/learn/testing' },
    ],
  },
  'Rabobank Netherlands': {
    tech: ['Kotlin', 'RxJava', 'MVVM', 'Retrofit'],
    relatedDocs: [{ label: 'MVVM', href: '/architecture/mvvm' }],
  },
  'Mamas & Papas Middle East': {
    tech: ['Kotlin', 'Android SDK', 'Unit Testing'],
    relatedDocs: [{ label: 'Testing on Android', href: '/learn/testing' }],
  },
};
