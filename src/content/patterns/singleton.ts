import type { Topic } from '@/types/content';

export const singleton: Topic = {
  slug: 'singleton',
  title: 'Singleton',
  category: 'Design Pattern',
  summary: 'Exactly one instance of a class for the lifetime of the process — used for things that are genuinely process-wide by nature, like a database connection or an in-memory cache.',
  sections: [
    {
      heading: 'Where it earns its place on Android',
      body: [
        'A Room database instance, an OkHttp client, or an in-memory session cache are all genuinely process-wide — creating a second Room database instance pointed at the same file is a bug, not a feature. Hilt\'s `@Singleton` scope is the modern way to get this: the DI graph creates it once and hands out the same instance everywhere, with none of classic Singleton\'s testability problems.',
      ],
    },
    {
      heading: 'Why the classic GoF version is an anti-pattern on Android',
      body: [
        "A hand-rolled `object` or a static `getInstance()` singleton can't be swapped for a test fake — every class that references it directly is now permanently coupled to that exact global instance, with no seam for injecting a fake in a unit test. It also silently becomes a memory leak risk if it ever holds an Activity or View reference, since it lives for the process lifetime.",
      ],
    },
  ],
  pros: [
    'Guarantees exactly one instance for things that must be process-wide (a DB connection, a cache)',
    'Via Hilt @Singleton, still fully testable — inject a fake in tests instead of the real singleton',
  ],
  cons: [
    'A hand-rolled `object` singleton is a global, untestable dependency baked into every caller',
    'Easy to misuse for things that should NOT be process-wide, creating hidden shared mutable state across unrelated features',
  ],
  whenToUse: [
    'Genuinely process-wide resources: database instance, network client, in-memory cache',
    'Always via Hilt @Singleton scope, not a hand-rolled `object` with global state',
  ],
  codeSnippets: [
    {
      title: '❌ Classic singleton — untestable, globally coupled',
      language: 'kotlin',
      code: `object SessionManager {
    var authToken: String? = null // global mutable state, every caller coupled to this exact object
}`,
    },
    {
      title: '✅ Hilt-scoped singleton — same one instance, but swappable in tests',
      language: 'kotlin',
      code: `@Singleton
class SessionManager @Inject constructor() {
    var authToken: String? = null
}
// Hilt hands out the same instance everywhere in production,
// while a test can inject a fake SessionManager instead`,
    },
  ],
  interviewQuestions: [
    {
      level: 'senior',
      question: 'Why is a Kotlin `object` singleton considered harder to test than a Hilt @Singleton?',
      answer:
        'A Kotlin `object` is a compile-time global — every class referencing it is hard-coupled to that exact instance, with no way to substitute a fake in a unit test without reflection hacks. A Hilt `@Singleton`-scoped class is still injected through a constructor, so a test can simply construct the class under test with a fake instance instead, without touching the production DI graph.',
    },
    {
      level: 'lead',
      question: 'What real bug have you seen from Singleton misuse?',
      answer:
        "A singleton holding an Activity or View reference — directly, or indirectly through a listener/callback registered on it — becomes a classic memory leak, since the singleton outlives the Activity but keeps it referenced. The fix is the same rule as Hilt scoping in general: singletons should only ever hold Application-scoped references, never anything tied to a shorter-lived UI component.",
    },
  ],
  tech: ['Kotlin', 'Hilt'],
  relatedSlugs: ['factory', 'strategy'],
};
