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
    "--color-screen": "#EEEEEE",
    "--color-highlight": "#FFFFFF",
    "--color-disabled-sharp": "#5D5D5D",
    "--color-disabled-muted": "#838383",
    "--color-disabled-interactive": "#BABABA",
    "--color-disabled-interactive-muted": "#DBDBDB",
    "--color-sharp": "#262626",
    "--color-muted": "#4D4D4D",
    "--color-form-border-disabled": "#BABABA",
    "--color-form-placeholder": "#5D5D5D",
    "--color-form-disabled-text": "#4D4D4D",
    "--color-interactive-contained-disabled": "#CECECE",
    "--color-interactive-outlined-disabled": "#BABABA",
    "--color-interactive-accent-outlined-disabled": "#BABABA",
    "--color-surface": "#F8F8F8",
    "--color-enabled": "#5D5D5D",
    "--color-highlight-accent": "#DBDBDB",
    "--color-lowered": "#DBDBDB",
    "--color-screen-gradient-start": "#DBDBDB",
    "--color-screen-gradient-middle": "#CECECE",
    "--color-screen-gradient-end": "#BABABA",
    "--color-border-muted": "#CECECE",
    "--color-border-sharp": "#5D5D5D",
    "--color-interactive-contained-pressable": "#FFFFFF",
    "--color-interactive-contained-hover": "#F8F8F8",
    "--color-interactive-contained-focus": "#F8F8F8",
    "--color-interactive-contained-active": "#EEEEEE",
    "--color-interactive-outlined-pressable": "#5D5D5D",
    "--color-interactive-outlined-hover": "#838383",
    "--color-interactive-outlined-focus": "#838383",
    "--color-interactive-outlined-active": "#838383",
    "--color-interactive-outlined-outline-focus": "#838383",
    "--color-interactive-active": "#5D5D5D",
    "--color-interactive-pressable": "#4D4D4D",
    "--color-interactive-hover": "#262626",
    "--color-accent": "#262626",
    "--color-on-accent": "#262626",
    "--color-on-accent-muted": "#5D5D5D",
    "--color-selection": "#4D4D4D40"
  },
  "dark": {
    "--color-translucent": "#1f1e1e55",
    "--color-screen": "#1B1B1B",
    "--color-highlight": "#292929",
    "--color-disabled-sharp": "#D2D2D2",
    "--color-disabled-muted": "#D2D2D2",
    "--color-disabled-interactive": "#555555",
    "--color-disabled-interactive-muted": "#292929",
    "--color-sharp": "#F2F2F2",
    "--color-muted": "#D2D2D2",
    "--color-form-border-disabled": "#555555",
    "--color-form-placeholder": "#BCBCBC",
    "--color-form-disabled-text": "#D2D2D2",
    "--color-interactive-contained-disabled": "#333333",
    "--color-interactive-outlined-disabled": "#424242",
    "--color-interactive-accent-outlined-disabled": "#424242",
    "--color-surface": "#242424",
    "--color-enabled": "#555555",
    "--color-highlight-accent": "#292929",
    "--color-lowered": "#121212",
    "--color-screen-gradient-start": "#242424",
    "--color-screen-gradient-middle": "#1B1B1B",
    "--color-screen-gradient-end": "#121212",
    "--color-border-muted": "#555555",
    "--color-border-sharp": "#BCBCBC",
    "--color-interactive-contained-pressable": "#424242",
    "--color-interactive-contained-hover": "#555555",
    "--color-interactive-contained-focus": "#555555",
    "--color-interactive-contained-active": "#555555",
    "--color-interactive-outlined-pressable": "#555555",
    "--color-interactive-outlined-hover": "#BCBCBC",
    "--color-interactive-outlined-focus": "#BCBCBC",
    "--color-interactive-outlined-active": "#BCBCBC",
    "--color-interactive-outlined-outline-focus": "#BCBCBC",
    "--color-interactive-active": "#D2D2D2",
    "--color-interactive-pressable": "#F2F2F2",
    "--color-interactive-hover": "#FFFFFF",
    "--color-accent": "#FFFFFF",
    "--color-on-accent": "#FFFFFF",
    "--color-on-accent-muted": "#F2F2F2",
    "--color-selection": "#F2F2F240"
  },
  "light_brand": {
    "--color-translucent": "#ffffff66",
    "--color-screen": "#EEEEEE",
    "--color-highlight": "#FFFFFF",
    "--color-disabled-sharp": "#5D5D5D",
    "--color-disabled-muted": "#838383",
    "--color-disabled-interactive": "#BABABA",
    "--color-disabled-interactive-muted": "#DBDBDB",
    "--color-sharp": "#262626",
    "--color-muted": "#4D4D4D",
    "--color-form-border-disabled": "#BABABA",
    "--color-form-placeholder": "#5D5D5D",
    "--color-form-disabled-text": "#4D4D4D",
    "--color-interactive-contained-disabled": "#CECECE",
    "--color-interactive-outlined-disabled": "#BABABA",
    "--color-interactive-accent-outlined-disabled": "#BABABA",
    "--color-surface": "#EDF6FA",
    "--color-enabled": "#0A6783",
    "--color-highlight-accent": "#BDE2F1",
    "--color-lowered": "#BDE2F1",
    "--color-screen-gradient-start": "#BDE2F1",
    "--color-screen-gradient-middle": "#98D9F3",
    "--color-screen-gradient-end": "#60CAF0",
    "--color-border-muted": "#98D9F3",
    "--color-border-sharp": "#0A6783",
    "--color-interactive-contained-pressable": "#0A6783",
    "--color-interactive-contained-hover": "#0E7A9A",
    "--color-interactive-contained-focus": "#0E7A9A",
    "--color-interactive-contained-active": "#2493B7",
    "--color-interactive-outlined-pressable": "#0A6783",
    "--color-interactive-outlined-hover": "#2493B7",
    "--color-interactive-outlined-focus": "#2493B7",
    "--color-interactive-outlined-active": "#2493B7",
    "--color-interactive-outlined-outline-focus": "#2493B7",
    "--color-interactive-active": "#0A6783",
    "--color-interactive-pressable": "#07556D",
    "--color-interactive-hover": "#032B38",
    "--color-accent": "#07556D",
    "--color-on-accent": "#FFFFFF",
    "--color-on-accent-muted": "#BDE2F1",
    "--color-selection": "#07556D40"
  },
  "light_info": {
    "--color-translucent": "#ffffff66",
    "--color-screen": "#EEEEEE",
    "--color-highlight": "#FFFFFF",
    "--color-disabled-sharp": "#5D5D5D",
    "--color-disabled-muted": "#838383",
    "--color-disabled-interactive": "#BABABA",
    "--color-disabled-interactive-muted": "#DBDBDB",
    "--color-sharp": "#262626",
    "--color-muted": "#4D4D4D",
    "--color-form-border-disabled": "#BABABA",
    "--color-form-placeholder": "#5D5D5D",
    "--color-form-disabled-text": "#4D4D4D",
    "--color-interactive-contained-disabled": "#CECECE",
    "--color-interactive-outlined-disabled": "#BABABA",
    "--color-interactive-accent-outlined-disabled": "#BABABA",
    "--color-surface": "#EFF6FA",
    "--color-enabled": "#0A668B",
    "--color-highlight-accent": "#C3E0F1",
    "--color-lowered": "#C3E0F1",
    "--color-screen-gradient-start": "#C3E0F1",
    "--color-screen-gradient-middle": "#A2D6F3",
    "--color-screen-gradient-end": "#75C6F0",
    "--color-border-muted": "#A2D6F3",
    "--color-border-sharp": "#0A668B",
    "--color-interactive-contained-pressable": "#0A668B",
    "--color-interactive-contained-hover": "#0D78A3",
    "--color-interactive-contained-focus": "#0D78A3",
    "--color-interactive-contained-active": "#2391C1",
    "--color-interactive-outlined-pressable": "#0A668B",
    "--color-interactive-outlined-hover": "#2391C1",
    "--color-interactive-outlined-focus": "#2391C1",
    "--color-interactive-outlined-active": "#2391C1",
    "--color-interactive-outlined-outline-focus": "#2391C1",
    "--color-interactive-active": "#0A668B",
    "--color-interactive-pressable": "#065473",
    "--color-interactive-hover": "#032A3C",
    "--color-accent": "#065473",
    "--color-on-accent": "#FFFFFF",
    "--color-on-accent-muted": "#C3E0F1",
    "--color-selection": "#06547340"
  },
  "light_success": {
    "--color-translucent": "#ffffff66",
    "--color-screen": "#EEEEEE",
    "--color-highlight": "#FFFFFF",
    "--color-disabled-sharp": "#5D5D5D",
    "--color-disabled-muted": "#838383",
    "--color-disabled-interactive": "#BABABA",
    "--color-disabled-interactive-muted": "#DBDBDB",
    "--color-sharp": "#262626",
    "--color-muted": "#4D4D4D",
    "--color-form-border-disabled": "#BABABA",
    "--color-form-placeholder": "#5D5D5D",
    "--color-form-disabled-text": "#4D4D4D",
    "--color-interactive-contained-disabled": "#CECECE",
    "--color-interactive-outlined-disabled": "#BABABA",
    "--color-interactive-accent-outlined-disabled": "#BABABA",
    "--color-surface": "#E9FAE9",
    "--color-enabled": "#0A721F",
    "--color-highlight-accent": "#A2F2A4",
    "--color-lowered": "#A2F2A4",
    "--color-screen-gradient-start": "#A2F2A4",
    "--color-screen-gradient-middle": "#6AEF75",
    "--color-screen-gradient-end": "#5ADA65",
    "--color-border-muted": "#6AEF75",
    "--color-border-sharp": "#0A721F",
    "--color-interactive-contained-pressable": "#0A721F",
    "--color-interactive-contained-hover": "#0E8626",
    "--color-interactive-contained-focus": "#0E8626",
    "--color-interactive-contained-active": "#24A037",
    "--color-interactive-outlined-pressable": "#0A721F",
    "--color-interactive-outlined-hover": "#24A037",
    "--color-interactive-outlined-focus": "#24A037",
    "--color-interactive-outlined-active": "#24A037",
    "--color-interactive-outlined-outline-focus": "#24A037",
    "--color-interactive-active": "#0A721F",
    "--color-interactive-pressable": "#075E18",
    "--color-interactive-hover": "#033009",
    "--color-accent": "#075E18",
    "--color-on-accent": "#FFFFFF",
    "--color-on-accent-muted": "#A2F2A4",
    "--color-selection": "#075E1840"
  },
  "light_warning": {
    "--color-translucent": "#ffffff66",
    "--color-screen": "#EEEEEE",
    "--color-highlight": "#FFFFFF",
    "--color-disabled-sharp": "#5D5D5D",
    "--color-disabled-muted": "#838383",
    "--color-disabled-interactive": "#BABABA",
    "--color-disabled-interactive-muted": "#DBDBDB",
    "--color-sharp": "#262626",
    "--color-muted": "#4D4D4D",
    "--color-form-border-disabled": "#BABABA",
    "--color-form-placeholder": "#5D5D5D",
    "--color-form-disabled-text": "#4D4D4D",
    "--color-interactive-contained-disabled": "#CECECE",
    "--color-interactive-outlined-disabled": "#BABABA",
    "--color-interactive-accent-outlined-disabled": "#BABABA",
    "--color-surface": "#FAF5E1",
    "--color-enabled": "#916F0C",
    "--color-highlight-accent": "#F5E7B7",
    "--color-lowered": "#F5E7B7",
    "--color-screen-gradient-start": "#F5E7B7",
    "--color-screen-gradient-middle": "#F6D97B",
    "--color-screen-gradient-end": "#E3C156",
    "--color-border-muted": "#F6D97B",
    "--color-border-sharp": "#916F0C",
    "--color-interactive-contained-pressable": "#916F0C",
    "--color-interactive-contained-hover": "#9F7A0F",
    "--color-interactive-contained-focus": "#9F7A0F",
    "--color-interactive-contained-active": "#E2B930",
    "--color-interactive-outlined-pressable": "#916F0C",
    "--color-interactive-outlined-hover": "#E2B930",
    "--color-interactive-outlined-focus": "#E2B930",
    "--color-interactive-outlined-active": "#E2B930",
    "--color-interactive-outlined-outline-focus": "#E2B930",
    "--color-interactive-active": "#916F0C",
    "--color-interactive-pressable": "#694D06",
    "--color-interactive-hover": "#342302",
    "--color-accent": "#694D06",
    "--color-on-accent": "#FFFFFF",
    "--color-on-accent-muted": "#F5E7B7",
    "--color-selection": "#694D0640"
  },
  "light_danger": {
    "--color-translucent": "#ffffff66",
    "--color-screen": "#EEEEEE",
    "--color-highlight": "#FFFFFF",
    "--color-disabled-sharp": "#5D5D5D",
    "--color-disabled-muted": "#838383",
    "--color-disabled-interactive": "#BABABA",
    "--color-disabled-interactive-muted": "#DBDBDB",
    "--color-sharp": "#262626",
    "--color-muted": "#4D4D4D",
    "--color-form-border-disabled": "#BABABA",
    "--color-form-placeholder": "#5D5D5D",
    "--color-form-disabled-text": "#4D4D4D",
    "--color-interactive-contained-disabled": "#CECECE",
    "--color-interactive-outlined-disabled": "#BABABA",
    "--color-interactive-accent-outlined-disabled": "#BABABA",
    "--color-surface": "#FAF2F2",
    "--color-enabled": "#AF0D23",
    "--color-highlight-accent": "#F1D2D1",
    "--color-lowered": "#F1D2D1",
    "--color-screen-gradient-start": "#F1D2D1",
    "--color-screen-gradient-middle": "#F4BFBC",
    "--color-screen-gradient-end": "#F1A2A0",
    "--color-border-muted": "#F4BFBC",
    "--color-border-sharp": "#AF0D23",
    "--color-interactive-contained-pressable": "#AF0D23",
    "--color-interactive-contained-hover": "#CD112C",
    "--color-interactive-contained-focus": "#CD112C",
    "--color-interactive-contained-active": "#F1293F",
    "--color-interactive-outlined-pressable": "#AF0D23",
    "--color-interactive-outlined-hover": "#F1293F",
    "--color-interactive-outlined-focus": "#F1293F",
    "--color-interactive-outlined-active": "#F1293F",
    "--color-interactive-outlined-outline-focus": "#F1293F",
    "--color-interactive-active": "#AF0D23",
    "--color-interactive-pressable": "#92091A",
    "--color-interactive-hover": "#4E0408",
    "--color-accent": "#92091A",
    "--color-on-accent": "#FFFFFF",
    "--color-on-accent-muted": "#F1D2D1",
    "--color-selection": "#92091A40"
  },
  "dark_brand": {
    "--color-translucent": "#1f1e1e55",
    "--color-screen": "#1B1B1B",
    "--color-highlight": "#292929",
    "--color-disabled-sharp": "#D2D2D2",
    "--color-disabled-muted": "#D2D2D2",
    "--color-disabled-interactive": "#555555",
    "--color-disabled-interactive-muted": "#292929",
    "--color-sharp": "#F2F2F2",
    "--color-muted": "#D2D2D2",
    "--color-form-border-disabled": "#555555",
    "--color-form-placeholder": "#BCBCBC",
    "--color-form-disabled-text": "#D2D2D2",
    "--color-interactive-contained-disabled": "#333333",
    "--color-interactive-outlined-disabled": "#424242",
    "--color-interactive-accent-outlined-disabled": "#424242",
    "--color-surface": "#0E2831",
    "--color-enabled": "#1F6D87",
    "--color-highlight-accent": "#12323E",
    "--color-lowered": "#071418",
    "--color-screen-gradient-start": "#0E2831",
    "--color-screen-gradient-middle": "#0A1D25",
    "--color-screen-gradient-end": "#071418",
    "--color-border-muted": "#1F6D87",
    "--color-border-sharp": "#37ADD5",
    "--color-interactive-contained-pressable": "#184F61",
    "--color-interactive-contained-hover": "#1F6D87",
    "--color-interactive-contained-focus": "#1F6D87",
    "--color-interactive-contained-active": "#1F6D87",
    "--color-interactive-outlined-pressable": "#1F6D87",
    "--color-interactive-outlined-hover": "#37ADD5",
    "--color-interactive-outlined-focus": "#37ADD5",
    "--color-interactive-outlined-active": "#37ADD5",
    "--color-interactive-outlined-outline-focus": "#37ADD5",
    "--color-interactive-active": "#74D2F6",
    "--color-interactive-pressable": "#9EDEF7",
    "--color-interactive-hover": "#DFF4FD",
    "--color-accent": "#9EDEF7",
    "--color-on-accent": "#FFFFFF",
    "--color-on-accent-muted": "#9EDEF7",
    "--color-selection": "#9EDEF740"
  },
  "dark_info": {
    "--color-translucent": "#1f1e1e55",
    "--color-screen": "#1B1B1B",
    "--color-highlight": "#292929",
    "--color-disabled-sharp": "#D2D2D2",
    "--color-disabled-muted": "#D2D2D2",
    "--color-disabled-interactive": "#555555",
    "--color-disabled-interactive-muted": "#292929",
    "--color-sharp": "#F2F2F2",
    "--color-muted": "#D2D2D2",
    "--color-form-border-disabled": "#555555",
    "--color-form-placeholder": "#BCBCBC",
    "--color-form-disabled-text": "#D2D2D2",
    "--color-interactive-contained-disabled": "#333333",
    "--color-interactive-outlined-disabled": "#424242",
    "--color-interactive-accent-outlined-disabled": "#424242",
    "--color-surface": "#0E2734",
    "--color-enabled": "#1F6B8E",
    "--color-highlight-accent": "#123242",
    "--color-lowered": "#07131A",
    "--color-screen-gradient-start": "#0E2734",
    "--color-screen-gradient-middle": "#0A1D27",
    "--color-screen-gradient-end": "#07131A",
    "--color-border-muted": "#1F6B8E",
    "--color-border-sharp": "#36ABE0",
    "--color-interactive-contained-pressable": "#184E67",
    "--color-interactive-contained-hover": "#1F6B8E",
    "--color-interactive-contained-focus": "#1F6B8E",
    "--color-interactive-contained-active": "#1F6B8E",
    "--color-interactive-outlined-pressable": "#1F6B8E",
    "--color-interactive-outlined-hover": "#36ABE0",
    "--color-interactive-outlined-focus": "#36ABE0",
    "--color-interactive-outlined-active": "#36ABE0",
    "--color-interactive-outlined-outline-focus": "#36ABE0",
    "--color-interactive-active": "#85CFF6",
    "--color-interactive-pressable": "#A8DBF7",
    "--color-interactive-hover": "#E2F3FD",
    "--color-accent": "#A8DBF7",
    "--color-on-accent": "#FFFFFF",
    "--color-on-accent-muted": "#A8DBF7",
    "--color-selection": "#A8DBF740"
  },
  "dark_success": {
    "--color-translucent": "#1f1e1e55",
    "--color-screen": "#1B1B1B",
    "--color-highlight": "#292929",
    "--color-disabled-sharp": "#D2D2D2",
    "--color-disabled-muted": "#D2D2D2",
    "--color-disabled-interactive": "#555555",
    "--color-disabled-interactive-muted": "#292929",
    "--color-sharp": "#F2F2F2",
    "--color-muted": "#D2D2D2",
    "--color-form-border-disabled": "#555555",
    "--color-form-placeholder": "#BCBCBC",
    "--color-form-disabled-text": "#D2D2D2",
    "--color-interactive-contained-disabled": "#333333",
    "--color-interactive-outlined-disabled": "#424242",
    "--color-interactive-accent-outlined-disabled": "#424242",
    "--color-surface": "#0F2B11",
    "--color-enabled": "#1F772A",
    "--color-highlight-accent": "#123715",
    "--color-lowered": "#071508",
    "--color-screen-gradient-start": "#0F2B11",
    "--color-screen-gradient-middle": "#0B200C",
    "--color-screen-gradient-end": "#071508",
    "--color-border-muted": "#1F772A",
    "--color-border-sharp": "#37BC48",
    "--color-interactive-contained-pressable": "#19561F",
    "--color-interactive-contained-hover": "#1F772A",
    "--color-interactive-contained-focus": "#1F772A",
    "--color-interactive-contained-active": "#1F772A",
    "--color-interactive-outlined-pressable": "#1F772A",
    "--color-interactive-outlined-hover": "#37BC48",
    "--color-interactive-outlined-focus": "#37BC48",
    "--color-interactive-outlined-active": "#37BC48",
    "--color-interactive-outlined-outline-focus": "#37BC48",
    "--color-interactive-active": "#4FE760",
    "--color-interactive-pressable": "#5DF76D",
    "--color-interactive-hover": "#D5FDD5",
    "--color-accent": "#5DF76D",
    "--color-on-accent": "#FFFFFF",
    "--color-on-accent-muted": "#5DF76D",
    "--color-selection": "#5DF76D40"
  },
  "dark_warning": {
    "--color-translucent": "#1f1e1e55",
    "--color-screen": "#1B1B1B",
    "--color-highlight": "#292929",
    "--color-disabled-sharp": "#D2D2D2",
    "--color-disabled-muted": "#D2D2D2",
    "--color-disabled-interactive": "#555555",
    "--color-disabled-interactive-muted": "#292929",
    "--color-sharp": "#F2F2F2",
    "--color-muted": "#D2D2D2",
    "--color-form-border-disabled": "#555555",
    "--color-form-placeholder": "#BCBCBC",
    "--color-form-disabled-text": "#D2D2D2",
    "--color-interactive-contained-disabled": "#333333",
    "--color-interactive-outlined-disabled": "#424242",
    "--color-interactive-accent-outlined-disabled": "#424242",
    "--color-surface": "#57451F",
    "--color-enabled": "#8F7021",
    "--color-highlight-accent": "#685223",
    "--color-lowered": "#322714",
    "--color-screen-gradient-start": "#57451F",
    "--color-screen-gradient-middle": "#3E3016",
    "--color-screen-gradient-end": "#322714",
    "--color-border-muted": "#8F7021",
    "--color-border-sharp": "#E0B93C",
    "--color-interactive-contained-pressable": "#846724",
    "--color-interactive-contained-hover": "#8F7021",
    "--color-interactive-contained-focus": "#8F7021",
    "--color-interactive-contained-active": "#8F7021",
    "--color-interactive-outlined-pressable": "#8F7021",
    "--color-interactive-outlined-hover": "#E0B93C",
    "--color-interactive-outlined-focus": "#E0B93C",
    "--color-interactive-outlined-active": "#E0B93C",
    "--color-interactive-outlined-outline-focus": "#E0B93C",
    "--color-interactive-active": "#F4CD4B",
    "--color-interactive-pressable": "#F9DC7E",
    "--color-interactive-hover": "#FDF0C4",
    "--color-accent": "#F9DC7E",
    "--color-on-accent": "#FFFFFF",
    "--color-on-accent-muted": "#F9DC7E",
    "--color-selection": "#F9DC7E40"
  },
  "dark_danger": {
    "--color-translucent": "#1f1e1e55",
    "--color-screen": "#1B1B1B",
    "--color-highlight": "#292929",
    "--color-disabled-sharp": "#D2D2D2",
    "--color-disabled-muted": "#D2D2D2",
    "--color-disabled-interactive": "#555555",
    "--color-disabled-interactive-muted": "#292929",
    "--color-sharp": "#F2F2F2",
    "--color-muted": "#D2D2D2",
    "--color-form-border-disabled": "#555555",
    "--color-form-placeholder": "#BCBCBC",
    "--color-form-disabled-text": "#D2D2D2",
    "--color-interactive-contained-disabled": "#333333",
    "--color-interactive-outlined-disabled": "#424242",
    "--color-interactive-accent-outlined-disabled": "#424242",
    "--color-surface": "#421110",
    "--color-enabled": "#B2242D",
    "--color-highlight-accent": "#531514",
    "--color-lowered": "#220907",
    "--color-screen-gradient-start": "#421110",
    "--color-screen-gradient-middle": "#320C0B",
    "--color-screen-gradient-end": "#220907",
    "--color-border-muted": "#B2242D",
    "--color-border-sharp": "#F56D6D",
    "--color-interactive-contained-pressable": "#811C20",
    "--color-interactive-contained-hover": "#B2242D",
    "--color-interactive-contained-focus": "#B2242D",
    "--color-interactive-contained-active": "#B2242D",
    "--color-interactive-outlined-pressable": "#B2242D",
    "--color-interactive-outlined-hover": "#F56D6D",
    "--color-interactive-outlined-focus": "#F56D6D",
    "--color-interactive-outlined-active": "#F56D6D",
    "--color-interactive-outlined-outline-focus": "#F56D6D",
    "--color-interactive-active": "#F7AEAC",
    "--color-interactive-pressable": "#F8C4C2",
    "--color-interactive-hover": "#FDEBEB",
    "--color-accent": "#F8C4C2",
    "--color-on-accent": "#FFFFFF",
    "--color-on-accent-muted": "#F8C4C2",
    "--color-selection": "#F8C4C240"
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
            className: "text-border-muted"
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
    /* @__PURE__ */ jsxRuntime.jsx(Text, { className: "text-sharp grow", children }),
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
          text: "text-on-accent",
          icon: "text-on-accent"
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
