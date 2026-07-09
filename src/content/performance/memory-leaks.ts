import type { Topic } from '@/types/content';

export const memoryLeaks: Topic = {
  slug: 'memory-leaks',
  title: 'Memory Leaks',
  category: 'Performance',
  summary: 'Something outlives the Activity/Fragment/View it holds a reference to, so garbage collection can never reclaim it — the classic cause is a long-lived object (a singleton, a static field, a running coroutine) holding a short-lived one.',
  sections: [
    {
      heading: 'Why this is really a lifetime-mismatch bug, not a "forgot to null something" bug',
      body: [
        'A leak happens whenever an object with a LONGER lifetime holds a reference to an object with a SHORTER lifetime, and never releases it when the shorter one should die. A Hilt @Singleton holding an Activity Context, a static field caching a View, or a coroutine launched with a scope that outlives the screen it updates are all the same root cause wearing different clothes.',
      ],
    },
    {
      heading: 'The recurring real-world source: unscoped coroutines and listeners',
      body: [
        'A coroutine launched in `GlobalScope` (or any scope broader than the screen) that captures a ViewModel or View in its closure keeps that object alive for as long as the coroutine runs — which might outlive the screen entirely. The fix is almost always scoping: `viewModelScope`, `lifecycleScope`, or a custom scope tied exactly to the lifetime of whatever holds the reference.',
      ],
    },
  ],
  codeSnippets: [
    {
      title: '❌ Coroutine scope outliving the screen it updates',
      language: 'kotlin',
      code: `class ProfileFragment : Fragment() {
    fun loadProfile() {
        GlobalScope.launch { // outlives the Fragment entirely
            val profile = api.getProfile()
            binding.nameText.text = profile.name // View reference held past Fragment destruction
        }
    }
}`,
    },
    {
      title: '✅ Scoped to the Fragment\'s actual lifetime',
      language: 'kotlin',
      code: `class ProfileFragment : Fragment() {
    fun loadProfile() {
        viewLifecycleOwner.lifecycleScope.launch {
            val profile = api.getProfile()
            binding.nameText.text = profile.name // cancelled automatically when the view is destroyed
        }
    }
}`,
    },
  ],
  interviewQuestions: [
    {
      level: 'senior',
      question: 'How would you confirm a suspected Activity leak, concretely?',
      answer:
        "LeakCanary is the standard tool — it automatically detects and reports retained Activity/Fragment instances after they should have been garbage collected, including the full reference chain showing exactly what's holding onto it. For a manual check, Android Studio's Profiler memory view combined with forcing a GC and taking a heap dump shows the same thing with more setup.",
    },
    {
      level: 'lead',
      question: 'Why does `viewLifecycleOwner.lifecycleScope` matter specifically in a Fragment, as opposed to just `lifecycleScope`?',
      answer:
        "A Fragment's own lifecycle can outlive its View — for example, when it's on the back stack with its view destroyed but the Fragment instance retained. `lifecycleScope` (tied to the Fragment) would keep view-updating coroutines alive past view destruction, referencing a now-destroyed binding. `viewLifecycleOwner.lifecycleScope` is tied specifically to the View's lifetime, which is what should actually gate view-updating work.",
    },
  ],
  tech: ['LeakCanary', 'Coroutines'],
  relatedSlugs: ['anr', 'compose-optimization'],
};
