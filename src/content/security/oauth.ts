import type { Topic } from '@/types/content';

export const oauth: Topic = {
  slug: 'oauth-token-auth',
  title: 'OAuth & Token-Based Auth',
  category: 'Security',
  summary: 'The app never sees or stores the user\'s password — it exchanges credentials once for a short-lived access token and a longer-lived refresh token, and every subsequent request proves identity with the token instead.',
  sections: [
    {
      heading: 'Why short-lived access tokens, not long-lived ones',
      body: [
        "A short-lived access token (minutes to an hour) limits the damage window if it's ever leaked — an intercepted or logged token expires on its own soon after. The refresh token, used only to mint new access tokens, is longer-lived but should be stored more securely (Android Keystore-backed encrypted storage) and revocable server-side, so a compromised session can be killed remotely even if the device itself isn't recoverable.",
      ],
    },
    {
      heading: 'Where apps actually get this wrong',
      body: [
        'Storing the access token in plain SharedPreferences, logging it in analytics or crash reports, or attaching it to a request as a query parameter (which ends up in server access logs and browser history) are the recurring real mistakes — the token itself is well-designed, but its handling on the client leaks it anyway. It belongs in encrypted storage, in an Authorization header, never logged.',
      ],
    },
  ],
  codeSnippets: [
    {
      title: 'Attaching the token correctly — header, not query param',
      language: 'kotlin',
      code: `class AuthInterceptor(private val tokenStore: TokenStore) : Interceptor {
    override fun intercept(chain: Interceptor.Chain): Response {
        val token = tokenStore.getAccessToken()
        val request = chain.request().newBuilder()
            .addHeader("Authorization", "Bearer $token")
            .build()
        return chain.proceed(request)
    }
}`,
    },
  ],
  interviewQuestions: [
    {
      level: 'senior',
      question: 'Why does the refresh token need stronger protection than the access token?',
      answer:
        "The access token is short-lived, so a leak has a small blast radius that self-resolves on expiry. The refresh token can mint new access tokens indefinitely until revoked, making it the more valuable and longer-lasting target — it needs Keystore-backed encrypted storage, not the same casual handling as the access token.",
    },
    {
      level: 'lead',
      question: 'A code reviewer flags that an access token is being passed as a URL query parameter to an internal endpoint. Why does that matter?',
      answer:
        "Query parameters end up in server access logs, proxy logs, and browser/WebView history — none of which are designed to hold secrets securely, and all of which are typically retained far longer and with looser access control than request bodies or headers. The token should move to an Authorization header, which isn't logged the same way by default.",
    },
  ],
  tech: ['OAuth 2.0', 'OkHttp', 'Android Keystore'],
  relatedSlugs: ['session-timeout', 'encrypted-storage'],
};
