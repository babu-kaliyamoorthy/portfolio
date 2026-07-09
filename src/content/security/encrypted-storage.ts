import type { Topic } from '@/types/content';

export const encryptedStorage: Topic = {
  slug: 'encrypted-storage',
  title: 'Encrypted Storage',
  category: 'Security',
  summary: 'Data at rest on the device — session tokens, cached PII, cached balances — is encrypted with a key that never leaves the hardware-backed Android Keystore, so pulling the raw file off a rooted or physically compromised device yields nothing usable.',
  sections: [
    {
      heading: 'Plain SharedPreferences and plain SQLite are not safe for secrets',
      body: [
        "Regular SharedPreferences and an unencrypted Room database are just XML/SQLite files sitting in app-private storage — readable in plaintext on a rooted device, in an ADB backup if allowed, or via a physical extraction. `EncryptedSharedPreferences` and `SQLCipher`-backed Room encrypt the data itself using a key generated inside the Keystore, which is non-exportable — the key can be used for crypto operations but never read out, even with root.",
      ],
    },
    {
      heading: 'What actually needs encryption vs. what doesn\'t',
      body: [
        'Session tokens, cached account numbers or balances, and any cached PII need encrypted storage. Purely presentational cached data with no security or privacy value (a cached list of public FAQ articles) doesn\'t — encrypting everything indiscriminately adds overhead without a corresponding security benefit, and the actual engineering judgment is scoping which data genuinely needs it.',
      ],
    },
  ],
  codeSnippets: [
    {
      title: 'EncryptedSharedPreferences backed by a Keystore master key',
      language: 'kotlin',
      code: `val masterKey = MasterKey.Builder(context)
    .setKeyScheme(MasterKey.KeyScheme.AES256_GCM)
    .build()

val encryptedPrefs = EncryptedSharedPreferences.create(
    context,
    "secure_session_prefs",
    masterKey,
    EncryptedSharedPreferences.PrefKeyEncryptionScheme.AES256_SIV,
    EncryptedSharedPreferences.PrefValueEncryptionScheme.AES256_GCM,
)
encryptedPrefs.edit().putString("session_token", token).apply()`,
    },
  ],
  interviewQuestions: [
    {
      level: 'senior',
      question: 'Why is the Keystore-generated key safe even on a rooted device?',
      answer:
        "The key is generated inside hardware-backed secure storage (TEE or StrongBox on supported devices) and marked non-exportable — the OS and Keystore APIs can request the hardware to perform encrypt/decrypt operations using that key, but the raw key material itself is never exposed to application code or the filesystem, even with root access. Root compromises the OS layer, not the hardware security module.",
    },
    {
      level: 'lead',
      question: 'Would you encrypt every field in your local Room database by default?',
      answer:
        "No — blanket encryption everywhere has a real performance and complexity cost with no benefit for data that isn't sensitive. The judgment call is classifying which fields are genuinely PII, credentials, or financial data (encrypt these) versus purely presentational cached content with no privacy or security value (leave as-is).",
    },
  ],
  tech: ['Android Keystore', 'EncryptedSharedPreferences', 'SQLCipher'],
  relatedSlugs: ['biometric-authentication', 'oauth-token-auth'],
};
