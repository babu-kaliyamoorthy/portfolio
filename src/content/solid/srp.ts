import type { Topic } from '@/types/content';

export const srp: Topic = {
  slug: 'single-responsibility',
  title: 'Single Responsibility',
  category: 'SOLID',
  summary: 'A class should have exactly one reason to change — one job, one axis of responsibility, one owner.',
  sections: [
    {
      heading: 'What it actually means',
      body: [
        '"Responsibility" here means "reason to change," not "number of methods." A class can have five methods and still have a single responsibility if all five exist to serve one cohesive purpose. The test is: if two unrelated stakeholders (a designer changing UI copy, a backend team changing an API contract) would both need this class edited for their unrelated change, it has more than one responsibility.',
      ],
    },
    {
      heading: 'The Android violation to watch for',
      body: [
        "The classic offender is a ViewModel that fetches from the network, maps the response, formats it for display, AND writes analytics events — four unrelated reasons to change living in one class. A UI copy change and a backend contract change and an analytics vendor swap all now touch the same file, and a test for one concern drags in mocks for all four.",
      ],
    },
  ],
  codeSnippets: [
    {
      title: '❌ Violates SRP — four responsibilities in one class',
      language: 'kotlin',
      code: `class AccountViewModel(private val api: AccountApi) : ViewModel() {
    fun loadAccount(id: String) = viewModelScope.launch {
        val response = api.getAccount(id)              // network
        val formatted = "AED %.2f".format(response.balance) // formatting
        analytics.log("account_viewed", id)             // analytics
        _uiState.value = AccountUiState(formatted)       // presentation state
    }
}`,
    },
    {
      title: '✅ Follows SRP — one reason to change per class',
      language: 'kotlin',
      code: `class AccountViewModel(
    private val getAccount: GetAccountUseCase,   // fetch + map
    private val formatBalance: BalanceFormatter, // formatting rules
    private val analytics: AnalyticsLogger,      // analytics
) : ViewModel() {
    fun loadAccount(id: String) = viewModelScope.launch {
        val account = getAccount(id)
        analytics.log("account_viewed", id)
        _uiState.value = AccountUiState(formatBalance(account.balance))
    }
}`,
    },
  ],
  interviewQuestions: [
    {
      level: 'senior',
      question: 'Does SRP mean every class should have exactly one method?',
      answer:
        'No — that conflates "responsibility" with "method count." A class can have several methods and still have a single responsibility if they all serve one cohesive purpose. The test is reasons to change, not line count: if a UI copy change and a backend contract change would both force edits to the same class, it has more than one responsibility.',
    },
    {
      level: 'lead',
      question: 'How do you catch SRP violations in code review before they compound?',
      answer:
        'Watch for classes that import from unrelated layers — a ViewModel importing an analytics SDK directly alongside Retrofit is a signal. Also watch constructor parameter count creeping up over time as a proxy: a class accumulating more and more collaborators is often accumulating more and more responsibilities.',
    },
  ],
  tech: ['Kotlin', 'MVVM'],
  relatedSlugs: ['open-closed', 'dependency-inversion'],
};
