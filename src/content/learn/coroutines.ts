import type { Topic } from '@/types/content';

export const coroutines: Topic = {
  slug: 'coroutines',
  title: 'Kotlin Coroutines & Structured Concurrency',
  category: 'Kotlin',
  summary: 'Coroutines are cooperative, suspendable functions — cheap enough to launch thousands of, and structured concurrency guarantees a parent scope can\'t complete while its children are still running, which is what actually prevents leaked background work.',
  sections: [
    {
      heading: 'Structured concurrency is the actual safety guarantee',
      body: [
        "`viewModelScope.launch { }` ties a coroutine's lifetime to the ViewModel's — when the ViewModel clears, the scope cancels, and every coroutine launched in it cancels too, automatically. This is the core guarantee structured concurrency gives you: you can't accidentally leak a running coroutine past the lifetime of whatever should own it, because the scope hierarchy enforces cancellation propagation for you.",
      ],
    },
    {
      heading: 'Dispatchers decide the thread, not the concurrency model',
      body: [
        '`Dispatchers.Main` runs on the UI thread (for UI updates), `Dispatchers.IO` runs on a thread pool tuned for blocking I/O (network, disk), and `Dispatchers.Default` is tuned for CPU-intensive work (sorting, parsing). Switching dispatchers with `withContext` doesn\'t change which coroutine you\'re in or its structured concurrency guarantees — it only changes which thread the code inside that block actually runs on.',
      ],
    },
  ],
  codeSnippets: [
    {
      title: 'Structured concurrency in practice — cancellation propagates automatically',
      language: 'kotlin',
      code: `class AccountViewModel : ViewModel() {
    fun loadAccount() {
        viewModelScope.launch { // tied to this ViewModel's lifecycle
            val account = withContext(Dispatchers.IO) { repository.getAccount() }
            _uiState.value = AccountUiState(account) // back on Main automatically
        }
        // If the ViewModel is cleared before this completes, it's cancelled — no leak, no manual bookkeeping
    }
}`,
    },
  ],
  interviewQuestions: [
    {
      level: 'senior',
      question: 'What does "structured concurrency" actually guarantee that unstructured async code (raw threads, callbacks) doesn\'t?',
      answer:
        "That a parent scope cannot complete — or be considered 'done' — while any of its child coroutines are still running, and that cancelling a parent automatically cancels all its children. This makes leaked background work structurally much harder: you'd have to deliberately launch outside the intended scope (like GlobalScope) to leak it, rather than it being the default risk of every async call.",
    },
    {
      level: 'lead',
      question: 'Why would you choose Dispatchers.Default over Dispatchers.IO for a CPU-bound task like sorting a large list?',
      answer:
        "Dispatchers.IO is sized for many concurrent blocking operations (network/disk calls that spend most of their time waiting, not using CPU) and can grow a large thread pool for that reason. Dispatchers.Default is sized to the number of CPU cores, appropriate for work that's actually CPU-bound. Running heavy CPU work on Dispatchers.IO can starve other IO-bound coroutines by consuming pool threads with work that doesn't actually need to wait on anything.",
    },
  ],
  tech: ['Kotlin Coroutines'],
  relatedSlugs: ['flow', 'testing'],
};
