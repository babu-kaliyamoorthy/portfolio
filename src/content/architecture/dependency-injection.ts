import type { Topic } from '@/types/content';

export const dependencyInjection: Topic = {
  slug: 'dependency-injection',
  title: 'Dependency Injection (Hilt)',
  category: 'Architecture',
  summary:
    "Classes declare what they need through their constructor instead of constructing it themselves — so a test can hand them a fake, and a Hilt-generated graph can hand them the real thing, without either side knowing about the other.",
  diagram: `graph TD
    App["@HiltAndroidApp Application"] --> Graph["Hilt component graph"]
    Graph --> Module["@Module @InstallIn(SingletonComponent)"]
    Module --> Retrofit["Retrofit instance"]
    Module --> Room["Room database"]
    VM["@HiltViewModel"] -->|"@Inject constructor"| Repo["Repository"]
    Repo -->|"@Inject constructor"| Retrofit
    Repo -->|"@Inject constructor"| Room`,
  sections: [
    {
      heading: 'What Hilt actually generates',
      body: [
        'Hilt is an annotation processor, not a runtime container: at compile time it reads every @Inject constructor and @Module/@Provides function and generates the factory code that would otherwise be hand-written boilerplate — the same graph you\'d build manually, just written for you and verified at compile time instead of discovered as a runtime crash.',
        "A class with an @Inject constructor never calls `new` on its own dependencies and never reaches into a service locator to fetch them. That single rule is what makes the class swappable in a test: replace the real CardRepository with a fake one at the injection point, and the class under test never knows the difference.",
      ],
    },
    {
      heading: 'Scoping is the part that actually causes production bugs',
      body: [
        "@Singleton-scoped classes live for the process lifetime. Injecting an Activity Context into one is a classic memory leak: the Activity can never be garbage collected because a process-scoped singleton is still holding a reference to it. Use @ApplicationContext for anything singleton-scoped, and reach for @ActivityRetainedScoped or @ViewModelScoped when a dependency genuinely needs to be shorter-lived than the app.",
      ],
    },
  ],
  pros: [
    'Compile-time verified graph — a missing binding is a build error, not a runtime NullPointerException',
    'Swapping a real dependency for a test fake requires zero changes to the class under test',
    'Scoping annotations make object lifetime an explicit, reviewable decision instead of an implicit one',
  ],
  cons: [
    'Annotation processing adds real build time on large modules — worth measuring on CI, not just assuming',
    'Generated code and multiple layers of indirection make "where does this actually come from" harder to trace by eye than a manual factory, especially for engineers new to the codebase',
    'Over-scoping to @Singleton "to be safe" is a common source of the exact memory leaks DI is supposed to help avoid',
  ],
  whenToUse: [
    'Any class with dependencies that should be fakeable in a unit test (repositories, use cases, ViewModels)',
    'Apps with more than a handful of screens, where manual dependency wiring becomes its own maintenance burden',
  ],
  enterpriseExample:
    "During the Emirates NBD Cards module modularization, each feature module exposed its own Hilt @Module binding its public API, while implementation classes stayed internal to the module. That boundary — enforced by Hilt bindings, not just convention — is what let the Cards module be extracted and rebuilt independently without other modules reaching in and depending on its internals.",
  codeSnippets: [
    {
      title: 'Constructor injection — no framework code in the class itself',
      language: 'kotlin',
      code: `class CardRepositoryImpl @Inject constructor(
    private val api: CardApi,
    private val cardDao: CardDao,
) : CardRepository {
    // implementation
}`,
    },
    {
      title: 'Module providing a singleton-scoped dependency correctly',
      language: 'kotlin',
      code: `@Module
@InstallIn(SingletonComponent::class)
object NetworkModule {
    @Provides
    @Singleton
    fun provideCardApi(retrofit: Retrofit): CardApi = retrofit.create(CardApi::class.java)

    // Application context is safe at Singleton scope; an Activity context is not.
    @Provides
    @Singleton
    fun provideDatabase(@ApplicationContext context: Context): AppDatabase =
        Room.databaseBuilder(context, AppDatabase::class.java, "app.db").build()
}`,
    },
  ],
  interviewQuestions: [
    {
      level: 'senior',
      question: 'What actually breaks if you inject an Activity Context into a @Singleton class?',
      answer:
        'The singleton lives for the process lifetime, so it holds a strong reference to that Activity forever — the Activity can never be garbage collected even after the user navigates away or rotates the device, which is a textbook memory leak. Use @ApplicationContext at Singleton scope; only use an Activity/Fragment-scoped Hilt component when you genuinely need that shorter-lived context.',
    },
    {
      level: 'lead',
      question: 'How do you unit test a class with an @Inject constructor without pulling in Hilt at all in the test?',
      answer:
        "You don't need Hilt in a unit test — that's the point of constructor injection. Just call the constructor directly with fakes or mocks for each parameter: `CardRepositoryImpl(fakeApi, fakeDao)`. Hilt only matters for wiring the real app graph together; plain constructor calls work fine in JVM tests.",
    },
    {
      level: 'architect',
      question: 'Where do you draw the line between "inject everything" and just calling a constructor directly?',
      answer:
        "Inject anything with a dependency you'd plausibly want to fake in a test, or anything with a lifetime that needs Hilt's scoping (singleton, per-screen, per-navigation-graph). A pure data class or a stateless utility with no dependencies doesn't need to go through the graph — instantiate it directly. DI is a tool for managing dependencies and lifetimes, not a mandate to route every object through a container.",
    },
  ],
  tech: ['Hilt', 'Dagger', 'Kotlin'],
  relatedSlugs: ['clean-architecture', 'mvvm'],
};
