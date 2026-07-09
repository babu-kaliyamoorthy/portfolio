export type EcosystemStatus = 'available' | 'building' | 'coming-soon';

export type EcosystemRepo = {
  name: string;
  description: string;
  status: EcosystemStatus;
  githubUrl?: string;
};

export const ecosystemRepos: EcosystemRepo[] = [
  {
    name: 'Portfolio Website',
    description: 'This site — Next.js, TypeScript, Tailwind CSS.',
    status: 'available',
    githubUrl: 'https://github.com/babu-kaliyamoorthy/portfolio',
  },
  {
    name: 'Android Clean Architecture',
    description: 'Clean Architecture + MVVM + Hilt + Room sample — an accounts & transactions app.',
    status: 'available',
    githubUrl: 'https://github.com/babu-kaliyamoorthy/android-clean-architecture',
  },
  {
    name: 'Banking App Sample',
    description: 'A larger, modularized banking app sample built on the same architecture.',
    status: 'building',
  },
  {
    name: 'Android System Design',
    description: 'Diagrams and write-ups for real-world Android system design scenarios.',
    status: 'coming-soon',
  },
  {
    name: 'Android Interview Guide',
    description: 'Senior/lead/architect-level interview questions, organized and searchable.',
    status: 'coming-soon',
  },
  {
    name: 'Android Architecture Notes',
    description: 'Reference notes on Android architecture decisions and trade-offs.',
    status: 'coming-soon',
  },
  {
    name: 'Kotlin Deep Dive',
    description: 'Focused samples covering Kotlin language features used in production Android code.',
    status: 'coming-soon',
  },
  {
    name: 'Jetpack Compose Samples',
    description: 'Standalone Compose UI, state and animation samples.',
    status: 'coming-soon',
  },
  {
    name: 'Android Performance',
    description: 'Baseline Profiles, benchmarking and profiling samples.',
    status: 'coming-soon',
  },
  {
    name: 'Android Security',
    description: 'Biometric auth, certificate pinning and encrypted storage samples.',
    status: 'coming-soon',
  },
  {
    name: 'Design Patterns',
    description: 'Kotlin implementations of classic design patterns, with Android-specific context.',
    status: 'coming-soon',
  },
  {
    name: 'SOLID Principles',
    description: 'Each SOLID principle as a runnable Kotlin example.',
    status: 'coming-soon',
  },
  {
    name: 'Multi-Module Architecture',
    description: 'A real multi-module Gradle setup showing feature/core module boundaries.',
    status: 'coming-soon',
  },
  {
    name: 'CI/CD for Android',
    description: 'GitHub Actions workflows for testing, building and releasing Android apps.',
    status: 'coming-soon',
  },
  {
    name: 'Open Source Utilities',
    description: 'Small, focused Kotlin extension and utility libraries.',
    status: 'coming-soon',
  },
];
