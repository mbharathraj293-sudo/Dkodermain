/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Section 2: Light-First DKoder Color System
        dk: {
          primary: '#5B21B6',        // Primary Purple
          brightPurple: '#7C3AED',   // Bright Purple
          primaryLight: '#7C3AED',   // Bright Purple
          softPurple: '#EDE9FE',     // Soft Purple
          primarySoft: '#EDE9FE',    // Soft Purple
          primaryTint: '#F5F0FF',    // Softest purple tint
          yellow: '#FACC15',          // DKoder Yellow
          yellowLight: '#FEF08A',     // Soft yellow highlight
          yellowDark: '#CA8A04',      // Deep yellow for contrast
          bg: '#FAF9FF',              // Light Main Background
          surface: '#FFFFFF',         // White Surfaces & Cards
          surfaceElevated: '#FFFFFF', // Elevated Cards
          surfaceSubtle: '#F6F4FC',   // Subtle panel background
          border: '#E8E4F0',          // Refined Light Border
          borderSubtle: '#F0EDF7',    // Very soft border
          text: '#18152B',            // Primary Dark Text
          textMuted: '#686477',       // Secondary Description Text (#686477)
          textSubtle: '#8C889E',      // Tertiary Text
          success: '#16A34A',         // Success Green
          warning: '#F59E0B',         // Warning Amber
          danger: '#DC2626',          // Error Red
        },
        // Backward-compatibility aliases for existing project classes
        dkoder: {
          charcoal: '#FAF9FF',
          charcoalDark: '#FAF9FF',
          charcoalLight: '#FFFFFF',
          surface: '#FFFFFF',
          surfaceLight: '#FAF9FF',
          border: '#E8E4F0',
          borderSubtle: '#F0EDF7',
          yellow: {
            DEFAULT: '#FACC15',
            light: '#FEF08A',
            electric: '#FACC15',
            dark: '#CA8A04',
            warm: '#EAB308',
            subtle: 'rgba(250, 204, 21, 0.12)',
          },
          purple: {
            DEFAULT: '#5B21B6',
            light: '#8B5CF6',
            soft: '#C4B5FD',
            deep: '#4C1D95',
            dark: '#3B0764',
            subtle: 'rgba(91, 33, 182, 0.08)',
          },
          warmWhite: '#FFFFFF',
          softGray: '#625F72',
          muted: '#8C889E',
          success: '#16A34A',
          warning: '#F59E0B',
          info: '#0284C7',
          danger: '#DC2626',
        }
      },
      fontFamily: {
        sans: ['"Inter"', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['"Manrope"', '"Inter"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      boxShadow: {
        'card': '0 2px 8px -1px rgba(91, 33, 182, 0.05), 0 1px 2px 0 rgba(0, 0, 0, 0.03)',
        'card-hover': '0 10px 24px -4px rgba(91, 33, 182, 0.10), 0 2px 6px 0 rgba(0, 0, 0, 0.04)',
        'elevated': '0 12px 32px -4px rgba(91, 33, 182, 0.12), 0 2px 6px 0 rgba(0, 0, 0, 0.04)',
        'dkoder-yellow': '0 4px 14px -2px rgba(250, 204, 21, 0.35)',
        'dkoder-purple': '0 4px 16px -2px rgba(91, 33, 182, 0.25)',
        'editorial': '0 4px 16px -2px rgba(91, 33, 182, 0.06), 0 1px 3px 0 rgba(0, 0, 0, 0.03)',
        'subtle': '0 1px 4px 0 rgba(91, 33, 182, 0.04)',
      }
    },
  },
  plugins: [],
}
