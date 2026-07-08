type IconProps = {
  className?: string;
};

export function KotlinIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 32 32" className={className} fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Kotlin">
      <defs>
        <linearGradient id="kotlin-gradient" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#3B82F6" />
          <stop offset="0.5" stopColor="#2563EB" />
          <stop offset="1" stopColor="#F59E0B" />
        </linearGradient>
      </defs>
      <path d="M2 2H30L16 16L30 30H2V2Z" fill="url(#kotlin-gradient)" />
    </svg>
  );
}

export function AndroidIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 32 32" className={className} fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Android">
      <path
        d="M9.5 12.5v8a1.5 1.5 0 003 0v-8m6 0v8a1.5 1.5 0 003 0v-8M8 13h16v9a1.5 1.5 0 01-1.5 1.5h-13A1.5 1.5 0 018 22v-9z"
        fill="currentColor"
        opacity="0.9"
      />
      <path d="M12.5 24v2.5a1.5 1.5 0 003 0V24m0 0v0" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M16.5 24v2.5a1.5 1.5 0 003 0V24" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M9 8l-1.5-2.5M23 8l1.5-2.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <circle cx="12.5" cy="9.5" r="1" fill="currentColor" />
      <circle cx="19.5" cy="9.5" r="1" fill="currentColor" />
      <path d="M11 9.5a5 5 0 0110 0" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

export function ComposeIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 32 32" className={className} fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Jetpack Compose">
      <circle cx="10" cy="16" r="5" fill="#F59E0B" opacity="0.9" />
      <path d="M15 10c4-3 9-2 11 1s0 7-4 8" stroke="#2563EB" strokeWidth="2.4" strokeLinecap="round" fill="none" />
      <path d="M15 22c4 3 9 2 11-1s0-7-4-8" stroke="#3B82F6" strokeWidth="2.4" strokeLinecap="round" fill="none" />
    </svg>
  );
}

export function HiltIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 32 32" className={className} fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Hilt">
      <path
        d="M16 3l11 5v8c0 7-4.7 11.7-11 13-6.3-1.3-11-6-11-13V8l11-5z"
        stroke="currentColor"
        strokeWidth="1.8"
        fill="rgba(37,99,235,0.12)"
      />
      <path d="M16 9v14M11 12.5h10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

export function MvvmIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 32 32" className={className} fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="MVVM">
      <rect x="3" y="6" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.8" />
      <rect x="12.5" y="13" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.8" />
      <rect x="22" y="6" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.8" />
      <path d="M9 10h6.5M23 10h-6.5M16 16.5V13" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}
