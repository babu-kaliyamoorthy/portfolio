import type { Topic } from '@/types/content';

export const startupTime: Topic = {
  slug: 'startup-time',
  title: 'Startup Time & Baseline Profiles',
  category: 'Performance',
  summary: 'Cold start is the slowest, most-measured moment in the app\'s life — every class loaded and every method JIT-compiled from scratch — and Baseline Profiles are the main lever for shrinking it without moving real work elsewhere.',
  sections: [
    {
      heading: 'Why cold start is disproportionately slow',
      body: [
        "On a cold start, there's no process, no cached classes, and critical-path code hasn't been compiled to native machine code yet — it runs interpreted or gets JIT-compiled on the fly, which is slow. `Application.onCreate()` doing heavy synchronous work (eagerly initializing every SDK, reading a large config file) directly extends this already-slow window.",
      ],
    },
    {
      heading: 'Baseline Profiles pre-compile the critical path ahead of time',
      body: [
        'A Baseline Profile lists the exact classes and methods exercised during startup and key user journeys, generated from a real instrumented run. ART uses this list to ahead-of-time compile those methods at install time, instead of interpreting or JIT-compiling them cold — the startup path runs as compiled native code from the very first launch.',
      ],
    },
  ],
  codeSnippets: [
    {
      title: 'Generating a Baseline Profile with Macrobenchmark',
      language: 'kotlin',
      code: `@Test
fun generateStartupProfile() = baselineProfileRule.collect(
    packageName = "com.bank.app",
) {
    pressHome()
    startActivityAndWait() // exercises the real startup path to profile
}`,
    },
  ],
  interviewQuestions: [
    {
      level: 'senior',
      question: 'What\'s the actual difference cold, warm, and hot start measure?',
      answer:
        'Cold start: process doesn\'t exist, everything initializes from scratch — the slowest and most-optimized case. Warm start: process exists but the Activity was destroyed, so it recreates the Activity without recreating the process. Hot start: Activity just needs to come back to the foreground, no recreation at all — the fastest. Baseline Profiles target cold start specifically, since that\'s where AOT compilation has the most room to help.',
    },
    {
      level: 'lead',
      question: 'A teammate wants to lazy-init every SDK in Application.onCreate() to speed up startup. What\'s the risk?',
      answer:
        "Lazy-initializing everything can just move the cost to the first screen that actually needs that SDK, potentially creating a jank moment mid-interaction instead of a startup delay — which can be worse for perceived performance, not better. The right approach measures which SDKs are actually needed for the FIRST frame versus which can genuinely defer, rather than blanket-deferring everything.",
    },
  ],
  tech: ['Baseline Profiles', 'Macrobenchmark'],
  relatedSlugs: ['apk-size', 'benchmarking'],
};
