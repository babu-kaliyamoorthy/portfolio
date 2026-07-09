import type { Topic } from '@/types/content';

export const strategy: Topic = {
  slug: 'strategy',
  title: 'Strategy',
  category: 'Design Pattern',
  summary: 'Makes an algorithm swappable at runtime by defining a family of interchangeable implementations behind one interface — the direct application of the Open/Closed Principle to behavior, not just object types.',
  sections: [
    {
      heading: 'What it actually buys you',
      body: [
        "Instead of an `if/else` chain choosing between algorithms inline, each algorithm becomes its own class implementing a shared interface, and the caller is handed whichever one it needs — often via DI. The caller doesn't know or care which concrete strategy it got, only that it satisfies the interface's contract.",
      ],
    },
    {
      heading: 'Android example: pluggable validation rules',
      body: [
        "A card application form's field validation differs per country (UAE phone format vs. UK phone format). A `PhoneValidationStrategy` interface with `UaePhoneValidation` and `UkPhoneValidation` implementations, selected based on the user's locale, means adding a new country's validation is a new class — never touching the form's existing validation call sites.",
      ],
    },
  ],
  codeSnippets: [
    {
      title: '❌ Algorithm choice hardcoded inline',
      language: 'kotlin',
      code: `fun validatePhone(phone: String, country: Country): Boolean {
    return if (country == Country.UAE) {
        phone.matches(Regex("^05\\\\d{8}$"))
    } else if (country == Country.UK) {
        phone.matches(Regex("^07\\\\d{9}$"))
    } else false // every new country reopens this function
}`,
    },
    {
      title: '✅ Strategy — each rule is its own swappable implementation',
      language: 'kotlin',
      code: `interface PhoneValidationStrategy {
    fun isValid(phone: String): Boolean
}

class UaePhoneValidation : PhoneValidationStrategy {
    override fun isValid(phone: String) = phone.matches(Regex("^05\\\\d{8}$"))
}

class FormValidator(private val strategy: PhoneValidationStrategy) {
    fun validate(phone: String) = strategy.isValid(phone)
}
// injected with the right strategy per locale — this class never changes`,
    },
  ],
  interviewQuestions: [
    {
      level: 'senior',
      question: 'How is Strategy different from Factory?',
      answer:
        'Factory is about WHICH object gets constructed. Strategy is about WHICH algorithm/behavior gets used once you already have an object — the interface method itself is the swappable part, not the construction. They\'re often used together: a factory constructs the right Strategy implementation based on some input.',
    },
    {
      level: 'lead',
      question: 'When would injecting a Strategy via Hilt be better than a simple `when` branch?',
      answer:
        "When the set of strategies is expected to grow over time (new countries, new payment providers, new pricing tiers) or when each strategy has enough internal complexity to deserve its own testable class. For two or three cases that will never grow, a `when` block is simpler and the Strategy pattern would be premature abstraction.",
    },
  ],
  tech: ['Kotlin', 'Hilt'],
  relatedSlugs: ['observer', 'factory'],
};
