import type { Topic } from '@/types/content';

export const sessionTimeout: Topic = {
  slug: 'session-timeout',
  title: 'Session Timeout & Token Refresh',
  category: 'Security',
  summary: 'A banking session automatically expires after a period of inactivity, and the access token that proves the session is valid is refreshed transparently in the background — until it can\'t be, at which point the user is asked to re-authenticate rather than silently failing requests.',
  sections: [
    {
      heading: 'Inactivity timeout is a UX-security trade-off, not just a timer',
      body: [
        'Too short a timeout frustrates users re-authenticating constantly; too long leaves an unattended, unlocked device with an active banking session. Regulated banking apps typically timeout after a few minutes of inactivity, resetting on any user interaction — the timer belongs in a lifecycle-aware component that resets on genuine activity, not on background timer ticks alone.',
      ],
    },
    {
      heading: 'Refreshing a token without the user noticing — until it truly fails',
      body: [
        'A single 401 response should trigger a silent token refresh attempt using the refresh token, then automatically retry the original request — the user never sees an error for a routine, expected token expiry. Only when the refresh itself fails (refresh token also expired or revoked) should the user be dropped to a re-login screen. Getting this sequencing wrong either shows spurious errors on every routine token expiry, or silently retries forever against a genuinely dead session.',
      ],
    },
  ],
  codeSnippets: [
    {
      title: 'OkHttp Authenticator — transparent refresh-and-retry on 401',
      language: 'kotlin',
      code: `class TokenAuthenticator(private val tokenStore: TokenStore) : Authenticator {
    override fun authenticate(route: Route?, response: Response): Request? {
        if (responseCount(response) >= 2) return null // refresh already failed once, stop retrying
        val newToken = tokenStore.refreshAccessToken() ?: return null // refresh token also dead
        return response.request.newBuilder()
            .header("Authorization", "Bearer $newToken")
            .build()
    }
}`,
    },
  ],
  interviewQuestions: [
    {
      level: 'senior',
      question: 'Where should the inactivity timer actually live, and what resets it?',
      answer:
        "In a lifecycle-aware, application-wide component (not per-screen) that resets on any real user interaction — a touch event, a navigation action — not on a mere timer tick or background service heartbeat. It typically hooks into Activity lifecycle callbacks at the process level so it works consistently across every screen without each screen having to manage its own timer.",
    },
    {
      level: 'lead',
      question: 'How do you avoid an infinite retry loop when both the access token and refresh token are expired?',
      answer:
        "The Authenticator/interceptor doing the silent refresh needs a retry-count guard (OkHttp's Authenticator receives the prior response, letting you check how many times this request has already been retried) — after one failed refresh attempt, stop retrying and route the user to re-authentication instead of looping.",
    },
  ],
  tech: ['OkHttp', 'Coroutines'],
  relatedSlugs: ['oauth-token-auth', 'biometric-authentication'],
};
