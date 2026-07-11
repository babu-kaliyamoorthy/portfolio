export type SkillDetail = {
  definition: string;
  whyItMatters: string;
  realProjectUsage: string;
  example: string;
};

/**
 * Keyed by the `category` values in src/data/resume.ts `skills`. Real project
 * usage is grounded in the actual experience/projects data, not invented.
 */
export const skillDetails: Record<string, SkillDetail> = {
  Languages: {
    definition: 'Kotlin as the primary language, with Java for legacy modules and interop with older libraries.',
    whyItMatters: "Kotlin's null safety, coroutines and concise syntax cut a real category of NPE crashes and boilerplate that Java-era Android code was prone to.",
    realProjectUsage: 'The ENBD X banking app and Rabobank Netherlands engagement were both Kotlin-first, with Java interop needed for select third-party SDKs.',
    example: 'A nullable API response mapped through a safe-call chain (`response?.data?.balance`) instead of a manual null check at every access point.',
  },
  'Android Development': {
    definition: 'Android SDK, Jetpack Compose and XML UI with Material Design, Navigation Components and lifecycle-aware components as the first-party toolkit.',
    whyItMatters: 'These libraries are built and tested against real Android lifecycle edge cases (rotation, process death) that hand-rolled equivalents get wrong far more often.',
    realProjectUsage: 'Compose UI following MVVM has been used to build modern components on large-scale banking Cards modules; earlier engagements shipped XML-based UI on Android SDK directly.',
    example: 'A ViewModel exposing StateFlow, observed via collectAsStateWithLifecycle() in a Composable — see MVVM under Architecture.',
  },
  'Architecture & Design': {
    definition: 'MVVM, Clean Architecture, the Repository Pattern, SOLID Principles and Modularization — see the full Architecture hub for depth on each.',
    whyItMatters: "These patterns are what let a banking codebase stay testable and safe to change over 8-10+ years and many engineers, instead of accumulating unmanageable coupling.",
    realProjectUsage: 'Large-scale banking Cards module modularization and MVVM-based mobile banking solutions both rely on these patterns directly.',
    example: 'See Clean Architecture and MVVM under the Architecture section for real code.',
  },
  'Concurrency & Reactive Programming': {
    definition: 'Kotlin Coroutines, Flow and StateFlow as the primary async model, with RxJava on older codebases predating the Coroutines migration.',
    whyItMatters: 'Structured concurrency (see Coroutines under the Learning Hub) is what prevents background work from leaking past the screen that started it.',
    realProjectUsage: 'Coroutines and Flow power reactive, asynchronous flows on modern banking Cards modules; RxJava was the async model on the TSB Bank UK and Rabobank Netherlands engagements.',
    example: 'viewModelScope.launch { } tied to the ViewModel\'s lifecycle — cancels automatically, no manual bookkeeping.',
  },
  'Networking & Storage': {
    definition: 'Retrofit over REST APIs, with Room Database, SQLite and local caching handling on-device persistence.',
    whyItMatters: "Retrofit's type-safe API definitions catch a request/response mismatch at compile time rather than as a runtime parsing crash, while local caching keeps the app usable through flaky connectivity.",
    realProjectUsage: 'Used across every banking engagement — Emirates NBD, TSB Bank UK and Rabobank Netherlands all integrated backend services via Retrofit-based REST APIs with local caching for offline resilience.',
    example: 'An OkHttp Authenticator handling silent token refresh on a 401 — see Session Timeout & Token Refresh under Security.',
  },
  'Dependency Injection': {
    definition: 'Hilt as the primary DI framework, built on Dagger.',
    whyItMatters: 'Constructor injection makes every class swappable in a test — a fake repository can replace the real one with zero changes to the class under test.',
    realProjectUsage: 'Hilt is commonly applied on large banking Cards modules specifically to enhance modularity and maintainability during a modularization effort.',
    example: 'See Dependency Injection (Hilt) under Architecture for the full scoping and constructor-injection walkthrough.',
  },
  'Testing & Quality Engineering': {
    definition: 'JUnit for fast JVM unit tests, Espresso for instrumented UI tests, Firebase Crashlytics for production crash monitoring, and SonarQube/Lint for static code quality gates.',
    whyItMatters: 'Business logic tested at the JVM level runs in milliseconds with no emulator, and Crashlytics is what actually surfaces production crash-free rate — the metric behind the 95% → 98% improvement described in Achievements.',
    realProjectUsage: "Unit testing was a core deliverable on the Wipro/Bloomingdale's Middle East engagement, and code quality was enforced via SonarQube and comprehensive unit testing on the TSB Bank UK project.",
    example: 'A Crashlytics dashboard segmented by app version, used to confirm a crash-free rate improvement actually held after a release, not just in the sprint it shipped.',
  },
  'DevOps & Tools': {
    definition: 'Jenkins-based CI/CD pipelines and Git for version control, alongside Jira for planning and Postman for API verification, within an Agile/Scrum delivery model.',
    whyItMatters: 'A CI gate that runs tests and static analysis on every PR catches regressions before they reach a release build, not after — and Jira/Postman keep delivery and integration verification predictable across a team.',
    realProjectUsage: 'CI/CD workflows and automated testing strategies are a core part of shipping a banking Cards module reliably at a fast pace, with Jira and Postman used day-to-day for planning and API verification before client integration.',
    example: 'A SonarQube quality gate blocking merge on new code smells or a coverage regression, enforced as part of the PR pipeline.',
  },
  'Domain Expertise': {
    definition: 'Digital banking, payments, authentication and biometrics — the domain knowledge behind credit card and credit limit workflows on enterprise mobile applications.',
    whyItMatters: 'Banking-specific domain knowledge (compliance constraints, secure transaction flows, biometric auth patterns) is what separates a generically "working" feature from one that survives a security review.',
    realProjectUsage: "Directly applied delivering the Credit Card Application and Credit Limit Increase journeys on ENBD X, and biometric authentication for secure login and transaction approval on the TSB Bank UK engagement.",
    example: 'Biometric authentication gating a transaction approval step — see Biometric Authentication under Security.',
  },
};
