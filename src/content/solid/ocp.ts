import type { Topic } from '@/types/content';

export const ocp: Topic = {
  slug: 'open-closed',
  title: 'Open/Closed',
  category: 'SOLID',
  summary: 'A class should be open for extension but closed for modification — add new behavior without editing code that already works and is already tested.',
  sections: [
    {
      heading: 'What it actually means',
      body: [
        "When a new requirement arrives, adding it shouldn't require reopening and editing an existing, already-tested class — it should mean adding a new class that plugs into an existing extension point (an interface, a sealed hierarchy, a strategy). The existing class stays untouched, so its existing tests stay valid and nothing that already worked can regress.",
      ],
    },
    {
      heading: 'The Android violation to watch for',
      body: [
        "A `when` block over a payment type (`CreditCard`, `DebitCard`, `Wallet`) inside a `PaymentProcessor` class is the textbook violation: every new payment method means reopening and editing that same `when` block, risking every existing branch each time. A sealed interface with each payment type implementing its own `process()` closes `PaymentProcessor` to modification — adding Apple Pay is a new class, not an edit to an existing one.",
      ],
    },
  ],
  codeSnippets: [
    {
      title: '❌ Violates OCP — new payment type means editing this when block',
      language: 'kotlin',
      code: `fun process(payment: Payment) {
    when (payment) {
        is CreditCard -> processCreditCard(payment)
        is DebitCard -> processDebitCard(payment)
        // Adding Wallet support means editing this function again
    }
}`,
    },
    {
      title: '✅ Follows OCP — new payment type is a new class, zero edits here',
      language: 'kotlin',
      code: `interface Payment {
    fun process(): PaymentResult
}

class CreditCardPayment(...) : Payment {
    override fun process(): PaymentResult { /* ... */ }
}

class WalletPayment(...) : Payment { // new file, nothing else touched
    override fun process(): PaymentResult { /* ... */ }
}

fun processPayment(payment: Payment) = payment.process()`,
    },
  ],
  interviewQuestions: [
    {
      level: 'senior',
      question: 'Is every `when`/`switch` statement an OCP violation?',
      answer:
        "No — a `when` over a small, genuinely closed set of cases (a network result: Loading/Success/Error) is fine, because that set isn't expected to grow. OCP applies when the set of cases is expected to keep growing over the life of the app (payment types, feature flags, notification types) — that's when a `when` block becomes a maintenance liability every new case has to reopen.",
    },
    {
      level: 'architect',
      question: "How do you decide where to put an extension point before you know what's coming?",
      answer:
        "You usually don't design it upfront — that risks over-engineering for extensibility that never comes. The pragmatic approach is to notice the SECOND time you're adding a case to the same `when` block or `if/else` chain, and refactor to a polymorphic extension point then, once there's real evidence the set is genuinely open-ended rather than guessing at the first case.",
    },
  ],
  tech: ['Kotlin', 'Sealed classes'],
  relatedSlugs: ['single-responsibility', 'liskov-substitution'],
};
