import type { Topic } from '@/types/content';

export const featureFlagRollout: Topic = {
  slug: 'feature-flag-rollout',
  title: 'Feature Flag Rollout System',
  category: 'System Design',
  summary: 'Ships code dark, then turns features on for a percentage of users remotely — decoupling "deploy" from "release" so a bad feature can be killed instantly without an emergency app update, and a risky change can be validated on 1% of traffic before 100%.',
  diagram: `graph TD
    Backend["Remote Config Service"] --> App["App fetches flags on launch"]
    App --> Cache["Locally cached flags (offline fallback)"]
    App --> Gate["Feature gate checks: isEnabled('new_checkout')"]
    Backend --> Rollout["Percentage / cohort rollout rules"]`,
  sections: [
    {
      heading: 'Why "deploy" and "release" are different events',
      body: [
        "Shipping a feature's code in an app release and making that feature visible to users don't have to happen at the same time. Wrapping a new feature in a flag check means it can ship dark in a release, then be turned on remotely for 1% of users, watched for crash/error rate regressions, then ramped to 100% — all without another app store release. If it goes wrong, it's a remote flag flip to disable, not an emergency app update users have to install.",
      ],
    },
    {
      heading: 'What has to be true for this to actually work offline and at cold start',
      body: [
        "The app can't block its first frame on a network call to fetch flags — flags need a cached, locally-persisted last-known value used immediately at cold start, with a background refresh updating it for next time. Every flag also needs a sane default baked into the app itself for the very first install before any fetch has ever completed.",
      ],
    },
  ],
  codeSnippets: [
    {
      title: 'Feature gate with a safe default and cached fallback',
      language: 'kotlin',
      code: `class FeatureFlags(private val remoteConfig: RemoteConfigClient) {
    fun isEnabled(key: String, default: Boolean = false): Boolean =
        remoteConfig.getCachedValue(key) ?: default // never blocks on network, always resolves synchronously
}
// usage: if (featureFlags.isEnabled("new_checkout")) NewCheckoutScreen() else LegacyCheckoutScreen()`,
    },
  ],
  interviewQuestions: [
    {
      level: 'senior',
      question: 'Why shouldn\'t checking a feature flag block the UI on a network fetch?',
      answer:
        "That would mean the app's first frame — or any screen gated by a flag — can't render until a network round trip completes, which is exactly the kind of main-thread-blocking-on-network problem that causes ANRs and bad startup times. Flags need a locally cached last-known value (or a baked-in default on first install) that resolves synchronously, with the network fetch updating that cache in the background for next time.",
    },
    {
      level: 'architect',
      question: 'A feature flag rollout to 5% of users shows a crash rate spike. What\'s the actual incident response, and why is this better than an app-store rollback?',
      answer:
        "Flip the flag off remotely for all users immediately — this takes effect on the next flag fetch (typically within minutes, often faster with real-time config push), reverting behavior without touching the installed app binary at all. An app-store rollback would require submitting a new build, waiting for review, and users manually updating — far slower and it doesn't help users who already have the broken version installed and won't update immediately.",
    },
  ],
  tech: ['Firebase Remote Config', 'A/B Testing'],
  relatedSlugs: ['deep-link-architecture', 'banking-app-architecture'],
};
