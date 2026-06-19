// NativeWind v5 / react-native-css does not run Tailwind itself — on both web and
// native it relies on Expo's Metro CSS transformer running Tailwind via PostCSS.
// Without this, @theme/@utility/@custom-variant in global.css are never compiled
// (utilities like `bg-surface` aren't generated) and leak through as
// "unknown at-rule" warnings.
export default {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};
