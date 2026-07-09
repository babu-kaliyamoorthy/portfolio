import type { Topic } from '@/types/content';

export const microservicesIntegration: Topic = {
  slug: 'microservices-integration',
  title: 'Microservices Integration',
  category: 'System Design',
  summary: 'From the app\'s point of view, a microservice backend should look like one coherent API — the complexity of many independently-deployed services, each with its own failure modes and latency, is something the client should never have to reason about directly.',
  sections: [
    {
      heading: 'The client needs one contract, not five',
      body: [
        "If the app calls Accounts, Cards, Payments and Auth services directly, it inherits every one of their independent versioning schedules, outage windows, and API shapes — a change to any one of five services is now a potential app-breaking change. A BFF or API gateway layer (see Banking App Architecture) gives the app one stable contract regardless of how the backend is decomposed behind it.",
      ],
    },
    {
      heading: 'Partial failure is the normal case, not the edge case',
      body: [
        "With five independent services behind a composed response, one of them being slow or down is a routine occurrence, not a rare edge case — a screen showing account balance, recent transactions, and a rewards summary should degrade gracefully (show what succeeded, show a specific retry affordance for what didn't) rather than the whole screen failing because one of three services was briefly unavailable.",
      ],
    },
  ],
  codeSnippets: [
    {
      title: 'Partial-failure-tolerant response instead of all-or-nothing',
      language: 'kotlin',
      code: `data class DashboardUiState(
    val balance: Result<Balance>,       // each section fails/succeeds independently
    val recentTransactions: Result<List<Transaction>>,
    val rewardsSummary: Result<Rewards>,
)
// UI renders each section based on its own Result — one failing doesn't blank the whole screen`,
    },
  ],
  interviewQuestions: [
    {
      level: 'lead',
      question: 'A dashboard screen composes data from three microservices. One is down. What should the user see?',
      answer:
        "The two working sections rendered normally, and the failed section showing a specific, scoped error state with its own retry action — never the entire screen replaced by a generic error, and never silently omitting the failed section without any indication data is missing. Modeling each section's data as an independent Result rather than one combined all-or-nothing response is what makes this possible.",
    },
    {
      level: 'architect',
      question: 'How do you decide whether a piece of composition logic belongs in the BFF or in the app?',
      answer:
        "If it's about SHAPING data from multiple backend services into what one screen needs, it belongs in the BFF — that logic is the same regardless of client platform (iOS would need it too) and shouldn't be duplicated per-client. If it's about how to PRESENT already-shaped data (loading states, animations, platform-specific UI), that's the app's job. The dividing line is roughly: data composition is backend work, presentation is client work.",
    },
  ],
  tech: ['Microservices', 'BFF Pattern', 'REST'],
  relatedSlugs: ['banking-app-architecture', 'payment-gateway-integration'],
};
