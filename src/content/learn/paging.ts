import type { Topic } from '@/types/content';

export const paging: Topic = {
  slug: 'paging',
  title: 'Paging 3',
  category: 'Paging',
  summary: 'Loads a large dataset (a transaction history spanning years) in chunks as the user scrolls, instead of fetching everything upfront or hand-rolling pagination and scroll-position bookkeeping.',
  sections: [
    {
      heading: 'What Paging solves that a manual "load more on scroll" doesn\'t',
      body: [
        "A hand-rolled infinite scroll re-implements request deduplication, loading-state management, error handling per page, and scroll-position preservation across configuration changes — all real, easy-to-get-wrong details. Paging 3's `PagingSource` + `Pager` + `collectAsLazyPagingItems()` handles all of it, including exposing distinct loading/error states for the initial load versus append versus refresh, which a manual implementation often conflates into one generic loading boolean.",
      ],
    },
    {
      heading: 'RemoteMediator bridges network paging with a local Room cache',
      body: [
        'For offline-first paging (see Offline-First under Architecture), `RemoteMediator` sits between `PagingSource` and the network: it fetches from the network only when Room\'s local cache genuinely runs out of data for the requested page, then writes the new page into Room — the UI\'s `PagingSource` always reads from Room, never directly from the network, keeping one consistent source of truth.',
      ],
    },
  ],
  codeSnippets: [
    {
      title: 'Paging 3 exposing distinct load states, not one generic boolean',
      language: 'kotlin',
      code: `val transactions = pager.flow.cachedIn(viewModelScope)

// In the UI:
val items = transactions.collectAsLazyPagingItems()
when (items.loadState.append) { // distinct from .refresh and .prepend
    is LoadState.Loading -> item { LoadingIndicator() }
    is LoadState.Error -> item { RetryButton(onClick = { items.retry() }) }
    else -> Unit
}`,
    },
  ],
  interviewQuestions: [
    {
      level: 'senior',
      question: 'Why does Paging 3 distinguish refresh, prepend, and append load states instead of one loading flag?',
      answer:
        "Each represents a genuinely different UI moment: refresh is the initial/pull-to-refresh load (often a full-screen loading state), prepend is loading earlier items (rare, but relevant for chat-style UIs), append is loading the next page at the bottom (a small inline spinner, not a full-screen one). Conflating them into one boolean makes it impossible to show the right loading UI for the right situation.",
    },
    {
      level: 'lead',
      question: 'What problem does RemoteMediator solve that a plain network-backed PagingSource doesn\'t?',
      answer:
        "A plain network-backed PagingSource has no local persistence — close the app and the loaded pages are gone, and there's no offline access. RemoteMediator adds a layer that writes fetched network pages into Room and serves the UI's PagingSource from Room instead, giving you offline access to already-loaded pages and a single consistent source of truth, consistent with the Offline-First pattern.",
    },
  ],
  tech: ['Paging 3', 'Room'],
  relatedSlugs: ['room', 'flow'],
};
