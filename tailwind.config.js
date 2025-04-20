/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: "var(--primary)",
        "primary-text": "var(--primary-text)",
        secondary: "var(--secondary)",
        accent: "var(--accent)",
        primaryText: "var(--text)",
        subtitleText: "var(--subtext)",
        placeholder: "#7d7d7d",
        gray: "#7d7d7d",
        "sub-text": "var(--subtext)",
        card: "var(--card)",
        "card-reverse": "var(--card-reverse)",
        typography: "var(--text)",
        "text-invert": "var(--text-invert)",
        divider: "var(--divider)",
        inactive: "var(--inactive)",
        red: "#DC2626",
        "off-white": "var(--off-white)",
        icon: "var(--text)",
        "svg-active": "var(--primary)",
        "svg-inactive": "var(--inactive)",
        "text-inactive": "var(--inactive)",
        "divider-line": "var(--divider)",
        subcard: "var(--sub-card)",
        white: "#FFFFFF",
        black: "#111111",
        tag: "var(--tag)"
      },
      fontFamily: {
        regular: "Figtree-Regular",
        medium: "Figtree-Medium",
        semibold: "Figtree-SemiBold",
        bold: "Figtree-Bold",
        "extra-bold": "Figtree-ExtraBold"
      },
      height: {
        divider: 2
      }
    }
  }
}

