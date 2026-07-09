import type { Topic } from '@/types/content';

export const lsp: Topic = {
  slug: 'liskov-substitution',
  title: 'Liskov Substitution',
  category: 'SOLID',
  summary: 'A subtype must be usable anywhere its parent type is expected, without the caller needing to know or care which concrete implementation it got.',
  sections: [
    {
      heading: 'What it actually means',
      body: [
        "If code is written against an interface, swapping in any implementation of that interface should never surprise the caller — no implementation should throw where the interface's contract implied it wouldn't, return something narrower than promised, or silently no-op where the interface implied real work happens. Violating this means callers have to know which concrete class they actually got, which defeats the point of depending on the interface at all.",
      ],
    },
    {
      heading: 'The Android violation to watch for',
      body: [
        "A `CardRepository` interface implies `getCards()` returns the user's cards. If a `FakeCardRepository` used in tests throws `NotImplementedError` for that method while `CardRepositoryImpl` returns real data, any test written against the interface can silently break depending on which implementation got injected — the fake isn't honoring the contract callers rely on, it's just pretending to.",
      ],
    },
  ],
  codeSnippets: [
    {
      title: '❌ Violates LSP — the fake breaks the contract callers rely on',
      language: 'kotlin',
      code: `class FakeCardRepository : CardRepository {
    override suspend fun getCards(): List<Card> {
        throw NotImplementedError() // callers coded against the interface don't expect this
    }
}`,
    },
    {
      title: '✅ Follows LSP — every implementation honors the same contract',
      language: 'kotlin',
      code: `class FakeCardRepository(
    private val cards: List<Card> = emptyList(),
) : CardRepository {
    override suspend fun getCards(): List<Card> = cards // real, substitutable behavior
}`,
    },
  ],
  interviewQuestions: [
    {
      level: 'senior',
      question: 'Give a concrete example of an LSP violation you\'ve actually hit.',
      answer:
        'A fake/mock repository used in unit tests that throws on a method the real implementation always succeeds at — any test exercising a code path that happens to call that method breaks not because of a real bug, but because the fake silently doesn\'t honor the interface\'s contract. The fix is making the fake return a real, if minimal, value that satisfies the same contract as production code.',
    },
    {
      level: 'lead',
      question: 'How does LSP relate to designing an interface in the first place?',
      answer:
        "LSP is really a check on whether your interface's contract is well-defined enough to implement correctly. If you can't state what a method promises (does it throw on empty input? can it return null?) precisely enough for every implementation to agree, you'll get LSP violations by construction — the fix is often tightening the interface's documented contract, not just fixing individual implementations.",
    },
  ],
  tech: ['Kotlin', 'Testing'],
  relatedSlugs: ['open-closed', 'interface-segregation'],
};
