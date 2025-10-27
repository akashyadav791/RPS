/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'raisin-black': '#1e1e24',
        'penn-red': '#92140c',
        'floral-white': '#fff8f0',
        'sunset': '#ffcf99',
        'space-cadet': '#111d4a',
        primary: {
          50: '#fff8f0',
          100: '#ffcf99',
          200: '#ffcf99',
          300: '#ffcf99',
          400: '#92140c',
          500: '#92140c',
          600: '#92140c',
          700: '#111d4a',
          800: '#1e1e24',
          900: '#1e1e24',
        },
      },
      backgroundImage: {
        'gradient-main': 'linear-gradient(135deg, #111d4a, #1e1e24, #92140c)',
        'gradient-card': 'linear-gradient(145deg, rgba(17, 29, 74, 0.4), rgba(30, 30, 36, 0.6))',
        'gradient-button': 'linear-gradient(90deg, #92140c, #111d4a)',
        'gradient-accent': 'linear-gradient(45deg, #ffcf99, #fff8f0)',
        'gradient-radial': 'radial-gradient(circle, #1e1e24, #92140c, #fff8f0, #ffcf99, #111d4a)',
      },
      boxShadow: {
        'glow': '0 0 20px rgba(255, 207, 153, 0.3)',
        'glow-red': '0 0 20px rgba(146, 20, 12, 0.5)',
        'glow-blue': '0 0 20px rgba(17, 29, 74, 0.5)',
        'glow-sunset': '0 4px 20px rgba(255, 207, 153, 0.4)',
      },
      animation: {
        'bounce-slow': 'bounce 2s infinite',
        'pulse-slow': 'pulse 3s infinite',
        'shake': 'shake 0.5s ease-in-out',
        'victory': 'victory 0.6s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'fade-in': 'fadeIn 0.5s ease-in',
      },
      keyframes: {
        shake: {
          '0%, 100%': { transform: 'translateX(0)' },
          '25%': { transform: 'translateX(-10px)' },
          '75%': { transform: 'translateX(10px)' },
        },
        victory: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.2)' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
