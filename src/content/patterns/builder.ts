import type { Topic } from '@/types/content';

export const builder: Topic = {
  slug: 'builder',
  title: 'Builder',
  category: 'Design Pattern',
  summary: 'Constructs a complex object step by step through a fluent, readable chain — mainly relevant on Android for Java interop and configuring third-party SDKs; Kotlin usually replaces it entirely.',
  sections: [
    {
      heading: 'The problem it solves — and why Kotlin mostly makes it unnecessary',
      body: [
        "In Java, a constructor with eight optional parameters forces callers into either a telescoping set of overloaded constructors or a long, error-prone positional argument list. Builder solves that with a fluent chain of setters ending in `.build()`. Kotlin's named arguments and default parameter values solve the exact same problem natively — a Kotlin `data class` with defaults gives you the same readability without a separate Builder class.",
      ],
    },
    {
      heading: 'Where it still shows up on Android',
      body: [
        "You'll still write and use Builders constantly, just not usually your own: `NotificationCompat.Builder`, `AlertDialog.Builder`, and most third-party Java-based SDKs expose this pattern because they predate or don't use Kotlin. Recognizing it — and knowing you don't need to replicate it for your own Kotlin classes — is the practical skill.",
      ],
    },
  ],
  codeSnippets: [
    {
      title: 'Builder pattern as you\'ll actually encounter it (Java-interop API)',
      language: 'kotlin',
      code: `val notification = NotificationCompat.Builder(context, channelId)
    .setContentTitle("Payment received")
    .setContentText("AED 500 credited to your account")
    .setSmallIcon(R.drawable.ic_notification)
    .setPriority(NotificationCompat.PRIORITY_HIGH)
    .build()`,
    },
    {
      title: 'The Kotlin-native equivalent for your own classes — no Builder needed',
      language: 'kotlin',
      code: `data class CardApplicationRequest(
    val amount: Money,
    val cardType: CardType = CardType.STANDARD,
    val expedited: Boolean = false,
)

// Named arguments give the same readability as a Builder chain, with less code:
val request = CardApplicationRequest(amount = Money(5000), expedited = true)`,
    },
  ],
  interviewQuestions: [
    {
      level: 'senior',
      question: 'Would you write a Builder for a new Kotlin data class on Android in 2026?',
      answer:
        "Almost never for your own code — Kotlin's named arguments and default parameter values solve the same readability problem a Builder solves in Java, with far less boilerplate. You'll still consume Builders constantly from Java-based SDKs and AndroidX APIs (NotificationCompat.Builder, AlertDialog.Builder), but writing a new one for your own Kotlin class is usually a sign of unnecessary Java-style ceremony.",
    },
    {
      level: 'lead',
      question: 'Is there ever a good reason to hand-write a Builder in Kotlin?',
      answer:
        "When you need to enforce a required build order or validate combinations of parameters that default arguments can't express cleanly — for instance, a multi-step configuration where some options are only valid combined with others. Even then, a sealed-class-based DSL builder or a validated factory function is usually more idiomatic Kotlin than a classic fluent Builder.",
    },
  ],
  tech: ['Kotlin', 'Java Interop'],
  relatedSlugs: ['factory', 'singleton'],
};
