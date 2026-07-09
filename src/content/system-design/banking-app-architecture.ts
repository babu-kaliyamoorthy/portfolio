import type { Topic } from '@/types/content';

export const bankingAppArchitecture: Topic = {
  slug: 'banking-app-architecture',
  title: 'Banking App Architecture (End-to-End)',
  category: 'System Design',
  summary: 'How a mobile banking app fits into the larger system — the client, the API layer it talks to, and the backend services behind that — and where responsibility for security, consistency and latency actually sits at each layer.',
  diagram: `graph TD
    App["Android App"] --> Gateway["API Gateway / BFF"]
    Gateway --> Auth["Auth Service"]
    Gateway --> Accounts["Accounts Service"]
    Gateway --> Cards["Cards Service"]
    Gateway --> Payments["Payments Service"]
    Accounts --> CoreBanking["Core Banking Ledger"]
    Payments --> CoreBanking
    Payments --> PaymentRails["External Payment Rails"]`,
  sections: [
    {
      heading: 'The client is not the source of truth for anything financial',
      body: [
        "Every balance, limit and transaction status the app shows is a cached, best-effort view of state that actually lives in the core banking ledger. The app's job is to render that state responsively (see Offline-First under Architecture) and to submit intents (transfer, apply for a card) — never to compute or assume a final balance itself. The backend is authoritative; the client is a fast, friendly window onto it.",
      ],
    },
    {
      heading: 'Why a Backend-for-Frontend (BFF) sits between the app and the microservices',
      body: [
        "The app talking directly to five separate microservices (Accounts, Cards, Payments, Auth) means five round trips for one screen, and every microservice's API shape leaking directly into the app. A BFF layer composes those calls server-side and returns one shaped response per screen — the app makes one request, the BFF fans out internally. It also means a microservice's internal API can change without an app release, as long as the BFF's contract with the app stays stable.",
      ],
    },
  ],
  interviewQuestions: [
    {
      level: 'lead',
      question: 'Why not let the app call each microservice directly and compose the data client-side?',
      answer:
        'That couples every app release to every microservice\'s API shape, multiplies round trips (and battery/network cost) for a single screen, and pushes composition logic — which really belongs server-side, closer to the data — onto the client. A BFF absorbs that composition and versioning burden once, server-side, instead of in every client.',
    },
    {
      level: 'architect',
      question: 'A new microservice needs to expose data to three different screens with three different shapes. Where does that shaping logic belong?',
      answer:
        "In the BFF layer, not in the microservice and not in the app. The microservice should expose its data in its own natural shape; the BFF composes and reshapes per-screen; the app just renders what it's given. Pushing shaping logic into the microservice couples it to specific screens' needs; pushing it into the app means every screen re-implements similar composition logic against raw service responses.",
    },
  ],
  tech: ['REST', 'BFF Pattern', 'Microservices'],
  relatedSlugs: ['payment-gateway-integration', 'microservices-integration'],
};
