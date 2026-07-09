import type { Topic } from '@/types/content';

export const rootDetection: Topic = {
  slug: 'root-detection',
  title: 'Root Detection & Play Integrity',
  category: 'Security',
  summary: 'Checks whether the device or app has been tampered with — rooted, running in an emulator, or a repackaged APK — using Google\'s Play Integrity API rather than fragile client-side heuristics that a moderately determined attacker can bypass.',
  sections: [
    {
      heading: 'Why hand-rolled root checks lose the arms race',
      body: [
        "Classic root detection — checking for `su` binaries, Magisk paths, or suspicious build tags — is a client-side check that runs in the same untrusted environment it's trying to detect tampering in. A rooted device can hide root from exactly these checks (Magisk Hide and similar tools exist specifically for this). It raises the bar slightly but isn't a real security boundary on its own.",
      ],
    },
    {
      heading: 'Play Integrity moves the check off the device',
      body: [
        'Play Integrity API asks Google\'s servers to attest to the device and app\'s integrity cryptographically, then your OWN backend verifies that attestation server-to-server — the check no longer happens entirely on a device an attacker fully controls. A banking app can use this to decide server-side whether to allow a sensitive operation (a large transfer, adding a payee) rather than trusting a purely client-side "is this device safe" boolean.',
      ],
    },
  ],
  pros: [
    'Server-side verification means the check isn\'t running entirely inside the attacker-controlled environment',
    'Provides graded signals (device integrity, app integrity, licensing) rather than a single easily-spoofed boolean',
  ],
  cons: [
    'Requires backend changes to verify the attestation token — not a pure client-side drop-in',
    'Adds a network round-trip and Google Play Services dependency',
  ],
  codeSnippets: [
    {
      title: 'Requesting an integrity token for a sensitive action',
      language: 'kotlin',
      code: `val integrityManager = IntegrityManagerFactory.create(context)
val request = IntegrityTokenRequest.builder()
    .setNonce(serverProvidedNonce) // prevents replay
    .build()

integrityManager.requestIntegrityToken(request)
    .addOnSuccessListener { response ->
        // send response.token() to YOUR backend to verify with Google
    }`,
    },
  ],
  interviewQuestions: [
    {
      level: 'senior',
      question: 'Why is a client-side-only root check weaker than Play Integrity?',
      answer:
        "A client-side check runs inside the same environment it's trying to assess — a sufficiently rooted/tampered device can hide the very signals the check looks for (Magisk Hide is built for exactly this). Play Integrity has Google's servers attest to device/app state, and critically, your OWN backend verifies that attestation server-side — the decision no longer rests entirely on a device the attacker fully controls.",
    },
    {
      level: 'architect',
      question: 'Should a failed integrity check hard-block the entire app, or just gate specific actions?',
      answer:
        "Hard-blocking the whole app is usually the wrong call — it creates a poor experience for legitimate power users on rooted devices for non-sensitive use, and gives an attacker a single binary signal to bypass. Gating specific high-value actions (large transfers, adding a payee, changing security settings) behind the integrity check, with lower-risk features still available, is the more defensible, proportionate design.",
    },
  ],
  tech: ['Play Integrity API', 'Google Play Services'],
  relatedSlugs: ['ssl-pinning', 'session-timeout'],
};
