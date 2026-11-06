// Remy's face: a friendly smiling round character in the brand blue.
export function HelperAvatar({ className = "h-10 w-10" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
      <circle cx="24" cy="24" r="23" fill="#FFFFFF" />
      <circle cx="24" cy="24" r="20" fill="#1A8CD8" />
      <circle cx="24" cy="24" r="20" fill="url(#remy-shine)" />
      <ellipse cx="17.5" cy="21" rx="2.6" ry="3.2" fill="#FFFFFF" />
      <ellipse cx="30.5" cy="21" rx="2.6" ry="3.2" fill="#FFFFFF" />
      <circle cx="18" cy="21.6" r="1.4" fill="#0C2F4A" />
      <circle cx="31" cy="21.6" r="1.4" fill="#0C2F4A" />
      <path d="M15.5 28.5c2.2 3.6 5.1 5.3 8.5 5.3s6.3-1.7 8.5-5.3" fill="none" stroke="#FFFFFF" strokeWidth="2.6" strokeLinecap="round" />
      <circle cx="13" cy="27" r="2" fill="#FF8FA3" opacity="0.75" />
      <circle cx="35" cy="27" r="2" fill="#FF8FA3" opacity="0.75" />
      <defs>
        <radialGradient id="remy-shine" cx="0.35" cy="0.3" r="0.8">
          <stop offset="0" stopColor="#FFFFFF" stopOpacity="0.28" />
          <stop offset="1" stopColor="#FFFFFF" stopOpacity="0" />
        </radialGradient>
      </defs>
    </svg>
  );
}
