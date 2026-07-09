import type { Topic } from '@/types/content';

export const deepLinkArchitecture: Topic = {
  slug: 'deep-link-architecture',
  title: 'Deep Link Architecture',
  category: 'System Design',
  summary: 'A URL should open the exact right screen with the exact right data, whether the app is already running, backgrounded, or not installed at all — and Android App Links add a verification layer so the OS trusts your app over a browser for your own domain.',
  sections: [
    {
      heading: 'Custom scheme vs. App Links (verified HTTPS deep links)',
      body: [
        'A custom scheme (`bankapp://cards/123`) only works if the app is installed and nothing else claims that scheme — there\'s no fallback if it\'s not installed, and any app can technically claim an unclaimed scheme. Android App Links use real `https://` URLs tied to a `assetlinks.json` file hosted on your domain that cryptographically proves you own it — the OS verifies this at install time and routes matching URLs straight to your app, with a working website fallback if the app isn\'t installed.',
      ],
    },
    {
      heading: 'One resolution path for every entry point',
      body: [
        'A push notification tap, an App Link click, and an in-app `Deep Link` navigation call should all resolve through the same routing logic — a single function mapping a URI to a destination and its arguments. Three separate ad hoc handlers for these three entry points is how "the notification opens the wrong screen but the App Link works fine" bugs happen — they drift independently because they were never the same code.',
      ],
    },
  ],
  codeSnippets: [
    {
      title: 'One deep link resolver used by every entry point',
      language: 'kotlin',
      code: `object DeepLinkResolver {
    fun resolve(uri: Uri): Route? = when {
        uri.pathSegments.firstOrNull() == "cards" -> Route.CardDetail(uri.lastPathSegment.orEmpty())
        uri.pathSegments.firstOrNull() == "accounts" -> Route.AccountDetail(uri.lastPathSegment.orEmpty())
        else -> null
    }
}
// Used identically by: App Links intent-filter handler, notification tap handler, in-app navigation`,
    },
  ],
  interviewQuestions: [
    {
      level: 'senior',
      question: 'Why would a bank prefer Android App Links over a custom URI scheme?',
      answer:
        "App Links use real https:// URLs verified against a assetlinks.json file the bank hosts, cryptographically proving domain ownership — the OS then routes matching links directly to the app without an app-picker dialog, and falls back gracefully to the website if the app isn't installed. A custom scheme has no verification, no web fallback, and can technically collide with another app claiming the same scheme.",
    },
    {
      level: 'lead',
      question: 'Push notification deep links and website App Links open different screens for the same content. What\'s the root cause and fix?',
      answer:
        "Almost always two separate, independently-written resolution code paths that drifted apart over time — one for notification payloads, one for the App Link intent filter. The fix is routing both through one shared resolver function that maps a URI/payload to a single destination definition, so there's structurally only one place this logic can drift from.",
    },
  ],
  tech: ['Android App Links', 'Navigation'],
  relatedSlugs: ['notification-system', 'feature-flag-rollout'],
};
