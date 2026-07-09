import type { Topic } from '@/types/content';

export const flow: Topic = {
  slug: 'flow',
  title: 'Kotlin Flow',
  category: 'Kotlin',
  summary: 'An asynchronous stream of values over time, built on coroutines — cold by default (nothing runs until collected), with StateFlow and SharedFlow as the hot, always-active variants used for UI state and events.',
  sections: [
    {
      heading: 'Cold vs. hot — this is the distinction that actually matters day to day',
      body: [
        "A cold Flow (built with `flow { }`) runs its producer code fresh for every new collector — two collectors mean the block runs twice, independently. StateFlow and SharedFlow are hot: they run once regardless of collector count, and StateFlow additionally always holds a current value that any new collector immediately receives. This is why StateFlow is the standard choice for ViewModel UI state — every screen re-subscribing (after rotation) gets the current state instantly without re-triggering the work that produced it.",
      ],
    },
    {
      heading: 'Operators compose without blocking anything',
      body: [
        '`map`, `filter`, `debounce`, `combine` and friends transform a Flow declaratively, and none of them block — they suspend. `combine(searchQuery, filters) { query, filters -> ... }` re-emits whenever EITHER source changes, which is the idiomatic way to react to multiple independent state sources without manually wiring callbacks between them.',
      ],
    },
  ],
  codeSnippets: [
    {
      title: 'StateFlow for UI state, combine for reacting to two sources at once',
      language: 'kotlin',
      code: `class SearchViewModel : ViewModel() {
    private val query = MutableStateFlow("")
    private val filters = MutableStateFlow(SearchFilters())

    val results: StateFlow<List<Result>> = combine(query, filters) { q, f -> q to f }
        .debounce(300) // wait for typing to pause
        .flatMapLatest { (q, f) -> repository.search(q, f) } // cancels the previous search if a new one starts
        .stateIn(viewModelScope, SharingStarted.WhileSubscribed(5_000), emptyList())
}`,
    },
  ],
  interviewQuestions: [
    {
      level: 'senior',
      question: 'Why does a cold Flow re-run its producer for every collector, and when does that actually bite you?',
      answer:
        "A cold Flow's builder block is just a suspending function definition — it executes fresh each time `collect` is called, the same way a regular function runs fresh each time it's called. It bites you when the producer has a side effect or cost (a network call, registering a system callback) and you have multiple collectors expecting to share one execution — that's exactly when you need `.shareIn()` or `.stateIn()` to convert it to hot and share one underlying run.",
    },
    {
      level: 'lead',
      question: 'What does SharingStarted.WhileSubscribed(5_000) actually do, and why the 5 second delay?',
      answer:
        "It keeps the underlying Flow active for 5 seconds after the last collector disappears, before actually stopping it — this survives a brief gap like a configuration change (screen rotation), where the old collector unsubscribes and a new one resubscribes almost immediately, without restarting the whole upstream Flow (and its associated cost) in between.",
    },
  ],
  tech: ['Kotlin Flow', 'Coroutines'],
  relatedSlugs: ['coroutines', 'room'],
};
