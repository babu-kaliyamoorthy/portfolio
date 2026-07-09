import type { Topic } from '@/types/content';

export const biometricAuth: Topic = {
  slug: 'biometric-authentication',
  title: 'Biometric Authentication',
  category: 'Security',
  summary: 'Uses the device\'s fingerprint/face hardware to unlock access to an existing authenticated session or to a cryptographic key stored in the Keystore — the biometric itself never leaves the secure hardware, and the app never sees or stores it.',
  sections: [
    {
      heading: 'What biometric auth actually unlocks',
      body: [
        "Biometric prompts don't create a new authentication with the backend — they unlock something already provisioned: a cryptographic key in the Android Keystore that was created during a prior password/OTP login, tied to `setUserAuthenticationRequired(true)`. A successful biometric match lets the app use that key (to decrypt a stored session token, or sign a request) without the biometric data itself ever being accessible to the app or transmitted anywhere.",
      ],
    },
    {
      heading: 'Handling the fallback path correctly',
      body: [
        "BiometricPrompt must always have a path to device credential (PIN/pattern) fallback for users without enrolled biometrics, and the app should never treat 'biometric prompt cancelled' the same as 'authentication failed' — a user backing out of the prompt to switch apps shouldn't be logged out or flagged as a failed attempt.",
      ],
    },
  ],
  codeSnippets: [
    {
      title: 'BiometricPrompt tied to a Keystore-backed crypto operation',
      language: 'kotlin',
      code: `val promptInfo = BiometricPrompt.PromptInfo.Builder()
    .setTitle("Confirm it's you")
    .setNegativeButtonText("Use PIN instead")
    .build()

BiometricPrompt(activity, executor, object : BiometricPrompt.AuthenticationCallback() {
    override fun onAuthenticationSucceeded(result: BiometricPrompt.AuthenticationResult) {
        val cipher = result.cryptoObject?.cipher // unlocks the Keystore key, nothing else
        // decrypt stored session token using this cipher
    }
}).authenticate(promptInfo, BiometricPrompt.CryptoObject(cipher))`,
    },
  ],
  interviewQuestions: [
    {
      level: 'senior',
      question: 'Does the app ever have access to the raw fingerprint or face data?',
      answer:
        "Never. The biometric sensor and matching happen entirely within a hardware-backed secure enclave (TEE/StrongBox). The app only ever receives a success/failure callback and, on success, permission to use a Keystore key that was gated behind that biometric check — the biometric data itself is never accessible to application code.",
    },
    {
      level: 'lead',
      question: 'A user cancels the biometric prompt to answer a phone call mid-authentication. Should that count as a failed login attempt?',
      answer:
        'No — `onAuthenticationFailed()` (a genuine non-match) and user-initiated cancellation are distinct callbacks and should be handled differently. Treating a cancellation as a failed attempt risks locking out or flagging real users for normal interruptions rather than actual authentication failures.',
    },
  ],
  tech: ['BiometricPrompt', 'Android Keystore'],
  relatedSlugs: ['encrypted-storage', 'session-timeout'],
};
