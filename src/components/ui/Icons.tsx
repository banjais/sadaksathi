import React from "react";

export const SunIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="5" stroke="orange" strokeWidth="2" />
    <line x1="12" y1="1" x2="12" y2="4" stroke="orange" strokeWidth="2" />
    <line x1="12" y1="20" x2="12" y2="23" stroke="orange" strokeWidth="2" />
    <line x1="1" y1="12" x2="4" y2="12" stroke="orange" strokeWidth="2" />
    <line x1="20" y1="12" x2="23" y2="12" stroke="orange" strokeWidth="2" />
  </svg>
);

export const MoonIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path d="M21 12.79A9 9 0 0111.21 3 7 7 0 1012 21a9 9 0 009-8.21z" fill="gray" />
  </svg>
);

export const BotIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <rect x="6" y="6" width="12" height="12" stroke="blue" strokeWidth="2" rx="2" />
    <circle cx="9" cy="12" r="1" fill="blue" />
    <circle cx="15" cy="12" r="1" fill="blue" />
  </svg>
);

export const BellIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path
      d="M12 22c1.104 0 2-.896 2-2H10c0 1.104.896 2 2 2zM18 16v-5c0-3.072-1.64-5.64-4.5-6.32V4a1.5 1.5 0 00-3 0v.68C7.64 5.36 6 7.928 6 11v5l-2 2v1h16v-1l-2-2z"
      stroke="goldenrod"
      strokeWidth="2"
      fill="none"
    />
  </svg>
);
