import type { Topic } from '@/types/content';

export const sslPinning: Topic = {
  slug: 'ssl-pinning',
  title: 'SSL / Certificate Pinning',
  category: 'Security',
  summary: 'The app only trusts a specific, known certificate (or public key) for a host, instead of any certificate signed by a trusted CA — closing the gap a compromised or malicious CA, or a rogue corporate/public Wi-Fi proxy, could otherwise exploit.',
  sections: [
    {
      heading: 'Why the default trust model isn\'t enough for banking',
      body: [
        "By default, Android trusts any certificate signed by any CA in the system trust store — hundreds of them. A compromised CA, a malicious root certificate installed on a rooted device, or a corporate MITM proxy can all present a validly-signed-but-wrong certificate and the OS will accept it. Pinning says: for this specific host, only THIS certificate (or public key) is acceptable, full stop.",
      ],
    },
    {
      heading: 'Pin the public key, not the leaf certificate',
      body: [
        "Pinning the exact leaf certificate breaks the app the moment that certificate is renewed — a routine, expected event. Pinning the public key (or including the backup/intermediate key as a second pin) survives certificate renewal as long as the same key pair is reused, which is standard practice. Always ship at least two pins — the current key and a backup — so a compromised or lost private key doesn't require an emergency app release to recover from.",
      ],
    },
  ],
  pros: [
    'Defeats MITM attacks even from a compromised or malicious CA',
    'Protects against rogue corporate or public Wi-Fi proxies intercepting traffic',
  ],
  cons: [
    'A certificate rotation without a corresponding app update (with the new pin) locks out every user until they update — a real operational risk if not planned for',
    'Adds a hard coupling between the app release cycle and the backend\'s certificate lifecycle',
  ],
  whenToUse: [
    'Apps handling financial transactions, credentials, or other high-value data in transit',
    'Always paired with a backup pin and a rollout plan for certificate rotation — never a single pin with no fallback',
  ],
  codeSnippets: [
    {
      title: 'OkHttp CertificatePinner with a backup pin',
      language: 'kotlin',
      code: `val certificatePinner = CertificatePinner.Builder()
    .add("api.bank.com", "sha256/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=") // current key
    .add("api.bank.com", "sha256/BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB=") // backup key
    .build()

val client = OkHttpClient.Builder()
    .certificatePinner(certificatePinner)
    .build()`,
    },
  ],
  interviewQuestions: [
    {
      level: 'senior',
      question: 'Why pin the public key instead of the full certificate?',
      answer:
        'Certificates get renewed regularly as a routine, expected event — pinning the exact certificate means every renewal breaks the app until an update ships. Pinning the public key survives renewal as long as the same key pair is reused, which is standard practice for certificate renewal.',
    },
    {
      level: 'architect',
      question: 'Your backend needs an emergency certificate rotation due to a key compromise, but pinned apps in the field only have the old pin. What do you do?',
      answer:
        "This is exactly why you always ship a backup pin for a key you control but haven't activated yet — the emergency rotation switches to the backup key, which pinned apps already trust, no app update required. Without a pre-provisioned backup pin, the only options are a forced emergency app update or temporarily disabling pinning server-side, both of which are far worse than planning for this upfront.",
    },
  ],
  tech: ['OkHttp', 'TLS'],
  relatedSlugs: ['session-timeout', 'root-detection'],
};
