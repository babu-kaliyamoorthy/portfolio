import type { Topic } from '@/types/content';

export const cleanArchitecture: Topic = {
  slug: 'clean-architecture',
  title: 'Clean Architecture',
  category: 'Architecture',
  summary:
    'A layering discipline that keeps business rules independent of frameworks, UI and data sources — so the app can change its database, networking library or UI toolkit without rewriting what it actually does.',
  diagram: `graph TD
    subgraph Presentation["Presentation Layer"]
      UI["Compose UI"]
      VM["ViewModel"]
    end
    subgraph Domain["Domain Layer"]
      UC["Use Cases"]
      ENT["Entities"]
      IFACE["Repository Interfaces"]
    end
    subgraph Data["Data Layer"]
      IMPL["Repository Implementation"]
      API["Remote API (Retrofit)"]
      DB["Local DB (Room)"]
    end

    UI --> VM --> UC --> ENT
    UC --> IFACE
    IMPL -.->|implements| IFACE
    IMPL --> API
    IMPL --> DB`,
  sections: [
    {
      heading: 'The dependency rule',
      body: [
        'Source code dependencies only point inward: Presentation depends on Domain, Data depends on Domain, but Domain depends on nothing Android-specific — no Retrofit, no Room, no Compose imports.',
        'The Domain layer defines repository interfaces; the Data layer implements them. This inversion is what lets you swap Retrofit for gRPC or Room for a different cache without touching a single use case.',
      ],
    },
    {
      heading: 'Why it matters in banking and fintech apps',
      body: [
        'Regulated banking codebases live for 8-10+ years and pass through many hands. Business rules — eligibility checks, transaction limits, KYC flows — need to survive a UI rewrite (View system to Compose) or a backend migration untouched.',
        'It also makes business logic unit-testable without an emulator: use cases and entities have zero Android framework dependencies, so a rule like "credit limit increase requires 3 months of on-time payments" can be tested in pure JVM tests that run in milliseconds.',
      ],
    },
  ],
  pros: [
    'Business logic is testable without Android instrumentation',
    'UI or data-source rewrites stay isolated from domain rules',
    'Clear ownership boundaries make large teams parallelizable',
    'New engineers can reason about one layer at a time',
  ],
  cons: [
    'More files and indirection for genuinely simple screens',
    'Team must agree on and enforce the dependency rule — nothing stops a shortcut import without lint rules or module boundaries',
    'Over-applying it to a throwaway prototype slows initial velocity for no payoff',
  ],
  whenToUse: [
    'Business logic that will be tested, reused across screens, or must outlive a specific UI framework',
    'Teams larger than ~3-4 engineers working in the same codebase concurrently',
    'Regulated domains (banking, healthcare) where an auditable, provable rule layer matters',
  ],
  enterpriseExample:
    "On the Emirates NBD Cards module, this layering is what made modularization tractable: the credit-limit-increase and card-application domain logic sat in framework-agnostic modules that the Compose UI and the Retrofit/Room data layer both depended on, but never leaked into. That separation is what let the Cards module be pulled apart and rebuilt without breaking the business rules underneath it.",
  codeSnippets: [
    {
      title: 'Domain layer — no Android imports',
      language: 'kotlin',
      code: `// domain/usecase/IncreaseCreditLimitUseCase.kt
class IncreaseCreditLimitUseCase(
    private val cardRepository: CardRepository, // interface, defined here
) {
    suspend operator fun invoke(cardId: String, requestedLimit: Money): Result<CreditLimitDecision> {
        val history = cardRepository.getPaymentHistory(cardId)
        if (!history.hasOnTimePaymentsFor(months = 3)) {
            return Result.failure(IneligibleForIncreaseException())
        }
        return cardRepository.requestLimitIncrease(cardId, requestedLimit)
    }
}`,
    },
    {
      title: 'Data layer — implements the domain interface',
      language: 'kotlin',
      code: `// data/repository/CardRepositoryImpl.kt
class CardRepositoryImpl(
    private val api: CardApi,       // Retrofit
    private val cardDao: CardDao,   // Room
) : CardRepository {
    override suspend fun requestLimitIncrease(cardId: String, limit: Money) =
        runCatching { api.requestLimitIncrease(cardId, limit.toDto()) }
            .map { it.toDomain() }
}`,
    },
  ],
  interviewQuestions: [
    {
      level: 'senior',
      question: 'Where does a Retrofit response DTO get converted into a domain model, and why does that boundary matter?',
      answer:
        'At the edge of the Data layer, inside the repository implementation, immediately after the network/DB call returns. The Domain layer should never see a DTO — only its own entity types. This keeps a backend API change (renamed field, restructured JSON) from rippling into use cases and ViewModels; only the mapper needs to change.',
    },
    {
      level: 'lead',
      question: 'How do you stop engineers from importing Android/Retrofit classes directly into the domain module?',
      answer:
        'Structurally, not just by convention: put domain in its own Gradle module with no Android or networking dependencies in its build.gradle, so a forbidden import is a compile error, not a code-review nit. Backed up with a lint rule (or ArchUnit-style test) that fails CI if a banned package is referenced from domain.',
    },
    {
      level: 'architect',
      question: 'When is Clean Architecture the wrong call?',
      answer:
        'For a small, short-lived screen with trivial logic (a static "About" screen, a one-off marketing page), the extra indirection — interfaces, mappers, use case classes — adds files and cognitive overhead with no testability or longevity payoff. The judgment call is whether the logic is complex/valuable/long-lived enough to justify isolating it. Applying the same rigor everywhere regardless of module size is itself an architecture smell.',
    },
  ],
  tech: ['Kotlin', 'Coroutines', 'Hilt', 'Retrofit', 'Room'],
};
