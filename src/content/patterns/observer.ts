import type { Topic } from '@/types/content';

export const observer: Topic = {
  slug: 'observer',
  title: 'Observer',
  category: 'Design Pattern',
  summary: 'One-to-many notification: a subject emits changes, and any number of observers react — the pattern underneath Flow, LiveData, and most of reactive Android.',
  sections: [
    {
      heading: "It's already everywhere in modern Android",
      body: [
        "Every time a ViewModel exposes a `StateFlow` and a Composable calls `collectAsStateWithLifecycle()`, that's Observer: the ViewModel is the subject, the Composable is the observer, and neither needs a direct reference to the other's concrete type. Kotlin Flow, LiveData, and RxJava are all production-grade implementations of this pattern — you're using it constantly even when not naming it.",
      ],
    },
    {
      heading: 'Where it\'s worth recognizing explicitly',
      body: [
        "Beyond Flow/LiveData, the pattern shows up in things like a `ConnectivityObserver` that multiple features subscribe to for network state, or a `SessionExpiryListener` that several screens register with independently. The value of naming the pattern explicitly in review is recognizing when a class is accumulating direct references to its dependents instead of exposing an observable stream they subscribe to.",
      ],
    },
  ],
  codeSnippets: [
    {
      title: '❌ Manual observer list — reinventing what Flow already gives you',
      language: 'kotlin',
      code: `class ConnectivityMonitor {
    private val listeners = mutableListOf<(Boolean) -> Unit>()
    fun addListener(listener: (Boolean) -> Unit) { listeners.add(listener) }
    private fun notifyAll(isConnected: Boolean) = listeners.forEach { it(isConnected) }
    // manual bookkeeping, easy to leak listeners that never unregister
}`,
    },
    {
      title: '✅ Flow-based Observer — lifecycle-safe, no manual bookkeeping',
      language: 'kotlin',
      code: `class ConnectivityMonitor(context: Context) {
    val isConnected: Flow<Boolean> = callbackFlow {
        val callback = object : ConnectivityManager.NetworkCallback() {
            override fun onAvailable(network: Network) { trySend(true) }
            override fun onLost(network: Network) { trySend(false) }
        }
        // register callback...
        awaitClose { /* unregister callback */ }
    }
}
// Consumers: connectivityMonitor.isConnected.collectAsStateWithLifecycle()`,
    },
  ],
  interviewQuestions: [
    {
      level: 'senior',
      question: 'Why is Flow generally preferred over a hand-rolled listener list on Android?',
      answer:
        "A hand-rolled listener list requires every subscriber to remember to unregister, or it leaks. Flow's `collectAsStateWithLifecycle()` and structured concurrency automatically stop collecting when the lifecycle is no longer active, and `callbackFlow`'s `awaitClose` gives you one guaranteed place to clean up the underlying callback — removing an entire class of leak bugs the manual pattern is prone to.",
    },
    {
      level: 'lead',
      question: 'What\'s the risk of exposing a hot vs. cold stream from an Observer-pattern class?',
      answer:
        "A cold Flow starts producing values fresh for each new collector, which can mean redundant work (re-registering a system callback) if multiple screens observe it simultaneously. A hot flow via `SharedFlow`/`StateFlow` (often via `.shareIn()` or `.stateIn()`) shares one underlying subscription across all observers — usually what you want for something like a system connectivity callback that should only be registered once regardless of how many screens are listening.",
    },
  ],
  tech: ['Kotlin Flow', 'LiveData'],
  relatedSlugs: ['strategy', 'singleton'],
};
