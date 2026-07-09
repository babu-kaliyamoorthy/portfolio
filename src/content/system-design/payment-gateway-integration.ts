import type { Topic } from '@/types/content';

export const paymentGatewayIntegration: Topic = {
  slug: 'payment-gateway-integration',
  title: 'Payment Gateway Integration',
  category: 'System Design',
  summary: 'A payment is a distributed transaction across the app, your backend, and an external payment rail — the design challenge is handling the moment where the network fails and you genuinely don\'t know if the payment succeeded.',
  diagram: `graph LR
    App["Android App"] --> Backend["Your Backend"]
    Backend --> Gateway["Payment Gateway"]
    Gateway --> Rail["Card Network / Bank Rail"]
    Rail -.->|"async webhook"| Backend
    Backend -.->|"push / poll"| App`,
  sections: [
    {
      heading: 'The request can fail after the payment actually succeeded',
      body: [
        "The riskiest failure mode isn't the request failing before the payment happens — it's the payment succeeding at the gateway/rail, but the response back to your backend (or your backend to the app) timing out or dropping. Retrying blindly on timeout risks double-charging the customer. This is why payment APIs require an idempotency key: the client generates a unique key per payment attempt, and retrying the same request with the same key is guaranteed by the gateway to not double-process.",
      ],
    },
    {
      heading: 'The app can\'t just poll and block on the result',
      body: [
        'A payment can take seconds to settle at the rail level. The app should submit the payment intent, show a pending state immediately, and receive the final result via a webhook-driven push notification or a background poll — never hold the UI thread or a blocking spinner waiting synchronously for rail-level settlement, which can genuinely take longer than a reasonable request timeout.',
      ],
    },
  ],
  codeSnippets: [
    {
      title: 'Idempotency key generated once per payment attempt, reused on retry',
      language: 'kotlin',
      code: `class InitiatePaymentUseCase(private val repository: PaymentRepository) {
    suspend operator fun invoke(request: PaymentRequest): Result<PaymentResult> {
        // Same idempotencyKey persists across retries of THIS attempt —
        // a new user-initiated payment generates a new key.
        return repository.submitPayment(request.copy(idempotencyKey = request.idempotencyKey))
    }
}`,
    },
  ],
  interviewQuestions: [
    {
      level: 'senior',
      question: 'Why does an idempotency key matter more than just "handle the error and retry"?',
      answer:
        'Without it, retrying a timed-out request risks the payment gateway processing the SAME payment twice if the original request actually succeeded server-side despite the response never reaching the client. An idempotency key lets the gateway recognize "I\'ve already processed this exact attempt" and return the original result instead of charging again.',
    },
    {
      level: 'architect',
      question: 'How should the app show payment status while waiting for rail-level settlement?',
      answer:
        "As an explicit pending/processing state, not a blocking spinner — the UI should remain interactive and the user should be able to navigate away and come back. The actual result arrives asynchronously via a push notification triggered by the backend's webhook receipt from the rail, or a background poll if push isn't available, and updates the stored transaction state which the UI observes reactively.",
    },
  ],
  tech: ['REST', 'Webhooks', 'Idempotency'],
  relatedSlugs: ['banking-app-architecture', 'notification-system'],
};
