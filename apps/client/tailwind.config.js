export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      animation: {
        grid: "grid 20s linear infinite",
        "pulse-slow": "pulse 6s ease-in-out infinite",
        float: "float 10s ease-in-out infinite",
        "gradient-shift": "gradient-shift 8s ease infinite",
        "border-beam": "border-beam calc(var(--duration)*1s) infinite linear"
      },
      keyframes: {
        grid: {
          "0%": { transform: "translateY(0)" },
          "100%": { transform: "translateY(calc(var(--cell-size) * 2))" }
        },
        float: {
          "0%, 100%": { transform: "translateY(0) scale(1)" },
          "50%": { transform: "translateY(-20px) scale(1.1)" }
        },
        "gradient-shift": {
          "0%, 100%": {
            "background-size": "400% 400%",
            "background-position": "0% 50%"
          },
          "50%": {
            "background-size": "200% 200%",
            "background-position": "100% 50%"
          }
        },
        "border-beam": {
          "100%": {
            "offset-distance": "100%"
          }
        }
      }
    }
  },
  plugins: []
};
