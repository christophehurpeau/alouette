'use strict';

Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });

const jsxRuntime = require('react/jsx-runtime');
const nativewind = require('nativewind');
const react = require('react');
const reactNative = require('react-native');
const reactNativeSafeAreaContext = require('react-native-safe-area-context');
const tailwindMerge = require('tailwind-merge');
const tailwindVariants = require('tailwind-variants');
const CheckRegularIcon = require('alouette-icons/phosphor-icons/CheckRegularIcon');
const InfoRegularIcon = require('alouette-icons/phosphor-icons/InfoRegularIcon');
const WarningRegularIcon = require('alouette-icons/phosphor-icons/WarningRegularIcon');
const XRegularIcon = require('alouette-icons/phosphor-icons/XRegularIcon');
const CaretRightRegularIcon = require('alouette-icons/phosphor-icons/CaretRightRegularIcon');
const WebBrowser = require('expo-web-browser');

function _interopNamespaceDefault(e) {
  const n = Object.create(null, { [Symbol.toStringTag]: { value: 'Module' } });
  if (e) {
    for (const k in e) {
      n[k] = e[k];
    }
  }
  n.default = e;
  return n;
}

const WebBrowser__namespace = /*#__PURE__*/_interopNamespaceDefault(WebBrowser);

const ThemeContext = react.createContext("light");
function useCurrentTheme() {
  return react.useContext(ThemeContext);
}
function useCurrentMode() {
  return react.useContext(ThemeContext).startsWith("dark") ? "dark" : "light";
}

const themeVariables = {
  "light": {
    "--color-translucent": "#ffffff66",
    "--color-disabled-sharp": "#616161",
    "--color-disabled-muted": "#8F8F8F",
    "--color-disabled-interactive": "#474747",
    "--color-muted": "#474747",
    "--color-form-bg": "#FFFFFF",
    "--color-form-bg-hover": "#FFFFFF",
    "--color-form-bg-focus": "#FFFFFF",
    "--color-form-bg-active": "#FFFFFF",
    "--color-form-bg-disabled": "#E0E0E0",
    "--color-form-border-disabled": "#B8B8B8",
    "--color-form-placeholder": "#616161",
    "--color-form-disabled-text": "#474747",
    "--color-interactive-contained-disabled": "#C7C7C7",
    "--color-interactive-outlined-disabled": "#B8B8B8",
    "--color-interactive-accent-contained-bg-disabled": "#EBEBEB",
    "--color-interactive-accent-outlined-disabled": "#B8B8B8",
    "--color-screen": "#EBEBEB",
    "--color-surface": "#F5F5F5",
    "--color-highlight": "#FFFFFF",
    "--color-highlight-accent": "#E0E0E0",
    "--color-lowered": "#E0E0E0",
    "--color-screen-gradient-start": "#E0E0E0",
    "--color-screen-gradient-middle": "#C7C7C7",
    "--color-screen-gradient-end": "#B8B8B8",
    "--color-border-muted": "#8F8F8F",
    "--color-border-sharp": "#616161",
    "--color-interactive-contained-pressable": "#FFFFFF",
    "--color-interactive-contained-hover": "#E0E0E0",
    "--color-interactive-contained-focus": "#E0E0E0",
    "--color-interactive-contained-active": "#C7C7C7",
    "--color-interactive-outlined-pressable": "#8F8F8F",
    "--color-interactive-outlined-hover": "#616161",
    "--color-interactive-outlined-focus": "#616161",
    "--color-interactive-outlined-active": "#616161",
    "--color-interactive-outlined-outline-focus": "#8F8F8F",
    "--color-interactive-active": "#616161",
    "--color-interactive-pressable": "#474747",
    "--color-interactive-hover": "#2E2E2E",
    "--color-sharp": "#141414",
    "--color-accent": "#141414",
    "--color-accent-muted": "#616161",
    "--color-on-accent": "#141414",
    "--color-on-accent-muted": "#616161",
    "--color-selection": "#47474740",
    "--color-interactive-accent-contained-bg": "#EBEBEB",
    "--color-interactive-accent-contained-bg-hover": "#F5F5F5",
    "--color-interactive-accent-contained-bg-focus": "#F5F5F5",
    "--color-interactive-accent-contained-bg-active": "#F5F5F5"
  },
  "dark": {
    "--color-translucent": "#1f1e1e55",
    "--color-disabled-sharp": "#A8A8A8",
    "--color-disabled-muted": "#A8A8A8",
    "--color-disabled-interactive": "#C2C2C2",
    "--color-muted": "#C2C2C2",
    "--color-form-bg": "#292929",
    "--color-form-bg-hover": "#292929",
    "--color-form-bg-focus": "#292929",
    "--color-form-bg-active": "#292929",
    "--color-form-bg-disabled": "#333333",
    "--color-form-border-disabled": "#525252",
    "--color-form-placeholder": "#A8A8A8",
    "--color-form-disabled-text": "#C2C2C2",
    "--color-interactive-contained-disabled": "#3D3D3D",
    "--color-interactive-outlined-disabled": "#474747",
    "--color-interactive-accent-contained-bg-disabled": "#3D3D3D",
    "--color-interactive-accent-outlined-disabled": "#474747",
    "--color-screen": "#1F1F1F",
    "--color-surface": "#292929",
    "--color-highlight": "#333333",
    "--color-highlight-accent": "#333333",
    "--color-lowered": "#0F0F0F",
    "--color-screen-gradient-start": "#292929",
    "--color-screen-gradient-middle": "#1F1F1F",
    "--color-screen-gradient-end": "#0F0F0F",
    "--color-border-muted": "#525252",
    "--color-border-sharp": "#A8A8A8",
    "--color-interactive-contained-pressable": "#333333",
    "--color-interactive-contained-hover": "#474747",
    "--color-interactive-contained-focus": "#474747",
    "--color-interactive-contained-active": "#474747",
    "--color-interactive-outlined-pressable": "#525252",
    "--color-interactive-outlined-hover": "#A8A8A8",
    "--color-interactive-outlined-focus": "#A8A8A8",
    "--color-interactive-outlined-active": "#A8A8A8",
    "--color-interactive-outlined-outline-focus": "#525252",
    "--color-interactive-active": "#A8A8A8",
    "--color-interactive-pressable": "#C2C2C2",
    "--color-interactive-hover": "#DBDBDB",
    "--color-sharp": "#F5F5F5",
    "--color-accent": "#F5F5F5",
    "--color-accent-muted": "#C2C2C2",
    "--color-on-accent": "#F5F5F5",
    "--color-on-accent-muted": "#C2C2C2",
    "--color-selection": "#C2C2C240",
    "--color-interactive-accent-contained-bg": "#474747",
    "--color-interactive-accent-contained-bg-hover": "#525252",
    "--color-interactive-accent-contained-bg-focus": "#525252",
    "--color-interactive-accent-contained-bg-active": "#525252"
  },
  "light_brand": {
    "--color-translucent": "#ffffff66",
    "--color-disabled-sharp": "#616161",
    "--color-disabled-muted": "#8F8F8F",
    "--color-disabled-interactive": "#474747",
    "--color-muted": "#474747",
    "--color-form-bg": "#FFFFFF",
    "--color-form-bg-hover": "#FFFFFF",
    "--color-form-bg-focus": "#FFFFFF",
    "--color-form-bg-active": "#FFFFFF",
    "--color-form-bg-disabled": "#E0E0E0",
    "--color-form-border-disabled": "#B8B8B8",
    "--color-form-placeholder": "#616161",
    "--color-form-disabled-text": "#474747",
    "--color-interactive-contained-disabled": "#C7C7C7",
    "--color-interactive-outlined-disabled": "#B8B8B8",
    "--color-interactive-accent-contained-bg-disabled": "#EBEBEB",
    "--color-interactive-accent-outlined-disabled": "#B8B8B8",
    "--color-screen": "#DFF1F6",
    "--color-surface": "#EFF8FB",
    "--color-highlight": "#F7FBFD",
    "--color-highlight-accent": "#C7EEF9",
    "--color-lowered": "#C7EEF9",
    "--color-screen-gradient-start": "#C7EEF9",
    "--color-screen-gradient-middle": "#99DFF5",
    "--color-screen-gradient-end": "#7DD7F2",
    "--color-border-muted": "#23C8FB",
    "--color-border-sharp": "#0493BE",
    "--color-interactive-contained-pressable": "#F7FBFD",
    "--color-interactive-contained-hover": "#C7EEF9",
    "--color-interactive-contained-focus": "#C7EEF9",
    "--color-interactive-contained-active": "#99DFF5",
    "--color-interactive-outlined-pressable": "#23C8FB",
    "--color-interactive-outlined-hover": "#0493BE",
    "--color-interactive-outlined-focus": "#0493BE",
    "--color-interactive-outlined-active": "#0493BE",
    "--color-interactive-outlined-outline-focus": "#23C8FB",
    "--color-interactive-active": "#0493BE",
    "--color-interactive-pressable": "#024D64",
    "--color-interactive-hover": "#012732",
    "--color-sharp": "#011F28",
    "--color-accent": "#024D64",
    "--color-accent-muted": "#0493BE",
    "--color-on-accent": "#024D64",
    "--color-on-accent-muted": "#7DD7F2",
    "--color-selection": "#024D6440",
    "--color-interactive-accent-contained-bg": "#DFF1F6",
    "--color-interactive-accent-contained-bg-hover": "#EFF8FB",
    "--color-interactive-accent-contained-bg-focus": "#EFF8FB",
    "--color-interactive-accent-contained-bg-active": "#EFF8FB"
  },
  "light_info": {
    "--color-translucent": "#ffffff66",
    "--color-disabled-sharp": "#616161",
    "--color-disabled-muted": "#8F8F8F",
    "--color-disabled-interactive": "#474747",
    "--color-muted": "#474747",
    "--color-form-bg": "#FFFFFF",
    "--color-form-bg-hover": "#FFFFFF",
    "--color-form-bg-focus": "#FFFFFF",
    "--color-form-bg-active": "#FFFFFF",
    "--color-form-bg-disabled": "#E0E0E0",
    "--color-form-border-disabled": "#B8B8B8",
    "--color-form-placeholder": "#616161",
    "--color-form-disabled-text": "#474747",
    "--color-interactive-contained-disabled": "#C7C7C7",
    "--color-interactive-outlined-disabled": "#B8B8B8",
    "--color-interactive-accent-contained-bg-disabled": "#EBEBEB",
    "--color-interactive-accent-outlined-disabled": "#B8B8B8",
    "--color-screen": "#DFF0F6",
    "--color-surface": "#EFF8FB",
    "--color-highlight": "#F7FBFD",
    "--color-highlight-accent": "#C7EDF9",
    "--color-lowered": "#C7EDF9",
    "--color-screen-gradient-start": "#C7EDF9",
    "--color-screen-gradient-middle": "#99DEF5",
    "--color-screen-gradient-end": "#7DD5F2",
    "--color-border-muted": "#23C5FB",
    "--color-border-sharp": "#048FBE",
    "--color-interactive-contained-pressable": "#F7FBFD",
    "--color-interactive-contained-hover": "#C7EDF9",
    "--color-interactive-contained-focus": "#C7EDF9",
    "--color-interactive-contained-active": "#99DEF5",
    "--color-interactive-outlined-pressable": "#23C5FB",
    "--color-interactive-outlined-hover": "#048FBE",
    "--color-interactive-outlined-focus": "#048FBE",
    "--color-interactive-outlined-active": "#048FBE",
    "--color-interactive-outlined-outline-focus": "#23C5FB",
    "--color-interactive-active": "#048FBE",
    "--color-interactive-pressable": "#024B64",
    "--color-interactive-hover": "#012632",
    "--color-sharp": "#011E28",
    "--color-accent": "#024B64",
    "--color-accent-muted": "#048FBE",
    "--color-on-accent": "#024B64",
    "--color-on-accent-muted": "#7DD5F2",
    "--color-selection": "#024B6440",
    "--color-interactive-accent-contained-bg": "#DFF0F6",
    "--color-interactive-accent-contained-bg-hover": "#EFF8FB",
    "--color-interactive-accent-contained-bg-focus": "#EFF8FB",
    "--color-interactive-accent-contained-bg-active": "#EFF8FB"
  },
  "light_success": {
    "--color-translucent": "#ffffff66",
    "--color-disabled-sharp": "#616161",
    "--color-disabled-muted": "#8F8F8F",
    "--color-disabled-interactive": "#474747",
    "--color-muted": "#474747",
    "--color-form-bg": "#FFFFFF",
    "--color-form-bg-hover": "#FFFFFF",
    "--color-form-bg-focus": "#FFFFFF",
    "--color-form-bg-active": "#FFFFFF",
    "--color-form-bg-disabled": "#E0E0E0",
    "--color-form-border-disabled": "#B8B8B8",
    "--color-form-placeholder": "#616161",
    "--color-form-disabled-text": "#474747",
    "--color-interactive-contained-disabled": "#C7C7C7",
    "--color-interactive-outlined-disabled": "#B8B8B8",
    "--color-interactive-accent-contained-bg-disabled": "#EBEBEB",
    "--color-interactive-accent-outlined-disabled": "#B8B8B8",
    "--color-screen": "#DFF6DF",
    "--color-surface": "#EFFBEF",
    "--color-highlight": "#F7FDF7",
    "--color-highlight-accent": "#C7F9C7",
    "--color-lowered": "#C7F9C7",
    "--color-screen-gradient-start": "#C7F9C7",
    "--color-screen-gradient-middle": "#99F599",
    "--color-screen-gradient-end": "#7DF27D",
    "--color-border-muted": "#23FB23",
    "--color-border-sharp": "#04BE04",
    "--color-interactive-contained-pressable": "#F7FDF7",
    "--color-interactive-contained-hover": "#C7F9C7",
    "--color-interactive-contained-focus": "#C7F9C7",
    "--color-interactive-contained-active": "#99F599",
    "--color-interactive-outlined-pressable": "#23FB23",
    "--color-interactive-outlined-hover": "#04BE04",
    "--color-interactive-outlined-focus": "#04BE04",
    "--color-interactive-outlined-active": "#04BE04",
    "--color-interactive-outlined-outline-focus": "#23FB23",
    "--color-interactive-active": "#04BE04",
    "--color-interactive-pressable": "#025002",
    "--color-interactive-hover": "#011E01",
    "--color-sharp": "#012801",
    "--color-accent": "#025002",
    "--color-accent-muted": "#04BE04",
    "--color-on-accent": "#025002",
    "--color-on-accent-muted": "#7DF27D",
    "--color-selection": "#02500240",
    "--color-interactive-accent-contained-bg": "#DFF6DF",
    "--color-interactive-accent-contained-bg-hover": "#EFFBEF",
    "--color-interactive-accent-contained-bg-focus": "#EFFBEF",
    "--color-interactive-accent-contained-bg-active": "#EFFBEF"
  },
  "light_warning": {
    "--color-translucent": "#ffffff66",
    "--color-disabled-sharp": "#616161",
    "--color-disabled-muted": "#8F8F8F",
    "--color-disabled-interactive": "#474747",
    "--color-muted": "#474747",
    "--color-form-bg": "#FFFFFF",
    "--color-form-bg-hover": "#FFFFFF",
    "--color-form-bg-focus": "#FFFFFF",
    "--color-form-bg-active": "#FFFFFF",
    "--color-form-bg-disabled": "#E0E0E0",
    "--color-form-border-disabled": "#B8B8B8",
    "--color-form-placeholder": "#616161",
    "--color-form-disabled-text": "#474747",
    "--color-interactive-contained-disabled": "#C7C7C7",
    "--color-interactive-outlined-disabled": "#B8B8B8",
    "--color-interactive-accent-contained-bg-disabled": "#EBEBEB",
    "--color-interactive-accent-outlined-disabled": "#B8B8B8",
    "--color-screen": "#F6EEDF",
    "--color-surface": "#FBF7EF",
    "--color-highlight": "#FDFBF7",
    "--color-highlight-accent": "#F6E1B6",
    "--color-lowered": "#F6E1B6",
    "--color-screen-gradient-start": "#F6E1B6",
    "--color-screen-gradient-middle": "#F0CE89",
    "--color-screen-gradient-end": "#EDC36E",
    "--color-border-muted": "#FAAC0F",
    "--color-border-sharp": "#AA7203",
    "--color-interactive-contained-pressable": "#FDFBF7",
    "--color-interactive-contained-hover": "#F6E1B6",
    "--color-interactive-contained-focus": "#F6E1B6",
    "--color-interactive-contained-active": "#F0CE89",
    "--color-interactive-outlined-pressable": "#FAAC0F",
    "--color-interactive-outlined-hover": "#AA7203",
    "--color-interactive-outlined-focus": "#AA7203",
    "--color-interactive-outlined-active": "#AA7203",
    "--color-interactive-outlined-outline-focus": "#FAAC0F",
    "--color-interactive-active": "#AA7203",
    "--color-interactive-pressable": "#281B01",
    "--color-interactive-hover": "#F6F900",
    "--color-sharp": "#281B01",
    "--color-accent": "#281B01",
    "--color-accent-muted": "#AA7203",
    "--color-on-accent": "#281B01",
    "--color-on-accent-muted": "#EDC36E",
    "--color-selection": "#281B0140",
    "--color-interactive-accent-contained-bg": "#F6EEDF",
    "--color-interactive-accent-contained-bg-hover": "#FBF7EF",
    "--color-interactive-accent-contained-bg-focus": "#FBF7EF",
    "--color-interactive-accent-contained-bg-active": "#FBF7EF"
  },
  "light_danger": {
    "--color-translucent": "#ffffff66",
    "--color-disabled-sharp": "#616161",
    "--color-disabled-muted": "#8F8F8F",
    "--color-disabled-interactive": "#474747",
    "--color-muted": "#474747",
    "--color-form-bg": "#FFFFFF",
    "--color-form-bg-hover": "#FFFFFF",
    "--color-form-bg-focus": "#FFFFFF",
    "--color-form-bg-active": "#FFFFFF",
    "--color-form-bg-disabled": "#E0E0E0",
    "--color-form-border-disabled": "#B8B8B8",
    "--color-form-placeholder": "#616161",
    "--color-form-disabled-text": "#474747",
    "--color-interactive-contained-disabled": "#C7C7C7",
    "--color-interactive-outlined-disabled": "#B8B8B8",
    "--color-interactive-accent-contained-bg-disabled": "#EBEBEB",
    "--color-interactive-accent-outlined-disabled": "#B8B8B8",
    "--color-screen": "#F6E0DF",
    "--color-surface": "#FBEFEF",
    "--color-highlight": "#FDF7F7",
    "--color-highlight-accent": "#FBD2D0",
    "--color-lowered": "#FBD2D0",
    "--color-screen-gradient-start": "#FBD2D0",
    "--color-screen-gradient-middle": "#F7A4A1",
    "--color-screen-gradient-end": "#F48985",
    "--color-border-muted": "#FB342D",
    "--color-border-sharp": "#C80B04",
    "--color-interactive-contained-pressable": "#FDF7F7",
    "--color-interactive-contained-hover": "#FBD2D0",
    "--color-interactive-contained-focus": "#FBD2D0",
    "--color-interactive-contained-active": "#F7A4A1",
    "--color-interactive-outlined-pressable": "#FB342D",
    "--color-interactive-outlined-hover": "#C80B04",
    "--color-interactive-outlined-focus": "#C80B04",
    "--color-interactive-outlined-active": "#C80B04",
    "--color-interactive-outlined-outline-focus": "#FB342D",
    "--color-interactive-active": "#C80B04",
    "--color-interactive-pressable": "#6E0602",
    "--color-interactive-hover": "#3C0301",
    "--color-sharp": "#280201",
    "--color-accent": "#6E0602",
    "--color-accent-muted": "#C80B04",
    "--color-on-accent": "#6E0602",
    "--color-on-accent-muted": "#F48985",
    "--color-selection": "#6E060240",
    "--color-interactive-accent-contained-bg": "#F6E0DF",
    "--color-interactive-accent-contained-bg-hover": "#FBEFEF",
    "--color-interactive-accent-contained-bg-focus": "#FBEFEF",
    "--color-interactive-accent-contained-bg-active": "#FBEFEF"
  },
  "dark_brand": {
    "--color-translucent": "#1f1e1e55",
    "--color-disabled-sharp": "#A8A8A8",
    "--color-disabled-muted": "#A8A8A8",
    "--color-disabled-interactive": "#C2C2C2",
    "--color-muted": "#C2C2C2",
    "--color-form-bg": "#292929",
    "--color-form-bg-hover": "#292929",
    "--color-form-bg-focus": "#292929",
    "--color-form-bg-active": "#292929",
    "--color-form-bg-disabled": "#333333",
    "--color-form-border-disabled": "#525252",
    "--color-form-placeholder": "#A8A8A8",
    "--color-form-disabled-text": "#C2C2C2",
    "--color-interactive-contained-disabled": "#3D3D3D",
    "--color-interactive-outlined-disabled": "#474747",
    "--color-interactive-accent-contained-bg-disabled": "#3D3D3D",
    "--color-interactive-accent-outlined-disabled": "#474747",
    "--color-screen": "#0D2830",
    "--color-surface": "#123540",
    "--color-highlight": "#104E60",
    "--color-highlight-accent": "#104E60",
    "--color-lowered": "#071418",
    "--color-screen-gradient-start": "#123540",
    "--color-screen-gradient-middle": "#0D2830",
    "--color-screen-gradient-end": "#071418",
    "--color-border-muted": "#1E94B8",
    "--color-border-sharp": "#5CD1F5",
    "--color-interactive-contained-pressable": "#104E60",
    "--color-interactive-contained-hover": "#156A84",
    "--color-interactive-contained-focus": "#156A84",
    "--color-interactive-contained-active": "#156A84",
    "--color-interactive-outlined-pressable": "#1E94B8",
    "--color-interactive-outlined-hover": "#5CD1F5",
    "--color-interactive-outlined-focus": "#5CD1F5",
    "--color-interactive-outlined-active": "#5CD1F5",
    "--color-interactive-outlined-outline-focus": "#1E94B8",
    "--color-interactive-active": "#5CD1F5",
    "--color-interactive-pressable": "#8CDFF8",
    "--color-interactive-hover": "#BCECFB",
    "--color-sharp": "#D9F4FD",
    "--color-accent": "#8CDFF8",
    "--color-accent-muted": "#8CDFF8",
    "--color-on-accent": "#D9F4FD",
    "--color-on-accent-muted": "#8CDFF8",
    "--color-selection": "#8CDFF840",
    "--color-interactive-accent-contained-bg": "#156A84",
    "--color-interactive-accent-contained-bg-hover": "#1E94B8",
    "--color-interactive-accent-contained-bg-focus": "#1E94B8",
    "--color-interactive-accent-contained-bg-active": "#1E94B8"
  },
  "dark_info": {
    "--color-translucent": "#1f1e1e55",
    "--color-disabled-sharp": "#A8A8A8",
    "--color-disabled-muted": "#A8A8A8",
    "--color-disabled-interactive": "#C2C2C2",
    "--color-muted": "#C2C2C2",
    "--color-form-bg": "#292929",
    "--color-form-bg-hover": "#292929",
    "--color-form-bg-focus": "#292929",
    "--color-form-bg-active": "#292929",
    "--color-form-bg-disabled": "#333333",
    "--color-form-border-disabled": "#525252",
    "--color-form-placeholder": "#A8A8A8",
    "--color-form-disabled-text": "#C2C2C2",
    "--color-interactive-contained-disabled": "#3D3D3D",
    "--color-interactive-outlined-disabled": "#474747",
    "--color-interactive-accent-contained-bg-disabled": "#3D3D3D",
    "--color-interactive-accent-outlined-disabled": "#474747",
    "--color-screen": "#0D2730",
    "--color-surface": "#123440",
    "--color-highlight": "#104C60",
    "--color-highlight-accent": "#104C60",
    "--color-lowered": "#071418",
    "--color-screen-gradient-start": "#123440",
    "--color-screen-gradient-middle": "#0D2730",
    "--color-screen-gradient-end": "#071418",
    "--color-border-muted": "#1E92B8",
    "--color-border-sharp": "#5CCEF5",
    "--color-interactive-contained-pressable": "#104C60",
    "--color-interactive-contained-hover": "#156884",
    "--color-interactive-contained-focus": "#156884",
    "--color-interactive-contained-active": "#156884",
    "--color-interactive-outlined-pressable": "#1E92B8",
    "--color-interactive-outlined-hover": "#5CCEF5",
    "--color-interactive-outlined-focus": "#5CCEF5",
    "--color-interactive-outlined-active": "#5CCEF5",
    "--color-interactive-outlined-outline-focus": "#1E92B8",
    "--color-interactive-active": "#5CCEF5",
    "--color-interactive-pressable": "#8CDDF8",
    "--color-interactive-hover": "#BCEBFB",
    "--color-sharp": "#D9F4FD",
    "--color-accent": "#8CDDF8",
    "--color-accent-muted": "#8CDDF8",
    "--color-on-accent": "#D9F4FD",
    "--color-on-accent-muted": "#8CDDF8",
    "--color-selection": "#8CDDF840",
    "--color-interactive-accent-contained-bg": "#156884",
    "--color-interactive-accent-contained-bg-hover": "#1E92B8",
    "--color-interactive-accent-contained-bg-focus": "#1E92B8",
    "--color-interactive-accent-contained-bg-active": "#1E92B8"
  },
  "dark_success": {
    "--color-translucent": "#1f1e1e55",
    "--color-disabled-sharp": "#A8A8A8",
    "--color-disabled-muted": "#A8A8A8",
    "--color-disabled-interactive": "#C2C2C2",
    "--color-muted": "#C2C2C2",
    "--color-form-bg": "#292929",
    "--color-form-bg-hover": "#292929",
    "--color-form-bg-focus": "#292929",
    "--color-form-bg-active": "#292929",
    "--color-form-bg-disabled": "#333333",
    "--color-form-border-disabled": "#525252",
    "--color-form-placeholder": "#A8A8A8",
    "--color-form-disabled-text": "#C2C2C2",
    "--color-interactive-contained-disabled": "#3D3D3D",
    "--color-interactive-outlined-disabled": "#474747",
    "--color-interactive-accent-contained-bg-disabled": "#3D3D3D",
    "--color-interactive-accent-outlined-disabled": "#474747",
    "--color-screen": "#0D300D",
    "--color-surface": "#124012",
    "--color-highlight": "#106010",
    "--color-highlight-accent": "#106010",
    "--color-lowered": "#071807",
    "--color-screen-gradient-start": "#124012",
    "--color-screen-gradient-middle": "#0D300D",
    "--color-screen-gradient-end": "#071807",
    "--color-border-muted": "#1EB81E",
    "--color-border-sharp": "#5CF55C",
    "--color-interactive-contained-pressable": "#106010",
    "--color-interactive-contained-hover": "#158415",
    "--color-interactive-contained-focus": "#158415",
    "--color-interactive-contained-active": "#158415",
    "--color-interactive-outlined-pressable": "#1EB81E",
    "--color-interactive-outlined-hover": "#5CF55C",
    "--color-interactive-outlined-focus": "#5CF55C",
    "--color-interactive-outlined-active": "#5CF55C",
    "--color-interactive-outlined-outline-focus": "#1EB81E",
    "--color-interactive-active": "#5CF55C",
    "--color-interactive-pressable": "#8CF88C",
    "--color-interactive-hover": "#BCFBBC",
    "--color-sharp": "#D9FDD9",
    "--color-accent": "#8CF88C",
    "--color-accent-muted": "#8CF88C",
    "--color-on-accent": "#D9FDD9",
    "--color-on-accent-muted": "#8CF88C",
    "--color-selection": "#8CF88C40",
    "--color-interactive-accent-contained-bg": "#158415",
    "--color-interactive-accent-contained-bg-hover": "#1EB81E",
    "--color-interactive-accent-contained-bg-focus": "#1EB81E",
    "--color-interactive-accent-contained-bg-active": "#1EB81E"
  },
  "dark_warning": {
    "--color-translucent": "#1f1e1e55",
    "--color-disabled-sharp": "#A8A8A8",
    "--color-disabled-muted": "#A8A8A8",
    "--color-disabled-interactive": "#C2C2C2",
    "--color-muted": "#C2C2C2",
    "--color-form-bg": "#292929",
    "--color-form-bg-hover": "#292929",
    "--color-form-bg-focus": "#292929",
    "--color-form-bg-active": "#292929",
    "--color-form-bg-disabled": "#333333",
    "--color-form-border-disabled": "#525252",
    "--color-form-placeholder": "#A8A8A8",
    "--color-form-disabled-text": "#C2C2C2",
    "--color-interactive-contained-disabled": "#3D3D3D",
    "--color-interactive-outlined-disabled": "#474747",
    "--color-interactive-accent-contained-bg-disabled": "#3D3D3D",
    "--color-interactive-accent-outlined-disabled": "#474747",
    "--color-screen": "#30240D",
    "--color-surface": "#403012",
    "--color-highlight": "#4F390D",
    "--color-highlight-accent": "#4F390D",
    "--color-lowered": "#181207",
    "--color-screen-gradient-start": "#403012",
    "--color-screen-gradient-middle": "#30240D",
    "--color-screen-gradient-end": "#181207",
    "--color-border-muted": "#A7781B",
    "--color-border-sharp": "#F3BB49",
    "--color-interactive-contained-pressable": "#4F390D",
    "--color-interactive-contained-hover": "#725213",
    "--color-interactive-contained-focus": "#725213",
    "--color-interactive-contained-active": "#725213",
    "--color-interactive-outlined-pressable": "#A7781B",
    "--color-interactive-outlined-hover": "#F3BB49",
    "--color-interactive-outlined-focus": "#F3BB49",
    "--color-interactive-outlined-active": "#F3BB49",
    "--color-interactive-outlined-outline-focus": "#A7781B",
    "--color-interactive-active": "#F3BB49",
    "--color-interactive-pressable": "#F6CD79",
    "--color-interactive-hover": "#F9DFA9",
    "--color-sharp": "#FDF1D9",
    "--color-accent": "#F6CD79",
    "--color-accent-muted": "#F6CD79",
    "--color-on-accent": "#FDF1D9",
    "--color-on-accent-muted": "#F6CD79",
    "--color-selection": "#F6CD7940",
    "--color-interactive-accent-contained-bg": "#725213",
    "--color-interactive-accent-contained-bg-hover": "#A7781B",
    "--color-interactive-accent-contained-bg-focus": "#A7781B",
    "--color-interactive-accent-contained-bg-active": "#A7781B"
  },
  "dark_danger": {
    "--color-translucent": "#1f1e1e55",
    "--color-disabled-sharp": "#A8A8A8",
    "--color-disabled-muted": "#A8A8A8",
    "--color-disabled-interactive": "#C2C2C2",
    "--color-muted": "#C2C2C2",
    "--color-form-bg": "#292929",
    "--color-form-bg-hover": "#292929",
    "--color-form-bg-focus": "#292929",
    "--color-form-bg-active": "#292929",
    "--color-form-bg-disabled": "#333333",
    "--color-form-border-disabled": "#525252",
    "--color-form-placeholder": "#A8A8A8",
    "--color-form-disabled-text": "#C2C2C2",
    "--color-interactive-contained-disabled": "#3D3D3D",
    "--color-interactive-outlined-disabled": "#474747",
    "--color-interactive-accent-contained-bg-disabled": "#3D3D3D",
    "--color-interactive-accent-outlined-disabled": "#474747",
    "--color-screen": "#300F0D",
    "--color-surface": "#401312",
    "--color-highlight": "#691411",
    "--color-highlight-accent": "#691411",
    "--color-lowered": "#180707",
    "--color-screen-gradient-start": "#401312",
    "--color-screen-gradient-middle": "#300F0D",
    "--color-screen-gradient-end": "#180707",
    "--color-border-muted": "#C1251F",
    "--color-border-sharp": "#F56A66",
    "--color-interactive-contained-pressable": "#691411",
    "--color-interactive-contained-hover": "#8C1B17",
    "--color-interactive-contained-focus": "#8C1B17",
    "--color-interactive-contained-active": "#8C1B17",
    "--color-interactive-outlined-pressable": "#C1251F",
    "--color-interactive-outlined-hover": "#F56A66",
    "--color-interactive-outlined-focus": "#F56A66",
    "--color-interactive-outlined-active": "#F56A66",
    "--color-interactive-outlined-outline-focus": "#C1251F",
    "--color-interactive-active": "#F56A66",
    "--color-interactive-pressable": "#F89996",
    "--color-interactive-hover": "#FBC7C5",
    "--color-sharp": "#FDDAD9",
    "--color-accent": "#F89996",
    "--color-accent-muted": "#F89996",
    "--color-on-accent": "#FDDAD9",
    "--color-on-accent-muted": "#F89996",
    "--color-selection": "#F8999640",
    "--color-interactive-accent-contained-bg": "#8C1B17",
    "--color-interactive-accent-contained-bg-hover": "#C1251F",
    "--color-interactive-accent-contained-bg-focus": "#C1251F",
    "--color-interactive-accent-contained-bg-active": "#C1251F"
  }
};

function ScopedTheme({ theme, children }) {
  return /* @__PURE__ */ jsxRuntime.jsx(ThemeContext.Provider, { value: theme, children: /* @__PURE__ */ jsxRuntime.jsx(nativewind.VariableContextProvider, { value: themeVariables[theme], children }) });
}

function AlouetteProvider({
  children
}) {
  const colorScheme = reactNative.useColorScheme();
  return /* @__PURE__ */ jsxRuntime.jsx(ScopedTheme, { theme: colorScheme === "dark" ? "dark" : "light", children });
}

const AlouetteDecorator = (storyFn, context) => {
  const theme = context.globals.backgrounds?.value === "#000000" ? "dark" : "light";
  return /* @__PURE__ */ jsxRuntime.jsx(reactNativeSafeAreaContext.SafeAreaProvider, { children: /* @__PURE__ */ jsxRuntime.jsx(AlouetteProvider, { children: /* @__PURE__ */ jsxRuntime.jsx(ScopedTheme, { theme, children: storyFn(context) }) }) });
};

function useThemeToken(tokenOrTokens) {
  const theme = react.useContext(ThemeContext);
  const vars = themeVariables[theme];
  if (Array.isArray(tokenOrTokens)) {
    return tokenOrTokens.map((token) => vars[token]);
  }
  return vars[tokenOrTokens];
}

const View = react.forwardRef((props, ref) => {
  return /* @__PURE__ */ jsxRuntime.jsx(reactNative.View, { ref, ...props });
});

function AccentScope({
  mode: forcedMode,
  accent,
  children
}) {
  const currentMode = useCurrentMode();
  if (!accent) {
    return children;
  }
  const mode = forcedMode ?? currentMode;
  return /* @__PURE__ */ jsxRuntime.jsx(ScopedTheme, { theme: `${mode}_${accent}`, children });
}

const twMerge = tailwindMerge.extendTailwindMerge({
  extend: {
    classGroups: {
      "font-family": [
        "font-body",
        "font-body-bold",
        "font-body-extrabold",
        "font-heading",
        "font-heading-bold",
        "font-heading-extrabold",
        "font-mono",
        "font-mono-bold",
        "font-mono-extrabold"
      ]
    }
  }
});
const Text = react.forwardRef(
  ({ className, accent, ...props }, ref) => {
    return /* @__PURE__ */ jsxRuntime.jsx(AccentScope, { accent, children: /* @__PURE__ */ jsxRuntime.jsx(
      reactNative.Text,
      {
        ref,
        className: twMerge("font-body text-sharp", className),
        ...props
      }
    ) });
  }
);
const Paragraph = react.forwardRef(
  ({ className, ...props }, ref) => {
    return /* @__PURE__ */ jsxRuntime.jsx(
      Text,
      {
        ref,
        role: "paragraph",
        className: `select-auto ${className ?? ""}`,
        ...props
      }
    );
  }
);

const ScrollView = react.forwardRef(
  (props, ref) => {
    return /* @__PURE__ */ jsxRuntime.jsx(reactNative.ScrollView, { ref, ...props });
  }
);

const Stack = react.forwardRef(
  ({ className, ...props }, ref) => {
    return /* @__PURE__ */ jsxRuntime.jsx(
      reactNative.View,
      {
        ref,
        className: `flex-row flex-wrap ${className ?? ""}`,
        ...props
      }
    );
  }
);
const HStack = react.forwardRef(
  ({ className, ...props }, ref) => {
    return /* @__PURE__ */ jsxRuntime.jsx(reactNative.View, { ref, className: `flex-row ${className ?? ""}`, ...props });
  }
);
const VStack = react.forwardRef(
  ({ className, ...props }, ref) => {
    return /* @__PURE__ */ jsxRuntime.jsx(reactNative.View, { ref, className: `flex-col ${className ?? ""}`, ...props });
  }
);

const separatorVariants = tailwindVariants.tv({
  base: "border-border-sharp",
  variants: {
    vertical: {
      true: "self-stretch border-r w-px",
      false: "self-stretch border-b h-px"
    }
  },
  defaultVariants: {
    vertical: false
  }
});
const Separator = react.forwardRef(
  ({ className, vertical, ...props }, ref) => {
    return /* @__PURE__ */ jsxRuntime.jsx(
      reactNative.View,
      {
        ref,
        className: separatorVariants({ vertical, className }),
        ...props
      }
    );
  }
);

const boxBaseClasses = "shrink";
const Box = react.forwardRef(
  ({ className, accent, ...props }, ref) => {
    return /* @__PURE__ */ jsxRuntime.jsx(AccentScope, { accent, children: /* @__PURE__ */ jsxRuntime.jsx(
      reactNative.View,
      {
        ref,
        className: `${boxBaseClasses} ${className ?? ""}`,
        ...props
      }
    ) });
  }
);
const interactiveBoxVariants = tailwindVariants.tv({
  base: [
    boxBaseClasses,
    "cursor-pointer",
    "transition-[transform,background-color,border-color] duration-200 ease-in",
    "disabled:cursor-not-allowed disabled:opacity-70",
    "active:scale-[0.975]"
  ].join(" "),
  variants: {
    withFocusVisibleOutline: {
      true: "focus-visible:outline-2 focus-visible:outline-offset-2"
    }
  }
});
const InteractiveBox = react.forwardRef(
  ({ withFocusVisibleOutline, className, ...rest }, ref) => /* @__PURE__ */ jsxRuntime.jsx(
    reactNative.Pressable,
    {
      ref,
      pointerEvents: "auto",
      ...rest,
      className: interactiveBoxVariants({ withFocusVisibleOutline, className })
    }
  )
);
const SafeAreaBox = react.forwardRef(
  (props, ref) => {
    const insets = reactNativeSafeAreaContext.useSafeAreaInsets();
    return /* @__PURE__ */ jsxRuntime.jsx(
      Box,
      {
        ref,
        style: {
          paddingTop: insets.top,
          paddingBottom: insets.bottom,
          paddingLeft: insets.left,
          paddingRight: insets.right
        },
        ...props
      }
    );
  }
);

const surfaceVariants = tailwindVariants.tv(
  {
    // overflow-hidden so the multi-layer shadow respects the rounded corners.
    base: "overflow-hidden",
    variants: {
      size: {
        sm: "p-m rounded-xs",
        md: "p-xl rounded-sm",
        lg: "p-xxl rounded-md"
      },
      variant: {
        surface: "bg-surface",
        highlight: "bg-highlight",
        "highlight-accent": "bg-highlight-accent",
        lowered: "bg-lowered",
        translucent: "bg-translucent"
      },
      shadow: {
        none: "shadow-none",
        s: "shadow-s",
        m: "shadow-m",
        l: "shadow-l",
        lowered: "shadow-lowered"
      }
    },
    defaultVariants: {
      size: "md",
      variant: "surface"
    }
  },
  { twMerge: false }
);
const Surface = react.forwardRef(
  ({ className, size, variant, shadow, accent, ...props }, ref) => {
    const resolvedShadow = shadow ?? (variant === "lowered" ? "lowered" : "s");
    return /* @__PURE__ */ jsxRuntime.jsx(AccentScope, { accent, children: /* @__PURE__ */ jsxRuntime.jsx(
      Box,
      {
        ref,
        className: surfaceVariants({
          size,
          variant,
          shadow: resolvedShadow,
          className
        }),
        ...props
      }
    ) });
  }
);

function styled(Component, defaultClassName) {
  function StyledComponent({ className, ...props }) {
    return /* @__PURE__ */ jsxRuntime.jsx(
      Component,
      {
        className: tailwindMerge.twMerge(defaultClassName, className),
        ...props
      }
    );
  }
  StyledComponent.displayName = `Styled(${Component.displayName ?? Component.name ?? "Component"})`;
  StyledComponent.__isStyledComponent = true;
  return StyledComponent;
}

const storyTitleVariants = tailwindVariants.tv({
  base: "font-heading-extrabold text-sharp",
  variants: {
    level: {
      1: "text-4xl mb-xl",
      2: "text-3xl mb-xl",
      3: "text-2xl mb-m",
      4: "text-xl mb-m"
    }
  },
  defaultVariants: {
    level: 1
  }
});
const StoryTitle = react.forwardRef(
  ({ className, level, ...props }, ref) => {
    return /* @__PURE__ */ jsxRuntime.jsx(
      Text,
      {
        ref,
        className: storyTitleVariants({ level, className }),
        ...props
      }
    );
  }
);

const InternalStorySection = styled(View, "-mx-l px-l");
function StorySection({
  title,
  children,
  level = 1,
  modeTheme,
  accent,
  withSurface = false
}) {
  const content = /* @__PURE__ */ jsxRuntime.jsx(InternalStorySection, { className: "pb-xl bg-screen", children: withSurface ? /* @__PURE__ */ jsxRuntime.jsxs(Surface, { children: [
    /* @__PURE__ */ jsxRuntime.jsx(StoryTitle, { level: level + 1, children: title }),
    /* @__PURE__ */ jsxRuntime.jsx(VStack, { className: "gap-m", children })
  ] }) : /* @__PURE__ */ jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [
    /* @__PURE__ */ jsxRuntime.jsx(StoryTitle, { level: level + 1, children: title }),
    /* @__PURE__ */ jsxRuntime.jsx(VStack, { className: "gap-m", children })
  ] }) });
  if (modeTheme) {
    return /* @__PURE__ */ jsxRuntime.jsx(ScopedTheme, { theme: modeTheme, children: content });
  }
  if (accent) {
    return /* @__PURE__ */ jsxRuntime.jsx(AccentScope, { accent, children: content });
  }
  return content;
}
function StorySubSection({
  title,
  children,
  modeTheme,
  accent,
  withSurface = false
}) {
  const content = /* @__PURE__ */ jsxRuntime.jsx(InternalStorySection, { className: "mb-m", children: withSurface ? /* @__PURE__ */ jsxRuntime.jsxs(Surface, { children: [
    /* @__PURE__ */ jsxRuntime.jsx(StoryTitle, { level: 3, children: title }),
    /* @__PURE__ */ jsxRuntime.jsx(VStack, { className: "gap-m", children })
  ] }) : /* @__PURE__ */ jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [
    /* @__PURE__ */ jsxRuntime.jsx(StoryTitle, { level: 3, children: title }),
    /* @__PURE__ */ jsxRuntime.jsx(VStack, { className: "gap-m", children })
  ] }) });
  if (modeTheme) {
    return /* @__PURE__ */ jsxRuntime.jsx(ScopedTheme, { theme: modeTheme, children: content });
  }
  if (accent) {
    return /* @__PURE__ */ jsxRuntime.jsx(AccentScope, { accent, children: content });
  }
  return content;
}
const ScrollWrapper = reactNative.Platform.OS === "web" ? react.Fragment : ScrollView;
function Story({
  documentation,
  children,
  noDarkMode
}) {
  return /* @__PURE__ */ jsxRuntime.jsxs(ScrollWrapper, { children: [
    documentation && /* @__PURE__ */ jsxRuntime.jsx(Surface, { accent: "info", className: "mb-xxl", children: documentation }),
    ["light", ...noDarkMode ? [] : ["dark"]].map(
      (mode) => /* @__PURE__ */ jsxRuntime.jsx(ScopedTheme, { theme: mode, children: /* @__PURE__ */ jsxRuntime.jsx(View, { className: "bg-screen p-l", children }) }, mode)
    )
  ] });
}
Story.Section = StorySection;
Story.SubSection = StorySubSection;

function StoryContainer({
  title,
  children
}) {
  return /* @__PURE__ */ jsxRuntime.jsx(ScopedTheme, { theme: "light", children: /* @__PURE__ */ jsxRuntime.jsxs(ScrollView, { className: "bg-white p-3xl", children: [
    /* @__PURE__ */ jsxRuntime.jsx(StoryTitle, { level: 1, children: title }),
    children
  ] }) });
}

const StoryDecorator = (storyFn, { name, parameters }) => {
  if (parameters?.container === false) return storyFn();
  return /* @__PURE__ */ jsxRuntime.jsx(StoryContainer, { title: name, children: storyFn() });
};

const rowVariants = tailwindVariants.tv(
  {
    base: "flex-col",
    variants: {
      breakpoint: {
        small: "sm:flex-row sm:mb-xl",
        medium: "md:flex-row md:mb-xl"
      },
      flexWrap: { true: "" }
    },
    compoundVariants: [
      { breakpoint: "small", flexWrap: true, class: "sm:flex-wrap sm:gap-m" },
      { breakpoint: "medium", flexWrap: true, class: "md:flex-wrap md:gap-m" }
    ]
  },
  { twMerge: false }
);
const itemVariants = tailwindVariants.tv(
  {
    base: "pt-m pb-xl",
    variants: {
      breakpoint: {
        small: "sm:pt-0 sm:pb-0 sm:my-xxs shrink",
        medium: "md:pt-0 md:pb-0 md:my-xxs shrink"
      },
      flexWrap: {
        true: "",
        false: ""
      },
      loose: {
        true: "",
        false: "grow"
      }
    },
    compoundVariants: [
      { breakpoint: "small", flexWrap: false, class: "sm:basis-0" },
      { breakpoint: "medium", flexWrap: false, class: "md:basis-0" }
    ],
    defaultVariants: {
      flexWrap: false
    }
  },
  { twMerge: false }
);
function StoryGridRow({
  children,
  breakpoint = "small",
  flexWrap,
  loose
}) {
  return /* @__PURE__ */ jsxRuntime.jsx(View, { className: rowVariants({ breakpoint, flexWrap }), children: react.Children.map(children, (child) => /* @__PURE__ */ jsxRuntime.jsx(View, { className: itemVariants({ breakpoint, flexWrap, loose }), children: child })) });
}
function StoryGridCol({
  title,
  children,
  platform = "all"
}) {
  const isNative = reactNative.Platform.OS === "ios" || reactNative.Platform.OS === "android";
  if (reactNative.Platform.OS === "web" && platform === "native") {
    return null;
  }
  if (isNative && platform === "web") {
    return null;
  }
  return title ? /* @__PURE__ */ jsxRuntime.jsxs(VStack, { children: [
    /* @__PURE__ */ jsxRuntime.jsx(StoryTitle, { level: 4, numberOfLines: 1, children: title }),
    children
  ] }) : children;
}
const StoryGrid = {
  Row: StoryGridRow,
  Col: StoryGridCol
};

function joinClasses(...classes) {
  return classes.filter(Boolean).join(" ");
}
function usePresence(activeKey, exitDurationMs, children) {
  const [exiting, setExiting] = react.useState([]);
  const previousRef = react.useRef({ key: activeKey, node: children });
  const childrenRef = react.useRef(children);
  childrenRef.current = children;
  const timersRef = react.useRef([]);
  react.useEffect(
    () => () => {
      timersRef.current.forEach(clearTimeout);
    },
    []
  );
  react.useEffect(() => {
    const previous = previousRef.current;
    if (previous.key === activeKey) {
      return;
    }
    previousRef.current = { key: activeKey, node: childrenRef.current };
    setExiting((list) => [...list, previous]);
    const timer = setTimeout(() => {
      setExiting((list) => list.filter((item) => item !== previous));
      timersRef.current = timersRef.current.filter((t) => t !== timer);
    }, exitDurationMs);
    timersRef.current.push(timer);
  }, [activeKey, exitDurationMs]);
  return exiting;
}
function toItems(children) {
  return react.Children.toArray(children).filter(react.isValidElement).map((child) => ({ key: child.key, node: child }));
}
function mergeKeys(previous, next) {
  const nextSet = new Set(next);
  const pendingByNext = /* @__PURE__ */ new Map();
  let pending = [];
  for (const key of previous) {
    if (nextSet.has(key)) {
      if (pending.length > 0) {
        pendingByNext.set(key, pending);
        pending = [];
      }
    } else {
      pending.push(key);
    }
  }
  const result = [];
  for (const key of next) {
    const before = pendingByNext.get(key);
    if (before) {
      result.push(...before);
    }
    result.push(key);
  }
  result.push(...pending);
  return result;
}
function usePresenceList(children, exitDurationMs) {
  const items = toItems(children);
  const liveKeys = items.map((item) => item.key);
  const signature = liveKeys.join("\0");
  const nodesRef = react.useRef(/* @__PURE__ */ new Map());
  for (const item of items) {
    nodesRef.current.set(item.key, item.node);
  }
  const liveKeysRef = react.useRef(liveKeys);
  liveKeysRef.current = liveKeys;
  const [order, setOrder] = react.useState(liveKeys);
  const orderRef = react.useRef(order);
  orderRef.current = order;
  const timersRef = react.useRef(/* @__PURE__ */ new Map());
  react.useEffect(
    () => () => {
      timersRef.current.forEach(clearTimeout);
    },
    []
  );
  react.useEffect(() => {
    const live2 = new Set(liveKeysRef.current);
    const newOrder = mergeKeys(orderRef.current, liveKeysRef.current);
    for (const key of liveKeysRef.current) {
      const timer = timersRef.current.get(key);
      if (timer) {
        clearTimeout(timer);
        timersRef.current.delete(key);
      }
    }
    for (const key of newOrder) {
      if (!live2.has(key) && !timersRef.current.has(key)) {
        const timer = setTimeout(() => {
          timersRef.current.delete(key);
          nodesRef.current.delete(key);
          setOrder((current) => current.filter((k) => k !== key));
        }, exitDurationMs);
        timersRef.current.set(key, timer);
      }
    }
    setOrder(newOrder);
  }, [signature, exitDurationMs]);
  const live = new Set(liveKeys);
  return order.map((key) => ({
    key,
    node: nodesRef.current.get(key),
    exiting: !live.has(key)
  }));
}
function PresenceList({
  exitDurationMs,
  enterClassName,
  exitClassName,
  className,
  children
}) {
  const items = usePresenceList(children, exitDurationMs);
  return /* @__PURE__ */ jsxRuntime.jsx(jsxRuntime.Fragment, { children: items.map((item) => /* @__PURE__ */ jsxRuntime.jsx(
    View,
    {
      className: joinClasses(
        className,
        item.exiting ? exitClassName : enterClassName
      ),
      children: item.node
    },
    item.key
  )) });
}
function PresenceOne({
  activeKey,
  exitDurationMs,
  enterClassName,
  exitClassName,
  className,
  children
}) {
  const exiting = usePresence(activeKey, exitDurationMs, children);
  return /* @__PURE__ */ jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [
    exiting.map((item) => {
      const node = item.node;
      return react.cloneElement(node, {
        key: item.key,
        className: joinClasses(
          node.props.className,
          className,
          exitClassName
        )
      });
    }),
    react.cloneElement(children, {
      key: activeKey,
      className: joinClasses(
        children.props.className,
        className,
        enterClassName
      )
    })
  ] });
}

const animationDurationsMs = {
  "slide": 600,
  "collapse": 800
};

function Icon({
  icon,
  size = 20,
  className = "text-sharp"
}) {
  const token = className.split(/\s+/).find((part) => part.startsWith("text-"))?.slice("text-".length);
  const color = useThemeToken(`--color-${token ?? "sharp"}`);
  return react.cloneElement(icon, {
    color,
    width: size,
    height: size
  });
}

const pressableBoxVariants = tailwindVariants.tv(
  {
    extend: interactiveBoxVariants,
    base: "overflow-hidden",
    variants: {
      variant: {
        contained: [
          "rounded-sm",
          process.env.EXPO_PUBLIC_STORYBOOK_ENABLED ? "" : "shadow-s bg-interactive-contained-pressable",
          "hover:bg-interactive-contained-hover",
          "focus:bg-interactive-contained-focus",
          "active:bg-interactive-contained-active",
          "disabled:bg-interactive-contained-disabled disabled:shadow-none",
          "focus-visible:outline-border-muted"
        ].join(" "),
        outlined: [
          "border",
          process.env.EXPO_PUBLIC_STORYBOOK_ENABLED ? "" : "border-interactive-outlined-pressable",
          "hover:border-interactive-outlined-hover",
          "focus:border-interactive-outlined-focus",
          "active:border-interactive-outlined-active",
          "disabled:border-interactive-outlined-disabled",
          "focus-visible:outline-interactive-outlined-outline-focus"
        ].join(" ")
      },
      ghost: {
        true: "bg-transparent border-transparent shadow-none"
      },
      forceStyle: {
        hover: "",
        focus: "",
        press: "scale-[0.975]"
      }
    },
    compoundVariants: process.env.EXPO_PUBLIC_STORYBOOK_ENABLED ? [
      /* contained */
      {
        variant: "contained",
        forceStyle: void 0,
        ghost: false,
        className: "shadow-s bg-interactive-contained-pressable"
      },
      {
        variant: "contained",
        forceStyle: "hover",
        className: "shadow-s bg-interactive-contained-hover"
      },
      {
        variant: "contained",
        forceStyle: "focus",
        className: "shadow-s bg-interactive-contained-focus"
      },
      {
        variant: "contained",
        forceStyle: "press",
        className: "shadow-s bg-interactive-contained-active"
      },
      /* outlined */
      {
        variant: "outlined",
        forceStyle: void 0,
        ghost: false,
        className: "border-interactive-outlined-pressable"
      },
      {
        variant: "outlined",
        forceStyle: "hover",
        className: "border-interactive-outlined-hover"
      },
      {
        variant: "outlined",
        forceStyle: "focus",
        className: "border-interactive-outlined-focus"
      },
      {
        variant: "outlined",
        forceStyle: "press",
        className: "border-interactive-outlined-active"
      }
    ] : void 0,
    defaultVariants: {
      variant: "contained"
    }
  },
  { twMerge: false }
);
const PressableBox = react.forwardRef(
  ({ className, variant, ghost = false, forceStyle, accent, ...props }, ref) => {
    return /* @__PURE__ */ jsxRuntime.jsx(AccentScope, { accent, children: /* @__PURE__ */ jsxRuntime.jsx(
      InteractiveBox,
      {
        ref,
        withFocusVisibleOutline: true,
        role: "button",
        className: pressableBoxVariants({
          variant,
          ghost,
          className,
          forceStyle
        }),
        ...props
      }
    ) });
  }
);

const buttonHeight = {
  sm: 38,
  md: 44
};
const buttonVariants = tailwindVariants.tv(
  {
    slots: {
      frame: "flex-row flex-center",
      text: "font-body-bold text-center shrink",
      icon: ""
    },
    variants: {
      size: {
        sm: {
          frame: "rounded-sm px-xs gap-xxs min-h-[38px]",
          text: "text-sm py-xxs"
        },
        md: {
          frame: "rounded-sm px-m gap-xs min-h-[44px]",
          text: "text-base py-xs"
        }
      },
      variant: {
        contained: { text: "text-on-accent disabled:text-disabled-sharp" },
        outlined: { text: "text-sharp disabled:text-disabled-muted" }
      },
      disabled: { true: {}, false: {} }
    },
    compoundVariants: [
      {
        variant: "contained",
        disabled: false,
        class: { icon: "text-on-accent" }
      },
      { variant: "outlined", disabled: false, class: { icon: "text-sharp" } },
      {
        variant: "contained",
        disabled: true,
        class: { icon: "text-disabled-sharp" }
      },
      {
        variant: "outlined",
        disabled: true,
        class: { icon: "text-disabled-muted" }
      }
    ],
    defaultVariants: { size: "md", variant: "contained" }
  },
  { twMerge: false }
);
function Button({
  icon,
  text,
  disabled,
  accent = "brand",
  variant = "contained",
  size = "md",
  className,
  ...pressableProps
}) {
  const styles = buttonVariants({ size, variant, disabled: disabled === true });
  return /* @__PURE__ */ jsxRuntime.jsxs(
    PressableBox,
    {
      accent,
      variant,
      disabled,
      className: styles.frame({ className }),
      ...pressableProps,
      children: [
        icon ? /* @__PURE__ */ jsxRuntime.jsx(
          Icon,
          {
            icon,
            className: styles.icon(),
            size: size === "sm" ? 16 : 20
          }
        ) : null,
        /* @__PURE__ */ jsxRuntime.jsx(Text, { "aria-disabled": disabled === true, className: styles.text(), children: text })
      ]
    }
  );
}
function ExternalLinkButton({
  href,
  onPress,
  ...buttonProps
}) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    Button,
    {
      ...buttonProps,
      role: "link",
      onPress: (event) => {
        onPress?.(event);
        if (event.defaultPrevented) return;
        if (reactNative.Platform.OS === "web") {
          window.open(href, "_blank", "noopener,noreferrer");
        } else {
          throw new Error("todo");
        }
      }
    }
  );
}
function InternalLinkButton({
  href: _href,
  ...buttonProps
}) {
  return /* @__PURE__ */ jsxRuntime.jsx(Button, { ...buttonProps, role: "link" });
}

const iconButtonVariants = tailwindVariants.tv(
  {
    slots: {
      frame: "shrink-0 flex-center rounded-full",
      icon: ""
    },
    variants: {
      variant: {
        contained: {},
        outlined: {}
      },
      disabled: {
        true: {},
        false: {}
      }
    },
    compoundVariants: [
      {
        variant: "contained",
        disabled: false,
        class: { icon: "text-on-accent" }
      },
      {
        variant: "outlined",
        disabled: false,
        class: { icon: "text-sharp" }
      },
      {
        variant: "contained",
        disabled: true,
        class: { icon: "text-disabled-sharp" }
      },
      {
        variant: "outlined",
        disabled: true,
        class: { icon: "text-disabled-muted" }
      }
    ],
    defaultVariants: { variant: "contained" }
  },
  { twMerge: false }
);
function IconButton({
  icon,
  disabled,
  size = "md",
  iconSize,
  variant = "contained",
  className,
  ...pressableProps
}) {
  const diameter = typeof size === "number" ? size : buttonHeight[size];
  const styles = iconButtonVariants({ variant, disabled: disabled === true });
  return /* @__PURE__ */ jsxRuntime.jsx(
    PressableBox,
    {
      variant,
      disabled,
      className: styles.frame({ className }),
      style: { width: diameter, height: diameter },
      ...pressableProps,
      children: /* @__PURE__ */ jsxRuntime.jsx(
        Icon,
        {
          icon,
          size: diameter * (iconSize === "fill" ? 0.8 : 0.55),
          className: styles.icon()
        }
      )
    }
  );
}

const inputVariants = tailwindVariants.tv(
  {
    base: [
      "text-base text-sharp",
      "border",
      "transition-[border-color,background-color,outline-color] duration-200 ease-in",
      "outline-interactive-outlined-pressable",
      // to have proper outline color transition
      process.env.EXPO_PUBLIC_STORYBOOK_ENABLED ? "" : "bg-form-bg border-interactive-outlined-pressable",
      "hover:bg-form-bg-hover hover:border-interactive-outlined-hover",
      "focus:bg-form-bg-focus focus:border-interactive-outlined-focus",
      "focus:outline-1 focus:outline-interactive-outlined-focus focus:outline-offset-0",
      "active:bg-form-bg-active active:border-interactive-outlined-active",
      "disabled:bg-form-bg-disabled disabled:border-interactive-outlined-disabled disabled:text-form-disabled-text disabled:cursor-not-allowed"
    ].join(" "),
    variants: {
      multiline: {
        false: "rounded-md px-m py-xs",
        true: "min-h-[80px] rounded-xs px-xs py-xs"
      },
      forceStyle: {
        undefined: process.env.EXPO_PUBLIC_STORYBOOK_ENABLED ? "bg-form-bg border-interactive-outlined-pressable" : "",
        hover: process.env.EXPO_PUBLIC_STORYBOOK_ENABLED ? "bg-form-bg-hover border-interactive-outlined-hover" : "",
        focus: process.env.EXPO_PUBLIC_STORYBOOK_ENABLED ? "bg-form-bg-focus border-interactive-outlined-focus outline-1 outline-interactive-outlined-focus outline-offset-0" : "",
        press: process.env.EXPO_PUBLIC_STORYBOOK_ENABLED ? "bg-form-bg-active border-interactive-outlined-active" : ""
      }
    },
    defaultVariants: {
      forceStyle: "undefined"
    }
  },
  { twMerge: false }
);
const MODE_PROPS = {
  password: {
    secureTextEntry: true,
    autoComplete: "current-password"
  },
  number: {
    inputMode: "numeric",
    keyboardType: "numeric"
  },
  tel: {
    inputMode: "tel",
    autoComplete: "tel",
    keyboardType: "phone-pad"
  },
  email: {
    inputMode: "email",
    autoComplete: "email",
    keyboardType: "email-address"
  },
  url: {
    inputMode: "url",
    keyboardType: "url"
  },
  search: {
    inputMode: "search"
  },
  webSearch: {
    inputMode: "search",
    keyboardType: "web-search"
  }
};
const InputText = react.forwardRef(
  ({ className, disabled, mode, multiline, forceStyle, ...props }, ref) => {
    const placeholderColor = useThemeToken("--color-form-placeholder");
    const modeProps = mode ? MODE_PROPS[mode] : void 0;
    return /* @__PURE__ */ jsxRuntime.jsx(
      reactNative.TextInput,
      {
        ref,
        editable: !disabled,
        "aria-disabled": disabled === true,
        multiline: multiline === true,
        placeholderTextColor: typeof placeholderColor === "string" ? placeholderColor : void 0,
        className: inputVariants({ multiline, forceStyle, className }),
        ...modeProps,
        ...props
      }
    );
  }
);

const TextArea = react.forwardRef((props, ref) => {
  return /* @__PURE__ */ jsxRuntime.jsx(InputText, { ref, multiline: true, ...props });
});

function useControllableChecked(controlled, onValueChange) {
  const [internal, setInternal] = react.useState(controlled ?? false);
  const value = controlled ?? internal;
  const onChange = react.useCallback(
    (next) => {
      if (controlled === void 0) {
        setInternal(next);
      }
      if (next !== value) {
        onValueChange?.(next);
      }
    },
    [controlled, onValueChange, value]
  );
  return [value, onChange];
}
function SwitchInner({
  checked,
  disabled,
  onValueChange,
  ...props
}) {
  const [value, setValue] = useControllableChecked(checked, onValueChange);
  const [trackBg, thumb, disabledTrackBg, disabledThumb] = useThemeToken([
    "--color-lowered",
    "--color-highlight",
    "--color-form-bg-disabled",
    "--color-disabled-muted"
  ]);
  const track = disabled ? disabledTrackBg : trackBg;
  const thumbColor = disabled ? disabledThumb : thumb;
  return /* @__PURE__ */ jsxRuntime.jsx(
    reactNative.Switch,
    {
      value,
      disabled,
      ios_backgroundColor: track,
      trackColor: { false: track, true: track },
      thumbColor,
      onValueChange: setValue,
      ...props
    }
  );
}
function Switch({ accent, ...rest }) {
  return /* @__PURE__ */ jsxRuntime.jsx(AccentScope, { accent, children: /* @__PURE__ */ jsxRuntime.jsx(SwitchInner, { ...rest }) });
}

const messageFrameVariants = tailwindVariants.tv(
  {
    base: "flex-row items-center bg-highlight-accent overflow-hidden",
    variants: {
      size: {
        sm: "gap-xs p-sm rounded-xs",
        md: "gap-m p-m rounded-sm",
        lg: "gap-l p-l rounded-md"
      }
    },
    defaultVariants: { size: "md" }
  },
  { twMerge: false }
);
const ICON_SIZE = { sm: 20, md: 24, lg: 28 };
const DISMISS_BUTTON_SIZE = {
  sm: 24,
  md: 40,
  lg: 40
};
function Message({
  icon,
  size = "md",
  accent,
  children,
  onDismiss,
  dismissIconAriaLabel
}) {
  const dismissDiameter = DISMISS_BUTTON_SIZE[size];
  return /* @__PURE__ */ jsxRuntime.jsx(AccentScope, { accent, children: /* @__PURE__ */ jsxRuntime.jsxs(Box, { className: `shadow-m ${messageFrameVariants({ size })}`, children: [
    /* @__PURE__ */ jsxRuntime.jsx(Icon, { icon, size: ICON_SIZE[size], className: "text-accent" }),
    /* @__PURE__ */ jsxRuntime.jsx(Text, { className: "text-accent grow", children }),
    onDismiss ? /* @__PURE__ */ jsxRuntime.jsx(
      Box,
      {
        style: { width: dismissDiameter, height: dismissDiameter },
        className: "flex-center",
        children: /* @__PURE__ */ jsxRuntime.jsx(
          IconButton,
          {
            ghost: true,
            icon: /* @__PURE__ */ jsxRuntime.jsx(XRegularIcon.XRegularIcon, {}),
            iconSize: size === "sm" ? "fill" : void 0,
            size: dismissDiameter,
            variant: "outlined",
            "aria-label": dismissIconAriaLabel,
            onPress: onDismiss
          }
        )
      }
    ) : null
  ] }) });
}
function InfoMessage(props) {
  return /* @__PURE__ */ jsxRuntime.jsx(Message, { ...props, accent: "info", icon: /* @__PURE__ */ jsxRuntime.jsx(InfoRegularIcon.InfoRegularIcon, {}) });
}
function ConfirmationMessage(props) {
  return /* @__PURE__ */ jsxRuntime.jsx(Message, { ...props, accent: "success", icon: /* @__PURE__ */ jsxRuntime.jsx(CheckRegularIcon.CheckRegularIcon, {}) });
}
function WarningMessage(props) {
  return /* @__PURE__ */ jsxRuntime.jsx(Message, { ...props, accent: "warning", icon: /* @__PURE__ */ jsxRuntime.jsx(WarningRegularIcon.WarningRegularIcon, {}) });
}

function PressableListItem({
  variant = "contained",
  role = "button",
  accent,
  children,
  onPress
}) {
  return /* @__PURE__ */ jsxRuntime.jsxs(
    PressableBox,
    {
      variant,
      role,
      accent,
      className: "flex-row items-center justify-between mx-xs my-xxs px-m py-m",
      onPress,
      children: [
        /* @__PURE__ */ jsxRuntime.jsx(reactNative.View, { className: "flex-1", children }),
        /* @__PURE__ */ jsxRuntime.jsx(reactNative.View, { className: "justify-center", children: /* @__PURE__ */ jsxRuntime.jsx(
          Icon,
          {
            className: variant === "contained" ? "text-on-accent-muted" : "text-muted",
            icon: /* @__PURE__ */ jsxRuntime.jsx(CaretRightRegularIcon.CaretRightRegularIcon, {}),
            size: 18
          }
        ) })
      ]
    }
  );
}

function GradientBackground({
  accent,
  children
}) {
  return /* @__PURE__ */ jsxRuntime.jsx(AccentScope, { accent, children: /* @__PURE__ */ jsxRuntime.jsx(reactNative.View, { className: "absolute inset-0 bg-linear-to-t from-screen-gradient-end from-5% via-screen-gradient-middle via-80% to-screen-gradient-start to-98%", children }) });
}

const GradientScrollViewInner = react.forwardRef(({ children, ...scrollViewProps }, ref) => {
  const [gradientStart, gradientEnd] = useThemeToken([
    "--color-screen-gradient-start",
    "--color-screen-gradient-end"
  ]);
  return /* @__PURE__ */ jsxRuntime.jsxs(reactNative.ScrollView, { ref, ...scrollViewProps, children: [
    /* @__PURE__ */ jsxRuntime.jsx(
      reactNative.View,
      {
        className: "absolute left-0 right-0",
        style: {
          top: -600,
          height: 600,
          backgroundColor: gradientStart
        }
      }
    ),
    /* @__PURE__ */ jsxRuntime.jsx(
      reactNative.View,
      {
        className: "absolute left-0 right-0",
        style: {
          bottom: -600,
          height: 600,
          backgroundColor: gradientEnd
        }
      }
    ),
    /* @__PURE__ */ jsxRuntime.jsx(GradientBackground, {}),
    children
  ] });
});
const GradientScrollView = react.forwardRef(({ accent, children, ...scrollViewProps }, ref) => {
  return /* @__PURE__ */ jsxRuntime.jsx(AccentScope, { accent, children: /* @__PURE__ */ jsxRuntime.jsx(GradientScrollViewInner, { ref, ...scrollViewProps, children }) });
});

const Breakpoints = {
  /**
   * min-width: 0
   */
  BASE: 0,
  /**
   * min-width: 480px
   */
  SMALL: 480,
  /**
   * min-width: 768px
   */
  MEDIUM: 768,
  /**
   * min-width: 1024px
   */
  LARGE: 1024,
  /**
   * min-width: 1280px
   */
  WIDE: 1280
};
var BreakpointNameEnum = /* @__PURE__ */ ((BreakpointNameEnum2) => {
  BreakpointNameEnum2["BASE"] = "base";
  BreakpointNameEnum2["SMALL"] = "small";
  BreakpointNameEnum2["MEDIUM"] = "medium";
  BreakpointNameEnum2["LARGE"] = "large";
  BreakpointNameEnum2["WIDE"] = "wide";
  return BreakpointNameEnum2;
})(BreakpointNameEnum || {});

function useCurrentBreakpointName() {
  const { width } = reactNative.useWindowDimensions();
  if (width >= Breakpoints.WIDE) return BreakpointNameEnum.WIDE;
  if (width >= Breakpoints.LARGE) return BreakpointNameEnum.LARGE;
  if (width >= Breakpoints.MEDIUM) return BreakpointNameEnum.MEDIUM;
  if (width >= Breakpoints.SMALL) return BreakpointNameEnum.SMALL;
  return BreakpointNameEnum.BASE;
}
function useCurrentBreakpointNameFiltered(names) {
  const current = useCurrentBreakpointName();
  const ordered = [
    BreakpointNameEnum.WIDE,
    BreakpointNameEnum.LARGE,
    BreakpointNameEnum.MEDIUM,
    BreakpointNameEnum.SMALL,
    BreakpointNameEnum.BASE
  ];
  const startIndex = ordered.indexOf(current);
  for (let i = startIndex; i < ordered.length; i++) {
    const candidate = ordered[i];
    if (names.includes(candidate)) return candidate;
  }
  return BreakpointNameEnum.BASE;
}

const VISIBILITY_CLASS = {
  "base:end": "flex",
  "base:small": "flex sm:hidden",
  "base:medium": "flex md:hidden",
  "base:large": "flex lg:hidden",
  "base:wide": "flex xl:hidden",
  "small:end": "hidden sm:flex",
  "small:medium": "hidden sm:flex md:hidden",
  "small:large": "hidden sm:flex lg:hidden",
  "small:wide": "hidden sm:flex xl:hidden",
  "medium:end": "hidden md:flex",
  "medium:large": "hidden md:flex lg:hidden",
  "medium:wide": "hidden md:flex xl:hidden",
  "large:end": "hidden lg:flex",
  "large:wide": "hidden lg:flex xl:hidden",
  "wide:end": "hidden xl:flex"
};
function SwitchBreakpointsUsingDisplayNone({
  ...breakpoints
}) {
  const entries = Object.entries(breakpoints);
  return entries.map(([name, node], index) => {
    const next = entries[index + 1]?.[0] ?? "end";
    const className = VISIBILITY_CLASS[`${name}:${next}`] ?? "flex";
    return /* @__PURE__ */ jsxRuntime.jsx(reactNative.View, { className, children: node }, name);
  });
}
function SwitchBreakpointsUsingNull({
  children,
  ...breakpoints
}) {
  const currentBreakpointName = useCurrentBreakpointNameFiltered(
    Object.keys(breakpoints)
  );
  return breakpoints[currentBreakpointName] ?? null;
}

const useOpenExternalLink = () => {
  const [textSharp, bgSurface] = useThemeToken([
    "--color-sharp",
    "--color-surface"
  ]);
  return async (href, openLinkBehavior) => {
    switch (openLinkBehavior.native) {
      case "webBrowser": {
        return WebBrowser__namespace.openBrowserAsync(href, {
          controlsColor: textSharp,
          dismissButtonStyle: "close",
          presentationStyle: WebBrowser.WebBrowserPresentationStyle.PAGE_SHEET,
          toolbarColor: bgSurface,
          secondaryToolbarColor: bgSurface,
          readerMode: false,
          enableBarCollapsing: false,
          showTitle: true,
          enableDefaultShareMenuItem: true
        });
      }
      case "linking": {
        return reactNative.Linking.openURL(href);
      }
      default: {
        throw new Error(
          `Unsupported openLinkBehavior.native: ${openLinkBehavior.native}`
        );
      }
    }
  };
};
function ExternalLink({
  as: C,
  href,
  openLinkBehavior,
  onPress,
  ...props
}) {
  const openExternalLink = useOpenExternalLink();
  const handlePress = (e) => {
    if (onPress) {
      onPress(e);
      if (e?.defaultPrevented) return;
    }
    if (!href) return;
    return openExternalLink(href, openLinkBehavior);
  };
  return /* @__PURE__ */ jsxRuntime.jsx(C, { ...props, onPress: handlePress });
}

exports.SafeAreaProvider = reactNativeSafeAreaContext.SafeAreaProvider;
exports.useSafeAreaInsets = reactNativeSafeAreaContext.useSafeAreaInsets;
exports.AccentScope = AccentScope;
exports.AlouetteDecorator = AlouetteDecorator;
exports.AlouetteProvider = AlouetteProvider;
exports.Box = Box;
exports.BreakpointNameEnum = BreakpointNameEnum;
exports.Breakpoints = Breakpoints;
exports.Button = Button;
exports.ConfirmationMessage = ConfirmationMessage;
exports.ExternalLink = ExternalLink;
exports.ExternalLinkButton = ExternalLinkButton;
exports.GradientBackground = GradientBackground;
exports.GradientScrollView = GradientScrollView;
exports.HStack = HStack;
exports.Icon = Icon;
exports.IconButton = IconButton;
exports.InfoMessage = InfoMessage;
exports.InputText = InputText;
exports.InteractiveBox = InteractiveBox;
exports.InternalLinkButton = InternalLinkButton;
exports.Message = Message;
exports.Paragraph = Paragraph;
exports.PresenceList = PresenceList;
exports.PresenceOne = PresenceOne;
exports.PressableBox = PressableBox;
exports.PressableListItem = PressableListItem;
exports.SafeAreaBox = SafeAreaBox;
exports.ScopedTheme = ScopedTheme;
exports.ScrollView = ScrollView;
exports.Separator = Separator;
exports.Stack = Stack;
exports.Story = Story;
exports.StoryContainer = StoryContainer;
exports.StoryDecorator = StoryDecorator;
exports.StoryGrid = StoryGrid;
exports.StoryTitle = StoryTitle;
exports.Surface = Surface;
exports.Switch = Switch;
exports.SwitchBreakpointsUsingDisplayNone = SwitchBreakpointsUsingDisplayNone;
exports.SwitchBreakpointsUsingNull = SwitchBreakpointsUsingNull;
exports.Text = Text;
exports.TextArea = TextArea;
exports.VStack = VStack;
exports.View = View;
exports.WarningMessage = WarningMessage;
exports.animationDurationsMs = animationDurationsMs;
exports.styled = styled;
exports.themeVariables = themeVariables;
exports.useCurrentBreakpointName = useCurrentBreakpointName;
exports.useCurrentBreakpointNameFiltered = useCurrentBreakpointNameFiltered;
exports.useCurrentMode = useCurrentMode;
exports.useCurrentTheme = useCurrentTheme;
exports.useThemeToken = useThemeToken;
//# sourceMappingURL=index-react-native.cjs.js.map
