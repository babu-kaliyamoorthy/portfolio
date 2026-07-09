import type { Topic } from '@/types/content';

export const mvvm: Topic = {
  slug: 'mvvm',
  title: 'MVVM',
  category: 'Architecture',
  summary:
    'Separates what the screen shows (View) from how it decides what to show (ViewModel), so UI state survives configuration changes and the screen logic is testable without inflating a layout.',
  diagram: `graph TD
    View["Compose UI (View)"] -->|observes| VM["ViewModel"]
    View -->|user events| VM
    VM -->|exposes StateFlow| View
    VM --> UC["Use Cases (Domain)"]
    UC --> Repo["Repository"]`,
  sections: [
    {
      heading: 'The View only renders state — it never decides it',
      body: [
        "The ViewModel exposes a single, immutable UI state (typically a StateFlow<UiState>) that fully describes what the screen looks like at any moment: loading, error, data, empty. The View's only jobs are to render that state and forward user events (clicks, text input) up to the ViewModel.",
        "This is the difference between MVVM done well and MVVM done as a rename of MVC's Controller: if the View is still making decisions — 'if this field is empty, show red' — that logic has leaked out of the ViewModel and the screen is no longer reliably testable without rendering it.",
      ],
    },
    {
      heading: 'Surviving configuration changes',
      body: [
        "A ViewModel scoped to a NavBackStackEntry or Activity survives rotation and process-adjacent recreation; the View does not. That's the practical reason MVVM won on Android specifically — it's not just a style preference, it solves a real platform problem (losing in-progress screen state on rotation) that MVC and MVP both handle far more awkwardly.",
      ],
    },
  ],
  pros: [
    'UI state survives rotation and navigation without manual save/restore bundles',
    'ViewModel logic is unit-testable with a fake StateFlow collector — no Compose test rule needed',
    'One state object per screen makes "what can this screen show right now" enumerable and exhaustive',
  ],
  cons: [
    "A single bloated UiState data class becomes its own maintenance problem on complex screens — needs splitting into sub-states or separate StateFlows per concern",
    'Easy to accidentally put business rules in the ViewModel instead of delegating to use cases, which re-couples logic to the Android lifecycle it was supposed to be isolated from',
  ],
  whenToUse: [
    'Any screen with UI state that must survive configuration changes',
    'Screens where the state space is enumerable (loading/error/success/empty) rather than free-form',
  ],
  enterpriseExample:
    'A multi-step credit card application flow spanning several screens is a common banking pattern; each step\'s ViewModel holding partial form state as a StateFlow means backgrounding the app mid-application or rotating the device never loses the customer\'s progress — a real compliance and UX requirement for a banking flow, not just a nicety.',
  codeSnippets: [
    {
      title: 'ViewModel exposing a single UI state',
      language: 'kotlin',
      code: `sealed interface CardApplicationUiState {
    data object Loading : CardApplicationUiState
    data class Form(val step: Int, val data: ApplicationDraft) : CardApplicationUiState
    data class Error(val message: String) : CardApplicationUiState
}

@HiltViewModel
class CardApplicationViewModel @Inject constructor(
    private val submitApplication: SubmitCardApplicationUseCase,
) : ViewModel() {
    private val _uiState = MutableStateFlow<CardApplicationUiState>(CardApplicationUiState.Loading)
    val uiState: StateFlow<CardApplicationUiState> = _uiState.asStateFlow()

    fun onSubmit(draft: ApplicationDraft) = viewModelScope.launch {
        _uiState.value = CardApplicationUiState.Loading
        submitApplication(draft)
            .onSuccess { _uiState.value = CardApplicationUiState.Form(step = 0, data = draft) }
            .onFailure { _uiState.value = CardApplicationUiState.Error(it.message.orEmpty()) }
    }
}`,
    },
  ],
  interviewQuestions: [
    {
      level: 'senior',
      question: 'Why StateFlow over LiveData for exposing ViewModel state in a Compose app?',
      answer:
        'StateFlow is a Kotlin-native, coroutine-first construct that works the same in ViewModels, use cases and repositories, so the same testing and threading tools apply end to end — LiveData only makes sense at the View boundary. StateFlow also always has a value (no nullable initial state to guard against) and integrates directly with collectAsStateWithLifecycle in Compose.',
    },
    {
      level: 'lead',
      question: 'A ViewModel is directly calling Retrofit. Why is that a problem, and how do you fix it in review?',
      answer:
        "It means the ViewModel now depends on network framework types, defeating the point of separating the View layer from data sources — that ViewModel can no longer be tested without mocking Retrofit, and swapping the backend client means touching every ViewModel that used it directly. Fix: introduce a repository interface the ViewModel depends on instead, with the Retrofit call moved into the repository implementation.",
    },
    {
      level: 'architect',
      question: 'When would you choose MVI over MVVM for a screen?',
      answer:
        'When a screen has genuinely complex, multi-source state transitions — several independent event streams that can race or interleave — an explicit reducer (MVI) makes every possible state transition traceable and testable in one place. For most CRUD-shaped screens this is unnecessary ceremony; MVI earns its cost on screens like a live trading ticker or a multi-step wizard with branching, not a simple form.',
    },
  ],
  tech: ['Kotlin', 'Compose', 'Coroutines', 'StateFlow', 'Hilt'],
  relatedSlugs: ['clean-architecture', 'dependency-injection'],
};
