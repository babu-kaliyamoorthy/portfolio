export type DocsNavItem = {
  label: string;
  href: string;
  description: string;
  available: boolean;
};

export const docsNav: DocsNavItem[] = [
  {
    label: 'Architecture',
    href: '/architecture',
    description: 'Clean Architecture, MVVM, MVI, DI, modularization',
    available: true,
  },
  {
    label: 'Technical Articles',
    href: '/articles',
    description: 'Long-form writing on architecture, performance and Compose',
    available: true,
  },
  {
    label: 'System Design',
    href: '/system-design',
    description: 'Banking, wallet, payments, offline sync',
    available: false,
  },
  {
    label: 'Android Learning Hub',
    href: '/learn',
    description: 'Kotlin, Compose, Coroutines, Flow, Room',
    available: false,
  },
  {
    label: 'Interview Preparation',
    href: '/interview-prep',
    description: 'Senior, lead and architect-level Q&A',
    available: true,
  },
  {
    label: 'Android Security',
    href: '/security',
    description: 'SSL pinning, OAuth, biometrics, encrypted storage',
    available: false,
  },
  {
    label: 'Android Performance',
    href: '/performance',
    description: 'ANRs, memory leaks, startup time, baseline profiles',
    available: false,
  },
  {
    label: 'Design Patterns',
    href: '/patterns',
    description: 'Builder, Factory, Observer, Strategy and more',
    available: true,
  },
  {
    label: 'SOLID Principles',
    href: '/solid',
    description: 'Each principle with real Android examples',
    available: true,
  },
  {
    label: 'Android Notes',
    href: '/notes',
    description: 'Quick-reference notes across topics',
    available: false,
  },
];
