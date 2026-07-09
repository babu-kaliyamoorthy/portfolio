import type { Topic } from '@/types/content';

export const apkSize: Topic = {
  slug: 'apk-size',
  title: 'APK Size, R8 & ProGuard',
  category: 'Performance',
  summary: 'Smaller downloads convert better, especially on constrained networks and storage — R8 shrinks, obfuscates and optimizes bytecode at build time, removing unreachable code and renaming symbols to save space.',
  sections: [
    {
      heading: 'What R8 actually does, beyond just minification',
      body: [
        "R8 performs three related jobs: shrinking (removing classes/methods/fields nothing reachable from the app's entry points actually calls), obfuscation (renaming classes/methods to short meaningless names, incidentally making reverse-engineering harder), and optimization (inlining, removing dead branches). Shrinking is the one that actually reduces size; obfuscation and optimization are mostly free size/security wins once shrinking is already enabled.",
      ],
    },
    {
      heading: 'Where it breaks: reflection and serialization',
      body: [
        "R8 can't statically prove a class accessed only via reflection (Retrofit's dynamic proxy generation, Gson's reflective deserialization, Room's generated code before annotation processing runs) is actually used, so it may strip it — causing a runtime crash that only shows up in the shrunk release build, never in debug. Keep rules (`-keep class ...`) tell R8 to leave specific classes untouched despite no static reference being visible.",
      ],
    },
  ],
  codeSnippets: [
    {
      title: 'A targeted keep rule instead of disabling shrinking entirely',
      language: 'kotlin',
      code: `# proguard-rules.pro
# Keep data classes used with Gson reflection-based deserialization
-keep class com.bank.app.data.model.** { *; }
# Don't just do -dontshrink — that throws away the entire size benefit`,
    },
  ],
  interviewQuestions: [
    {
      level: 'senior',
      question: 'A release build crashes with a ClassNotFoundException that never happens in debug. What\'s the likely cause and fix?',
      answer:
        "R8 shrinking removed a class it couldn't prove was reachable — almost always something accessed via reflection (Gson deserialization, a dynamically loaded class) rather than a direct reference the shrinker's static analysis can see. The fix is a targeted `-keep` rule for that specific class or package, not disabling shrinking globally, which throws away the entire size benefit.",
    },
    {
      level: 'lead',
      question: 'How do you verify a new -keep rule doesn\'t silently bloat the APK back up?',
      answer:
        "R8 can generate a shrinker report showing exactly what was kept and why (which rule matched), and comparing APK size before/after the rule change with `bundletool` or the Android Studio APK Analyzer shows the concrete size delta. The habit is to scope keep rules as narrowly as possible — a specific package or class, never a broad wildcard that keeps far more than necessary.",
    },
  ],
  tech: ['R8', 'ProGuard'],
  relatedSlugs: ['startup-time', 'benchmarking'],
};
