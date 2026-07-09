export type NoteGroup = {
  category: string;
  notes: string[];
};

export const androidNotes: NoteGroup[] = [
  {
    category: 'Kotlin',
    notes: [
      '`data class` generates equals/hashCode/copy from constructor properties only — properties declared in the body are excluded from all three.',
      '`lateinit var` cannot be used with primitive types (Int, Boolean) — use a nullable type with a default, or `Delegates.notNull()`.',
      'Sealed classes/interfaces give exhaustive `when` checks at compile time — a missing branch is a build error, not a runtime surprise.',
      '`inline` functions with lambda parameters avoid an object allocation per call for the lambda — matters in hot paths, irrelevant elsewhere.',
      'Extension functions are resolved statically at compile time based on the declared type, not the runtime type — they are not true polymorphism.',
    ],
  },
  {
    category: 'Compose',
    notes: [
      'A composable reading a `List<T>` directly (not `ImmutableList`) may cause defensive recomposition — the compiler can\'t guarantee the list is stable.',
      '`remember` without a key survives recomposition but not configuration changes — use `rememberSaveable` to survive rotation.',
      '`Modifier` order matters — `.padding().clickable()` gives a different clickable area than `.clickable().padding()`.',
      'A composable can be called zero, one, or many times per frame — never assume it runs exactly once, and never put side effects directly in the body.',
      '`key()` inside a loop prevents Compose from misidentifying reordered items as the same composable when list order changes.',
    ],
  },
  {
    category: 'Coroutines',
    notes: [
      '`GlobalScope.launch` should almost never appear in application code — it has no structured lifetime and is a common leak source.',
      '`withContext` suspends the calling coroutine and switches dispatcher — it does not spawn a new coroutine.',
      'A cancelled coroutine throws `CancellationException` at the next suspension point — catching generic `Exception` accidentally swallows cancellation and breaks structured concurrency.',
      '`SupervisorJob` prevents one child\'s failure from cancelling its siblings — a plain `Job` cancels all siblings when any one fails.',
      '`runBlocking` should never appear on the main thread in production code — it defeats the entire purpose of coroutines by blocking synchronously.',
    ],
  },
  {
    category: 'Android Lifecycle',
    notes: [
      '`onSaveInstanceState` is for small, transient UI state (scroll position, form input) — not a replacement for a ViewModel or persistent storage.',
      'A Fragment\'s view can be destroyed and recreated while the Fragment instance itself survives (e.g., on the back stack) — use `viewLifecycleOwner`, not the Fragment\'s own lifecycle, for view-related observers.',
      '`onPause` is guaranteed to be called before the process can be killed — `onStop` is not, on older API levels under memory pressure.',
      'Configuration changes (rotation) destroy and recreate the Activity by default — a ViewModel survives this automatically; a plain field does not.',
    ],
  },
  {
    category: 'Gradle & Build',
    notes: [
      '`implementation` vs `api` in a library module controls whether a dependency is exposed transitively — defaulting to `implementation` keeps incremental build times faster.',
      'R8/ProGuard can strip classes only reachable via reflection — always verify a release build, not just debug, before shipping.',
      'Build variants (flavors × build types) multiply — a `staging` flavor with `debug`/`release` build types gives 2 variants per flavor, plan the matrix before adding a third flavor.',
      'Version catalogs (`libs.versions.toml`) centralize dependency versions across modules — prevents the classic "module A uses Retrofit 2.9, module B uses 2.11" drift.',
    ],
  },
];
