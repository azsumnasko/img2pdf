export function PrivacyBadge() {
  return (
    <div className="privacy-badge" role="note">
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
        <path
          d="M9 1L2 4.5V9c0 3.7 2.9 7.2 7 8 4.1-.8 7-4.3 7-8V4.5L9 1z"
          stroke="currentColor"
          strokeWidth="1.5"
          fill="none"
        />
        <path d="M6.5 9L8.5 11l3-3.5" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <span>Processed on your device</span>
    </div>
  );
}
