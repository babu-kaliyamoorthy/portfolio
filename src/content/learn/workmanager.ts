import type { Topic } from '@/types/content';

export const workmanager: Topic = {
  slug: 'workmanager',
  title: 'WorkManager',
  category: 'WorkManager',
  summary: 'Schedules deferrable, guaranteed background work that should run even if the app is killed or the device reboots — the right tool specifically when the work must eventually complete, not necessarily right now.',
  sections: [
    {
      heading: 'What "guaranteed" actually means here',
      body: [
        "WorkManager persists scheduled work to disk, so it survives process death and device reboot (given `RESCHEDULE_REQUIRED` handling) — a coroutine or a plain Service does not survive either of those. This is why it's the right tool for something like draining an offline write queue: it must eventually run and succeed, even if the user closes the app or the phone restarts before connectivity returns.",
      ],
    },
    {
      heading: 'Constraints let the OS decide the right moment, not your code',
      body: [
        'Requiring `NetworkType.CONNECTED`, or `setRequiresBatteryNotLow(true)`, tells the OS the conditions your work actually needs, and the OS decides exactly when to run it — potentially batching it with other apps\' deferred work to minimize wake-ups and battery impact. Fighting this by trying to force immediate execution defeats the entire efficiency model WorkManager is built around.',
      ],
    },
  ],
  codeSnippets: [
    {
      title: 'Constrained, guaranteed work — draining an offline write queue',
      language: 'kotlin',
      code: `val syncRequest = OneTimeWorkRequestBuilder<SyncPendingMutationsWorker>()
    .setConstraints(
        Constraints.Builder()
            .setRequiredNetworkType(NetworkType.CONNECTED)
            .build(),
    )
    .setBackoffCriteria(BackoffPolicy.EXPONENTIAL, 30, TimeUnit.SECONDS) // retries with backoff on failure
    .build()

WorkManager.getInstance(context).enqueueUniqueWork(
    "sync_pending_mutations", ExistingWorkPolicy.KEEP, syncRequest,
)`,
    },
  ],
  interviewQuestions: [
    {
      level: 'senior',
      question: 'When would you use WorkManager instead of just launching a coroutine in a wider scope?',
      answer:
        "When the work must survive process death and device reboot, and eventually complete regardless — a coroutine, no matter how broad its scope, dies with the process. Draining an offline mutation queue, uploading a large file, or periodic background sync are WorkManager's use case; anything that only needs to run while the app is alive doesn't need it.",
    },
    {
      level: 'lead',
      question: 'Why use enqueueUniqueWork with ExistingWorkPolicy.KEEP for a sync job triggered from multiple places?',
      answer:
        "Multiple triggers (app launch, connectivity regained, a manual refresh) could all try to enqueue the same sync job simultaneously. Unique work with KEEP means if that named job is already pending or running, the new request is dropped rather than creating a duplicate — avoiding redundant, potentially conflicting concurrent sync runs of the same logical job.",
    },
  ],
  tech: ['WorkManager'],
  relatedSlugs: ['room', 'testing'],
};
