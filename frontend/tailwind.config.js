/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                // Cinematic Dark Theme
                background: "#0A0A0F",
                surface: "rgba(255, 255, 255, 0.05)",
                "surface-highlight": "rgba(255, 255, 255, 0.1)",
                border: "rgba(255, 255, 255, 0.1)",
                
                // Neon Accents
                primary: "#3B82F6", // Electric Blue
                secondary: "#8B5CF6", // Violet
                accent: "#06B6D4", // Neon Cyan
                success: "#10B981", 
                warning: "#F59E0B",
                error: "#EF4444",
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
                display: ['Space Grotesk', 'sans-serif'],
            },
            animation: {
                'float': 'float 6s ease-in-out infinite',
                'spin-slow': 'spin 10s linear infinite',
                'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
            },
            keyframes: {
                float: {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-20px)' },
                }
            }
        },
    },
    plugins: [],
}
