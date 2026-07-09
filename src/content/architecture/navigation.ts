import type { Topic } from '@/types/content';

export const navigation: Topic = {
  slug: 'navigation',
  title: 'Navigation',
  category: 'Architecture',
  summary:
    "Routes as type-safe data, not string paths — so a missing or mistyped navigation argument is a compile error, and each feature module can own its own navigation graph without the app module knowing its internal screen structure.",
  diagram: `graph TD
    AppGraph["App NavHost"] --> CardsGraph[":feature:cards nav graph"]
    AppGraph --> AccountsGraph[":feature:accounts nav graph"]
    CardsGraph --> CardList["Card List"]
    CardsGraph --> CardDetail["Card Detail (cardId)"]
    CardsGraph --> Application["Card Application"]`,
  sections: [
    {
      heading: 'Type-safe routes over string paths',
      body: [
        "String-based routes (`\"card_detail/{cardId}\"`) push argument mistakes to runtime — a typo in the route string or a missing argument only surfaces as a crash when the user navigates there. Modeling each destination as a sealed class or `@Serializable` object with typed arguments turns that into a compile-time error: the navigation call site simply won't build if the argument is missing or the wrong type.",
      ],
    },
    {
      heading: 'Nested graphs keep feature modules decoupled',
      body: [
        "Each feature module can define and own its own nested navigation graph internally, exposing only its entry-point route to the app-level graph. The app module wires feature graphs together without knowing what screens exist inside :feature:cards — which is what actually makes modularization hold together at the navigation layer instead of forcing every route to be declared in one shared, ever-growing file.",
      ],
    },
  ],
  pros: [
    'Missing or mistyped navigation arguments are caught at compile time, not as a runtime crash',
    "Feature modules own their internal navigation graph — the app module doesn't need to know a feature's screen structure",
    'Deep links map naturally onto the same typed route definitions used for in-app navigation',
  ],
  cons: [
    'Type-safe navigation libraries add a small amount of setup and codegen compared to raw string routes',
    'Passing large or non-serializable objects as navigation arguments is an anti-pattern either way — pass an ID and re-fetch, not a full object',
  ],
  whenToUse: [
    'Any modularized app where feature modules should not need to know about each other\'s screens',
    'Apps with deep links that need to resolve reliably to a specific screen with specific arguments',
  ],
  enterpriseExample:
    'Card detail and card application screens accept only a `cardId` as a navigation argument — never a full Card object — so the destination always re-fetches current data from the repository rather than trusting a possibly-stale object passed across a navigation boundary, which matters for balances and limits that can change between screens.',
  codeSnippets: [
    {
      title: 'Typed routes instead of string paths',
      language: 'kotlin',
      code: `sealed interface CardsRoute {
    @Serializable data object CardList : CardsRoute
    @Serializable data class CardDetail(val cardId: String) : CardsRoute
}

// Compile error if cardId is missing — not a runtime crash
navController.navigate(CardsRoute.CardDetail(cardId = card.id))`,
    },
  ],
  interviewQuestions: [
    {
      level: 'senior',
      question: 'Why pass a cardId as a navigation argument instead of the whole Card object?',
      answer:
        "The destination screen re-fetches current data from the repository using that ID, so it always shows up-to-date state rather than whatever the Card object looked like at the moment of navigation — which matters when balances, limits or status can change between screens. It also keeps navigation arguments small and serializable, avoiding the overhead and fragility of passing complex objects across a navigation boundary.",
    },
    {
      level: 'lead',
      question: 'How does a deep link resolve to the right screen with the right arguments in a modularized app?',
      answer:
        "The deep link URI pattern is declared alongside the typed route it maps to (e.g., `enbd://cards/{cardId}` mapping to `CardsRoute.CardDetail`), inside the feature module that owns that screen. The app-level graph doesn't need to know the mapping — it just hosts the feature graph, and the navigation library resolves the incoming URI against whichever nested graph declared a matching pattern.",
    },
    {
      level: 'architect',
      question: 'Where do you draw the line on what belongs in the app-level nav graph vs. a feature-level nested graph?',
      answer:
        "The app-level graph should only know about each feature's single entry point (and maybe a couple of cross-feature deep-link targets) — never a feature's internal screen structure. If the app module needs to know about a screen three levels deep inside a feature, that's a sign the feature's public navigation API is leaking implementation details it shouldn't.",
    },
  ],
  tech: ['Compose Navigation', 'Kotlin Serialization', 'Deep Links'],
  relatedSlugs: ['modularization', 'mvvm'],
};
