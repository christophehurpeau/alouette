import { jsx, jsxs, Fragment as Fragment$1 } from 'react/jsx-runtime';
import { VariableContextProvider, styled as styled$1 } from 'nativewind';
import { createContext, useContext, forwardRef, Children, cloneElement, Fragment, useRef, useState, useEffect, isValidElement, useId, useReducer, useCallback } from 'react';
import { useColorScheme, View as View$1, Text as Text$1, ScrollView as ScrollView$1, FlatList as FlatList$1, SectionList as SectionList$1, Pressable, Platform, useWindowDimensions, Modal as Modal$1, TextInput } from 'react-native-web';
import { extendTailwindMerge, twMerge as twMerge$1 } from 'tailwind-merge';
import { tv } from 'tailwind-variants';
import { XRegularIcon } from 'alouette-icons/phosphor-icons/XRegularIcon';
import { CheckCircleRegularIcon } from 'alouette-icons/phosphor-icons/CheckCircleRegularIcon';
import { WarningDuotoneIcon } from 'alouette-icons/phosphor-icons/WarningDuotoneIcon';
import { CheckRegularIcon } from 'alouette-icons/phosphor-icons/CheckRegularIcon';
import { InfoRegularIcon } from 'alouette-icons/phosphor-icons/InfoRegularIcon';
import { QuestionRegularIcon } from 'alouette-icons/phosphor-icons/QuestionRegularIcon';
import { WarningRegularIcon } from 'alouette-icons/phosphor-icons/WarningRegularIcon';
import { CaretDownRegularIcon } from 'alouette-icons/phosphor-icons/CaretDownRegularIcon';
import { AsteriskSimpleRegularIcon } from 'alouette-icons/phosphor-icons/AsteriskSimpleRegularIcon';
import { useForm, FormProvider, useFormContext, Controller, useFieldArray } from 'react-hook-form';
import { PlusRegularIcon } from 'alouette-icons/phosphor-icons/PlusRegularIcon';
import { TrashRegularIcon } from 'alouette-icons/phosphor-icons/TrashRegularIcon';
import { CaretRightRegularIcon } from 'alouette-icons/phosphor-icons/CaretRightRegularIcon';

const ThemeContext = createContext("light");
function useCurrentTheme() {
  return useContext(ThemeContext);
}
function useCurrentMode() {
  return useContext(ThemeContext).startsWith("dark") ? "dark" : "light";
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
    "--color-interactive-accent-contained-bg-disabled": "#EBEBEB",
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
    "--color-selection": "#47474740",
    "--color-interactive-accent-contained-bg": "#EBEBEB",
    "--color-interactive-accent-contained-bg-hover": "#FAFAFA",
    "--color-interactive-accent-contained-bg-focus": "#FAFAFA",
    "--color-interactive-accent-contained-bg-active": "#FAFAFA"
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
    "--color-interactive-accent-contained-bg-disabled": "#3D3D3D",
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
    "--color-disabled-interactive": "#B8B8B8",
    "--color-disabled-interactive-muted": "#E0E0E0",
    "--color-muted": "#474747",
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
    "--color-disabled-interactive": "#B8B8B8",
    "--color-disabled-interactive-muted": "#E0E0E0",
    "--color-muted": "#474747",
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
    "--color-disabled-interactive": "#B8B8B8",
    "--color-disabled-interactive-muted": "#E0E0E0",
    "--color-muted": "#474747",
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
    "--color-selection": "#01460140",
    "--color-interactive-accent-contained-bg": "#DFF6DF",
    "--color-interactive-accent-contained-bg-hover": "#EFFBEF",
    "--color-interactive-accent-contained-bg-focus": "#EFFBEF",
    "--color-interactive-accent-contained-bg-active": "#EFFBEF"
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
    "--color-interactive-accent-contained-bg-disabled": "#EBEBEB",
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
    "--color-selection": "#5A3D0240",
    "--color-interactive-accent-contained-bg": "#F6EEDF",
    "--color-interactive-accent-contained-bg-hover": "#FBF7EF",
    "--color-interactive-accent-contained-bg-focus": "#FBF7EF",
    "--color-interactive-accent-contained-bg-active": "#FBF7EF"
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
    "--color-interactive-accent-contained-bg-disabled": "#EBEBEB",
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
    "--color-disabled-interactive": "#525252",
    "--color-disabled-interactive-muted": "#333333",
    "--color-muted": "#C2C2C2",
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
    "--color-disabled-interactive": "#525252",
    "--color-disabled-interactive-muted": "#333333",
    "--color-muted": "#C2C2C2",
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
    "--color-disabled-interactive": "#525252",
    "--color-disabled-interactive-muted": "#333333",
    "--color-muted": "#C2C2C2",
    "--color-form-border-disabled": "#525252",
    "--color-form-placeholder": "#A8A8A8",
    "--color-form-disabled-text": "#C2C2C2",
    "--color-interactive-contained-disabled": "#3D3D3D",
    "--color-interactive-outlined-disabled": "#474747",
    "--color-interactive-accent-contained-bg-disabled": "#3D3D3D",
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
    "--color-selection": "#82F78240",
    "--color-interactive-accent-contained-bg": "#157915",
    "--color-interactive-accent-contained-bg-hover": "#1FAD1F",
    "--color-interactive-accent-contained-bg-focus": "#1FAD1F",
    "--color-interactive-accent-contained-bg-active": "#1FAD1F"
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
    "--color-interactive-accent-contained-bg-disabled": "#3D3D3D",
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
    "--color-selection": "#F7D08240",
    "--color-interactive-accent-contained-bg": "#7B5914",
    "--color-interactive-accent-contained-bg-hover": "#AF7E1D",
    "--color-interactive-accent-contained-bg-focus": "#AF7E1D",
    "--color-interactive-accent-contained-bg-active": "#AF7E1D"
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
    "--color-interactive-accent-contained-bg-disabled": "#3D3D3D",
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
    "--color-selection": "#F8999640",
    "--color-interactive-accent-contained-bg": "#8C1B17",
    "--color-interactive-accent-contained-bg-hover": "#C1251F",
    "--color-interactive-accent-contained-bg-focus": "#C1251F",
    "--color-interactive-accent-contained-bg-active": "#C1251F"
  }
};

function ScopedTheme({ theme, children }) {
  return /* @__PURE__ */ jsx(ThemeContext.Provider, { value: theme, children: /* @__PURE__ */ jsx(VariableContextProvider, { value: themeVariables[theme], children }) });
}

function AlouetteProvider({
  children
}) {
  const colorScheme = useColorScheme();
  return /* @__PURE__ */ jsx(ScopedTheme, { theme: colorScheme === "dark" ? "dark" : "light", children });
}

function SafeAreaProvider({ children }) {
  return children;
}

const AlouetteDecorator = (storyFn, context) => {
  const theme = context.globals.backgrounds?.value === "#000000" ? "dark" : "light";
  return /* @__PURE__ */ jsx(SafeAreaProvider, { children: /* @__PURE__ */ jsx(AlouetteProvider, { children: /* @__PURE__ */ jsx(ScopedTheme, { theme, children: storyFn(context) }) }) });
};

const useSafeAreaInsets = () => ({
  top: 0,
  bottom: 0,
  left: 0,
  right: 0
});

function useThemeToken(tokenOrTokens) {
  const theme = useContext(ThemeContext);
  const vars = themeVariables[theme];
  if (Array.isArray(tokenOrTokens)) {
    return tokenOrTokens.map((token) => vars[token]);
  }
  return vars[tokenOrTokens];
}

const View = forwardRef((props, ref) => {
  return /* @__PURE__ */ jsx(View$1, { ref, ...props });
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
  return /* @__PURE__ */ jsx(ScopedTheme, { theme: `${mode}_${accent}`, children });
}

const twMerge = extendTailwindMerge({
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
const Text = forwardRef(
  ({ className, accent, ...props }, ref) => {
    return /* @__PURE__ */ jsx(AccentScope, { accent, children: /* @__PURE__ */ jsx(
      Text$1,
      {
        ref,
        className: twMerge("font-body text-sharp", className),
        ...props
      }
    ) });
  }
);
const Paragraph = forwardRef(
  ({ className, ...props }, ref) => {
    return /* @__PURE__ */ jsx(
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

const ScrollView = styled$1(
  ScrollView$1,
  {
    className: "style",
    contentContainerClassName: "contentContainerStyle"
  }
);

const FlatList = styled$1(
  FlatList$1,
  {
    className: "style",
    contentContainerClassName: "contentContainerStyle",
    columnWrapperClassName: "columnWrapperStyle"
  }
);

const SectionList = styled$1(
  SectionList$1,
  {
    className: "style",
    contentContainerClassName: "contentContainerStyle"
  }
);

const Stack = forwardRef(
  ({ className, ...props }, ref) => {
    return /* @__PURE__ */ jsx(
      View$1,
      {
        ref,
        className: `flex-row flex-wrap ${className ?? ""}`,
        ...props
      }
    );
  }
);
const HStack = forwardRef(
  ({ className, ...props }, ref) => {
    return /* @__PURE__ */ jsx(View$1, { ref, className: `flex-row ${className ?? ""}`, ...props });
  }
);
const VStack = forwardRef(
  ({ className, ...props }, ref) => {
    return /* @__PURE__ */ jsx(View$1, { ref, className: `flex-col ${className ?? ""}`, ...props });
  }
);

const separatorVariants = tv({
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
const Separator = forwardRef(
  ({ className, vertical, ...props }, ref) => {
    return /* @__PURE__ */ jsx(
      View$1,
      {
        ref,
        className: separatorVariants({ vertical, className }),
        ...props
      }
    );
  }
);

const boxBaseClasses = "shrink";
const Box = forwardRef(
  ({ className, accent, ...props }, ref) => {
    return /* @__PURE__ */ jsx(AccentScope, { accent, children: /* @__PURE__ */ jsx(
      View$1,
      {
        ref,
        className: `${boxBaseClasses} ${className ?? ""}`,
        ...props
      }
    ) });
  }
);
const interactiveBoxVariants = tv({
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
const InteractiveBox = forwardRef(
  ({ withFocusVisibleOutline, className, ...rest }, ref) => /* @__PURE__ */ jsx(
    Pressable,
    {
      ref,
      pointerEvents: "auto",
      ...rest,
      className: interactiveBoxVariants({ withFocusVisibleOutline, className })
    }
  )
);
const InteractiveBoxHitSlop = forwardRef(
  ({ withFocusVisibleOutline, children, className, ...rest }, ref) => {
    const child = Children.only(children);
    return /* @__PURE__ */ jsx(
      Pressable,
      {
        ref,
        pointerEvents: "auto",
        className: `flex-center ${className ?? ""}`,
        ...rest,
        children: cloneElement(child, {
          className: interactiveBoxVariants({
            withFocusVisibleOutline,
            className: child.props.className
          })
        })
      }
    );
  }
);
const SafeAreaBox = forwardRef(
  (props, ref) => {
    const insets = useSafeAreaInsets();
    return /* @__PURE__ */ jsx(
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

const surfaceVariants = tv(
  {
    // overflow-hidden so the multi-layer shadow respects the rounded corners.
    base: "overflow-hidden transition-background duration-fast",
    variants: {
      size: {
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
const Surface = forwardRef(
  ({ className, size, variant, shadow, accent, ...props }, ref) => {
    const resolvedShadow = shadow ?? (variant === "lowered" ? "lowered" : "s");
    return /* @__PURE__ */ jsx(AccentScope, { accent, children: /* @__PURE__ */ jsx(
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
    return /* @__PURE__ */ jsx(
      Component,
      {
        className: twMerge$1(defaultClassName, className),
        ...props
      }
    );
  }
  StyledComponent.displayName = `Styled(${Component.displayName ?? Component.name ?? "Component"})`;
  StyledComponent.__isStyledComponent = true;
  return StyledComponent;
}

const storyTitleVariants = tv({
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
const StoryTitle = forwardRef(
  ({ className, level, ...props }, ref) => {
    return /* @__PURE__ */ jsx(
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
  const content = /* @__PURE__ */ jsx(InternalStorySection, { className: "pb-xl bg-screen", children: withSurface ? /* @__PURE__ */ jsxs(Surface, { children: [
    /* @__PURE__ */ jsx(StoryTitle, { level: level + 1, children: title }),
    /* @__PURE__ */ jsx(VStack, { className: "gap-m", children })
  ] }) : /* @__PURE__ */ jsxs(Fragment$1, { children: [
    /* @__PURE__ */ jsx(StoryTitle, { level: level + 1, children: title }),
    /* @__PURE__ */ jsx(VStack, { className: "gap-m", children })
  ] }) });
  if (modeTheme) {
    return /* @__PURE__ */ jsx(ScopedTheme, { theme: modeTheme, children: content });
  }
  if (accent) {
    return /* @__PURE__ */ jsx(AccentScope, { accent, children: content });
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
  const content = /* @__PURE__ */ jsx(InternalStorySection, { className: "mb-m", children: withSurface ? /* @__PURE__ */ jsxs(Surface, { children: [
    /* @__PURE__ */ jsx(StoryTitle, { level: 3, children: title }),
    /* @__PURE__ */ jsx(VStack, { className: "gap-m", children })
  ] }) : /* @__PURE__ */ jsxs(Fragment$1, { children: [
    /* @__PURE__ */ jsx(StoryTitle, { level: 3, children: title }),
    /* @__PURE__ */ jsx(VStack, { className: "gap-m", children })
  ] }) });
  if (modeTheme) {
    return /* @__PURE__ */ jsx(ScopedTheme, { theme: modeTheme, children: content });
  }
  if (accent) {
    return /* @__PURE__ */ jsx(AccentScope, { accent, children: content });
  }
  return content;
}
const ScrollWrapper = Platform.OS === "web" ? Fragment : ScrollView;
function Story({
  documentation,
  children,
  noDarkMode
}) {
  return /* @__PURE__ */ jsxs(ScrollWrapper, { children: [
    documentation && /* @__PURE__ */ jsx(Surface, { accent: "info", className: "mb-xxl", children: documentation }),
    ["light", ...noDarkMode ? [] : ["dark"]].map(
      (mode) => /* @__PURE__ */ jsx(ScopedTheme, { theme: mode, children: /* @__PURE__ */ jsx(View, { className: "bg-screen p-l", children }) }, mode)
    )
  ] });
}
Story.Section = StorySection;
Story.SubSection = StorySubSection;

function StoryContainer({
  title,
  children
}) {
  return /* @__PURE__ */ jsx(ScopedTheme, { theme: "light", children: /* @__PURE__ */ jsxs(ScrollView, { className: "bg-white p-3xl", children: [
    /* @__PURE__ */ jsx(StoryTitle, { level: 1, children: title }),
    children
  ] }) });
}

const StoryDecorator = (storyFn, { name, parameters }) => {
  if (parameters?.container === false) return storyFn();
  return /* @__PURE__ */ jsx(StoryContainer, { title: name, children: storyFn() });
};

const rowVariants = tv(
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
const itemVariants = tv(
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
  return /* @__PURE__ */ jsx(View, { className: rowVariants({ breakpoint, flexWrap }), children: Children.map(children, (child) => /* @__PURE__ */ jsx(View, { className: itemVariants({ breakpoint, flexWrap, loose }), children: child })) });
}
function StoryGridCol({
  title,
  children,
  platform = "all"
}) {
  const isNative = Platform.OS === "ios" || Platform.OS === "android";
  if (Platform.OS === "web" && platform === "native") {
    return null;
  }
  if (isNative && platform === "web") {
    return null;
  }
  return title ? /* @__PURE__ */ jsxs(VStack, { children: [
    /* @__PURE__ */ jsx(StoryTitle, { level: 4, numberOfLines: 1, children: title }),
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
  return /* @__PURE__ */ jsx(
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
  const [exiting, setExiting] = useState([]);
  const previousRef = useRef({ key: activeKey, node: children });
  const childrenRef = useRef(children);
  childrenRef.current = children;
  const timersRef = useRef([]);
  useEffect(
    () => () => {
      timersRef.current.forEach(clearTimeout);
    },
    []
  );
  useEffect(() => {
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
  return Children.toArray(children).filter(isValidElement).map((child) => ({ key: child.key, node: child }));
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
  const nodesRef = useRef(/* @__PURE__ */ new Map());
  for (const item of items) {
    nodesRef.current.set(item.key, item.node);
  }
  const liveKeysRef = useRef(liveKeys);
  liveKeysRef.current = liveKeys;
  const [order, setOrder] = useState(liveKeys);
  const orderRef = useRef(order);
  orderRef.current = order;
  const timersRef = useRef(/* @__PURE__ */ new Map());
  useEffect(
    () => () => {
      timersRef.current.forEach(clearTimeout);
    },
    []
  );
  useEffect(() => {
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
  return /* @__PURE__ */ jsx(Fragment$1, { children: items.map((item) => /* @__PURE__ */ jsx(
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
  return /* @__PURE__ */ jsxs(Fragment$1, { children: [
    exiting.map((item) => {
      const node = item.node;
      return cloneElement(node, {
        key: item.key,
        className: joinClasses(
          node.props.className,
          className,
          exitClassName
        )
      });
    }),
    cloneElement(children, {
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

const pressableBoxVariants = tv(
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
const PressableBox = forwardRef(
  ({ className, variant, forceStyle, accent, ...props }, ref) => {
    return /* @__PURE__ */ jsx(AccentScope, { accent, children: /* @__PURE__ */ jsx(
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

function Icon({
  icon,
  size = 20,
  className = "text-sharp"
}) {
  return cloneElement(icon, {
    className,
    width: size,
    height: size
  });
}

function RingCircle({
  center,
  radius,
  strokeWidth,
  strokeDasharray,
  strokeDashoffset,
  className,
  width,
  height
}) {
  const scale = 208 / (center * 2);
  return /* @__PURE__ */ jsx(
    "svg",
    {
      className,
      width,
      height,
      viewBox: "0 0 256 256",
      children: /* @__PURE__ */ jsx(
        "circle",
        {
          cx: 128,
          cy: 128,
          r: radius * scale,
          stroke: "currentColor",
          strokeWidth: strokeWidth * scale,
          strokeDasharray: strokeDasharray == null ? void 0 : strokeDasharray * scale,
          strokeDashoffset: strokeDashoffset == null ? void 0 : strokeDashoffset * scale,
          strokeLinecap: strokeDasharray == null ? void 0 : "round",
          transform: strokeDasharray == null ? void 0 : "rotate(-90 128 128)",
          className: strokeDasharray == null ? void 0 : "transition-[stroke-dashoffset] duration-progress ease-out",
          fill: "none"
        }
      )
    }
  );
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
  const [progress, setProgress] = useState(1);
  const [hidden, setHidden] = useState(!loading);
  useEffect(() => {
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
  useEffect(() => {
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
const ring = tv({
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
  const trackRing = /* @__PURE__ */ jsx(RingCircle, { center, radius, strokeWidth });
  const fillRing = /* @__PURE__ */ jsx(
    RingCircle,
    {
      center,
      radius,
      strokeWidth,
      strokeDasharray: circumference,
      strokeDashoffset: dashOffset
    }
  );
  return /* @__PURE__ */ jsx(AccentScope, { accent, children: /* @__PURE__ */ jsxs(
    View,
    {
      className: ring({ hidden }),
      style: { width: diameter, height: diameter },
      children: [
        /* @__PURE__ */ jsx(View, { className: "absolute inset-0", children: /* @__PURE__ */ jsx(
          Icon,
          {
            icon: trackRing,
            size: diameter,
            className: "text-highlight-accent"
          }
        ) }),
        /* @__PURE__ */ jsx(View, { className: "absolute inset-0", children: /* @__PURE__ */ jsx(Icon, { icon: fillRing, size: diameter, className: "text-accent" }) })
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
  return /* @__PURE__ */ jsx(
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
const buttonVariants = tv(
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
      terminalIcon: /* @__PURE__ */ jsx(CheckCircleRegularIcon, {}),
      terminalIconAccent: "success"
    };
  }
  if (state === "failed") {
    return {
      terminalIcon: /* @__PURE__ */ jsx(WarningDuotoneIcon, {}),
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
  const [showSpinner, setShowSpinner] = useState(isLoading);
  useEffect(() => {
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
  return /* @__PURE__ */ jsxs(
    PressableBox,
    {
      accent,
      variant,
      disabled: isDisabled,
      className: styles.frame({ className }),
      ...pressableProps,
      children: [
        hasOverlayIcon ? /* @__PURE__ */ jsx(View, { className: styles.overlayIconContainer(), children: showSpinner || !terminalIcon ? /* @__PURE__ */ jsx(
          IndeterminateCircularProgress,
          {
            loading: isLoading,
            accent,
            size: size === "sm" ? "xs" : "sm"
          }
        ) : /* @__PURE__ */ jsx(AccentScope, { accent: terminalIconAccent, children: /* @__PURE__ */ jsx(
          Icon,
          {
            icon: terminalIcon,
            className: styles.terminalIcon(),
            size: size === "sm" ? 24 : 32
          }
        ) }) }) : null,
        icon ? /* @__PURE__ */ jsx(
          Icon,
          {
            icon,
            className: styles.icon(),
            size: size === "sm" ? 16 : 20
          }
        ) : null,
        /* @__PURE__ */ jsx(Text, { "aria-disabled": isDisabled, className: styles.text(), children: text })
      ]
    }
  );
}
function ExternalLinkButton({
  href,
  onPress,
  ...buttonProps
}) {
  return /* @__PURE__ */ jsx(
    Button,
    {
      ...buttonProps,
      role: "link",
      onPress: (event) => {
        onPress?.(event);
        if (event.defaultPrevented) return;
        if (Platform.OS === "web") {
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
  return /* @__PURE__ */ jsx(Button, { ...buttonProps, role: "link" });
}

const iconButtonVariants = tv(
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
  return /* @__PURE__ */ jsx(
    PressableBox,
    {
      variant,
      disabled,
      className: styles.frame({ className }),
      style: { width: diameter, height: diameter },
      ...pressableProps,
      children: /* @__PURE__ */ jsx(
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

const panelVariants = tv(
  {
    // w-full so the panel shrinks on small screens (the backdrop padding keeps a
    // margin); max-w caps it on wide viewports.
    base: "w-full",
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
const titleReserveVariants = tv(
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
  const { height: windowHeight } = useWindowDimensions();
  const titleId = useId();
  const currentMode = useCurrentMode();
  return /* @__PURE__ */ jsx(
    Modal$1,
    {
      transparent: true,
      visible,
      animationType: "fade",
      onRequestClose: onClose,
      children: /* @__PURE__ */ jsx(StableAccentScope, { accent, mode: currentMode, children: /* @__PURE__ */ jsxs(View, { className: "flex-1 flex-center p-l", children: [
        /* @__PURE__ */ jsx(
          Pressable,
          {
            "aria-hidden": true,
            focusable: false,
            className: "absolute inset-0 bg-translucent",
            onPress: onClose
          }
        ),
        /* @__PURE__ */ jsx(
          View,
          {
            "aria-modal": true,
            role,
            "aria-label": title === void 0 ? ariaLabel : void 0,
            "aria-labelledby": title === void 0 ? void 0 : titleId,
            "aria-describedby": ariaDescribedby,
            testID,
            className: `relative ${panelVariants({ size })}`,
            children: /* @__PURE__ */ jsxs(
              Surface,
              {
                variant: "highlight",
                size,
                shadow: "l",
                className: "relative gap-m",
                children: [
                  title === void 0 && icon === void 0 ? null : /* @__PURE__ */ jsxs(
                    HStack,
                    {
                      className: `items-center gap-xs ${hideCloseButton ? "" : titleReserveVariants({ size })}`,
                      children: [
                        icon === void 0 ? null : /* @__PURE__ */ jsx(Icon, { icon, size: 24, className: "text-accent" }),
                        title === void 0 ? null : /* @__PURE__ */ jsx(
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
                  hideCloseButton ? null : /* @__PURE__ */ jsx(
                    IconButton,
                    {
                      icon: /* @__PURE__ */ jsx(XRegularIcon, {}),
                      variant: "ghost",
                      size: size === "lg" ? "md" : size,
                      "aria-label": closeButtonAriaLabel,
                      className: "absolute right-sm top-sm",
                      onPress: onClose
                    }
                  ),
                  /* @__PURE__ */ jsx(ScrollView, { style: { maxHeight: windowHeight * 0.7 }, children: /* @__PURE__ */ jsx(VStack, { className: "gap-m", children }) }),
                  footer === void 0 ? null : /* @__PURE__ */ jsx(HStack, { className: "items-center justify-end gap-m", children: footer })
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
        footer: /* @__PURE__ */ jsx(Button, { accent, text: closeText ?? "OK", onPress: onClose })
      };
    }
    case "required": {
      const { onConfirm, confirmText, confirmDisabled } = props;
      return {
        // Non-dismissible: only the explicit action closes it.
        onDismiss: () => void 0,
        footer: /* @__PURE__ */ jsx(
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
        footer: /* @__PURE__ */ jsxs(Fragment$1, { children: [
          /* @__PURE__ */ jsx(
            Button,
            {
              variant: "outlined",
              text: cancelText ?? "Cancel",
              onPress: onCancel
            }
          ),
          /* @__PURE__ */ jsx(
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
  const descriptionId = useId();
  const { footer, onDismiss } = resolveVariant(props, accent);
  return /* @__PURE__ */ jsx(
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
      children: children === void 0 ? null : /* @__PURE__ */ jsx(Text, { nativeID: descriptionId, className: "text-base text-muted", children })
    }
  );
}
function QuestionAlertDialog(props) {
  return /* @__PURE__ */ jsx(AlertDialog, { ...props, icon: /* @__PURE__ */ jsx(QuestionRegularIcon, {}) });
}
function WarningAlertDialog(props) {
  return /* @__PURE__ */ jsx(AlertDialog, { ...props, icon: /* @__PURE__ */ jsx(WarningRegularIcon, {}) });
}
function InfoAlertDialog(props) {
  return /* @__PURE__ */ jsx(AlertDialog, { ...props, icon: /* @__PURE__ */ jsx(InfoRegularIcon, {}) });
}
function SuccessAlertDialog(props) {
  return /* @__PURE__ */ jsx(AlertDialog, { ...props, icon: /* @__PURE__ */ jsx(CheckRegularIcon, {}) });
}

const messageFrameVariants = tv(
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
  return /* @__PURE__ */ jsx(AccentScope, { accent, children: /* @__PURE__ */ jsxs(Box, { className: `shadow-m ${messageFrameVariants({ size })}`, children: [
    /* @__PURE__ */ jsx(Icon, { icon, size: ICON_SIZE$1[size], className: "text-accent" }),
    /* @__PURE__ */ jsx(Text, { className: "text-accent grow", children }),
    onDismiss ? /* @__PURE__ */ jsx(
      Box,
      {
        style: { width: dismissDiameter, height: dismissDiameter },
        className: "flex-center",
        children: /* @__PURE__ */ jsx(
          IconButton,
          {
            icon: /* @__PURE__ */ jsx(XRegularIcon, {}),
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
  return /* @__PURE__ */ jsx(Message, { ...props, accent: "info", icon: /* @__PURE__ */ jsx(InfoRegularIcon, {}) });
}
function ConfirmationMessage(props) {
  return /* @__PURE__ */ jsx(Message, { ...props, accent: "success", icon: /* @__PURE__ */ jsx(CheckRegularIcon, {}) });
}
function WarningMessage(props) {
  return /* @__PURE__ */ jsx(Message, { ...props, accent: "warning", icon: /* @__PURE__ */ jsx(WarningRegularIcon, {}) });
}
function ErrorMessage(props) {
  return /* @__PURE__ */ jsx(Message, { ...props, accent: "danger", icon: /* @__PURE__ */ jsx(WarningDuotoneIcon, {}) });
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
  const [pressAsyncState, dispatch] = useReducer(pressAsyncReducer, idleState);
  const settledTimerRef = useRef(null);
  useEffect(() => {
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
  return /* @__PURE__ */ jsxs(VStack, { children: [
    /* @__PURE__ */ jsx(Button, { ...buttonProps, state: buttonState, onPress: handlePress }),
    /* @__PURE__ */ jsx(
      View,
      {
        className: `overflow-hidden transition-[height,opacity] duration-collapse p-sm ${error ? "h-auto opacity-100" : "h-0 opacity-0"}`,
        children: /* @__PURE__ */ jsx(ErrorMessage, { size: "sm", children: errorToMessage(error) })
      }
    )
  ] });
}

const inputVariants = tv(
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
const InputText = forwardRef(
  ({ className, disabled, mode, multiline, forceStyle, ...props }, ref) => {
    const placeholderColor = useThemeToken("--color-form-placeholder");
    const modeProps = mode ? MODE_PROPS[mode] : void 0;
    return /* @__PURE__ */ jsx(
      TextInput,
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

const TextArea = forwardRef((props, ref) => {
  return /* @__PURE__ */ jsx(InputText, { ref, multiline: true, ...props });
});

const PRESSABLE_HEIGHT = 44;
const TRACK_HEIGHT = 36;
const TRACK_WIDTH = 58;
const THUMB_PADDING = TRACK_HEIGHT * 0.1;
const THUMB_SIZE = TRACK_HEIGHT * 0.8;
const TRAVEL_X = TRACK_WIDTH - THUMB_SIZE - THUMB_PADDING * 2;
const trackVariants = tv(
  {
    // TODO if we can fix web to use proper button, change aria-disabled to disabled
    base: [
      "height-[36px] w-[58px]",
      // Must be identical to TRACK_HEIGHT and TRACK_WIDTH constants above
      "relative rounded-full overflow-hidden shadow-lowered pointer-events-auto",
      "transition-background-color duration-fast ease-in",
      "outline-interactive-outlined-outline-focus",
      "aria-disabled:bg-disabled-interactive-muted"
    ].join(" "),
    variants: {
      checked: {
        false: "bg-lowered",
        true: "bg-enabled"
      },
      // Storybook-only static stand-in for the :hover/:active states above.
      forceStyle: process.env.EXPO_PUBLIC_STORYBOOK_ENABLED ? { hover: "", focus: "", press: "" } : { hover: "", focus: "", press: "" }
    }
  },
  { twMerge: false }
);
const thumbVariants = tv(
  {
    base: [
      "absolute rounded-full shadow-s aria-disabled:shadow-none",
      "transition-transform duration-fast ease-in",
      "bg-surface aria-disabled:bg-disabled-interactive"
    ].join(" ")
  },
  { twMerge: false }
);
function useControllableChecked(controlled, onValueChange) {
  const [internal, setInternal] = useState(controlled ?? false);
  const value = controlled ?? internal;
  const onChange = useCallback(
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
  forceStyle,
  onValueChange,
  ...props
}) {
  const [value, setValue] = useControllableChecked(checked, onValueChange);
  return /* @__PURE__ */ jsx(
    InteractiveBoxHitSlop,
    {
      withFocusVisibleOutline: true,
      role: "switch",
      "aria-checked": value,
      "aria-disabled": disabled === true,
      disabled,
      style: { height: PRESSABLE_HEIGHT, width: TRACK_WIDTH },
      onPress: () => {
        setValue(!value);
      },
      ...props,
      children: /* @__PURE__ */ jsx(
        View$1,
        {
          "aria-disabled": disabled === true,
          className: trackVariants({ checked: value, forceStyle }),
          style: { width: TRACK_WIDTH, height: TRACK_HEIGHT },
          children: /* @__PURE__ */ jsx(
            View$1,
            {
              "aria-disabled": disabled === true,
              className: thumbVariants({}),
              style: {
                width: THUMB_SIZE,
                height: THUMB_SIZE,
                top: THUMB_PADDING,
                left: THUMB_PADDING,
                transform: [{ translateX: value ? TRAVEL_X : 0 }]
              }
            }
          )
        }
      )
    }
  );
}
function Switch({ accent, ...rest }) {
  return /* @__PURE__ */ jsx(AccentScope, { accent, children: /* @__PURE__ */ jsx(SwitchInner, { ...rest }) });
}

function useControllableValue(controlled, defaultValue, onValueChange) {
  const [internal, setInternal] = useState(defaultValue);
  const value = controlled ?? internal;
  const setValue = useCallback(
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
const triggerLabelVariants = tv({
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
  return /* @__PURE__ */ jsxs(Fragment$1, { children: [
    /* @__PURE__ */ jsx(Text, { numberOfLines: 1, className: triggerLabelVariants({ state }), children: label ?? placeholder ?? "" }),
    /* @__PURE__ */ jsx(
      Icon,
      {
        icon: /* @__PURE__ */ jsx(CaretDownRegularIcon, {}),
        size: 18,
        className: disabled ? "text-form-disabled-text" : "text-muted"
      }
    )
  ] });
}

const wrapperVariants = tv(
  {
    base: [
      "relative flex-row flex-1 rounded-md border min-h-11",
      "transition-[border-color,outline-color] duration-fast ease-in",
      "outline-interactive-outlined-pressable"
      // for a proper outline color transition
    ].join(" "),
    variants: {
      // bg lives in each branch (not base) so the disabled bg never competes
      // with bg-highlight: two same-specificity background utilities would let
      // stylesheet order, not className order, decide the winner.
      disabled: {
        true: "bg-disabled-interactive-muted border-interactive-outlined-disabled cursor-not-allowed",
        false: [
          "bg-highlight",
          "border-interactive-outlined-pressable",
          "hover:border-interactive-outlined-hover",
          "focus-within:border-interactive-outlined-focus",
          "focus-within:outline-1 focus-within:outline-interactive-outlined-focus focus-within:outline-offset-0",
          "active:border-interactive-outlined-active"
        ].join(" ")
      }
    },
    defaultVariants: { disabled: false }
  },
  { twMerge: false }
);
const paddingX = 16;
const caretReserve = 26;
const selectStyle = (disabled) => ({
  appearance: "none",
  WebkitAppearance: "none",
  boxSizing: "border-box",
  minHeight: 44,
  width: "auto",
  margin: 0,
  border: 0,
  background: "transparent",
  color: "transparent",
  font: "inherit",
  paddingTop: 0,
  paddingBottom: 0,
  paddingLeft: paddingX,
  paddingRight: paddingX + caretReserve,
  outline: "none",
  cursor: disabled ? "not-allowed" : "pointer"
});
function Select({
  options,
  value,
  defaultValue,
  onValueChange,
  placeholder,
  disabled,
  accent,
  testID,
  "aria-label": ariaLabel,
  "aria-labelledby": ariaLabelledby
}) {
  const [current, setValue] = useControllableValue(
    value,
    defaultValue,
    onValueChange
  );
  const selected = options.find((option) => option.value === current);
  const [sharpColor, disabledTextColor, placeholderColor, highlightColor] = useThemeToken([
    "--color-sharp",
    "--color-form-disabled-text",
    "--color-form-placeholder",
    "--color-highlight"
  ]);
  const optionStyle = (optionDisabled) => ({
    color: optionDisabled ? disabledTextColor : sharpColor,
    backgroundColor: highlightColor
  });
  return /* @__PURE__ */ jsx(AccentScope, { accent, children: /* @__PURE__ */ jsxs(View$1, { className: wrapperVariants({ disabled }), children: [
    /* @__PURE__ */ jsxs(
      "select",
      {
        value: current ?? "",
        disabled,
        "aria-label": ariaLabel,
        "aria-labelledby": ariaLabelledby,
        "data-testid": testID,
        style: selectStyle(disabled),
        onChange: (event) => {
          setValue(event.target.value);
        },
        children: [
          placeholder === void 0 ? null : /* @__PURE__ */ jsx(
            "option",
            {
              disabled: true,
              value: "",
              style: {
                color: placeholderColor,
                backgroundColor: highlightColor
              },
              children: placeholder
            }
          ),
          options.map((option) => /* @__PURE__ */ jsx(
            "option",
            {
              value: option.value,
              disabled: option.disabled,
              style: optionStyle(option.disabled),
              children: option.label
            },
            option.value
          ))
        ]
      }
    ),
    /* @__PURE__ */ jsx(
      View$1,
      {
        pointerEvents: "none",
        className: "absolute inset-0 flex-row items-center justify-between gap-xs px-m",
        children: /* @__PURE__ */ jsx(
          SelectTriggerContent,
          {
            label: selected?.label,
            placeholder,
            disabled
          }
        )
      }
    )
  ] }) });
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
  const labelId = useId();
  const hasError = Boolean(error);
  const showWarningIcon = hasError && !isRequiredError;
  const marker = (() => {
    if (required === true) {
      return /* @__PURE__ */ jsxs(HStack, { className: "gap-xxs items-center", children: [
        /* @__PURE__ */ jsx(
          Icon,
          {
            icon: /* @__PURE__ */ jsx(AsteriskSimpleRegularIcon, {}),
            size: 12,
            className: "text-accent"
          }
        ),
        showWarningIcon ? /* @__PURE__ */ jsx(
          Icon,
          {
            icon: /* @__PURE__ */ jsx(WarningRegularIcon, {}),
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
      return /* @__PURE__ */ jsx(Icon, { icon: /* @__PURE__ */ jsx(WarningRegularIcon, {}), size: 16, className: "text-accent" });
    }
    return null;
  })();
  return /* @__PURE__ */ jsxs(VStack, { className: "gap-xxs", children: [
    /* @__PURE__ */ jsx(Pressable, { onPress: onLabelPress, children: /* @__PURE__ */ jsxs(VStack, { children: [
      /* @__PURE__ */ jsxs(HStack, { className: "gap-xxs items-center", children: [
        /* @__PURE__ */ jsx(
          Text,
          {
            nativeID: labelId,
            accent: hasError ? "danger" : void 0,
            className: `font-body-bold text-md ${hasError ? "text-accent" : ""}`,
            children: label
          }
        ),
        marker ? /* @__PURE__ */ jsx(View, { "aria-hidden": true, children: hasError ? /* @__PURE__ */ jsx(AccentScope, { accent: "danger", children: marker }) : marker }) : null
      ] }),
      details ? /* @__PURE__ */ jsx(Text, { className: "text-muted text-sm", children: details }) : null
    ] }) }),
    indented ? /* @__PURE__ */ jsx(View, { className: "border-l border-border-muted pl-m", children: render(labelId) }) : render(labelId),
    error ? /* @__PURE__ */ jsx(View, { className: "px-m", children: /* @__PURE__ */ jsx(Text, { role: "alert", accent: "danger", className: "text-accent text-sm", children: error }) }) : null
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
  const form = useForm({ mode, defaultValues });
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
  return /* @__PURE__ */ jsx(FormProvider, { ...form, children: render({ submit }) });
}

function FormField({
  name,
  label,
  required,
  validate,
  renderError,
  render
}) {
  const { control, setFocus } = useFormContext();
  return /* @__PURE__ */ jsx(
    Controller,
    {
      control,
      name,
      rules: { required: Boolean(required), validate },
      render: ({ field, fieldState }) => {
        const requiredError = fieldState.error?.type === "required" && required !== true ? required : void 0;
        return /* @__PURE__ */ jsx(
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
  const [pendingRemoval, setPendingRemoval] = useState(false);
  return /* @__PURE__ */ jsx(StableAccentScope, { accent: pendingRemoval ? "danger" : void 0, children: /* @__PURE__ */ jsxs(HStack, { className: "gap-sm items-center p-xxs", children: [
    /* @__PURE__ */ jsx(View, { className: "grow shrink basis-0", children: render({ name, index, label: itemLabel }) }),
    removable ? /* @__PURE__ */ jsx(
      IconButton,
      {
        variant: "ghost",
        icon: /* @__PURE__ */ jsx(TrashRegularIcon, {}),
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
  const { control } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name
  });
  const paddedRef = useRef(false);
  useEffect(() => {
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
  return /* @__PURE__ */ jsx(
    FormItem,
    {
      label,
      details,
      render: () => /* @__PURE__ */ jsxs(VStack, { className: "gap-xs", children: [
        fields.map((field, index) => /* @__PURE__ */ jsx(
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
        /* @__PURE__ */ jsx(
          Button,
          {
            size: "sm",
            variant: "outlined",
            icon: /* @__PURE__ */ jsx(PlusRegularIcon, {}),
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
  return /* @__PURE__ */ jsx(
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
  return /* @__PURE__ */ jsx(
    Form,
    {
      ...formProps,
      render: ({ submit }) => /* @__PURE__ */ jsxs(VStack, { className: className ?? "gap-l", children: [
        render({ submit }),
        /* @__PURE__ */ jsx(
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

const badgeVariants = tv(
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
  return /* @__PURE__ */ jsx(AccentScope, { accent, children: /* @__PURE__ */ jsxs(Box, { className: styles.frame(), children: [
    icon ? /* @__PURE__ */ jsx(Icon, { icon, size: ICON_SIZE[size], className: styles.icon() }) : null,
    /* @__PURE__ */ jsx(Text, { className: styles.text(), children })
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
  const [hideAfterHold, setHideAfterHold] = useState(false);
  useEffect(() => {
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
  return /* @__PURE__ */ jsx(AccentScope, { accent, children: /* @__PURE__ */ jsx(
    View,
    {
      className: `absolute inset-x-0 top-0 z-9 h-0.5 bg-interactive-contained-pressable shadow-m transition-transform duration-slide ease-in-out ${hidden ? "-translate-y-6" : "translate-y-0"}`,
      children: state ? /* @__PURE__ */ jsx(Text, { className: "absolute left-1/2 top-0.5 h-5.5 w-50 -translate-x-1/2 rounded-b-sm bg-interactive-contained-pressable text-center leading-5.5 text-on-accent transition-colors duration-fast", children }) : null
    }
  ) });
}

const track = tv({
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
  return /* @__PURE__ */ jsx(AccentScope, { accent, children: /* @__PURE__ */ jsx(View, { pointerEvents: "none", className: track({ size, hidden }), children: /* @__PURE__ */ jsx(
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
  return /* @__PURE__ */ jsxs(
    PressableBox,
    {
      variant,
      role,
      accent,
      className: "flex-row items-center justify-between mx-xs my-xxs px-m py-m",
      onPress,
      children: [
        /* @__PURE__ */ jsx(View$1, { className: "flex-1", children }),
        /* @__PURE__ */ jsx(View$1, { className: "justify-center", children: /* @__PURE__ */ jsx(
          Icon,
          {
            className: variant === "contained" ? "text-on-accent-muted" : "text-muted",
            icon: /* @__PURE__ */ jsx(CaretRightRegularIcon, {}),
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
  return /* @__PURE__ */ jsx(AccentScope, { accent, children: /* @__PURE__ */ jsx(View$1, { className: "absolute inset-0 bg-linear-to-t from-screen-gradient-end from-5% via-screen-gradient-middle via-80% to-screen-gradient-start to-98%", children }) });
}

const GradientScrollViewInner = forwardRef(({ children, ...scrollViewProps }, ref) => {
  const [gradientStart, gradientEnd] = useThemeToken([
    "--color-screen-gradient-start",
    "--color-screen-gradient-end"
  ]);
  return /* @__PURE__ */ jsxs(ScrollView$1, { ref, ...scrollViewProps, children: [
    /* @__PURE__ */ jsx(
      View$1,
      {
        className: "absolute left-0 right-0",
        style: {
          top: -600,
          height: 600,
          backgroundColor: gradientStart
        }
      }
    ),
    /* @__PURE__ */ jsx(
      View$1,
      {
        className: "absolute left-0 right-0",
        style: {
          bottom: -600,
          height: 600,
          backgroundColor: gradientEnd
        }
      }
    ),
    /* @__PURE__ */ jsx(GradientBackground, {}),
    children
  ] });
});
const GradientScrollView = forwardRef(({ accent, children, ...scrollViewProps }, ref) => {
  return /* @__PURE__ */ jsx(AccentScope, { accent, children: /* @__PURE__ */ jsx(GradientScrollViewInner, { ref, ...scrollViewProps, children }) });
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
  const { width } = useWindowDimensions();
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
    return /* @__PURE__ */ jsx(View$1, { className, children: node }, name);
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

function ExternalLink({
  as: C,
  href,
  openLinkBehavior,
  onPress,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    C,
    {
      ...props,
      ...href ? { href } : {},
      ...openLinkBehavior?.web === "targetSelf" ? {} : { hrefAttrs: { target: "_blank", rel: "noopener noreferrer" } },
      onPress
    }
  );
}

export { AccentScope, ActionButton, AlertDialog, AlouetteDecorator, AlouetteProvider, Badge, Box, BreakpointNameEnum, Breakpoints, Button, CircularProgress, ConfirmationMessage, ConnectionState, ExternalLink, ExternalLinkButton, FlatList, Form, FormField, FormFieldArray, FormItem, FormSubmitButton, FormValidationError, GradientBackground, GradientScrollView, HStack, Icon, IconButton, InfoAlertDialog, InfoMessage, InputText, InteractiveBox, InternalLinkButton, LinearProgress, Message, Modal, Paragraph, PresenceList, PresenceOne, PressableBox, PressableListItem, QuestionAlertDialog, SafeAreaBox, SafeAreaProvider, ScopedTheme, ScrollView, SectionList, Select, Separator, SimpleVForm, StableAccentScope, Stack, Story, StoryContainer, StoryDecorator, StoryGrid, StoryTitle, SuccessAlertDialog, Surface, Switch, SwitchBreakpointsUsingDisplayNone, SwitchBreakpointsUsingNull, Text, TextArea, VStack, View, WarningAlertDialog, WarningMessage, animationDurationsMs, styled, themeVariables, useCurrentBreakpointName, useCurrentBreakpointNameFiltered, useCurrentMode, useCurrentTheme, useSafeAreaInsets, useThemeToken };
//# sourceMappingURL=index-browser.es.js.map
