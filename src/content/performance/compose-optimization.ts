import type { Topic } from '@/types/content';

export const composeOptimization: Topic = {
  slug: 'compose-optimization',
  title: 'Compose Recomposition Optimization',
  category: 'Performance',
  summary: 'Compose recomposes a composable whenever its inputs change — the performance work is making sure only the composables that actually need to redraw actually recompose, not the whole tree.',
  sections: [
    {
      heading: 'Stability is what lets Compose skip recomposition',
      body: [
        "The Compose compiler decides whether a composable's parameters are 'stable' (a stable type guarantees that if its public properties don't change, `equals()` reflects that). If a parameter's type is unstable, Compose can't safely skip recomposition even when the value didn't meaningfully change, so it recomposes defensively. A `data class` with a `var` property, or a plain `List` (whose stability isn't guaranteed), are common unstable culprits — `ImmutableList` or a `val`-only data class fixes it.",
      ],
    },
    {
      heading: 'Reading state at the right scope',
      body: [
        "Reading a StateFlow's `.value` at the top of a large composable means that ENTIRE composable recomposes on every state change, even if only a small nested piece of UI actually depends on that value. Hoisting the read down into the smallest composable that actually needs it — or using `derivedStateOf` for computed values — narrows recomposition to just that scope instead of the whole subtree.",
      ],
    },
  ],
  codeSnippets: [
    {
      title: '❌ Unstable parameter forces defensive recomposition',
      language: 'kotlin',
      code: `data class CardUiState(var isLoading: Boolean, val cards: List<Card>) // 'var' makes this unstable

@Composable
fun CardList(state: CardUiState) { /* recomposes even when nothing meaningfully changed */ }`,
    },
    {
      title: '✅ Stable, immutable inputs Compose can safely skip on',
      language: 'kotlin',
      code: `data class CardUiState(val isLoading: Boolean, val cards: ImmutableList<Card>) // stable

@Composable
fun CardList(state: CardUiState) { /* Compose can now correctly skip recomposition */ }`,
    },
  ],
  interviewQuestions: [
    {
      level: 'senior',
      question: 'What makes a type "unstable" to the Compose compiler, concretely?',
      answer:
        "A type is stable if the compiler can guarantee its equals() result won't change unless a public property changes — this requires all properties to be immutable (val, not var) and themselves stable types. A plain Kotlin List interface isn't guaranteed stable (the compiler can't prove the concrete implementation is immutable), which is why ImmutableList from the compose collections library is recommended for state passed into composables.",
    },
    {
      level: 'architect',
      question: 'How do you actually verify recomposition is happening where you think it is, rather than guessing?',
      answer:
        'Layout Inspector\'s recomposition counts overlay shows exactly how many times each composable recomposed, directly in the running app — this replaces guessing with measurement. The Compose compiler report (a Gradle flag) additionally lists every composable\'s stability classification project-wide, showing exactly which ones the compiler considers unstable and why.',
    },
  ],
  tech: ['Jetpack Compose'],
  relatedSlugs: ['anr', 'memory-leaks'],
};
