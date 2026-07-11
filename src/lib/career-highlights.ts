export type HighlightCategory = 'Architecture' | 'Leadership' | 'Impact' | 'Delivery';

/**
 * Groups each experience entry's existing highlight bullets (from resume.ts)
 * by category, purely for the Career page's expanded view. Maps by exact
 * string so the categorization stays accurate — no fuzzy keyword guessing.
 */
const categoryByHighlight: Record<string, HighlightCategory> = {
  // Emirates NBD (Senior Software Engineer (Android))
  "Designed and delivered end-to-end Credit Card Application and Credit Limit Increase journeys using Kotlin, Jetpack Compose, and Clean Architecture, enabling customers to self-serve two of the bank's highest-traffic digital requests.":
    'Architecture',
  'Led the modularization of the Cards module within the ENBD X banking application, restructuring the codebase into independent modules that reduced build times and enabled multiple teams to develop features in parallel.':
    'Architecture',
  'Increased crash-free users from 95% to 98% by proactively debugging production issues, performing root cause analysis, and shipping targeted stability and performance fixes.':
    'Impact',
  'Built asynchronous, reactive data flows using Kotlin Coroutines and Flow to handle real-time account, payment, and transaction data with improved responsiveness.':
    'Architecture',
  'Implemented Hilt-based dependency injection across feature modules, improving testability and reducing boilerplate for a growing engineering team.':
    'Architecture',
  'Delivered secure banking features covering payments, fund transfers, authentication, and account management in line with banking security and compliance standards.':
    'Delivery',
  'Owned production support for critical banking flows, performing RCA on live incidents and delivering hotfix releases with minimal customer disruption.':
    'Impact',
  'Mentored junior and mid-level Android developers through code reviews and architecture discussions, raising overall code quality and consistency across the Cards team.':
    'Leadership',

  // Wipro Technologies (Senior Android Consultant)
  "Built core commerce features — product catalogue, search, wishlist, cart, and secure checkout/payment flows — for Bloomingdale's Middle East, a high-traffic regional e-commerce application.":
    'Delivery',
  'Improved UI rendering performance and application responsiveness, reducing perceived load times across key shopping screens.':
    'Impact',
  'Partnered with backend, product, and design teams to deliver features end-to-end within an Agile delivery model.':
    'Leadership',

  // IBM (Advisory System Analyst - Mobility)
  'Delivered mobile banking features for TSB Bank (UK), including account management, fund transfers, bill payments, and transaction tracking.':
    'Delivery',
  'Integrated biometric authentication to strengthen secure customer login and transaction approval flows.':
    'Architecture',

  // Cognizant (Technology Lead - Mobility)
  "Led Android development for Rabobank's digital banking applications across Europe, owning the full feature lifecycle from requirements through production release.":
    'Leadership',
  'Delivered secure banking capabilities spanning payments, fund transfers, account management, and card services.':
    'Delivery',
  'Mentored developers and shaped technical decisions and coding standards across the mobile engineering team.':
    'Leadership',

  // Suhasoft / LIV (Android Developer)
  'Built native Android applications and reusable UI components across consumer-facing mobile products, establishing the engineering foundation for later banking and fintech work.':
    'Delivery',
};

export function categorize(highlight: string): HighlightCategory {
  return categoryByHighlight[highlight] ?? 'Delivery';
}
