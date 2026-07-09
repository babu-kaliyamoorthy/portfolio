import type { Topic } from '@/types/content';

export const offlineFirst: Topic = {
  slug: 'offline-first',
  title: 'Offline-First',
  category: 'Architecture',
  summary:
    'The local database is the single source of truth the UI always reads from — the network is just one of the things that keeps it up to date — so the app stays fully usable, instantly, with no connection at all.',
  diagram: `graph TD
    UI["Compose UI"] --> VM["ViewModel"]
    VM -->|observes Flow| Room["Room (source of truth)"]
    Worker["WorkManager sync"] -->|writes| Room
    Worker -->|fetches| API["Remote API"]
    VM -->|triggers on demand| Worker`,
  sections: [
    {
      heading: 'The UI never talks to the network directly',
      body: [
        "In an offline-first design, the ViewModel observes a Flow from Room, never a Retrofit call. The network's only job is to update the local database in the background — via WorkManager, a sync-on-launch call, or a push-triggered fetch. The UI reacting instantly to local data, whether or not a request is in flight, is what makes the app feel usable with no connection at all rather than showing a spinner or an error screen.",
        "This also means offline and online are not two separate code paths that can drift out of sync — there's exactly one rendering path (read from Room), and network availability only changes how fresh that data is.",
      ],
    },
    {
      heading: 'The hard part is conflict resolution, not caching',
      body: [
        "Caching read data is the easy 80%. The genuinely hard part is writes made while offline: a user submits a form with no connection, and that write needs to queue, retry, and reconcile against whatever the server state looks like when connectivity returns — including the case where the server has since changed. A typical approach is an outbox table of pending mutations that WorkManager drains on reconnect, with a defined conflict policy (last-write-wins, server-wins, or a merge) decided per-entity rather than assumed globally.",
      ],
    },
  ],
  pros: [
    'App remains fully functional and instant on a flaky or absent connection',
    'One rendering code path (from local DB) instead of separate online/offline UI states',
    'Naturally resilient to slow networks — the UI never blocks waiting on a request',
  ],
  cons: [
    'Conflict resolution for offline writes is a real design problem, not a checkbox — needs a per-entity strategy',
    'Local schema now needs migrations tracked as carefully as a backend database',
    'Debugging "why is this stale" requires reasoning about sync timing, not just the current network response',
  ],
  whenToUse: [
    'Apps where connectivity is genuinely unreliable for the target users (field workers, transit, international roaming)',
    'Read-heavy screens where instant response matters more than always-freshest data',
    'Any screen where a network failure currently means "no content" instead of "last known content"',
  ],
  enterpriseExample:
    'Account balances and transaction history in a banking app are a natural fit for this pattern: the last-synced balance renders instantly from Room on app launch, with a background refresh silently updating it — so a customer checking their balance on a weak signal sees their last known state immediately rather than a loading spinner, with the true balance arriving moments later.',
  codeSnippets: [
    {
      title: 'ViewModel observes Room, never the network directly',
      language: 'kotlin',
      code: `class AccountsViewModel @Inject constructor(
    accountDao: AccountDao,
    private val syncAccounts: SyncAccountsUseCase,
) : ViewModel() {
    val accounts: StateFlow<List<Account>> = accountDao.observeAll()
        .stateIn(viewModelScope, SharingStarted.WhileSubscribed(5_000), emptyList())

    fun refresh() = viewModelScope.launch { syncAccounts() } // updates Room; UI updates automatically
}`,
    },
  ],
  interviewQuestions: [
    {
      level: 'senior',
      question: 'Why observe a Flow from Room instead of just caching the last Retrofit response in memory?',
      answer:
        "An in-memory cache is gone on process death and doesn't survive the app being backgrounded and killed, so the user sees a blank state again on the next cold start. Room persists to disk and Flow gives you reactive updates for free — write to the database from the sync layer, and every observer updates automatically without manual cache-invalidation logic scattered across ViewModels.",
    },
    {
      level: 'lead',
      question: 'A user submits a form offline. Walk through what happens end to end.',
      answer:
        "The write goes into a local 'pending mutations' table (an outbox) immediately, and the UI optimistically reflects it as if it succeeded. WorkManager has a constrained job (requires network) that drains the outbox on reconnect, calling the real API for each pending mutation and marking it synced or, on a real failure, surfacing a retry/conflict state back to the UI — never silently dropping it.",
    },
    {
      level: 'architect',
      question: 'How do you decide the conflict resolution policy for a given entity?',
      answer:
        "It depends on what the entity represents. For append-only data (a submitted support ticket), last-write-wins from the client is usually fine. For data with real business rules attached (an account balance, an inventory count), the server almost always has to be the source of truth on conflict, since the client's view is inherently stale by the time it reconnects. The mistake is picking one policy globally instead of deciding it per entity based on what a wrong resolution would actually cost.",
    },
  ],
  tech: ['Room', 'WorkManager', 'Flow', 'Retrofit'],
  relatedSlugs: ['clean-architecture', 'state-management'],
};
