import type { Topic } from '@/types/content';

export const dip: Topic = {
  slug: 'dependency-inversion',
  title: 'Dependency Inversion',
  category: 'SOLID',
  summary: 'High-level policy (business rules) should depend on abstractions, not on low-level implementation details — and those abstractions should be owned by the high-level module, not the low-level one.',
  sections: [
    {
      heading: 'What it actually means, and how it differs from Dependency Injection',
      body: [
        "Dependency Inversion is a design principle about which direction dependencies point: business logic (a use case) should depend on an interface it defines, and the concrete implementation (Retrofit, Room) should depend on — implement — that interface, not the other way around. Dependency Injection (Hilt) is the mechanical technique used to wire the concrete implementation into the class that depends on the abstraction. DI is how you satisfy DIP in practice; they're not the same thing.",
      ],
    },
    {
      heading: 'The Android violation to watch for',
      body: [
        "A use case importing `Retrofit` or a Room `@Dao` type directly has inverted the dependency the wrong way: the high-level business rule now depends on a low-level networking/database detail. Defining the repository interface inside the domain layer, with the Retrofit/Room-backed implementation living in the data layer and depending on that interface, is what makes the domain layer genuinely swap-proof against the data source underneath it.",
      ],
    },
  ],
  codeSnippets: [
    {
      title: '❌ Violates DIP — use case depends on a low-level detail directly',
      language: 'kotlin',
      code: `class GetCardsUseCase(private val api: CardApi) { // high-level depends on low-level Retrofit type
    suspend operator fun invoke() = api.getCards()
}`,
    },
    {
      title: '✅ Follows DIP — both sides depend on an abstraction the high-level module owns',
      language: 'kotlin',
      code: `interface CardRepository {           // owned by the domain layer
    suspend fun getCards(): List<Card>
}

class GetCardsUseCase(private val repository: CardRepository) {
    suspend operator fun invoke() = repository.getCards()
}

class CardRepositoryImpl(private val api: CardApi) : CardRepository { // data layer implements it
    override suspend fun getCards() = api.getCards().map { it.toDomain() }
}`,
    },
  ],
  interviewQuestions: [
    {
      level: 'senior',
      question: "What's the actual difference between Dependency Inversion and Dependency Injection?",
      answer:
        "Dependency Inversion is the design principle: high-level modules depend on abstractions, and those abstractions are owned by the high-level module, not the low-level implementation. Dependency Injection is the mechanical technique — a framework like Hilt handing a class its dependencies through the constructor — used to actually wire the concrete implementation in. You can do DI without DIP (inject a concrete Retrofit-typed class directly), and that's exactly the violation DIP warns against.",
    },
    {
      level: 'architect',
      question: 'Who should own the repository interface — the domain module or the data module?',
      answer:
        "The domain module, always. If the data module owns the interface, the domain module still has to depend on the data module to even see the interface — the dependency hasn't actually inverted, it's just been renamed. Owning the interface in domain and having data depend inward on it is what actually lets the data layer be swapped without touching domain.",
    },
  ],
  tech: ['Kotlin', 'Hilt', 'Clean Architecture'],
  relatedSlugs: ['single-responsibility', 'interface-segregation'],
};
