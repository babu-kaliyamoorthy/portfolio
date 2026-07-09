import type { Topic } from '@/types/content';

export const modularization: Topic = {
  slug: 'modularization',
  title: 'Modularization',
  category: 'Architecture',
  summary:
    'Splitting a single monolithic Gradle module into independent feature and core modules with explicit dependencies, so build times, team ownership and testability all scale with the codebase instead of degrading as it grows.',
  diagram: `graph TD
    App[":app"] --> FeatureCards[":feature:cards"]
    App --> FeatureAccounts[":feature:accounts"]
    FeatureCards --> CoreNetwork[":core:network"]
    FeatureCards --> CoreDesign[":core:design-system"]
    FeatureAccounts --> CoreNetwork
    FeatureAccounts --> CoreDesign
    CoreNetwork --> CoreCommon[":core:common"]
    CoreDesign --> CoreCommon`,
  sections: [
    {
      heading: 'The problem it actually solves',
      body: [
        "A single-module app means Gradle recompiles the entire codebase for a one-line change anywhere, and every engineer's IDE indexes the whole thing. Past a certain size, that's minutes lost per build, multiplied by every engineer, every day. Modularization turns 'change one file, rebuild everything' into 'change one file, rebuild that module and whatever depends on it.'",
        "It also draws an enforceable ownership boundary: a feature module's internals aren't visible outside it unless explicitly exposed through its public API, so two teams working in :feature:cards and :feature:accounts can't accidentally couple to each other's implementation details.",
      ],
    },
    {
      heading: 'Feature modules vs. layer modules',
      body: [
        "Splitting by layer (all ViewModels in one module, all repositories in another) still forces a full-graph rebuild for any feature change, since a feature spans every layer. Splitting by feature (:feature:cards owns its own presentation, domain and data internally, only exposing a small public surface) is what actually isolates the rebuild — a change to the cards feature doesn't touch :feature:accounts at all.",
        "Shared code goes in :core modules (:core:network, :core:design-system, :core:common) that feature modules depend on but never depend on each other — a feature module depending on another feature module is the boundary violation that reintroduces the coupling modularization was meant to remove.",
      ],
    },
  ],
  pros: [
    'Incremental builds only recompile the modules that actually changed',
    'Enforces ownership boundaries at compile time, not just by convention or code review',
    'Feature modules can be developed, tested, and even demoed in isolation',
  ],
  cons: [
    'Getting module boundaries wrong early is expensive to unwind — moving code between modules touches every import site',
    'Too many tiny modules adds Gradle configuration overhead that can outweigh the build-time win',
    'Shared UI state or navigation across features needs a deliberate contract (a core module, or a navigation API) or modules quietly recouple through it',
  ],
  whenToUse: [
    'Apps large enough that full-project rebuild time is a measured, felt cost',
    'Multiple teams or squads owning distinct features in the same codebase',
    'Codebases expected to live and grow for years, where build-time and ownership debt compounds',
  ],
  enterpriseExample:
    "Pulling a Cards feature out of the app-level module into its own :feature:cards module with a small public API (the screens and a navigation entry point), while everything else — ViewModels, use cases, repository implementations — becomes internal, is a common pattern on large banking apps. It's what lets a Cards team iterate without waiting on unrelated parts of the app to rebuild, and prevents other features from reaching into Cards' internals.",
  codeSnippets: [
    {
      title: 'Module dependency declared with the right visibility',
      language: 'kotlin',
      code: `// feature/cards/build.gradle.kts
dependencies {
    implementation(project(":core:network"))   // internal detail, not exposed to consumers
    implementation(project(":core:design-system"))
    api(project(":core:navigation"))           // part of this module's public contract
}`,
    },
  ],
  interviewQuestions: [
    {
      level: 'senior',
      question: "What's the difference between `api` and `implementation` in a module's build.gradle, and why does it matter for build times?",
      answer:
        "`implementation` keeps a dependency internal — consumers of this module don't see it on their compile classpath, so changing it only triggers a recompile of this module. `api` exposes it transitively, so changing that dependency forces every downstream module to recompile too. Defaulting to `implementation` and only using `api` when a type genuinely needs to leak into the public surface is what keeps incremental builds fast.",
    },
    {
      level: 'lead',
      question: 'Two feature modules need to navigate to each other. How do you avoid them depending on each other directly?',
      answer:
        "Introduce a small :core:navigation module defining route contracts (sealed classes or string routes) that both feature modules depend on, without depending on each other. Neither feature module knows the other exists — they only know about routes defined in the shared contract, and the app-level module wires the actual navigation graph together.",
    },
    {
      level: 'architect',
      question: 'How do you decide where to draw module boundaries on a new large app?',
      answer:
        "Boundaries should follow team/feature ownership, not technical layering — a module should be something one team can own end-to-end without coordinating with another team for most changes. Start coarser than feels necessary (fewer, larger modules) and split further only when a real pain point shows up — a slow build, or two teams stepping on each other in the same module — rather than guessing the ideal granularity up front.",
    },
  ],
  tech: ['Gradle', 'Kotlin', 'Modularization'],
  relatedSlugs: ['clean-architecture', 'navigation'],
};
