import type { Topic } from '@/types/content';

export const notificationSystem: Topic = {
  slug: 'notification-system',
  title: 'Notification System Design',
  category: 'System Design',
  summary: 'FCM delivers a message to a device — everything about WHICH users get WHAT content, reliably and at the right time, is a system your backend owns, not something FCM does for you.',
  diagram: `graph TD
    Backend["Your Backend"] --> FCM["Firebase Cloud Messaging"]
    FCM --> Device["Device"]
    Device --> App["App (foreground/background)"]
    App -->|"deep link"| Screen["Specific Screen"]
    Backend --> Topic["Topic Subscription (broadcast)"]
    Backend --> Token["Device Token (targeted)"]`,
  sections: [
    {
      heading: 'Token-based vs. topic-based targeting',
      body: [
        'A device token targets one specific installation — used for "your transfer completed," a message meaningful to exactly one user. A topic (e.g., "maintenance-alerts") lets the backend broadcast to every subscribed device with one call, without tracking individual tokens — appropriate for announcements, not for anything containing personal or account-specific data, since topic subscriptions aren\'t as tightly access-controlled as a per-user token.',
      ],
    },
    {
      heading: 'The notification payload should carry a route, not just text',
      body: [
        "A well-designed payload includes a deep link or route identifier alongside the display text, so tapping the notification navigates directly to the relevant screen (a specific transaction, a specific card) rather than dumping the user on the app's home screen. This requires the notification handler to resolve the payload into a navigation action consistently whether the app was killed, backgrounded, or foregrounded when the notification arrived — three different delivery paths that need to converge on the same navigation result.",
      ],
    },
  ],
  codeSnippets: [
    {
      title: 'Resolving a notification payload to a deep link on tap',
      language: 'kotlin',
      code: `class NotificationOpenHandler(private val navController: NavController) {
    fun handle(data: Map<String, String>) {
        val route = data["route"] ?: return
        val id = data["id"]
        navController.navigate("$route/$id") // same resolution whether app was killed, backgrounded, or foregrounded
    }
}`,
    },
  ],
  interviewQuestions: [
    {
      level: 'senior',
      question: 'When would you use a topic subscription instead of targeting individual device tokens?',
      answer:
        'For broadcast content with no per-user personalization or sensitivity — a maintenance window announcement, a new feature launch. Anything account-specific or containing personal/financial information should always be token-targeted to that one user\'s device, since topic subscriptions are a broader, less individually access-controlled distribution mechanism.',
    },
    {
      level: 'lead',
      question: 'A notification tap needs to open a specific transaction detail screen. What has to be true for that to work reliably regardless of app state?',
      answer:
        "The notification payload needs to carry enough routing information (a route identifier and the relevant ID) for the app to resolve navigation consistently in all three delivery scenarios — app killed (cold start, then navigate once launched), backgrounded (bring to foreground, then navigate), and foregrounded (navigate immediately). A single navigation-resolution function handling all three, rather than three separate ad hoc code paths, is what keeps this reliable.",
    },
  ],
  tech: ['Firebase Cloud Messaging', 'Deep Links'],
  relatedSlugs: ['deep-link-architecture', 'payment-gateway-integration'],
};
