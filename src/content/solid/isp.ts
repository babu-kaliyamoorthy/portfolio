import type { Topic } from '@/types/content';

export const isp: Topic = {
  slug: 'interface-segregation',
  title: 'Interface Segregation',
  category: 'SOLID',
  summary: "No class should be forced to depend on methods it doesn't use — many small, focused interfaces beat one large one that everyone partially implements.",
  sections: [
    {
      heading: 'What it actually means',
      body: [
        "A fat interface with ten methods forces every implementation to either genuinely implement all ten or stub out the ones it doesn't need with a `TODO()` or empty body — which is itself a quiet violation of Liskov Substitution, since those stubs don't honor the contract. Splitting into several small, cohesive interfaces means each implementation only depends on — and only has to implement — what it actually uses.",
      ],
    },
    {
      heading: 'The Android violation to watch for',
      body: [
        "A single `CardRepository` interface with `getCards()`, `applyForCard()`, `freezeCard()`, `reportFraud()` and more forces a read-only screen (Card List) to depend on write operations it never calls, and forces every test double for that screen to stub out methods it will never exercise. Splitting into `CardReader` and `CardWriter` lets the Card List screen depend only on `CardReader`.",
      ],
    },
  ],
  codeSnippets: [
    {
      title: '❌ Violates ISP — one fat interface for every concern',
      language: 'kotlin',
      code: `interface CardRepository {
    suspend fun getCards(): List<Card>
    suspend fun applyForCard(request: ApplicationRequest): Result<Unit>
    suspend fun freezeCard(cardId: String): Result<Unit>
    suspend fun reportFraud(cardId: String, reason: String): Result<Unit>
}
// A read-only Card List screen still depends on write/freeze/fraud methods it never calls`,
    },
    {
      title: '✅ Follows ISP — screens depend only on what they use',
      language: 'kotlin',
      code: `interface CardReader {
    suspend fun getCards(): List<Card>
}

interface CardWriter {
    suspend fun applyForCard(request: ApplicationRequest): Result<Unit>
    suspend fun freezeCard(cardId: String): Result<Unit>
}

class CardRepositoryImpl : CardReader, CardWriter { /* implements both */ }
// Card List ViewModel depends only on CardReader`,
    },
  ],
  interviewQuestions: [
    {
      level: 'senior',
      question: 'Why does a fat interface actually cause test pain, not just design untidiness?',
      answer:
        "Every fake/mock implementing that interface for a test has to stub out every method the interface declares, even the ones irrelevant to that specific test — bloating test setup and making it unclear which methods actually matter for the behavior under test. Small interfaces mean small, honest fakes.",
    },
    {
      level: 'lead',
      question: 'How small is too small — when does interface segregation become over-engineering?',
      answer:
        "If you end up with a one-method interface for every single method on a class, with no natural grouping, you've likely over-segmented and just added indirection. The right granularity groups methods by which callers actually need them together — reader vs. writer, or by feature area — not by mechanically splitting every method into its own interface.",
    },
  ],
  tech: ['Kotlin', 'Testing'],
  relatedSlugs: ['liskov-substitution', 'dependency-inversion'],
};
