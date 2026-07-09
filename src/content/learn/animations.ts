import type { Topic } from '@/types/content';

export const animations: Topic = {
  slug: 'animations',
  title: 'Compose Animations',
  category: 'Animations',
  summary: 'Compose animations are state-driven, not imperative — you describe the target state and let animateXAsState/AnimatedVisibility/AnimatedContent interpolate to it, rather than manually scheduling frames and interpolation like the old View-based Animator APIs.',
  sections: [
    {
      heading: 'Animate state changes, don\'t choreograph frames',
      body: [
        "`animateDpAsState(if (expanded) 200.dp else 48.dp)` means: whenever the target value changes, animate smoothly to the new value — you never touch a frame callback or manually interpolate. This mirrors Compose's whole philosophy: describe the desired end state for the current inputs, let the framework figure out the transition.",
      ],
    },
    {
      heading: 'AnimatedVisibility and AnimatedContent handle enter/exit and content swaps',
      body: [
        '`AnimatedVisibility` handles a composable appearing/disappearing with configurable enter/exit transitions (fade, slide, expand). `AnimatedContent` handles swapping between two different pieces of content for the same slot (a loading spinner becoming the loaded content) with a defined transition between them — both remove the substantial boilerplate of coordinating enter and exit animations manually.',
      ],
    },
  ],
  codeSnippets: [
    {
      title: 'State-driven size animation — no manual frame handling',
      language: 'kotlin',
      code: `@Composable
fun ExpandableCard(expanded: Boolean) {
    val height by animateDpAsState(
        targetValue = if (expanded) 200.dp else 48.dp,
        animationSpec = tween(durationMillis = 300),
        label = "card_height",
    )
    Box(Modifier.height(height)) { /* content */ }
}`,
    },
  ],
  interviewQuestions: [
    {
      level: 'senior',
      question: 'What\'s actually different about animateDpAsState versus a classic Android ValueAnimator?',
      answer:
        "ValueAnimator is imperative — you start it, it calls back with intermediate values, and you manually apply them to a View property, and you're responsible for cancelling it correctly on lifecycle changes. animateDpAsState is declarative: you provide a target value, Compose handles interpolation and automatically re-animates whenever the target changes, and it's inherently scoped to the composable's lifecycle — no manual start/cancel bookkeeping.",
    },
    {
      level: 'lead',
      question: 'When would you reach for the lower-level Animatable API instead of animateXAsState?',
      answer:
        "When you need direct, imperative control over an animation — triggering it from a coroutine, running multiple animations in sequence, or interrupting/reversing one mid-flight based on a gesture. animateXAsState is a state-driven convenience built on top of Animatable for the common case of animating toward a target value; Animatable is the primitive you drop down to for more complex, coroutine-driven animation choreography.",
    },
  ],
  tech: ['Jetpack Compose'],
  relatedSlugs: ['compose-fundamentals', 'coroutines'],
};
