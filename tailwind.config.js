module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
    "./pages/**/*.{vue,js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        'cream-paper': '#fdfaf1',
        'sunset-pink': '#f9c6d3',
        'muted-orange': '#ffd27d',
        'coffee-brown': '#6f4e37',
        'latte': '#f7e7ce',
        'espresso': '#362417',
        'foam': '#fff9f4',
      },
      fontFamily: {
        handwritten: ["'Lora'", 'serif'],
        caveat: ["'Caveat'", 'cursive'],
        sans: ["'Inter'", 'system-ui', 'sans-serif'],
        mono: ["'Space Mono'", 'monospace'],
        display: ["'Playfair Display'", 'serif'],
      },
      boxShadow: {
        'soft': '0 4px 24px 0 rgba(111, 78, 55, 0.08)',
        'scrapbook': '0 4px 24px 0 rgba(249, 198, 211, 0.15), 0 1.5px 0 #b6b6b6 inset',
        'note': '2px 4px 8px rgba(0,0,0,0.1), 0 1px 2px rgba(0,0,0,0.05)',
      },
      zIndex: {
        '1': '1',
        '2': '2',
        '3': '3',
        '4': '4',
        '5': '5',
        '10': '10',
        '20': '20',
        '30': '30',
        '40': '40',
        '50': '50',
      },
    },
  },
  plugins: [],
};
