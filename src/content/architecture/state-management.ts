import type { Topic } from '@/types/content';

export const stateManagement: Topic = {
  slug: 'state-management',
  title: 'State Management',
  category: 'Architecture',
  summary:
    "Splitting a screen's data into UI state (what the screen currently shows, re-deliverable on rotation) and one-time events (a snackbar, a navigation trigger, fired once and never again) — conflating the two is where most Compose state bugs come from.",
  diagram: `graph TD
    Event["User event"] --> VM["ViewModel"]
    VM -->|StateFlow| UiState["UI State (re-observable)"]
    VM -->|Channel / SharedFlow| OneTime["One-time event (consumed once)"]
    UiState --> Compose["Compose recomposition"]
    OneTime --> Effect["LaunchedEffect: snackbar, navigation"]`,
  sections: [
    {
      heading: 'State is re-deliverable; events are not',
      body: [
        "StateFlow always replays its latest value to every new collector — exactly right for UI state, since a rotation or a re-subscription should show the current state again. Using that same StateFlow for something like 'show this snackbar once' means the snackbar re-fires every time the screen resubscribes (e.g., after rotation), which is the classic 'snackbar shows twice' bug.",
        "One-time events belong on a separate stream that doesn't replay — a Channel, or a SharedFlow configured with zero replay — consumed inside a LaunchedEffect that runs the side effect (navigate, show snackbar) exactly once per emission.",
      ],
    },
    {
      heading: 'Hoisting state in Compose',
      body: [
        "State that only a single composable cares about (a text field's cursor position while typing) can live as local remember state inside that composable. State that represents something the ViewModel needs to know about, or that multiple composables need to share, belongs hoisted up to the ViewModel's UI state. The rule of thumb: if losing this state on recomposition would be a real bug, or if the ViewModel needs to read it, hoist it; otherwise keep it local and simple.",
      ],
    },
  ],
  pros: [
    'Eliminates the "event fired twice after rotation" class of bugs entirely',
    'Makes it explicit in code review whether something is state (re-showable) or an event (fire-once)',
    'UI state stays trivially testable by collecting the StateFlow in a JVM test',
  ],
  cons: [
    'Two separate streams (state + events) adds a small amount of ceremony versus one flow for everything',
    'Engineers new to the pattern often default to putting everything in UI state out of habit, reintroducing replay bugs',
  ],
  whenToUse: [
    'Any screen that both renders persistent state and triggers one-time effects (snackbars, navigation, dialogs)',
    'Screens where a rotation or process restart currently causes a stale toast/snackbar to reappear',
  ],
  enterpriseExample:
    "A card application submission triggers a one-time 'Application submitted' confirmation and navigates to a success screen — modeled as a one-time event, not part of the persistent UI state, so rotating the device on the success screen doesn't re-trigger the navigation or re-show the confirmation toast.",
  codeSnippets: [
    {
      title: 'Separate channels for state and one-time events',
      language: 'kotlin',
      code: `sealed interface CardEvent {
    data object NavigateToSuccess : CardEvent
    data class ShowError(val message: String) : CardEvent
}

@HiltViewModel
class CardViewModel @Inject constructor(...) : ViewModel() {
    private val _uiState = MutableStateFlow(CardUiState())
    val uiState: StateFlow<CardUiState> = _uiState.asStateFlow()

    private val _events = Channel<CardEvent>(Channel.BUFFERED)
    val events = _events.receiveAsFlow() // consumed once, never replayed

    fun onSubmit() = viewModelScope.launch {
        // ... on success:
        _events.send(CardEvent.NavigateToSuccess)
    }
}`,
    },
  ],
  interviewQuestions: [
    {
      level: 'senior',
      question: 'Why not just put a "shouldNavigate: Boolean" flag in UI state and reset it after use?',
      answer:
        "That works but is fragile: the composable now has to remember to call a reset function after acting on the flag, and if recomposition happens before the reset lands, the effect can still fire twice. A Channel-based event stream doesn't replay by construction, so there's no reset step to forget.",
    },
    {
      level: 'lead',
      question: 'How do you collect a one-time event stream safely in Compose without missing events during recomposition?',
      answer:
        'With `LaunchedEffect(Unit) { viewModel.events.collect { ... } }` keyed on a stable key so it survives recomposition without restarting the collection, combined with `repeatOnLifecycle(STARTED)` (via `collectAsStateWithLifecycle`-style patterns) so the collector pauses while the screen is backgrounded rather than dropping events that arrive then.',
    },
    {
      level: 'architect',
      question: "When is a flag in UI state actually the right call instead of an event stream?",
      answer:
        "When the thing being represented really is state, not an event — a dialog that should stay open across recomposition and rotation until explicitly dismissed is state (re-showing it on rotation is correct behavior), not an event. The test is: should this reappear if the screen resubscribes? If yes, it's state; if it should fire exactly once and never again, it's an event.",
    },
  ],
  tech: ['Compose', 'StateFlow', 'Coroutines'],
  relatedSlugs: ['mvvm', 'offline-first'],
};
