export type HighlightCategory = 'Architecture' | 'Leadership' | 'Impact' | 'Delivery';

/**
 * Groups each experience entry's existing highlight bullets (from resume.ts)
 * by category, purely for the Career page's expanded view. Maps by exact
 * string so the categorization stays accurate — no fuzzy keyword guessing.
 */
const categoryByHighlight: Record<string, HighlightCategory> = {
  'Built modern UI components using Jetpack Compose following MVVM and Clean Architecture principles.': 'Architecture',
  'Implemented reactive and asynchronous flows using Kotlin Coroutines and Flow.': 'Architecture',
  'Applied Hilt dependency injection to enhance modularity and maintainability.': 'Architecture',
  'Conducted peer code reviews ensuring adherence to banking security and quality standards.': 'Leadership',
  'Mentored junior engineers, improving development efficiency and code quality.': 'Leadership',
  'Improved application stability through memory management and lifecycle optimizations.': 'Impact',

  'Collaborated directly with clients for requirement analysis and technical clarifications.': 'Leadership',
  'Conducted code reviews and promoted best engineering practices.': 'Leadership',
  'Guided junior developers on debugging, architecture, and performance considerations.': 'Leadership',

  'Implemented secure login and biometric authentication mechanisms.': 'Architecture',
  'Collaborated with distributed Agile teams and global stakeholders.': 'Leadership',

  'Led Android development initiatives for international banking clients including Rabobank Netherlands.': 'Leadership',
  'Designed scalable mobile solutions using Kotlin, RxJava, MVVM, and RESTful integrations.': 'Architecture',
  'Improved application performance and responsiveness.': 'Impact',
  'Mentored developers and enforced architectural and code quality standards.': 'Leadership',
  'Coordinated cross-functional teams within Agile delivery environments.': 'Leadership',
};

export function categorize(highlight: string): HighlightCategory {
  return categoryByHighlight[highlight] ?? 'Delivery';
}
