import type { Topic } from '@/types/content';

export const anr: Topic = {
  slug: 'anr',
  title: 'ANR (Application Not Responding)',
  category: 'Performance',
  summary: 'The main thread was blocked for too long (5s for input dispatch, less for a BroadcastReceiver) and the OS offers to kill the app — nearly always caused by real work running where only UI work belongs.',
  sections: [
    {
      heading: 'The main thread has exactly one job',
      body: [
        'Android measures ANRs against a hard timeout because the main thread is also the UI thread — anything blocking it means the app cannot draw a frame or respond to touch, and the OS assumes it has hung. A synchronous network call, a large synchronous disk read, or a heavy computation run directly in an onClick handler are the classic causes, not exotic bugs.',
      ],
    },
    {
      heading: 'Finding the real cause, not just the symptom',
      body: [
        "Play Console's ANR reports include a stack trace of every thread at the moment of the hang — the main thread's frame at the top tells you exactly what was running when it blocked. StrictMode, enabled in debug builds, catches disk/network-on-main-thread violations during development before they ever reach production as an ANR.",
      ],
    },
  ],
  codeSnippets: [
    {
      title: '❌ Blocking work directly on the main thread',
      language: 'kotlin',
      code: `button.setOnClickListener {
    val result = api.fetchAccountSync() // network call blocks the UI thread
    updateUi(result)
}`,
    },
    {
      title: '✅ Off-main-thread work via coroutines',
      language: 'kotlin',
      code: `button.setOnClickListener {
    lifecycleScope.launch {
        val result = withContext(Dispatchers.IO) { api.fetchAccountSync() }
        updateUi(result) // back on main thread automatically for UI update
    }
}`,
    },
  ],
  interviewQuestions: [
    {
      level: 'senior',
      question: 'What actually triggers an ANR, precisely?',
      answer:
        "Specific timeout thresholds the OS enforces: roughly 5 seconds without responding to an input event, or a shorter window (around 10 seconds foreground / longer background) for a BroadcastReceiver's onReceive to complete. It's not a vague 'app feels slow' — it's the OS detecting the main thread genuinely hasn't yielded within a defined window.",
    },
    {
      level: 'lead',
      question: 'How would you diagnose an ANR you can\'t reproduce locally but see in Play Console?',
      answer:
        "Play Console provides the ANR stack trace across all threads at the hang moment — start with what the main thread frame shows (a network call, a lock wait, a heavy computation). Cross-reference with Firebase Crashlytics ANR reports for device/OS-version patterns, and check if it correlates with a specific screen or action reported by users, since that narrows the search dramatically before you even need a repro.",
    },
  ],
  tech: ['Coroutines', 'StrictMode'],
  relatedSlugs: ['memory-leaks', 'compose-optimization'],
};
