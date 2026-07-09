import type { Topic } from '@/types/content';

export const composeFundamentals: Topic = {
  slug: 'compose-fundamentals',
  title: 'Jetpack Compose Fundamentals',
  category: 'Compose',
  summary: 'A declarative UI toolkit where you describe what the UI should look like for a given state, and Compose figures out what actually needs to be redrawn — the mental model shift from imperative View manipulation is the whole learning curve.',
  sections: [
    {
      heading: 'State hoisting: composables should be dumb, ViewModels should hold state',
      body: [
        "A composable that owns its own mutable state internally can't be controlled or previewed from outside, and can't easily sync with a ViewModel. Hoisting state means the composable receives its current value and an event callback as parameters (`value: String, onValueChange: (String) -> Unit`) rather than managing a `remember { mutableStateOf(...) }` internally — the composable becomes a pure function of its inputs, testable and previewable in isolation.",
      ],
    },
    {
      heading: 'Side effects need an explicit escape hatch',
      body: [
        "Composable functions can be called, re-called, or skipped by the Compose runtime at its discretion — they must be free of side effects to behave correctly under that model. `LaunchedEffect`, `DisposableEffect` and `SideEffect` are the deliberate escape hatches for anything that isn't pure UI description: starting a coroutine, registering a listener, or calling non-Compose APIs, scoped explicitly to a composable's lifecycle.",
      ],
    },
  ],
  codeSnippets: [
    {
      title: 'State hoisted up, composable stays a pure function of its inputs',
      language: 'kotlin',
      code: `@Composable
fun SearchField(query: String, onQueryChange: (String) -> Unit) {
    TextField(value = query, onValueChange = onQueryChange) // no internal state — fully controlled
}

// Caller owns the state:
val query by viewModel.query.collectAsStateWithLifecycle()
SearchField(query = query, onQueryChange = viewModel::onQueryChange)`,
    },
  ],
  interviewQuestions: [
    {
      level: 'senior',
      question: 'Why can\'t a composable function safely have side effects directly in its body?',
      answer:
        "The Compose runtime can call a composable function multiple times, skip calling it if inputs haven't changed, or re-execute it out of the order you might expect, all as part of its recomposition optimization strategy. A side effect (starting a coroutine, writing to a variable outside Compose's tracking) run directly in the body could execute unpredictably many times or at unexpected moments — LaunchedEffect and friends give you a controlled, lifecycle-aware place for that instead.",
    },
    {
      level: 'lead',
      question: 'When would you use DisposableEffect instead of LaunchedEffect?',
      answer:
        "DisposableEffect is for effects that need explicit cleanup when the composable leaves the composition or its keys change — registering a system callback (a sensor listener, a broadcast receiver) that must be unregistered. LaunchedEffect is for launching a coroutine tied to the composable's lifecycle, which cancels automatically on disposal without needing a manual cleanup block — DisposableEffect's `onDispose { }` is for non-coroutine cleanup.",
    },
  ],
  tech: ['Jetpack Compose'],
  relatedSlugs: ['animations', 'testing'],
};
