/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin');

module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'class', // uses the .dark class
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        card: 'var(--card)',
        'card-foreground': 'var(--card-foreground)',
        popover: 'var(--popover)',
        'popover-foreground': 'var(--popover-foreground)',
        primary: 'var(--primary)',
        'primary-foreground': 'var(--primary-foreground)',
        secondary: 'var(--secondary)',
        'secondary-foreground': 'var(--secondary-foreground)',
        muted: 'var(--muted)',
        'muted-foreground': 'var(--muted-foreground)',
        accent: 'var(--accent)',
        'accent-foreground': 'var(--accent-foreground)',
        destructive: 'var(--destructive)',
        'destructive-foreground': 'var(--destructive-foreground)',
        border: 'var(--border)',
        input: 'var(--input)',
        'input-background': 'var(--input-background)',
        switch: 'var(--switch-background)',
        ring: 'var(--ring)',
        sidebar: 'var(--sidebar)',
        'sidebar-foreground': 'var(--sidebar-foreground)',
        'sidebar-primary': 'var(--sidebar-primary)',
        'sidebar-primary-foreground': 'var(--sidebar-primary-foreground)',
        'sidebar-accent': 'var(--sidebar-accent)',
        'sidebar-accent-foreground': 'var(--sidebar-accent-foreground)',
        'sidebar-border': 'var(--sidebar-border)',
        'sidebar-ring': 'var(--sidebar-ring)',
      },
      fontSize: {
        base: 'var(--font-size)',
        '2xl': 'var(--text-2xl)',
        xl: 'var(--text-xl)',
        lg: 'var(--text-lg)',
      },
      borderRadius: {
        sm: 'calc(var(--radius) - 4px)',
        md: 'calc(var(--radius) - 2px)',
        lg: 'var(--radius)',
        xl: 'calc(var(--radius) + 4px)',
      },
      transitionDuration: {
        DEFAULT: '300ms',
      },
      transitionTimingFunction: {
        DEFAULT: 'ease-in-out',
      },
      minWidth: {
        'touch-btn': '44px',
      },
      minHeight: {
        'touch-btn': '44px',
      },
      spacing: {
        'safe-top': 'env(safe-area-inset-top)',
        'safe-bottom': 'env(safe-area-inset-bottom)',
        'safe-left': 'env(safe-area-inset-left)',
        'safe-right': 'env(safe-area-inset-right)',
      },
      zIndex: {
        overlay: 9999,
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    plugin(function({ addUtilities }) {
      addUtilities({
        // Safe area utilities
        '.safe-area-top': { paddingTop: 'env(safe-area-inset-top)' },
        '.safe-area-bottom': { paddingBottom: 'env(safe-area-inset-bottom)' },
        '.safe-area-left': { paddingLeft: 'env(safe-area-inset-left)' },
        '.safe-area-right': { paddingRight: 'env(safe-area-inset-right)' },
        '.safe-area-all': {
          paddingTop: 'env(safe-area-inset-top)',
          paddingBottom: 'env(safe-area-inset-bottom)',
          paddingLeft: 'env(safe-area-inset-left)',
          paddingRight: 'env(safe-area-inset-right)',
        },
        // Scrollbar hide
        '.scrollbar-hide': {
          '-ms-overflow-style': 'none',
          'scrollbar-width': 'none',
        },
        '.scrollbar-hide::-webkit-scrollbar': { display: 'none' },
        // Clickable overlay
        '.clickable-overlay': {
          'pointer-events': 'auto',
          'user-select': 'none',
          '-webkit-tap-highlight-color': 'transparent',
        },
        // Mobile-friendly buttons
        '.mobile-map-controls button': {
          minWidth: '40px',
          minHeight: '40px',
        },
        '.mobile-fab': {
          width: '60px',
          height: '60px',
          boxShadow: '0 8px 16px rgba(0,0,0,0.2)',
        },
      });
    }),
  ],
};
