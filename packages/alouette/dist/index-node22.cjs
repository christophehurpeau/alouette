'use strict';

Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });

const jsxRuntime = require('react/jsx-runtime');
const nativewind = require('nativewind');
const react = require('react');
const reactNative = require('react-native');
const reactNativeSafeAreaContext = require('react-native-safe-area-context');
const tailwindMerge = require('tailwind-merge');
const tailwindVariants = require('tailwind-variants');
const XRegularIcon = require('alouette-icons/phosphor-icons/XRegularIcon');
const CheckCircleRegularIcon = require('alouette-icons/phosphor-icons/CheckCircleRegularIcon');
const WarningDuotoneIcon = require('alouette-icons/phosphor-icons/WarningDuotoneIcon');
const Animated = require('react-native-reanimated');
const reactNativeSvg = require('react-native-svg');
const CheckRegularIcon = require('alouette-icons/phosphor-icons/CheckRegularIcon');
const InfoRegularIcon = require('alouette-icons/phosphor-icons/InfoRegularIcon');
const QuestionRegularIcon = require('alouette-icons/phosphor-icons/QuestionRegularIcon');
const WarningRegularIcon = require('alouette-icons/phosphor-icons/WarningRegularIcon');
const CaretDownRegularIcon = require('alouette-icons/phosphor-icons/CaretDownRegularIcon');
const AsteriskSimpleRegularIcon = require('alouette-icons/phosphor-icons/AsteriskSimpleRegularIcon');
const reactHookForm = require('react-hook-form');
const PlusRegularIcon = require('alouette-icons/phosphor-icons/PlusRegularIcon');
const TrashRegularIcon = require('alouette-icons/phosphor-icons/TrashRegularIcon');
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
    "--color-disabled-interactive": "#B8B8B8",
    "--color-disabled-interactive-muted": "#E0E0E0",
    "--color-muted": "#474747",
    "--color-form-border-disabled": "#B8B8B8",
    "--color-form-placeholder": "#616161",
    "--color-form-disabled-text": "#474747",
    "--color-interactive-contained-disabled": "#C7C7C7",
    "--color-interactive-outlined-disabled": "#B8B8B8",
    "--color-interactive-accent-outlined-disabled": "#B8B8B8",
    "--color-screen": "#EBEBEB",
    "--color-surface": "#FAFAFA",
    "--color-highlight": "#FFFFFF",
    "--color-enabled": "#C7C7C7",
    "--color-highlight-accent": "#E0E0E0",
    "--color-lowered": "#E0E0E0",
    "--color-screen-gradient-start": "#E0E0E0",
    "--color-screen-gradient-middle": "#C7C7C7",
    "--color-screen-gradient-end": "#B8B8B8",
    "--color-border-muted": "#8F8F8F",
    "--color-border-sharp": "#616161",
    "--color-interactive-contained-pressable": "#FFFFFF",
    "--color-interactive-contained-hover": "#FAFAFA",
    "--color-interactive-contained-focus": "#FAFAFA",
    "--color-interactive-contained-active": "#EBEBEB",
    "--color-interactive-outlined-pressable": "#616161",
    "--color-interactive-outlined-hover": "#8F8F8F",
    "--color-interactive-outlined-focus": "#8F8F8F",
    "--color-interactive-outlined-active": "#8F8F8F",
    "--color-interactive-outlined-outline-focus": "#8F8F8F",
    "--color-interactive-active": "#616161",
    "--color-interactive-pressable": "#474747",
    "--color-interactive-hover": "#141414",
    "--color-sharp": "#141414",
    "--color-accent": "#141414",
    "--color-accent-muted": "#616161",
    "--color-on-accent": "#141414",
    "--color-on-accent-muted": "#616161",
    "--color-selection": "#47474740"
  },
  "dark": {
    "--color-translucent": "#1f1e1e55",
    "--color-disabled-sharp": "#A8A8A8",
    "--color-disabled-muted": "#A8A8A8",
    "--color-disabled-interactive": "#525252",
    "--color-disabled-interactive-muted": "#333333",
    "--color-muted": "#C2C2C2",
    "--color-form-border-disabled": "#525252",
    "--color-form-placeholder": "#A8A8A8",
    "--color-form-disabled-text": "#C2C2C2",
    "--color-interactive-contained-disabled": "#3D3D3D",
    "--color-interactive-outlined-disabled": "#474747",
    "--color-interactive-accent-outlined-disabled": "#474747",
    "--color-screen": "#1F1F1F",
    "--color-surface": "#292929",
    "--color-highlight": "#333333",
    "--color-enabled": "#525252",
    "--color-highlight-accent": "#333333",
    "--color-lowered": "#0F0F0F",
    "--color-screen-gradient-start": "#292929",
    "--color-screen-gradient-middle": "#1F1F1F",
    "--color-screen-gradient-end": "#0F0F0F",
    "--color-border-muted": "#525252",
    "--color-border-sharp": "#A8A8A8",
    "--color-interactive-contained-pressable": "#474747",
    "--color-interactive-contained-hover": "#525252",
    "--color-interactive-contained-focus": "#525252",
    "--color-interactive-contained-active": "#525252",
    "--color-interactive-outlined-pressable": "#525252",
    "--color-interactive-outlined-hover": "#A8A8A8",
    "--color-interactive-outlined-focus": "#A8A8A8",
    "--color-interactive-outlined-active": "#A8A8A8",
    "--color-interactive-outlined-outline-focus": "#525252",
    "--color-interactive-active": "#A8A8A8",
    "--color-interactive-pressable": "#C2C2C2",
    "--color-interactive-hover": "#F5F5F5",
    "--color-sharp": "#F5F5F5",
    "--color-accent": "#F5F5F5",
    "--color-accent-muted": "#C2C2C2",
    "--color-on-accent": "#F5F5F5",
    "--color-on-accent-muted": "#C2C2C2",
    "--color-selection": "#C2C2C240"
  },
  "light_brand": {
    "--color-translucent": "#ffffff66",
    "--color-disabled-sharp": "#616161",
    "--color-disabled-muted": "#8F8F8F",
    "--color-disabled-interactive": "#B8B8B8",
    "--color-disabled-interactive-muted": "#E0E0E0",
    "--color-muted": "#474747",
    "--color-form-border-disabled": "#B8B8B8",
    "--color-form-placeholder": "#616161",
    "--color-form-disabled-text": "#474747",
    "--color-interactive-contained-disabled": "#C7C7C7",
    "--color-interactive-outlined-disabled": "#B8B8B8",
    "--color-interactive-accent-outlined-disabled": "#B8B8B8",
    "--color-screen": "#DFF1F6",
    "--color-surface": "#EFF8FB",
    "--color-highlight": "#F7FBFD",
    "--color-enabled": "#99DFF5",
    "--color-highlight-accent": "#C7EEF9",
    "--color-lowered": "#C7EEF9",
    "--color-screen-gradient-start": "#C7EEF9",
    "--color-screen-gradient-middle": "#99DFF5",
    "--color-screen-gradient-end": "#7DD7F2",
    "--color-border-muted": "#23C8FB",
    "--color-border-sharp": "#037496",
    "--color-interactive-contained-pressable": "#037496",
    "--color-interactive-contained-hover": "#049AC8",
    "--color-interactive-contained-focus": "#049AC8",
    "--color-interactive-contained-active": "#23C8FB",
    "--color-interactive-outlined-pressable": "#037496",
    "--color-interactive-outlined-hover": "#23C8FB",
    "--color-interactive-outlined-focus": "#23C8FB",
    "--color-interactive-outlined-active": "#23C8FB",
    "--color-interactive-outlined-outline-focus": "#23C8FB",
    "--color-interactive-active": "#037496",
    "--color-interactive-pressable": "#024D64",
    "--color-interactive-hover": "#011F28",
    "--color-sharp": "#011F28",
    "--color-accent": "#024D64",
    "--color-accent-muted": "#037496",
    "--color-on-accent": "#FFFFFF",
    "--color-on-accent-muted": "#C7EEF9",
    "--color-selection": "#024D6440"
  },
  "light_info": {
    "--color-translucent": "#ffffff66",
    "--color-disabled-sharp": "#616161",
    "--color-disabled-muted": "#8F8F8F",
    "--color-disabled-interactive": "#B8B8B8",
    "--color-disabled-interactive-muted": "#E0E0E0",
    "--color-muted": "#474747",
    "--color-form-border-disabled": "#B8B8B8",
    "--color-form-placeholder": "#616161",
    "--color-form-disabled-text": "#474747",
    "--color-interactive-contained-disabled": "#C7C7C7",
    "--color-interactive-outlined-disabled": "#B8B8B8",
    "--color-interactive-accent-outlined-disabled": "#B8B8B8",
    "--color-screen": "#DFF0F6",
    "--color-surface": "#EFF8FB",
    "--color-highlight": "#F7FBFD",
    "--color-enabled": "#99DEF5",
    "--color-highlight-accent": "#C7EDF9",
    "--color-lowered": "#C7EDF9",
    "--color-screen-gradient-start": "#C7EDF9",
    "--color-screen-gradient-middle": "#99DEF5",
    "--color-screen-gradient-end": "#7DD5F2",
    "--color-border-muted": "#23C5FB",
    "--color-border-sharp": "#037196",
    "--color-interactive-contained-pressable": "#037196",
    "--color-interactive-contained-hover": "#0497C8",
    "--color-interactive-contained-focus": "#0497C8",
    "--color-interactive-contained-active": "#23C5FB",
    "--color-interactive-outlined-pressable": "#037196",
    "--color-interactive-outlined-hover": "#23C5FB",
    "--color-interactive-outlined-focus": "#23C5FB",
    "--color-interactive-outlined-active": "#23C5FB",
    "--color-interactive-outlined-outline-focus": "#23C5FB",
    "--color-interactive-active": "#037196",
    "--color-interactive-pressable": "#024B64",
    "--color-interactive-hover": "#011E28",
    "--color-sharp": "#011E28",
    "--color-accent": "#024B64",
    "--color-accent-muted": "#037196",
    "--color-on-accent": "#FFFFFF",
    "--color-on-accent-muted": "#C7EDF9",
    "--color-selection": "#024B6440"
  },
  "light_success": {
    "--color-translucent": "#ffffff66",
    "--color-disabled-sharp": "#616161",
    "--color-disabled-muted": "#8F8F8F",
    "--color-disabled-interactive": "#B8B8B8",
    "--color-disabled-interactive-muted": "#E0E0E0",
    "--color-muted": "#474747",
    "--color-form-border-disabled": "#B8B8B8",
    "--color-form-placeholder": "#616161",
    "--color-form-disabled-text": "#474747",
    "--color-interactive-contained-disabled": "#C7C7C7",
    "--color-interactive-outlined-disabled": "#B8B8B8",
    "--color-interactive-accent-outlined-disabled": "#B8B8B8",
    "--color-screen": "#DFF6DF",
    "--color-surface": "#EFFBEF",
    "--color-highlight": "#F7FDF7",
    "--color-enabled": "#91F391",
    "--color-highlight-accent": "#BFF8BF",
    "--color-lowered": "#BFF8BF",
    "--color-screen-gradient-start": "#BFF8BF",
    "--color-screen-gradient-middle": "#91F391",
    "--color-screen-gradient-end": "#75F075",
    "--color-border-muted": "#19FA19",
    "--color-border-sharp": "#027802",
    "--color-interactive-contained-pressable": "#027802",
    "--color-interactive-contained-hover": "#03AA03",
    "--color-interactive-contained-focus": "#03AA03",
    "--color-interactive-contained-active": "#19FA19",
    "--color-interactive-outlined-pressable": "#027802",
    "--color-interactive-outlined-hover": "#19FA19",
    "--color-interactive-outlined-focus": "#19FA19",
    "--color-interactive-outlined-active": "#19FA19",
    "--color-interactive-outlined-outline-focus": "#19FA19",
    "--color-interactive-active": "#027802",
    "--color-interactive-pressable": "#014601",
    "--color-interactive-hover": "#012801",
    "--color-sharp": "#012801",
    "--color-accent": "#014601",
    "--color-accent-muted": "#027802",
    "--color-on-accent": "#FFFFFF",
    "--color-on-accent-muted": "#BFF8BF",
    "--color-selection": "#01460140"
  },
  "light_warning": {
    "--color-translucent": "#ffffff66",
    "--color-disabled-sharp": "#616161",
    "--color-disabled-muted": "#8F8F8F",
    "--color-disabled-interactive": "#B8B8B8",
    "--color-disabled-interactive-muted": "#E0E0E0",
    "--color-muted": "#474747",
    "--color-form-border-disabled": "#B8B8B8",
    "--color-form-placeholder": "#616161",
    "--color-form-disabled-text": "#474747",
    "--color-interactive-contained-disabled": "#C7C7C7",
    "--color-interactive-outlined-disabled": "#B8B8B8",
    "--color-interactive-accent-outlined-disabled": "#B8B8B8",
    "--color-screen": "#F6EEDF",
    "--color-surface": "#FBF7EF",
    "--color-highlight": "#FDFBF7",
    "--color-enabled": "#F3D291",
    "--color-highlight-accent": "#F8E5BF",
    "--color-lowered": "#F8E5BF",
    "--color-screen-gradient-start": "#F8E5BF",
    "--color-screen-gradient-middle": "#F3D291",
    "--color-screen-gradient-end": "#F0C775",
    "--color-border-muted": "#FAAF19",
    "--color-border-sharp": "#8C5E03",
    "--color-interactive-contained-pressable": "#8C5E03",
    "--color-interactive-contained-hover": "#BE8004",
    "--color-interactive-contained-focus": "#BE8004",
    "--color-interactive-contained-active": "#FAAF19",
    "--color-interactive-outlined-pressable": "#8C5E03",
    "--color-interactive-outlined-hover": "#FAAF19",
    "--color-interactive-outlined-focus": "#FAAF19",
    "--color-interactive-outlined-active": "#FAAF19",
    "--color-interactive-outlined-outline-focus": "#FAAF19",
    "--color-interactive-active": "#8C5E03",
    "--color-interactive-pressable": "#5A3D02",
    "--color-interactive-hover": "#281B01",
    "--color-sharp": "#281B01",
    "--color-accent": "#5A3D02",
    "--color-accent-muted": "#8C5E03",
    "--color-on-accent": "#FFFFFF",
    "--color-on-accent-muted": "#F8E5BF",
    "--color-selection": "#5A3D0240"
  },
  "light_danger": {
    "--color-translucent": "#ffffff66",
    "--color-disabled-sharp": "#616161",
    "--color-disabled-muted": "#8F8F8F",
    "--color-disabled-interactive": "#B8B8B8",
    "--color-disabled-interactive-muted": "#E0E0E0",
    "--color-muted": "#474747",
    "--color-form-border-disabled": "#B8B8B8",
    "--color-form-placeholder": "#616161",
    "--color-form-disabled-text": "#474747",
    "--color-interactive-contained-disabled": "#C7C7C7",
    "--color-interactive-outlined-disabled": "#B8B8B8",
    "--color-interactive-accent-outlined-disabled": "#B8B8B8",
    "--color-screen": "#F6E0DF",
    "--color-surface": "#FBEFEF",
    "--color-highlight": "#FDF7F7",
    "--color-enabled": "#F7A4A1",
    "--color-highlight-accent": "#FBD2D0",
    "--color-lowered": "#FBD2D0",
    "--color-screen-gradient-start": "#FBD2D0",
    "--color-screen-gradient-middle": "#F7A4A1",
    "--color-screen-gradient-end": "#F48985",
    "--color-border-muted": "#FB342D",
    "--color-border-sharp": "#A00803",
    "--color-interactive-contained-pressable": "#A00803",
    "--color-interactive-contained-hover": "#D20B04",
    "--color-interactive-contained-focus": "#D20B04",
    "--color-interactive-contained-active": "#FB342D",
    "--color-interactive-outlined-pressable": "#A00803",
    "--color-interactive-outlined-hover": "#FB342D",
    "--color-interactive-outlined-focus": "#FB342D",
    "--color-interactive-outlined-active": "#FB342D",
    "--color-interactive-outlined-outline-focus": "#FB342D",
    "--color-interactive-active": "#A00803",
    "--color-interactive-pressable": "#6E0602",
    "--color-interactive-hover": "#280201",
    "--color-sharp": "#280201",
    "--color-accent": "#6E0602",
    "--color-accent-muted": "#A00803",
    "--color-on-accent": "#FFFFFF",
    "--color-on-accent-muted": "#FBD2D0",
    "--color-selection": "#6E060240"
  },
  "dark_brand": {
    "--color-translucent": "#1f1e1e55",
    "--color-disabled-sharp": "#A8A8A8",
    "--color-disabled-muted": "#A8A8A8",
    "--color-disabled-interactive": "#525252",
    "--color-disabled-interactive-muted": "#333333",
    "--color-muted": "#C2C2C2",
    "--color-form-border-disabled": "#525252",
    "--color-form-placeholder": "#A8A8A8",
    "--color-form-disabled-text": "#C2C2C2",
    "--color-interactive-contained-disabled": "#3D3D3D",
    "--color-interactive-outlined-disabled": "#474747",
    "--color-interactive-accent-outlined-disabled": "#474747",
    "--color-screen": "#0D2830",
    "--color-surface": "#123540",
    "--color-highlight": "#104E60",
    "--color-enabled": "#1E94B8",
    "--color-highlight-accent": "#104E60",
    "--color-lowered": "#071418",
    "--color-screen-gradient-start": "#123540",
    "--color-screen-gradient-middle": "#0D2830",
    "--color-screen-gradient-end": "#071418",
    "--color-border-muted": "#1E94B8",
    "--color-border-sharp": "#5CD1F5",
    "--color-interactive-contained-pressable": "#156A84",
    "--color-interactive-contained-hover": "#1E94B8",
    "--color-interactive-contained-focus": "#1E94B8",
    "--color-interactive-contained-active": "#1E94B8",
    "--color-interactive-outlined-pressable": "#1E94B8",
    "--color-interactive-outlined-hover": "#5CD1F5",
    "--color-interactive-outlined-focus": "#5CD1F5",
    "--color-interactive-outlined-active": "#5CD1F5",
    "--color-interactive-outlined-outline-focus": "#1E94B8",
    "--color-interactive-active": "#5CD1F5",
    "--color-interactive-pressable": "#8CDFF8",
    "--color-interactive-hover": "#D9F4FD",
    "--color-sharp": "#D9F4FD",
    "--color-accent": "#8CDFF8",
    "--color-accent-muted": "#8CDFF8",
    "--color-on-accent": "#F5F5F5",
    "--color-on-accent-muted": "#8CDFF8",
    "--color-selection": "#8CDFF840"
  },
  "dark_info": {
    "--color-translucent": "#1f1e1e55",
    "--color-disabled-sharp": "#A8A8A8",
    "--color-disabled-muted": "#A8A8A8",
    "--color-disabled-interactive": "#525252",
    "--color-disabled-interactive-muted": "#333333",
    "--color-muted": "#C2C2C2",
    "--color-form-border-disabled": "#525252",
    "--color-form-placeholder": "#A8A8A8",
    "--color-form-disabled-text": "#C2C2C2",
    "--color-interactive-contained-disabled": "#3D3D3D",
    "--color-interactive-outlined-disabled": "#474747",
    "--color-interactive-accent-outlined-disabled": "#474747",
    "--color-screen": "#0D2730",
    "--color-surface": "#123440",
    "--color-highlight": "#104C60",
    "--color-enabled": "#1E92B8",
    "--color-highlight-accent": "#104C60",
    "--color-lowered": "#071418",
    "--color-screen-gradient-start": "#123440",
    "--color-screen-gradient-middle": "#0D2730",
    "--color-screen-gradient-end": "#071418",
    "--color-border-muted": "#1E92B8",
    "--color-border-sharp": "#5CCEF5",
    "--color-interactive-contained-pressable": "#156884",
    "--color-interactive-contained-hover": "#1E92B8",
    "--color-interactive-contained-focus": "#1E92B8",
    "--color-interactive-contained-active": "#1E92B8",
    "--color-interactive-outlined-pressable": "#1E92B8",
    "--color-interactive-outlined-hover": "#5CCEF5",
    "--color-interactive-outlined-focus": "#5CCEF5",
    "--color-interactive-outlined-active": "#5CCEF5",
    "--color-interactive-outlined-outline-focus": "#1E92B8",
    "--color-interactive-active": "#5CCEF5",
    "--color-interactive-pressable": "#8CDDF8",
    "--color-interactive-hover": "#D9F4FD",
    "--color-sharp": "#D9F4FD",
    "--color-accent": "#8CDDF8",
    "--color-accent-muted": "#8CDDF8",
    "--color-on-accent": "#F5F5F5",
    "--color-on-accent-muted": "#8CDDF8",
    "--color-selection": "#8CDDF840"
  },
  "dark_success": {
    "--color-translucent": "#1f1e1e55",
    "--color-disabled-sharp": "#A8A8A8",
    "--color-disabled-muted": "#A8A8A8",
    "--color-disabled-interactive": "#525252",
    "--color-disabled-interactive-muted": "#333333",
    "--color-muted": "#C2C2C2",
    "--color-form-border-disabled": "#525252",
    "--color-form-placeholder": "#A8A8A8",
    "--color-form-disabled-text": "#C2C2C2",
    "--color-interactive-contained-disabled": "#3D3D3D",
    "--color-interactive-outlined-disabled": "#474747",
    "--color-interactive-accent-outlined-disabled": "#474747",
    "--color-screen": "#0D300D",
    "--color-surface": "#124012",
    "--color-highlight": "#0F570F",
    "--color-enabled": "#1FAD1F",
    "--color-highlight-accent": "#0F570F",
    "--color-lowered": "#071807",
    "--color-screen-gradient-start": "#124012",
    "--color-screen-gradient-middle": "#0D300D",
    "--color-screen-gradient-end": "#071807",
    "--color-border-muted": "#1FAD1F",
    "--color-border-sharp": "#52F452",
    "--color-interactive-contained-pressable": "#157915",
    "--color-interactive-contained-hover": "#1FAD1F",
    "--color-interactive-contained-focus": "#1FAD1F",
    "--color-interactive-contained-active": "#1FAD1F",
    "--color-interactive-outlined-pressable": "#1FAD1F",
    "--color-interactive-outlined-hover": "#52F452",
    "--color-interactive-outlined-focus": "#52F452",
    "--color-interactive-outlined-active": "#52F452",
    "--color-interactive-outlined-outline-focus": "#1FAD1F",
    "--color-interactive-active": "#52F452",
    "--color-interactive-pressable": "#82F782",
    "--color-interactive-hover": "#D9FDD9",
    "--color-sharp": "#D9FDD9",
    "--color-accent": "#82F782",
    "--color-accent-muted": "#82F782",
    "--color-on-accent": "#F5F5F5",
    "--color-on-accent-muted": "#82F782",
    "--color-selection": "#82F78240"
  },
  "dark_warning": {
    "--color-translucent": "#1f1e1e55",
    "--color-disabled-sharp": "#A8A8A8",
    "--color-disabled-muted": "#A8A8A8",
    "--color-disabled-interactive": "#525252",
    "--color-disabled-interactive-muted": "#333333",
    "--color-muted": "#C2C2C2",
    "--color-form-border-disabled": "#525252",
    "--color-form-placeholder": "#A8A8A8",
    "--color-form-disabled-text": "#C2C2C2",
    "--color-interactive-contained-disabled": "#3D3D3D",
    "--color-interactive-outlined-disabled": "#474747",
    "--color-interactive-accent-outlined-disabled": "#474747",
    "--color-screen": "#30240D",
    "--color-surface": "#403012",
    "--color-highlight": "#583F0E",
    "--color-enabled": "#AF7E1D",
    "--color-highlight-accent": "#583F0E",
    "--color-lowered": "#181207",
    "--color-screen-gradient-start": "#403012",
    "--color-screen-gradient-middle": "#30240D",
    "--color-screen-gradient-end": "#181207",
    "--color-border-muted": "#AF7E1D",
    "--color-border-sharp": "#F4BE52",
    "--color-interactive-contained-pressable": "#7B5914",
    "--color-interactive-contained-hover": "#AF7E1D",
    "--color-interactive-contained-focus": "#AF7E1D",
    "--color-interactive-contained-active": "#AF7E1D",
    "--color-interactive-outlined-pressable": "#AF7E1D",
    "--color-interactive-outlined-hover": "#F4BE52",
    "--color-interactive-outlined-focus": "#F4BE52",
    "--color-interactive-outlined-active": "#F4BE52",
    "--color-interactive-outlined-outline-focus": "#AF7E1D",
    "--color-interactive-active": "#F4BE52",
    "--color-interactive-pressable": "#F7D082",
    "--color-interactive-hover": "#FDF1D9",
    "--color-sharp": "#FDF1D9",
    "--color-accent": "#F7D082",
    "--color-accent-muted": "#F7D082",
    "--color-on-accent": "#F5F5F5",
    "--color-on-accent-muted": "#F7D082",
    "--color-selection": "#F7D08240"
  },
  "dark_danger": {
    "--color-translucent": "#1f1e1e55",
    "--color-disabled-sharp": "#A8A8A8",
    "--color-disabled-muted": "#A8A8A8",
    "--color-disabled-interactive": "#525252",
    "--color-disabled-interactive-muted": "#333333",
    "--color-muted": "#C2C2C2",
    "--color-form-border-disabled": "#525252",
    "--color-form-placeholder": "#A8A8A8",
    "--color-form-disabled-text": "#C2C2C2",
    "--color-interactive-contained-disabled": "#3D3D3D",
    "--color-interactive-outlined-disabled": "#474747",
    "--color-interactive-accent-outlined-disabled": "#474747",
    "--color-screen": "#300F0D",
    "--color-surface": "#401312",
    "--color-highlight": "#691411",
    "--color-enabled": "#C1251F",
    "--color-highlight-accent": "#691411",
    "--color-lowered": "#180707",
    "--color-screen-gradient-start": "#401312",
    "--color-screen-gradient-middle": "#300F0D",
    "--color-screen-gradient-end": "#180707",
    "--color-border-muted": "#C1251F",
    "--color-border-sharp": "#F56A66",
    "--color-interactive-contained-pressable": "#8C1B17",
    "--color-interactive-contained-hover": "#C1251F",
    "--color-interactive-contained-focus": "#C1251F",
    "--color-interactive-contained-active": "#C1251F",
    "--color-interactive-outlined-pressable": "#C1251F",
    "--color-interactive-outlined-hover": "#F56A66",
    "--color-interactive-outlined-focus": "#F56A66",
    "--color-interactive-outlined-active": "#F56A66",
    "--color-interactive-outlined-outline-focus": "#C1251F",
    "--color-interactive-active": "#F56A66",
    "--color-interactive-pressable": "#F89996",
    "--color-interactive-hover": "#FDDAD9",
    "--color-sharp": "#FDDAD9",
    "--color-accent": "#F89996",
    "--color-accent-muted": "#F89996",
    "--color-on-accent": "#F5F5F5",
    "--color-on-accent-muted": "#F89996",
    "--color-selection": "#F8999640"
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

const ScrollView = nativewind.styled(
  reactNative.ScrollView,
  {
    className: "style",
    contentContainerClassName: "contentContainerStyle"
  }
);

const FlatList = nativewind.styled(
  reactNative.FlatList,
  {
    className: "style",
    contentContainerClassName: "contentContainerStyle",
    columnWrapperClassName: "columnWrapperStyle"
  }
);

const SectionList = nativewind.styled(
  reactNative.SectionList,
  {
    className: "style",
    contentContainerClassName: "contentContainerStyle"
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
    "transition-[transform,background-color,border-color] duration-fast ease-in",
    "disabled:cursor-not-allowed disabled:opacity-70 aria-disabled:cursor-not-allowed aria-disabled:opacity-70",
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
react.forwardRef(
  ({ withFocusVisibleOutline, children, className, ...rest }, ref) => {
    const child = react.Children.only(children);
    return /* @__PURE__ */ jsxRuntime.jsx(
      reactNative.Pressable,
      {
        ref,
        pointerEvents: "auto",
        className: `flex-center ${className ?? ""}`,
        ...rest,
        children: react.cloneElement(child, {
          className: interactiveBoxVariants({
            withFocusVisibleOutline,
            className: child.props.className
          })
        })
      }
    );
  }
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
    base: "overflow-hidden transition-background duration-fast",
    variants: {
      size: {
        xxs: "p-xs rounded-xs",
        xs: "p-sm rounded-xs",
        sm: "p-m rounded-sm",
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

function StableAccentScope({
  mode: forcedMode,
  accent,
  children
}) {
  const currentTheme = useCurrentTheme();
  const currentMode = useCurrentMode();
  return /* @__PURE__ */ jsxRuntime.jsx(
    ScopedTheme,
    {
      theme: accent ? `${forcedMode ?? currentMode}_${accent}` : currentTheme,
      children
    }
  );
}

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
  "collapse": 800,
  "progress": 600,
  "fade": 300,
  "fast": 200
};

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
          "border bg-highlight",
          process.env.EXPO_PUBLIC_STORYBOOK_ENABLED ? "" : "border-interactive-outlined-pressable",
          "hover:border-interactive-outlined-hover",
          "focus:border-interactive-outlined-focus",
          "active:border-interactive-outlined-active",
          "disabled:border-interactive-outlined-disabled",
          "focus-visible:outline-interactive-outlined-outline-focus"
        ].join(" "),
        ghost: [
          "border border-transparent",
          "hover:border hover:border-interactive-outlined-hover",
          "focus:border focus:border-interactive-outlined-focus",
          "active:border active:border-interactive-outlined-active",
          "disabled:border-interactive-outlined-disabled",
          "focus-visible:outline-interactive-outlined-outline-focus"
        ].join(" ")
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
      },
      /* ghost */
      {
        variant: "ghost",
        forceStyle: void 0,
        className: "border-transparent"
      },
      {
        variant: "ghost",
        forceStyle: "hover",
        className: "border-interactive-outlined-hover"
      },
      {
        variant: "ghost",
        forceStyle: "focus",
        className: "border-interactive-outlined-focus"
      },
      {
        variant: "ghost",
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
  ({ className, variant, forceStyle, accent, ...props }, ref) => {
    return /* @__PURE__ */ jsxRuntime.jsx(AccentScope, { accent, children: /* @__PURE__ */ jsxRuntime.jsx(
      InteractiveBox,
      {
        ref,
        withFocusVisibleOutline: true,
        role: "button",
        className: pressableBoxVariants({
          variant,
          className,
          forceStyle
        }),
        ...props
      }
    ) });
  }
);

function useColorToken(className) {
  const token = className.split(/\s+/).find((part) => part.startsWith("text-"))?.slice("text-".length);
  return useThemeToken(`--color-${token ?? "sharp"}`);
}

function Icon({
  icon,
  size = 20,
  className = "text-sharp"
}) {
  const color = useColorToken(className);
  return react.cloneElement(icon, {
    color,
    width: size,
    height: size
  });
}

const AnimatedCircle = Animated.createAnimatedComponent(reactNativeSvg.Circle);
const easeOut = Animated.Easing.bezier(0, 0, 0.58, 1);
function RingCircle({
  center,
  radius,
  strokeWidth,
  strokeDasharray,
  strokeDashoffset,
  color,
  width,
  height
}) {
  const scale = 208 / (center * 2);
  const scaledRadius = radius * scale;
  const scaledStrokeWidth = strokeWidth * scale;
  const scaledDashoffset = strokeDashoffset == null ? void 0 : strokeDashoffset * scale;
  const animatedOffset = Animated.useSharedValue(scaledDashoffset ?? 0);
  react.useEffect(() => {
    animatedOffset.value = Animated.withTiming(scaledDashoffset ?? 0, {
      duration: animationDurationsMs.progress,
      easing: easeOut
    });
  }, [animatedOffset, scaledDashoffset]);
  const animatedProps = Animated.useAnimatedProps(() => ({
    strokeDashoffset: animatedOffset.value
  }));
  return /* @__PURE__ */ jsxRuntime.jsx(reactNativeSvg.Svg, { color, width, height, viewBox: "0 0 256 256", children: strokeDasharray == null ? /* @__PURE__ */ jsxRuntime.jsx(
    reactNativeSvg.Circle,
    {
      cx: 128,
      cy: 128,
      r: scaledRadius,
      stroke: "currentColor",
      strokeWidth: scaledStrokeWidth,
      fill: "none"
    }
  ) : /* @__PURE__ */ jsxRuntime.jsx(
    AnimatedCircle,
    {
      animatedProps,
      cx: 128,
      cy: 128,
      r: scaledRadius,
      stroke: "currentColor",
      strokeWidth: scaledStrokeWidth,
      strokeDasharray: strokeDasharray * scale,
      strokeLinecap: "round",
      transform: "rotate(-90 128 128)",
      fill: "none"
    }
  ) });
}

const startDelayMs = 100;
const stepIntervalMs = 500;
const completeDelayMs = 500;
const resetDelayMs = 1e3;
const indeterminateExitDurationMs = resetDelayMs + animationDurationsMs.fade;
const random = () => Math.ceil(Math.random() * 100) / 100;
function nextSimulatedProgress(progress) {
  if (progress < 60) return progress + random() * 10 + 5;
  if (progress < 70) return progress + random() * 10 + 3;
  if (progress < 80) return progress + random() + 5;
  if (progress < 90) return progress + random() + 1;
  if (progress < 95) return progress + 0.1;
  return progress;
}
function useSimulatedProgress(loading) {
  const [progress, setProgress] = react.useState(1);
  const [hidden, setHidden] = react.useState(!loading);
  react.useEffect(() => {
    if (!loading) return void 0;
    setHidden(false);
    const startTimer = setTimeout(() => {
      setProgress(20);
    }, startDelayMs);
    const stepTimer = setInterval(() => {
      setProgress(nextSimulatedProgress);
    }, stepIntervalMs);
    return () => {
      clearTimeout(startTimer);
      clearInterval(stepTimer);
    };
  }, [loading]);
  react.useEffect(() => {
    if (loading) return void 0;
    const completeTimer = setTimeout(() => {
      setProgress(100);
    }, completeDelayMs);
    const resetTimer = setTimeout(() => {
      setHidden(true);
      setProgress(1);
    }, resetDelayMs);
    return () => {
      clearTimeout(completeTimer);
      clearTimeout(resetTimer);
    };
  }, [loading]);
  return { progress, hidden };
}

const diameterBySize = {
  xs: 16,
  sm: 32,
  md: 64,
  lg: 128
};
const strokeWidthBySize = {
  xs: 2,
  sm: 4,
  md: 8,
  lg: 16
};
const ring = tailwindVariants.tv({
  base: "relative transition-opacity duration-fade",
  variants: {
    hidden: {
      true: "opacity-0",
      false: "opacity-100"
    }
  },
  defaultVariants: { hidden: false }
});
function CircularProgress({
  progress,
  hidden = false,
  accent = "brand",
  size = "md"
}) {
  const diameter = diameterBySize[size];
  const strokeWidth = strokeWidthBySize[size];
  const radius = (diameter - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const clampedProgress = Math.min(Math.max(progress, 0), 100);
  const dashOffset = circumference * (1 - clampedProgress / 100);
  const center = diameter / 2;
  const trackRing = /* @__PURE__ */ jsxRuntime.jsx(RingCircle, { center, radius, strokeWidth });
  const fillRing = /* @__PURE__ */ jsxRuntime.jsx(
    RingCircle,
    {
      center,
      radius,
      strokeWidth,
      strokeDasharray: circumference,
      strokeDashoffset: dashOffset
    }
  );
  return /* @__PURE__ */ jsxRuntime.jsx(AccentScope, { accent, children: /* @__PURE__ */ jsxRuntime.jsxs(
    View,
    {
      className: ring({ hidden }),
      style: { width: diameter, height: diameter },
      children: [
        /* @__PURE__ */ jsxRuntime.jsx(View, { className: "absolute inset-0", children: /* @__PURE__ */ jsxRuntime.jsx(
          Icon,
          {
            icon: trackRing,
            size: diameter,
            className: "text-highlight-accent"
          }
        ) }),
        /* @__PURE__ */ jsxRuntime.jsx(View, { className: "absolute inset-0", children: /* @__PURE__ */ jsxRuntime.jsx(Icon, { icon: fillRing, size: diameter, className: "text-accent" }) })
      ]
    }
  ) });
}
function IndeterminateCircularProgress({
  loading,
  accent,
  size
}) {
  const { progress, hidden } = useSimulatedProgress(loading);
  return /* @__PURE__ */ jsxRuntime.jsx(
    CircularProgress,
    {
      progress,
      hidden,
      accent,
      size
    }
  );
}

const buttonHeight = {
  sm: 38,
  md: 44
};
const buttonVariants = tailwindVariants.tv(
  {
    slots: {
      frame: "flex-row flex-center relative",
      text: "font-body-bold text-center shrink transition-opacity duration-fade",
      icon: "",
      terminalIcon: "text-accent",
      overlayIconContainer: "absolute inset-0 flex-center"
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
        contained: { text: "text-on-accent" },
        outlined: { text: "text-sharp" },
        ghost: { text: "text-sharp" }
      },
      disabled: { true: {}, false: {} },
      dimmed: {
        true: { text: "opacity-30", icon: "opacity-30" },
        false: {}
      }
    },
    compoundVariants: [
      {
        variant: "contained",
        disabled: false,
        ghost: false,
        class: { icon: "text-on-accent" }
      },
      {
        variant: "contained",
        disabled: false,
        ghost: true,
        class: {
          text: "text-sharp hover:text-on-accent",
          icon: "text-sharp hover:text-on-accent"
        }
      },
      { variant: "outlined", disabled: false, class: { icon: "text-sharp" } },
      {
        variant: "contained",
        disabled: true,
        class: { icon: "text-disabled-sharp", text: "text-disabled-sharp" }
      },
      {
        variant: "outlined",
        disabled: true,
        class: { icon: "text-disabled-muted", text: "text-disabled-muted" }
      }
    ],
    defaultVariants: { size: "md", variant: "contained" }
  },
  { twMerge: false }
);
function resolveTerminalIcon(state) {
  if (state === "success") {
    return {
      terminalIcon: /* @__PURE__ */ jsxRuntime.jsx(CheckCircleRegularIcon.CheckCircleRegularIcon, {}),
      terminalIconAccent: "success"
    };
  }
  if (state === "failed") {
    return {
      terminalIcon: /* @__PURE__ */ jsxRuntime.jsx(WarningDuotoneIcon.WarningDuotoneIcon, {}),
      terminalIconAccent: "danger"
    };
  }
  return { terminalIcon: void 0, terminalIconAccent: void 0 };
}
function Button({
  icon,
  text,
  disabled,
  state,
  accent = "brand",
  variant = "contained",
  size = "md",
  className,
  ...pressableProps
}) {
  const isLoading = state === "loading";
  const [showSpinner, setShowSpinner] = react.useState(isLoading);
  react.useEffect(() => {
    if (isLoading) {
      setShowSpinner(true);
      return void 0;
    }
    const timer = setTimeout(() => {
      setShowSpinner(false);
    }, indeterminateExitDurationMs);
    return () => {
      clearTimeout(timer);
    };
  }, [isLoading]);
  const { terminalIcon, terminalIconAccent } = resolveTerminalIcon(state);
  const hasOverlayIcon = showSpinner || terminalIcon !== void 0;
  const isDisabled = disabled === true || state != null;
  const styles = buttonVariants({
    size,
    variant,
    disabled: isDisabled,
    dimmed: hasOverlayIcon
  });
  return /* @__PURE__ */ jsxRuntime.jsxs(
    PressableBox,
    {
      accent,
      variant,
      disabled: isDisabled,
      className: styles.frame({ className }),
      ...pressableProps,
      children: [
        hasOverlayIcon ? /* @__PURE__ */ jsxRuntime.jsx(View, { className: styles.overlayIconContainer(), children: showSpinner || !terminalIcon ? /* @__PURE__ */ jsxRuntime.jsx(
          IndeterminateCircularProgress,
          {
            loading: isLoading,
            accent,
            size: size === "sm" ? "xs" : "sm"
          }
        ) : /* @__PURE__ */ jsxRuntime.jsx(AccentScope, { accent: terminalIconAccent, children: /* @__PURE__ */ jsxRuntime.jsx(
          Icon,
          {
            icon: terminalIcon,
            className: styles.terminalIcon(),
            size: size === "sm" ? 24 : 32
          }
        ) }) }) : null,
        icon ? /* @__PURE__ */ jsxRuntime.jsx(
          Icon,
          {
            icon,
            className: styles.icon(),
            size: size === "sm" ? 16 : 20
          }
        ) : null,
        /* @__PURE__ */ jsxRuntime.jsx(Text, { "aria-disabled": isDisabled, className: styles.text(), children: text })
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
        outlined: {},
        ghost: {}
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
        variant: "ghost",
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
      },
      {
        variant: "ghost",
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

const panelVariants = tailwindVariants.tv(
  {
    // w-full so the panel shrinks on small screens (the backdrop padding keeps a
    // margin); max-w caps it on wide viewports.
    base: "w-full max-h-full",
    variants: {
      size: {
        sm: "max-w-[360px]",
        md: "max-w-[520px]",
        lg: "max-w-[720px]"
      }
    },
    defaultVariants: { size: "md" }
  },
  { twMerge: false }
);
const titleReserveVariants = tailwindVariants.tv(
  {
    variants: {
      size: {
        sm: "pr-xxl",
        md: "pr-xl",
        lg: "pr-xl"
      }
    },
    defaultVariants: { size: "md" }
  },
  { twMerge: false }
);
function Modal({
  visible,
  onClose,
  children,
  icon,
  footer,
  accent,
  size = "md",
  title,
  hideCloseButton = false,
  closeButtonAriaLabel = "Close",
  role = "dialog",
  "aria-describedby": ariaDescribedby,
  testID,
  "aria-label": ariaLabel
}) {
  const { height: windowHeight } = reactNative.useWindowDimensions();
  const titleId = react.useId();
  const currentMode = useCurrentMode();
  return /* @__PURE__ */ jsxRuntime.jsx(
    reactNative.Modal,
    {
      transparent: true,
      visible,
      animationType: "fade",
      onRequestClose: onClose,
      children: /* @__PURE__ */ jsxRuntime.jsx(StableAccentScope, { accent, mode: currentMode, children: /* @__PURE__ */ jsxRuntime.jsxs(View, { className: "flex-1 flex-center p-l", children: [
        /* @__PURE__ */ jsxRuntime.jsx(
          reactNative.Pressable,
          {
            "aria-hidden": true,
            focusable: false,
            className: "absolute inset-0 bg-translucent",
            onPress: onClose
          }
        ),
        /* @__PURE__ */ jsxRuntime.jsx(
          View,
          {
            "aria-modal": true,
            role,
            "aria-label": title === void 0 ? ariaLabel : void 0,
            "aria-labelledby": title === void 0 ? void 0 : titleId,
            "aria-describedby": ariaDescribedby,
            testID,
            className: `relative ${panelVariants({ size })}`,
            children: /* @__PURE__ */ jsxRuntime.jsxs(
              Surface,
              {
                variant: "highlight",
                size,
                shadow: "l",
                className: "relative",
                children: [
                  hideCloseButton ? null : /* @__PURE__ */ jsxRuntime.jsx(
                    IconButton,
                    {
                      icon: /* @__PURE__ */ jsxRuntime.jsx(XRegularIcon.XRegularIcon, {}),
                      variant: "ghost",
                      size: size === "lg" ? "md" : size,
                      "aria-label": closeButtonAriaLabel,
                      className: "absolute right-sm top-sm z-10",
                      onPress: onClose
                    }
                  ),
                  /* @__PURE__ */ jsxRuntime.jsx(ScrollView, { style: { maxHeight: windowHeight * 0.7 }, children: /* @__PURE__ */ jsxRuntime.jsxs(VStack, { className: "gap-m", children: [
                    title === void 0 && icon === void 0 ? null : /* @__PURE__ */ jsxRuntime.jsxs(
                      HStack,
                      {
                        className: `items-center gap-xs ${hideCloseButton ? "" : titleReserveVariants({ size })}`,
                        children: [
                          icon === void 0 ? null : /* @__PURE__ */ jsxRuntime.jsx(Icon, { icon, size: 24, className: "text-accent" }),
                          title === void 0 ? null : /* @__PURE__ */ jsxRuntime.jsx(
                            Text,
                            {
                              nativeID: titleId,
                              className: "shrink font-heading-bold text-xl leading-tight text-sharp",
                              children: title
                            }
                          )
                        ]
                      }
                    ),
                    children,
                    footer === void 0 ? null : /* @__PURE__ */ jsxRuntime.jsx(HStack, { className: "items-center justify-end gap-m", children: footer })
                  ] }) })
                ]
              }
            )
          }
        )
      ] }) })
    }
  );
}

function resolveVariant(props, accent) {
  switch (props.variant) {
    case "alert": {
      const { onClose, closeText } = props;
      return {
        onDismiss: onClose,
        footer: /* @__PURE__ */ jsxRuntime.jsx(Button, { accent, text: closeText ?? "OK", onPress: onClose })
      };
    }
    case "required": {
      const { onConfirm, confirmText, confirmDisabled } = props;
      return {
        // Non-dismissible: only the explicit action closes it.
        onDismiss: () => void 0,
        footer: /* @__PURE__ */ jsxRuntime.jsx(
          Button,
          {
            accent,
            text: confirmText ?? "OK",
            disabled: confirmDisabled,
            onPress: onConfirm
          }
        )
      };
    }
    case "confirm":
    case void 0:
    default: {
      const { onConfirm, onCancel, confirmText, cancelText, confirmDisabled } = props;
      return {
        onDismiss: onCancel,
        footer: /* @__PURE__ */ jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [
          /* @__PURE__ */ jsxRuntime.jsx(
            Button,
            {
              variant: "outlined",
              text: cancelText ?? "Cancel",
              onPress: onCancel
            }
          ),
          /* @__PURE__ */ jsxRuntime.jsx(
            Button,
            {
              accent,
              text: confirmText ?? "Confirm",
              disabled: confirmDisabled,
              onPress: onConfirm
            }
          )
        ] })
      };
    }
  }
}
function AlertDialog(props) {
  const {
    visible,
    title,
    children,
    accent = "danger",
    icon,
    size = "md",
    testID
  } = props;
  const descriptionId = react.useId();
  const { footer, onDismiss } = resolveVariant(props, accent);
  return /* @__PURE__ */ jsxRuntime.jsx(
    Modal,
    {
      hideCloseButton: true,
      visible,
      role: "alertdialog",
      accent,
      size,
      title,
      icon,
      "aria-describedby": children === void 0 ? void 0 : descriptionId,
      testID,
      footer,
      onClose: onDismiss,
      children: children === void 0 ? null : /* @__PURE__ */ jsxRuntime.jsx(Text, { nativeID: descriptionId, className: "text-base text-muted", children })
    }
  );
}
function QuestionAlertDialog(props) {
  return /* @__PURE__ */ jsxRuntime.jsx(AlertDialog, { ...props, icon: /* @__PURE__ */ jsxRuntime.jsx(QuestionRegularIcon.QuestionRegularIcon, {}) });
}
function WarningAlertDialog(props) {
  return /* @__PURE__ */ jsxRuntime.jsx(AlertDialog, { ...props, icon: /* @__PURE__ */ jsxRuntime.jsx(WarningRegularIcon.WarningRegularIcon, {}) });
}
function InfoAlertDialog(props) {
  return /* @__PURE__ */ jsxRuntime.jsx(AlertDialog, { ...props, icon: /* @__PURE__ */ jsxRuntime.jsx(InfoRegularIcon.InfoRegularIcon, {}) });
}
function SuccessAlertDialog(props) {
  return /* @__PURE__ */ jsxRuntime.jsx(AlertDialog, { ...props, icon: /* @__PURE__ */ jsxRuntime.jsx(CheckRegularIcon.CheckRegularIcon, {}) });
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
const ICON_SIZE$1 = { sm: 20, md: 24, lg: 28 };
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
    /* @__PURE__ */ jsxRuntime.jsx(Icon, { icon, size: ICON_SIZE$1[size], className: "text-accent" }),
    /* @__PURE__ */ jsxRuntime.jsx(Text, { className: "text-accent grow", children }),
    onDismiss ? /* @__PURE__ */ jsxRuntime.jsx(
      Box,
      {
        style: { width: dismissDiameter, height: dismissDiameter },
        className: "flex-center",
        children: /* @__PURE__ */ jsxRuntime.jsx(
          IconButton,
          {
            icon: /* @__PURE__ */ jsxRuntime.jsx(XRegularIcon.XRegularIcon, {}),
            iconSize: size === "sm" ? "fill" : void 0,
            size: dismissDiameter,
            variant: "ghost",
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
function ErrorMessage(props) {
  return /* @__PURE__ */ jsxRuntime.jsx(Message, { ...props, accent: "danger", icon: /* @__PURE__ */ jsxRuntime.jsx(WarningDuotoneIcon.WarningDuotoneIcon, {}) });
}

const settledDisplayDurationMs = 4e3;
const idleState = { buttonState: void 0, error: null };
function pressAsyncReducer(previousState, action) {
  switch (action.type) {
    case "start":
      return { buttonState: "loading", error: null };
    case "resolve":
      return { buttonState: "success", error: null };
    case "reject":
      return { buttonState: "failed", error: action.error };
    case "settledTimeout":
      return { buttonState: void 0, error: previousState.error };
    default:
      throw new Error(`Unhandled action: ${JSON.stringify(action)}`);
  }
}
function usePressAsync(onPress) {
  const [pressAsyncState, dispatch] = react.useReducer(pressAsyncReducer, idleState);
  const settledTimerRef = react.useRef(null);
  react.useEffect(() => {
    return () => {
      clearTimeout(settledTimerRef.current);
    };
  }, []);
  function handlePress(event) {
    if (pressAsyncState.buttonState === "loading") return;
    clearTimeout(settledTimerRef.current);
    const result = onPress(event);
    if (!(result instanceof Promise)) return;
    dispatch({ type: "start" });
    function scheduleSettledTimeout() {
      settledTimerRef.current = setTimeout(() => {
        dispatch({ type: "settledTimeout" });
      }, settledDisplayDurationMs);
    }
    result.then(() => {
      dispatch({ type: "resolve" });
      scheduleSettledTimeout();
    }).catch((caughtError) => {
      const normalizedError = caughtError instanceof Error ? caughtError : new Error(String(caughtError));
      console.error(
        "Unexpected error caught in ActionButton",
        normalizedError
      );
      dispatch({ type: "reject", error: normalizedError });
      scheduleSettledTimeout();
    });
  }
  return { ...pressAsyncState, handlePress };
}

function ActionButton({
  onPress,
  errorToMessage,
  ...buttonProps
}) {
  const { buttonState, error, handlePress } = usePressAsync(onPress);
  return /* @__PURE__ */ jsxRuntime.jsxs(VStack, { children: [
    /* @__PURE__ */ jsxRuntime.jsx(Button, { ...buttonProps, state: buttonState, onPress: handlePress }),
    /* @__PURE__ */ jsxRuntime.jsx(
      View,
      {
        className: `overflow-hidden transition-[height,opacity] duration-collapse p-sm ${error ? "h-auto opacity-100" : "h-0 opacity-0"}`,
        children: /* @__PURE__ */ jsxRuntime.jsx(ErrorMessage, { size: "sm", children: errorToMessage(error) })
      }
    )
  ] });
}

const inputVariants = tailwindVariants.tv(
  {
    base: [
      "bg-highlight text-base text-sharp",
      "border",
      "transition-[border-color,background-color,outline-color] duration-fast ease-in",
      "outline-interactive-outlined-pressable",
      // to have proper outline color transition
      process.env.EXPO_PUBLIC_STORYBOOK_ENABLED ? "" : "border-interactive-outlined-pressable",
      "hover:border-interactive-outlined-hover",
      "focus:border-interactive-outlined-focus",
      "focus:outline-1 focus:outline-interactive-outlined-focus focus:outline-offset-0",
      "active:border-interactive-outlined-active",
      "disabled:bg-disabled-interactive-muted disabled:border-interactive-outlined-disabled disabled:text-form-disabled-text disabled:cursor-not-allowed"
    ].join(" "),
    variants: {
      multiline: {
        false: "rounded-md px-m py-xs",
        true: "min-h-[80px] resize-y rounded-xs px-xs py-xs"
      },
      forceStyle: {
        undefined: process.env.EXPO_PUBLIC_STORYBOOK_ENABLED ? "border-interactive-outlined-pressable" : "",
        hover: process.env.EXPO_PUBLIC_STORYBOOK_ENABLED ? "border-interactive-outlined-hover" : "",
        focus: process.env.EXPO_PUBLIC_STORYBOOK_ENABLED ? "border-interactive-outlined-focus outline-1 outline-interactive-outlined-focus outline-offset-0" : "",
        press: process.env.EXPO_PUBLIC_STORYBOOK_ENABLED ? "border-interactive-outlined-active" : ""
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
        disabled,
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
    "--color-disabled-interactive-muted",
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

function useControllableValue(controlled, defaultValue, onValueChange) {
  const [internal, setInternal] = react.useState(defaultValue);
  const value = controlled ?? internal;
  const setValue = react.useCallback(
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
  return [value, setValue];
}
const selectTriggerBaseClassName = [
  "flex-row items-center justify-between gap-xs",
  "rounded-md border px-m py-xs min-h-[44px]",
  "transition-[border-color,outline-color,background-color] duration-fast ease-in"
].join(" ");
const triggerLabelVariants = tailwindVariants.tv({
  base: "flex-1 text-base",
  variants: {
    // Mirrors InputText: sharp value, form-placeholder, form-disabled-text.
    state: {
      value: "text-sharp",
      placeholder: "text-form-placeholder",
      disabled: "text-form-disabled-text"
    }
  },
  defaultVariants: { state: "value" }
});
function SelectTriggerContent({
  label,
  placeholder,
  disabled
}) {
  const state = (() => {
    if (label === void 0) return "placeholder";
    if (disabled) return "disabled";
    return "value";
  })();
  return /* @__PURE__ */ jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [
    /* @__PURE__ */ jsxRuntime.jsx(Text, { numberOfLines: 1, className: triggerLabelVariants({ state }), children: label ?? placeholder ?? "" }),
    /* @__PURE__ */ jsxRuntime.jsx(
      Icon,
      {
        icon: /* @__PURE__ */ jsxRuntime.jsx(CaretDownRegularIcon.CaretDownRegularIcon, {}),
        size: 18,
        className: disabled ? "text-form-disabled-text" : "text-muted"
      }
    )
  ] });
}

const triggerVariants = tailwindVariants.tv(
  {
    base: selectTriggerBaseClassName,
    variants: {
      // bg lives in each branch (not the shared base) so the disabled bg never
      // competes with bg-highlight at equal specificity.
      disabled: {
        true: "bg-disabled-interactive-muted border-interactive-outlined-disabled",
        false: [
          "bg-highlight",
          "border-interactive-outlined-pressable",
          "hover:border-interactive-outlined-hover",
          "focus:border-interactive-outlined-focus",
          "active:border-interactive-outlined-active"
        ].join(" ")
      }
    },
    defaultVariants: { disabled: false }
  },
  { twMerge: false }
);
const optionVariants = tailwindVariants.tv(
  {
    base: [
      "flex-row items-center justify-between gap-xxs rounded-xs px-m py-m my-xxs",
      "hover:bg-interactive-contained-hover focus:bg-interactive-contained-focus active:bg-interactive-contained-active"
    ].join(" "),
    variants: {
      selected: {
        true: "bg-interactive-contained-active",
        false: "bg-interactive-contained-pressable"
      },
      disabled: {
        true: "opacity-50",
        false: ""
      }
    },
    defaultVariants: { selected: false, disabled: false }
  },
  { twMerge: false }
);
function SelectOptionRow({
  option,
  selected,
  onSelect
}) {
  return /* @__PURE__ */ jsxRuntime.jsxs(
    reactNative.Pressable,
    {
      role: "option",
      "aria-selected": selected,
      "aria-disabled": option.disabled === true,
      disabled: option.disabled,
      className: optionVariants({ selected, disabled: option.disabled }),
      onPress: () => {
        onSelect(option.value);
      },
      children: [
        /* @__PURE__ */ jsxRuntime.jsx(Text, { numberOfLines: 1, className: "flex-1 text-base text-on-accent", children: option.label }),
        selected ? /* @__PURE__ */ jsxRuntime.jsx(
          Icon,
          {
            icon: /* @__PURE__ */ jsxRuntime.jsx(CheckRegularIcon.CheckRegularIcon, {}),
            size: 18,
            className: "text-on-accent"
          }
        ) : null
      ]
    }
  );
}
function SelectInner({
  options,
  value,
  defaultValue,
  onValueChange,
  placeholder,
  disabled,
  testID,
  "aria-label": ariaLabel,
  "aria-labelledby": ariaLabelledby
}) {
  const [current, setValue] = useControllableValue(
    value,
    defaultValue,
    onValueChange
  );
  const [open, setOpen] = react.useState(false);
  const { height: windowHeight } = reactNative.useWindowDimensions();
  const selected = options.find((option) => option.value === current);
  const onSelect = (next) => {
    setValue(next);
    setOpen(false);
  };
  return /* @__PURE__ */ jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [
    /* @__PURE__ */ jsxRuntime.jsx(
      InteractiveBox,
      {
        withFocusVisibleOutline: true,
        role: "combobox",
        "aria-expanded": open,
        "aria-disabled": disabled === true,
        disabled,
        testID,
        "aria-label": ariaLabel,
        "aria-labelledby": ariaLabelledby,
        className: triggerVariants({ disabled }),
        onPress: () => {
          setOpen(true);
        },
        children: /* @__PURE__ */ jsxRuntime.jsx(
          SelectTriggerContent,
          {
            label: selected?.label,
            placeholder,
            disabled
          }
        )
      }
    ),
    /* @__PURE__ */ jsxRuntime.jsx(
      reactNative.Modal,
      {
        transparent: true,
        visible: open,
        animationType: "fade",
        onRequestClose: () => {
          setOpen(false);
        },
        children: /* @__PURE__ */ jsxRuntime.jsx(
          reactNative.Pressable,
          {
            className: "flex-1 justify-center bg-translucent px-xl",
            onPress: () => {
              setOpen(false);
            },
            children: /* @__PURE__ */ jsxRuntime.jsx(reactNative.Pressable, { className: "w-full", "aria-label": ariaLabel, children: /* @__PURE__ */ jsxRuntime.jsx(Surface, { variant: "highlight", shadow: "l", size: "sm", className: "py-xs", children: /* @__PURE__ */ jsxRuntime.jsx(
              ScrollView,
              {
                style: { maxHeight: windowHeight * 0.7 },
                showsVerticalScrollIndicator: false,
                children: options.map((option) => /* @__PURE__ */ jsxRuntime.jsx(
                  SelectOptionRow,
                  {
                    option,
                    selected: option.value === current,
                    onSelect
                  },
                  option.value
                ))
              }
            ) }) })
          }
        )
      }
    )
  ] });
}
function Select({ accent, ...rest }) {
  return /* @__PURE__ */ jsxRuntime.jsx(AccentScope, { accent, children: /* @__PURE__ */ jsxRuntime.jsx(SelectInner, { ...rest }) });
}

const RadioContext = react.createContext(void 0);
const RadioContextProvider = RadioContext.Provider;
function useRadioContext() {
  const context = react.useContext(RadioContext);
  if (!context) {
    throw new Error(
      "Radio and RadioButton must be rendered inside a RadioGroup or RadioButtonGroup."
    );
  }
  return context;
}

function RadioGroup({
  value: controlledValue,
  defaultValue,
  onValueChange,
  accent,
  disabled,
  children,
  ...props
}) {
  const [value, onSelect] = useControllableValue(
    controlledValue,
    defaultValue,
    onValueChange
  );
  const context = react.useMemo(
    () => ({ value, onSelect, disabled }),
    [value, onSelect, disabled]
  );
  return /* @__PURE__ */ jsxRuntime.jsx(AccentScope, { accent, children: /* @__PURE__ */ jsxRuntime.jsx(RadioContextProvider, { value: context, children: /* @__PURE__ */ jsxRuntime.jsx(View, { role: "radiogroup", ...props, children }) }) });
}

const indicatorVariants = tailwindVariants.tv({
  base: "size-[22px] rounded-full border-2 items-center justify-center transition-[border-color] duration-fast ease-in",
  variants: {
    selected: {
      true: "border-accent",
      false: "border-interactive-outlined-pressable group-hover:border-interactive-outlined-hover group-active:border-interactive-outlined-active"
    },
    disabled: {
      true: "border-interactive-outlined-disabled",
      false: ""
    }
  }
});
const dotVariants = tailwindVariants.tv({
  base: "size-[10px] rounded-full bg-accent transition-transform duration-fast ease-in",
  variants: {
    selected: {
      true: "scale-100",
      false: "scale-0"
    }
  }
});
const labelVariants$1 = tailwindVariants.tv({
  base: "text-base",
  variants: {
    disabled: {
      true: "text-disabled-sharp",
      false: "text-sharp"
    }
  }
});
function Radio({ value, label, disabled }) {
  const {
    value: selectedValue,
    onSelect,
    disabled: groupDisabled
  } = useRadioContext();
  const selected = selectedValue === value;
  const isDisabled = disabled === true || groupDisabled === true;
  const currentTheme = useCurrentTheme();
  const currentMode = useCurrentMode();
  return /* @__PURE__ */ jsxRuntime.jsxs(
    InteractiveBox,
    {
      withFocusVisibleOutline: true,
      role: "radio",
      "aria-checked": selected,
      "aria-disabled": isDisabled,
      "aria-label": label,
      disabled: isDisabled,
      className: "group flex-row items-center gap-xs self-start rounded-xs px-xs min-h-11 focus-visible:outline-interactive-outlined-outline-focus",
      onPress: () => {
        onSelect(value);
      },
      children: [
        /* @__PURE__ */ jsxRuntime.jsx(
          ScopedTheme,
          {
            theme: currentTheme === currentMode ? `${currentTheme}_brand` : currentTheme,
            children: /* @__PURE__ */ jsxRuntime.jsx(View, { className: indicatorVariants({ selected, disabled: isDisabled }), children: /* @__PURE__ */ jsxRuntime.jsx(View, { className: dotVariants({ selected }) }) })
          }
        ),
        /* @__PURE__ */ jsxRuntime.jsx(Text, { className: labelVariants$1({ disabled: isDisabled }), children: label })
      ]
    }
  );
}

function RadioButtonGroup({
  value: controlledValue,
  defaultValue,
  onValueChange,
  accent,
  disabled,
  children,
  ...props
}) {
  const [value, onSelect] = useControllableValue(
    controlledValue,
    defaultValue,
    onValueChange
  );
  const context = react.useMemo(
    () => ({ value, onSelect, disabled }),
    [value, onSelect, disabled]
  );
  return /* @__PURE__ */ jsxRuntime.jsx(AccentScope, { accent, children: /* @__PURE__ */ jsxRuntime.jsx(RadioContextProvider, { value: context, children: /* @__PURE__ */ jsxRuntime.jsx(
    Surface,
    {
      variant: "lowered",
      role: "radiogroup",
      size: "sm",
      className: "flex-row items-stretch self-start gap-xxs px-xs py-0 min-h-[44px]",
      ...props,
      children
    }
  ) }) });
}

const chipVariants = tailwindVariants.tv({
  base: "absolute inset-0 rounded-xs transition-opacity duration-fast ease-in",
  variants: {
    selected: {
      true: "opacity-100",
      false: "opacity-0"
    },
    disabled: {
      true: "bg-interactive-contained-disabled",
      false: "bg-interactive-contained-pressable shadow-s"
    }
  }
});
const segmentVariants = tailwindVariants.tv({
  base: "relative flex-center min-h-[32px] rounded-xs border border-transparent px-m transition-[border-color] duration-fast ease-in",
  variants: {
    selected: { true: "", false: "" },
    disabled: { true: "", false: "" }
  },
  compoundVariants: [
    {
      selected: false,
      disabled: false,
      class: "group-hover:border-interactive-outlined-hover group-active:border-interactive-outlined-active"
    }
  ]
});
const labelVariants = tailwindVariants.tv({
  base: "z-1 select-none font-body-bold text-base text-center transition-[color] duration-fast ease-in",
  variants: {
    selected: {
      true: "text-on-accent",
      false: "text-muted group-hover:text-sharp"
    },
    disabled: {
      true: "text-disabled-muted group-hover:text-disabled-muted",
      false: ""
    }
  },
  compoundVariants: [
    {
      selected: true,
      disabled: true,
      class: "text-disabled-sharp group-hover:text-disabled-sharp"
    }
  ]
});
function RadioButton({
  value,
  label,
  disabled
}) {
  const {
    value: selectedValue,
    onSelect,
    disabled: groupDisabled
  } = useRadioContext();
  const selected = selectedValue === value;
  const isDisabled = disabled === true || groupDisabled === true;
  return /* @__PURE__ */ jsxRuntime.jsx(
    InteractiveBox,
    {
      withFocusVisibleOutline: true,
      role: "radio",
      "aria-checked": selected,
      "aria-disabled": isDisabled,
      "aria-label": label,
      disabled: isDisabled,
      className: "group flex-center min-h-[44px] rounded-xs focus-visible:outline-interactive-outlined-outline-focus",
      onPress: () => {
        onSelect(value);
      },
      children: /* @__PURE__ */ jsxRuntime.jsxs(View, { className: segmentVariants({ selected, disabled: isDisabled }), children: [
        /* @__PURE__ */ jsxRuntime.jsx(View, { className: chipVariants({ selected, disabled: isDisabled }) }),
        /* @__PURE__ */ jsxRuntime.jsx(
          Text,
          {
            numberOfLines: 1,
            className: labelVariants({ selected, disabled: isDisabled }),
            children: label
          }
        )
      ] })
    }
  );
}

function FormItem({
  label,
  details,
  error,
  isRequiredError,
  required,
  indented,
  onLabelPress,
  render
}) {
  const labelId = react.useId();
  const hasError = Boolean(error);
  const showWarningIcon = hasError && !isRequiredError;
  const marker = (() => {
    if (required === true) {
      return /* @__PURE__ */ jsxRuntime.jsxs(HStack, { className: "gap-xxs items-center", children: [
        /* @__PURE__ */ jsxRuntime.jsx(
          Icon,
          {
            icon: /* @__PURE__ */ jsxRuntime.jsx(AsteriskSimpleRegularIcon.AsteriskSimpleRegularIcon, {}),
            size: 12,
            className: "text-accent"
          }
        ),
        showWarningIcon ? /* @__PURE__ */ jsxRuntime.jsx(
          Icon,
          {
            icon: /* @__PURE__ */ jsxRuntime.jsx(WarningRegularIcon.WarningRegularIcon, {}),
            size: 16,
            className: "text-accent"
          }
        ) : null
      ] });
    }
    if (required) {
      return required;
    }
    if (showWarningIcon) {
      return /* @__PURE__ */ jsxRuntime.jsx(Icon, { icon: /* @__PURE__ */ jsxRuntime.jsx(WarningRegularIcon.WarningRegularIcon, {}), size: 16, className: "text-accent" });
    }
    return null;
  })();
  return /* @__PURE__ */ jsxRuntime.jsxs(VStack, { className: "gap-xxs", children: [
    /* @__PURE__ */ jsxRuntime.jsx(reactNative.Pressable, { onPress: onLabelPress, children: /* @__PURE__ */ jsxRuntime.jsxs(VStack, { children: [
      /* @__PURE__ */ jsxRuntime.jsxs(HStack, { className: "gap-xxs items-center", children: [
        /* @__PURE__ */ jsxRuntime.jsx(
          Text,
          {
            nativeID: labelId,
            accent: hasError ? "danger" : void 0,
            className: `font-body-bold text-md ${hasError ? "text-accent" : ""}`,
            children: label
          }
        ),
        marker ? /* @__PURE__ */ jsxRuntime.jsx(View, { "aria-hidden": true, children: hasError ? /* @__PURE__ */ jsxRuntime.jsx(AccentScope, { accent: "danger", children: marker }) : marker }) : null
      ] }),
      details ? /* @__PURE__ */ jsxRuntime.jsx(Text, { className: "text-muted text-sm", children: details }) : null
    ] }) }),
    indented ? /* @__PURE__ */ jsxRuntime.jsx(View, { className: "border-l border-border-muted pl-m", children: render(labelId) }) : render(labelId),
    error ? /* @__PURE__ */ jsxRuntime.jsx(View, { className: "px-m", children: /* @__PURE__ */ jsxRuntime.jsx(Text, { role: "alert", accent: "danger", className: "text-accent text-sm", children: error }) }) : null
  ] });
}

class FormValidationError extends Error {
  constructor() {
    super("Form validation failed.");
    this.name = "FormValidationError";
  }
}
function Form({
  defaultValues,
  mode = "onTouched",
  onSubmit,
  onSubmitError,
  render
}) {
  const form = reactHookForm.useForm({ mode, defaultValues });
  function submit() {
    let valid = true;
    const result = form.handleSubmit(onSubmit, () => {
      valid = false;
    })().then(() => {
      if (!valid) throw new FormValidationError();
    });
    if (onSubmitError) result.catch(onSubmitError);
    return result;
  }
  return /* @__PURE__ */ jsxRuntime.jsx(reactHookForm.FormProvider, { ...form, children: render({ submit }) });
}

function FormField({
  name,
  label,
  required,
  validate,
  renderError,
  render
}) {
  const { control, setFocus } = reactHookForm.useFormContext();
  return /* @__PURE__ */ jsxRuntime.jsx(
    reactHookForm.Controller,
    {
      control,
      name,
      rules: { required: Boolean(required), validate },
      render: ({ field, fieldState }) => {
        const requiredError = fieldState.error?.type === "required" && required !== true ? required : void 0;
        return /* @__PURE__ */ jsxRuntime.jsx(
          FormItem,
          {
            label,
            required: Boolean(required),
            isRequiredError: fieldState.error?.type === "required",
            error: renderError ? renderError(fieldState.error) : requiredError ?? fieldState.error?.message,
            render: (labelId) => render({ field, labelId }),
            onLabelPress: () => {
              setFocus(name);
            }
          }
        );
      }
    }
  );
}

function FormFieldArrayItem({
  name,
  itemLabel,
  removeLabel,
  index,
  removable,
  onRemove,
  render
}) {
  const [pendingRemoval, setPendingRemoval] = react.useState(false);
  return /* @__PURE__ */ jsxRuntime.jsx(StableAccentScope, { accent: pendingRemoval ? "danger" : void 0, children: /* @__PURE__ */ jsxRuntime.jsxs(HStack, { className: "gap-sm items-center p-xxs", children: [
    /* @__PURE__ */ jsxRuntime.jsx(View, { className: "grow shrink basis-0", children: render({ name, index, label: itemLabel }) }),
    removable ? /* @__PURE__ */ jsxRuntime.jsx(
      IconButton,
      {
        variant: "ghost",
        icon: /* @__PURE__ */ jsxRuntime.jsx(TrashRegularIcon.TrashRegularIcon, {}),
        "aria-label": removeLabel,
        onHoverIn: () => {
          setPendingRemoval(true);
        },
        onHoverOut: () => {
          setPendingRemoval(false);
        },
        onPress: onRemove
      }
    ) : null
  ] }) });
}
function FormFieldArray({
  name,
  label,
  details,
  emptyValue,
  minSize = 0,
  addLabel = "Add item",
  disableAdd,
  removeLabel = (itemLabel) => `Remove ${itemLabel}`,
  render
}) {
  const { control } = reactHookForm.useFormContext();
  const { fields, append, remove } = reactHookForm.useFieldArray({
    control,
    name
  });
  const paddedRef = react.useRef(false);
  react.useEffect(() => {
    if (paddedRef.current) return;
    paddedRef.current = true;
    const shortfall = minSize - fields.length;
    if (shortfall > 0) {
      append(
        Array.from({ length: shortfall }, () => emptyValue),
        { shouldFocus: false }
      );
    }
  }, [append, emptyValue, fields.length, minSize]);
  return /* @__PURE__ */ jsxRuntime.jsx(
    FormItem,
    {
      label,
      details,
      render: () => /* @__PURE__ */ jsxRuntime.jsxs(VStack, { className: "gap-xs", children: [
        fields.map((field, index) => /* @__PURE__ */ jsxRuntime.jsx(
          FormFieldArrayItem,
          {
            name: `${name}.${index}`,
            itemLabel: `${label} ${index + 1}`,
            removeLabel: removeLabel(`${label} ${index + 1}`),
            index,
            removable: index >= minSize,
            render,
            onRemove: () => {
              remove(index);
            }
          },
          field.id
        )),
        /* @__PURE__ */ jsxRuntime.jsx(
          Button,
          {
            size: "sm",
            variant: "outlined",
            icon: /* @__PURE__ */ jsxRuntime.jsx(PlusRegularIcon.PlusRegularIcon, {}),
            text: addLabel,
            className: "self-start",
            disabled: disableAdd,
            onPress: () => {
              append(emptyValue);
            }
          }
        )
      ] })
    }
  );
}

function FormSubmitButton({
  label,
  onPress,
  errorToMessage
}) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    ActionButton,
    {
      text: label,
      errorToMessage,
      onPress
    }
  );
}

function SimpleVForm({
  submitLabel,
  submitErrorToMessage,
  className,
  render,
  ...formProps
}) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    Form,
    {
      ...formProps,
      render: ({ submit }) => /* @__PURE__ */ jsxRuntime.jsxs(VStack, { className: className ?? "gap-l", children: [
        render({ submit }),
        /* @__PURE__ */ jsxRuntime.jsx(
          FormSubmitButton,
          {
            label: submitLabel,
            errorToMessage: submitErrorToMessage,
            onPress: submit
          }
        )
      ] })
    }
  );
}

const badgeVariants = tailwindVariants.tv(
  {
    slots: {
      frame: "flex-row items-center self-start rounded-full",
      text: "font-body-bold",
      icon: ""
    },
    variants: {
      size: {
        sm: { frame: "gap-xxs px-xs py-xxs", text: "text-xs", icon: "" },
        md: { frame: "gap-xs px-sm py-xxs", text: "text-sm", icon: "" }
      },
      variant: {
        solid: {
          frame: "bg-highlight-accent",
          text: "text-sharp",
          icon: "text-sharp"
        },
        "solid.enabled": {
          frame: "bg-enabled",
          text: "text-sharp",
          icon: "text-sharp"
        },
        outlined: {
          frame: "border border-accent",
          text: "text-accent",
          icon: "text-accent"
        }
      }
    },
    defaultVariants: { size: "md", variant: "solid" }
  },
  { twMerge: false }
);
const ICON_SIZE = { sm: 12, md: 16 };
function Badge({
  accent = "brand",
  size = "md",
  variant = "solid",
  icon,
  children
}) {
  const styles = badgeVariants({ size, variant });
  return /* @__PURE__ */ jsxRuntime.jsx(AccentScope, { accent, children: /* @__PURE__ */ jsxRuntime.jsxs(Box, { className: styles.frame(), children: [
    icon ? /* @__PURE__ */ jsxRuntime.jsx(Icon, { icon, size: ICON_SIZE[size], className: styles.icon() }) : null,
    /* @__PURE__ */ jsxRuntime.jsx(Text, { className: styles.text(), children })
  ] }) });
}

const connectedHoldMs = 1200;
function ConnectionState({
  state,
  forceHidden,
  forceVisible,
  children
}) {
  const connected = state === "connected";
  const [hideAfterHold, setHideAfterHold] = react.useState(false);
  react.useEffect(() => {
    if (!connected || forceVisible) {
      setHideAfterHold(false);
      return void 0;
    }
    const timer = setTimeout(() => {
      setHideAfterHold(true);
    }, connectedHoldMs);
    return () => {
      clearTimeout(timer);
    };
  }, [connected, forceVisible]);
  const hidden = forceHidden || !forceVisible && (!state || connected && hideAfterHold);
  const accent = connected ? "success" : "danger";
  return /* @__PURE__ */ jsxRuntime.jsx(AccentScope, { accent, children: /* @__PURE__ */ jsxRuntime.jsx(
    View,
    {
      className: `absolute inset-x-0 top-0 z-9 h-0.5 bg-interactive-contained-pressable shadow-m transition-transform duration-slide ease-in-out ${hidden ? "-translate-y-6" : "translate-y-0"}`,
      children: state ? /* @__PURE__ */ jsxRuntime.jsx(Text, { className: "absolute left-1/2 top-0.5 h-5.5 w-50 -translate-x-1/2 rounded-b-sm bg-interactive-contained-pressable text-center leading-5.5 text-on-accent transition-colors duration-fast", children }) : null
    }
  ) });
}

const track = tailwindVariants.tv({
  base: "absolute inset-x-0 top-0 z-10 overflow-hidden transition-opacity duration-fade",
  variants: {
    size: {
      xs: "h-0.5",
      sm: "h-1",
      md: "h-1.5",
      lg: "h-2"
    },
    hidden: {
      true: "opacity-0",
      false: "opacity-100"
    }
  },
  defaultVariants: { size: "md", hidden: false }
});
function LinearProgress({
  progress,
  hidden = false,
  accent = "brand",
  size = "md"
}) {
  return /* @__PURE__ */ jsxRuntime.jsx(AccentScope, { accent, children: /* @__PURE__ */ jsxRuntime.jsx(View, { pointerEvents: "none", className: track({ size, hidden }), children: /* @__PURE__ */ jsxRuntime.jsx(
    View,
    {
      className: "h-full bg-accent transition-[width] duration-progress ease-out",
      style: { width: `${progress}%` }
    }
  ) }) });
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
exports.ActionButton = ActionButton;
exports.AlertDialog = AlertDialog;
exports.AlouetteDecorator = AlouetteDecorator;
exports.AlouetteProvider = AlouetteProvider;
exports.Badge = Badge;
exports.Box = Box;
exports.BreakpointNameEnum = BreakpointNameEnum;
exports.Breakpoints = Breakpoints;
exports.Button = Button;
exports.CircularProgress = CircularProgress;
exports.ConfirmationMessage = ConfirmationMessage;
exports.ConnectionState = ConnectionState;
exports.ErrorMessage = ErrorMessage;
exports.ExternalLink = ExternalLink;
exports.ExternalLinkButton = ExternalLinkButton;
exports.FlatList = FlatList;
exports.Form = Form;
exports.FormField = FormField;
exports.FormFieldArray = FormFieldArray;
exports.FormItem = FormItem;
exports.FormSubmitButton = FormSubmitButton;
exports.FormValidationError = FormValidationError;
exports.GradientBackground = GradientBackground;
exports.GradientScrollView = GradientScrollView;
exports.HStack = HStack;
exports.Icon = Icon;
exports.IconButton = IconButton;
exports.InfoAlertDialog = InfoAlertDialog;
exports.InfoMessage = InfoMessage;
exports.InputText = InputText;
exports.InteractiveBox = InteractiveBox;
exports.InternalLinkButton = InternalLinkButton;
exports.LinearProgress = LinearProgress;
exports.Message = Message;
exports.Modal = Modal;
exports.Paragraph = Paragraph;
exports.PresenceList = PresenceList;
exports.PresenceOne = PresenceOne;
exports.PressableBox = PressableBox;
exports.PressableListItem = PressableListItem;
exports.QuestionAlertDialog = QuestionAlertDialog;
exports.Radio = Radio;
exports.RadioButton = RadioButton;
exports.RadioButtonGroup = RadioButtonGroup;
exports.RadioGroup = RadioGroup;
exports.SafeAreaBox = SafeAreaBox;
exports.ScopedTheme = ScopedTheme;
exports.ScrollView = ScrollView;
exports.SectionList = SectionList;
exports.Select = Select;
exports.Separator = Separator;
exports.SimpleVForm = SimpleVForm;
exports.StableAccentScope = StableAccentScope;
exports.Stack = Stack;
exports.Story = Story;
exports.StoryContainer = StoryContainer;
exports.StoryDecorator = StoryDecorator;
exports.StoryGrid = StoryGrid;
exports.StoryTitle = StoryTitle;
exports.SuccessAlertDialog = SuccessAlertDialog;
exports.Surface = Surface;
exports.Switch = Switch;
exports.SwitchBreakpointsUsingDisplayNone = SwitchBreakpointsUsingDisplayNone;
exports.SwitchBreakpointsUsingNull = SwitchBreakpointsUsingNull;
exports.Text = Text;
exports.TextArea = TextArea;
exports.VStack = VStack;
exports.View = View;
exports.WarningAlertDialog = WarningAlertDialog;
exports.WarningMessage = WarningMessage;
exports.animationDurationsMs = animationDurationsMs;
exports.styled = styled;
exports.themeVariables = themeVariables;
exports.useCurrentBreakpointName = useCurrentBreakpointName;
exports.useCurrentBreakpointNameFiltered = useCurrentBreakpointNameFiltered;
exports.useCurrentMode = useCurrentMode;
exports.useCurrentTheme = useCurrentTheme;
exports.useThemeToken = useThemeToken;
//# sourceMappingURL=index-node22.cjs.map
