/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  safelist: [
    'bg-red-500',
    'bg-yellow-500',
    'bg-green-500',
    'rounded-full',
    'grid-cols-1',
    'md:grid-cols-2',
    'terminal-dot-red',
    'terminal-dot-yellow',
    'terminal-dot-green',
    'terminal-window',
    'terminal-grid',
    'terminal-window-container'
  ],
  theme: {
    extend: {
      colors: {
        'terminal-green': 'var(--terminal-green)',
        'terminal-dark-green': 'var(--terminal-dark-green)',
      },
      animation: {
        scroll: 'scroll var(--animation-duration) linear infinite',
      },
      keyframes: {
        scroll: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(calc(-100% / var(--repeat-count)))' },
        },
      },
      fontFamily: {
        'fuel-decay': ['pf-fuel-decay', 'sans-serif'],
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [],
};
