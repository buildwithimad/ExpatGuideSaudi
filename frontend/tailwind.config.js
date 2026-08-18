/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  darkMode: 'class',
  theme: {
    container: {
      center: true,
      padding: '1rem',
    },
    extend: {
      colors: {
        background: { DEFAULT: 'var(--background)' },
        foreground: { DEFAULT: 'var(--foreground)' },
        primary: {
          DEFAULT: 'var(--primary)',
          foreground: 'var(--primary-foreground)',
        },
        secondary: {
          DEFAULT: 'var(--secondary)',
          foreground: 'var(--secondary-foreground)',
        },
        accent: {
          DEFAULT: 'var(--accent)',
          foreground: 'var(--accent-foreground)',
        },
        muted: {
          DEFAULT: 'var(--muted)',
          foreground: 'var(--muted-foreground)',
        },
        card: {
          DEFAULT: 'var(--card)',
          foreground: 'var(--card-foreground)',
        },
        border: { DEFAULT: 'var(--border)' },
        input: { DEFAULT: 'var(--input)' },
        ring: { DEFAULT: 'var(--ring)' },
      },
      borderRadius: {
        DEFAULT: 'var(--radius)',
        btn: '10px',
        badge: '4px',
      },
      fontFamily: {
        sans: ['var(--font-dm-sans)', 'sans-serif'],
        arabic: ['var(--font-arabic)', 'Noto Kufi Arabic', 'sans-serif'],
      },
      fontSize: {
        '2xs': ['0.6875rem', { lineHeight: '1rem' }],
      },
      maxWidth: {
        editorial: '68ch',
        container: '1280px',
      },
      animation: {
  shimmer: 'shimmer 1.8s linear infinite',
},

keyframes: {
  shimmer: {
    '100%': {
      transform: 'translateX(100%)',
    },
  },
},
    },
  },
  plugins: [require('@tailwindcss/typography')],
};