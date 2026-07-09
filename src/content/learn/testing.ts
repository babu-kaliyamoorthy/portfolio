import type { Topic } from '@/types/content';

export const testing: Topic = {
  slug: 'testing',
  title: 'Testing on Android',
  category: 'Testing',
  summary: 'JVM unit tests, instrumented tests, and Compose UI tests each verify a different layer — the practical skill is knowing which layer a given piece of logic belongs to, so you\'re not writing a slow instrumented test for something a millisecond JVM test could cover.',
  sections: [
    {
      heading: 'JVM unit tests should cover the vast majority of logic',
      body: [
        "Use cases, ViewModels (with fake repositories), mappers, and validators have no genuine Android framework dependency if the codebase follows Clean Architecture (see Architecture) — they run as plain JVM tests via JUnit, no emulator, executing in milliseconds. If a class needs Robolectric or an emulator just to test business logic, that's usually a sign the logic isn't as cleanly separated from the framework as it should be.",
      ],
    },
    {
      heading: 'Instrumented and Compose UI tests are for what only exists on-device',
      body: [
        "Room DAO behavior against real SQLite, actual rendering and interaction of a composable, or anything genuinely needing the Android framework runtime belongs in instrumented tests — slower, but testing something a JVM test structurally can't. Compose's own testing APIs (`composeTestRule.onNodeWithText(...).performClick()`) let you assert on rendered UI state and simulate real interactions.",
      ],
    },
  ],
  codeSnippets: [
    {
      title: 'A fast JVM unit test for a use case — no Android dependency at all',
      language: 'kotlin',
      code: `@Test
fun \`increase limit fails without 3 months of on-time payments\`() = runTest {
    val fakeRepo = FakeCardRepository(paymentHistory = shortHistory)
    val useCase = IncreaseCreditLimitUseCase(fakeRepo)

    val result = useCase("card-1", Money(5000))

    assertTrue(result.isFailure) // milliseconds, no emulator needed
}`,
    },
    {
      title: 'A Compose UI test asserting on real rendered state',
      language: 'kotlin',
      code: `@Test
fun errorMessageShownOnInvalidInput() {
    composeTestRule.setContent { LoginScreen() }
    composeTestRule.onNodeWithText("Submit").performClick()
    composeTestRule.onNodeWithText("Email is required").assertIsDisplayed()
}`,
    },
  ],
  interviewQuestions: [
    {
      level: 'senior',
      question: 'Why should business logic tests almost never need Robolectric or an emulator?',
      answer:
        "If a use case or ViewModel genuinely needs Android framework classes to test, it likely has framework dependencies leaking into logic that should be framework-agnostic (see Clean Architecture / Dependency Inversion). A properly layered codebase lets you test that logic with plain JUnit and fake implementations of its dependencies, running in milliseconds rather than the seconds-to-minutes an emulator-backed test costs.",
    },
    {
      level: 'lead',
      question: 'How do you decide the right ratio of unit tests to instrumented/UI tests on a real project?',
      answer:
        "The testing pyramid principle: many fast JVM unit tests covering business logic and edge cases, a moderate number of instrumented tests for things genuinely requiring the Android runtime (Room, WorkManager), and comparatively few slow, expensive end-to-end UI tests covering critical user journeys only. Inverting this — mostly slow UI tests, few unit tests — makes the suite slow and flaky without actually catching more bugs.",
    },
  ],
  tech: ['JUnit', 'Robolectric', 'Compose Testing'],
  relatedSlugs: ['coroutines', 'compose-fundamentals'],
};
