import type { Topic } from '@/types/content';

export const factory: Topic = {
  slug: 'factory',
  title: 'Factory',
  category: 'Design Pattern',
  summary: 'Centralizes object creation behind a function or class, so callers ask for "a Payment for this type" without knowing or caring which concrete class gets constructed.',
  sections: [
    {
      heading: 'Why creation logic wants a single owner',
      body: [
        "When the logic for choosing and constructing the right concrete implementation is scattered across every call site — `if (type == CREDIT) CreditCardPayment(...) else if (...)` repeated in five different screens — adding a new type means finding and updating all five places, and it's easy to miss one. A factory owns that decision in exactly one place.",
      ],
    },
    {
      heading: 'Android example: notification builders',
      body: [
        'A `NotificationFactory` that takes a `NotificationType` and returns a fully configured `Notification` (channel, icon, priority, actions already set correctly for that type) means every call site just asks for "a payment-received notification" instead of re-deriving the right channel ID and priority from scratch each time — and getting it wrong for one type in one place.',
      ],
    },
  ],
  codeSnippets: [
    {
      title: '❌ Creation logic duplicated at every call site',
      language: 'kotlin',
      code: `// Screen A
val payment = if (type == PaymentType.CREDIT) CreditCardPayment(...) else DebitCardPayment(...)
// Screen B — same branching logic copy-pasted, now two places to update`,
    },
    {
      title: '✅ One factory owns the decision',
      language: 'kotlin',
      code: `class PaymentFactory {
    fun create(type: PaymentType, amount: Money): Payment = when (type) {
        PaymentType.CREDIT -> CreditCardPayment(amount)
        PaymentType.DEBIT -> DebitCardPayment(amount)
        PaymentType.WALLET -> WalletPayment(amount)
    }
}
// Every call site: paymentFactory.create(type, amount)`,
    },
  ],
  interviewQuestions: [
    {
      level: 'senior',
      question: 'How does Factory relate to the Open/Closed Principle?',
      answer:
        "They solve related but distinct problems. Factory centralizes the DECISION of which concrete class to construct; a sealed interface with each type implementing its own behavior (the OCP fix) removes the decision entirely by letting each type know how to behave itself. In practice they're often combined: a factory constructs the right implementation of an OCP-friendly interface.",
    },
    {
      level: 'lead',
      question: 'When does a Factory become unnecessary ceremony?',
      answer:
        "When there's only ever one concrete type to construct, or the construction logic is a single trivial constructor call with no branching. Factory earns its cost specifically when choosing the right concrete type involves real logic worth centralizing — not for wrapping every single `new`/constructor call in the codebase.",
    },
  ],
  tech: ['Kotlin'],
  relatedSlugs: ['singleton', 'builder'],
};
