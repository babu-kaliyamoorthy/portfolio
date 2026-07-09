import type { Topic } from '@/types/content';

export const benchmarking: Topic = {
  slug: 'benchmarking',
  title: 'Benchmarking',
  category: 'Performance',
  summary: 'Macrobenchmark and Microbenchmark turn "I think this is faster" into a measured, repeatable number in CI — so a performance claim is a graph, not a feeling.',
  sections: [
    {
      heading: 'Macrobenchmark vs. Microbenchmark — different questions, different tools',
      body: [
        'Macrobenchmark measures real, user-facing scenarios end to end on an actual device — app startup time, a specific screen\'s frame timing, scroll jank — and is what you use to validate a Baseline Profile actually helped. Microbenchmark measures a single function or small unit of code\'s raw execution time in isolation (a JSON parsing routine, a sorting algorithm) — useful for comparing two implementations of the same small operation, not for whole-app metrics.',
      ],
    },
    {
      heading: 'Making benchmark results trustworthy',
      body: [
        'A benchmark run on a thermal-throttled device, with other apps competing for CPU, or on a debug build with debugging overhead, produces numbers that don\'t reflect real user experience. Macrobenchmark specifically targets release builds, warns about thermal throttling, and reports percentiles (P50/P90/P99) rather than a single average — a single run\'s average can hide a fat tail of slow frames that real users actually feel.',
      ],
    },
  ],
  codeSnippets: [
    {
      title: 'A Macrobenchmark measuring startup with and without a Baseline Profile',
      language: 'kotlin',
      code: `@Test
fun startupCompilationModes() = benchmarkRule.measureRepeated(
    packageName = "com.bank.app",
    metrics = listOf(StartupTimingMetric()),
    iterations = 10,
    startupMode = StartupMode.COLD,
    compilationMode = CompilationMode.Partial(), // uses the Baseline Profile
) {
    pressHome()
    startActivityAndWait()
}`,
    },
  ],
  interviewQuestions: [
    {
      level: 'senior',
      question: 'Why would you use Macrobenchmark over just eyeballing the Profiler for a startup time claim?',
      answer:
        "Manual Profiler inspection is a single, unrepeatable sample susceptible to whatever else was running on the device that moment. Macrobenchmark runs many iterations, reports percentiles rather than one number, and — critically — can run in CI on every PR, turning 'this should be faster' into a regression-testable, repeatable metric instead of a one-off observation.",
    },
    {
      level: 'lead',
      question: 'A Macrobenchmark result looks great on your local Pixel but the team is skeptical it reflects real users. What\'s missing?',
      answer:
        "A single high-end device's numbers don't represent the fleet — testing across a range of device tiers (a low-end and a mid-range device alongside the flagship) is what actually validates a performance claim generalizes, since the devices with the least headroom are exactly where a regression would be most visible to real users.",
    },
  ],
  tech: ['Macrobenchmark', 'Microbenchmark'],
  relatedSlugs: ['startup-time', 'apk-size'],
};
