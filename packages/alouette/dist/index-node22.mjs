import { jsx, jsxs, Fragment as Fragment$1 } from 'react/jsx-runtime';
import { useEffect, forwardRef, Fragment, Children, cloneElement, useState, useCallback } from 'react';
import { Uniwind, useUniwind, ScopedTheme, useCSSVariable } from 'uniwind';
export { ScopedTheme, Uniwind, useCSSVariable } from 'uniwind';
import { useColorScheme, View as View$1, Text as Text$1, ScrollView as ScrollView$1, Pressable, Platform, TextInput, Switch as Switch$1, useWindowDimensions, Linking } from 'react-native';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
export { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import { extendTailwindMerge, twMerge as twMerge$1 } from 'tailwind-merge';
import { tv } from 'tailwind-variants';
import { CheckRegularIcon } from 'alouette-icons/phosphor-icons/CheckRegularIcon';
import { InfoRegularIcon } from 'alouette-icons/phosphor-icons/InfoRegularIcon';
import { WarningRegularIcon } from 'alouette-icons/phosphor-icons/WarningRegularIcon';
import { XRegularIcon } from 'alouette-icons/phosphor-icons/XRegularIcon';
import { CaretRightRegularIcon } from 'alouette-icons/phosphor-icons/CaretRightRegularIcon';
import { LinearGradient } from 'expo-linear-gradient';
import * as WebBrowser from 'expo-web-browser';
import { WebBrowserPresentationStyle } from 'expo-web-browser';

const useDefaultThemeFromColorScheme = () => {
  const colorScheme = useColorScheme();
  return colorScheme || "light";
};
function AlouetteProvider({
  children,
  defaultTheme = "light"
}) {
  useEffect(() => {
    Uniwind.setTheme(defaultTheme);
  }, [defaultTheme]);
  return children;
}

const AlouetteDecorator = (storyFn, context) => {
  const theme = context.globals.backgrounds?.value === "#000000" ? "dark" : "light";
  useEffect(() => {
    Uniwind.setTheme(theme);
  }, [theme]);
  return /* @__PURE__ */ jsx(SafeAreaProvider, { children: /* @__PURE__ */ jsx(AlouetteProvider, { defaultTheme: theme, children: storyFn(context) }) });
};

const View = forwardRef((props, ref) => {
  return /* @__PURE__ */ jsx(View$1, { ref, ...props });
});

const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [
        "body-xs",
        "body-sm",
        "body-md",
        "body-lg",
        "body-xl",
        "body-xxl",
        "body-3xl",
        "heading-xs",
        "heading-sm",
        "heading-md",
        "heading-lg",
        "heading-xl",
        "heading-xxl",
        "heading-3xl",
        "mono-xs",
        "mono-sm",
        "mono-md",
        "mono-lg",
        "mono-xl",
        "mono-xxl",
        "mono-3xl"
      ]
    }
  }
});
const Text = forwardRef(
  ({ className, ...props }, ref) => {
    return /* @__PURE__ */ jsx(
      Text$1,
      {
        ref,
        className: twMerge("text-sharp", className),
        ...props
      }
    );
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

const ScrollView = forwardRef(
  (props, ref) => {
    return /* @__PURE__ */ jsx(ScrollView$1, { ref, ...props });
  }
);

const stackVariants = tv({
  variants: {
    absoluteFill: {
      true: "absolute inset-0"
    }
  }
});
const Stack = forwardRef(
  ({ className, absoluteFill, ...props }, ref) => {
    return /* @__PURE__ */ jsx(
      View$1,
      {
        ref,
        className: stackVariants({
          absoluteFill,
          className: `flex-row flex-wrap ${className ?? ""}`
        }),
        ...props
      }
    );
  }
);
const HStack = forwardRef(
  ({ className, absoluteFill, ...props }, ref) => {
    return /* @__PURE__ */ jsx(
      View$1,
      {
        ref,
        className: stackVariants({
          absoluteFill,
          className: `flex-row ${className ?? ""}`
        }),
        ...props
      }
    );
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

function SemanticScope({
  mode: forcedMode,
  semanticRole,
  children
}) {
  const { theme } = useUniwind();
  if (!semanticRole) {
    return children;
  }
  const mode = theme.startsWith("dark") ? "dark" : "light";
  if (forcedMode && forcedMode !== mode) {
    return (
      // we need to set the mode first to initialize the correct shared variables
      /* @__PURE__ */ jsx(ScopedTheme, { theme: forcedMode, children: /* @__PURE__ */ jsx(ScopedTheme, { theme: `${forcedMode}_${semanticRole}`, children }) })
    );
  }
  return /* @__PURE__ */ jsx(ScopedTheme, { theme: `${mode}_${semanticRole}`, children });
}

const boxBaseClasses = "shrink";
const boxVariants = tv(
  {
    base: boxBaseClasses,
    variants: {
      layer: {
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
      },
      tint: {
        accent: ""
      },
      absoluteFill: {
        true: "absolute inset-0"
      },
      center: {
        true: "items-center justify-center"
      }
    }
  },
  // Disable tw-merge: variants set distinct properties (bg-*, shadow-*, ...)
  // that don't actually conflict despite sharing prefixes in some cases.
  { twMerge: false }
);

const Box = forwardRef(
  ({ className, layer, shadow, tint, absoluteFill, center, ...props }, ref) => {
    if (process.env.NODE_ENV !== "production" && shadow === "lowered" && layer !== "lowered") {
      console.error(
        'alouette Box: shadow="lowered" must only be used with layer="lowered"'
      );
    }
    return /* @__PURE__ */ jsx(
      View$1,
      {
        ref,
        className: boxVariants({
          layer,
          shadow,
          tint,
          absoluteFill,
          center,
          className
        }),
        ...props
      }
    );
  }
);
const interactiveBoxVariants = tv({
  // TODO is it possible to define transition utilities
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
    base: "overflow-hidden",
    variants: {
      size: {
        sm: "p-m rounded-xs",
        md: "p-xl rounded-sm",
        lg: "p-xxl rounded-md"
      }
    },
    defaultVariants: {
      size: "md"
    }
  },
  { twMerge: false }
);
const Surface = forwardRef(
  ({ className, size, variant, shadow, semanticRole, ...props }, ref) => {
    return /* @__PURE__ */ jsx(SemanticScope, { semanticRole, children: /* @__PURE__ */ jsx(
      Box,
      {
        ref,
        layer: variant || "surface",
        shadow: shadow ?? (variant === "lowered" ? "lowered" : "s"),
        className: surfaceVariants({ size, className }),
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
  base: "font-extrabold text-sharp",
  variants: {
    level: {
      1: "heading-xl mb-xl",
      2: "heading-lg mb-xl",
      3: "heading-md mb-m",
      4: "heading-sm mb-m"
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
  semanticRole,
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
  if (semanticRole) {
    return /* @__PURE__ */ jsx(SemanticScope, { semanticRole, children: content });
  }
  return content;
}
function StorySubSection({
  title,
  children,
  modeTheme,
  semanticRole,
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
  if (semanticRole) {
    return /* @__PURE__ */ jsx(SemanticScope, { semanticRole, children: content });
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
    documentation && /* @__PURE__ */ jsx(Surface, { semanticRole: "info", className: "mb-xxl", children: documentation }),
    ["light", ...noDarkMode ? [] : ["dark"]].map((mode) => /* @__PURE__ */ jsx(ScopedTheme, { theme: mode, children: /* @__PURE__ */ jsx(View, { className: "bg-screen p-l", children }) }, mode))
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

const TINT_TO_VAR = {
  sharp: "sharp",
  muted: "muted",
  accent: "accent",
  "accent-muted": "accent-muted",
  onAccent: "on-accent",
  "onAccent-muted": "on-accent-muted"
};
function pickColorVar(tint, disabled, disabledSharp) {
  if (disabled) {
    return disabledSharp ? "--color-disabled-sharp" : "--color-disabled-muted";
  }
  return `--color-${TINT_TO_VAR[tint]}`;
}
function Icon({
  icon,
  size = 20,
  tint = "sharp",
  disabled = false,
  disabledSharp = false
}) {
  const color = useCSSVariable(pickColorVar(tint, disabled, disabledSharp));
  return cloneElement(icon, {
    color,
    width: size,
    height: size
  });
}

const pressableBoxVariants = tv(
  {
    extend: interactiveBoxVariants,
    base: ["overflow-hidden"].join(" "),
    variants: {
      variant: {
        contained: [
          "rounded-sm",
          process.env.EXPO_PUBLIC_STORYBOOK_ENABLED ? "" : "shadow-s bg-interactive-contained-pressable",
          "hover:bg-interactive-contained-hover",
          "focus:bg-interactive-contained-focus",
          "active:bg-interactive-contained-active",
          "disabled:bg-interactive-contained-disabled",
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
const PressableBox = forwardRef(
  ({ className, variant, ghost = false, forceStyle, semanticRole, ...props }, ref) => {
    return /* @__PURE__ */ jsx(SemanticScope, { semanticRole, children: /* @__PURE__ */ jsx(
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
const buttonFrameVariants = tv(
  {
    base: "flex-row items-center justify-center",
    variants: {
      size: {
        sm: "rounded-sm px-xs gap-xxs min-h-[38px]",
        md: "rounded-sm px-m gap-xs min-h-[44px]"
      }
    },
    defaultVariants: { size: "md" }
  },
  { twMerge: false }
);
const buttonTextVariants = tv(
  {
    base: "font-bold text-center text-sharp shrink",
    variants: {
      size: {
        sm: "body-sm py-xxs",
        md: "body-md py-xs"
      },
      variant: {
        contained: "text-on-accent disabled:text-disabled-sharp",
        outlined: "text-sharp disabled:text-disabled-muted"
      }
    },
    defaultVariants: {
      size: "md",
      variant: "contained"
    }
  }
  // { twMerge: false },
);
function Button({
  icon,
  text,
  disabled,
  semanticRole = "brand",
  variant = "contained",
  size = "md",
  className,
  ...pressableProps
}) {
  const onAccent = variant === "contained";
  return /* @__PURE__ */ jsxs(
    PressableBox,
    {
      semanticRole,
      variant,
      disabled,
      className: buttonFrameVariants({ size, className }),
      ...pressableProps,
      children: [
        icon ? /* @__PURE__ */ jsx(
          Icon,
          {
            icon,
            tint: onAccent ? "onAccent" : "sharp",
            disabled: disabled === true,
            disabledSharp: onAccent,
            size: size === "sm" ? 16 : 20
          }
        ) : null,
        /* @__PURE__ */ jsx(
          Text,
          {
            "aria-disabled": disabled === true,
            className: buttonTextVariants({ size, variant }),
            children: text
          }
        )
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
  const isDisabled = disabled === true;
  const onAccent = variant === "contained";
  return /* @__PURE__ */ jsx(
    PressableBox,
    {
      variant,
      disabled,
      className: `shrink-0 items-center justify-center rounded-full ${className ?? ""}`,
      style: { width: diameter, height: diameter },
      ...pressableProps,
      children: /* @__PURE__ */ jsx(
        Icon,
        {
          icon,
          size: diameter * (iconSize === "fill" ? 0.8 : 0.55),
          disabled: isDisabled,
          tint: onAccent ? "onAccent" : "sharp",
          disabledSharp: onAccent
        }
      )
    }
  );
}

const inputVariants = tv(
  {
    base: [
      "body-md text-sharp",
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
        undefined: "bg-form-bg border-interactive-outlined-pressable",
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
const InputText = forwardRef(
  ({ className, disabled, mode, multiline, forceStyle, ...props }, ref) => {
    const placeholderColor = useCSSVariable("--color-form-placeholder");
    const modeProps = mode ? MODE_PROPS[mode] : void 0;
    return /* @__PURE__ */ jsx(
      TextInput,
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

const TextArea = forwardRef((props, ref) => {
  return /* @__PURE__ */ jsx(InputText, { ref, multiline: true, ...props });
});

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
  onValueChange,
  ...props
}) {
  const [value, setValue] = useControllableChecked(checked, onValueChange);
  const [trackBg, thumb, disabledTrackBg, disabledThumb] = useCSSVariable([
    "--color-lowered",
    "--color-highlight",
    "--color-form-bg-disabled",
    "--color-disabled-muted"
  ]);
  const track = disabled ? disabledTrackBg : trackBg;
  const thumbColor = disabled ? disabledThumb : thumb;
  return /* @__PURE__ */ jsx(
    Switch$1,
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
function Switch({ semanticRole, ...rest }) {
  return /* @__PURE__ */ jsx(SemanticScope, { semanticRole, children: /* @__PURE__ */ jsx(SwitchInner, { ...rest }) });
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
const ICON_SIZE = { sm: 20, md: 24, lg: 28 };
const DISMISS_BUTTON_SIZE = {
  sm: 24,
  md: 40,
  lg: 40
};
function Message({
  icon,
  size = "md",
  semanticRole,
  children,
  onDismiss,
  dismissIconAriaLabel
}) {
  const dismissDiameter = DISMISS_BUTTON_SIZE[size];
  return /* @__PURE__ */ jsx(SemanticScope, { semanticRole, children: /* @__PURE__ */ jsxs(Box, { shadow: "m", className: messageFrameVariants({ size }), children: [
    /* @__PURE__ */ jsx(Icon, { icon, size: ICON_SIZE[size], tint: "accent" }),
    /* @__PURE__ */ jsx(Text, { className: "text-accent grow", children }),
    onDismiss ? /* @__PURE__ */ jsx(
      Box,
      {
        style: { width: dismissDiameter, height: dismissDiameter },
        className: "items-center justify-center",
        children: /* @__PURE__ */ jsx(
          IconButton,
          {
            ghost: true,
            icon: /* @__PURE__ */ jsx(XRegularIcon, {}),
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
  return /* @__PURE__ */ jsx(Message, { ...props, semanticRole: "info", icon: /* @__PURE__ */ jsx(InfoRegularIcon, {}) });
}
function ConfirmationMessage(props) {
  return /* @__PURE__ */ jsx(Message, { ...props, semanticRole: "success", icon: /* @__PURE__ */ jsx(CheckRegularIcon, {}) });
}
function WarningMessage(props) {
  return /* @__PURE__ */ jsx(Message, { ...props, semanticRole: "warning", icon: /* @__PURE__ */ jsx(WarningRegularIcon, {}) });
}

function PressableListItem({
  variant = "contained",
  role = "button",
  semanticRole,
  children,
  onPress
}) {
  return /* @__PURE__ */ jsxs(
    PressableBox,
    {
      variant,
      role,
      semanticRole,
      className: "flex-row items-center justify-between mx-xs my-xxs px-m py-m",
      onPress,
      children: [
        /* @__PURE__ */ jsx(View$1, { className: "flex-1", children }),
        /* @__PURE__ */ jsx(View$1, { className: "justify-center", children: /* @__PURE__ */ jsx(
          Icon,
          {
            tint: variant === "contained" ? "onAccent-muted" : "muted",
            icon: /* @__PURE__ */ jsx(CaretRightRegularIcon, {}),
            size: 18
          }
        ) })
      ]
    }
  );
}

function GradientBackground({
  children
}) {
  const [start, middle, end] = useCSSVariable([
    "--color-screen-gradient-start",
    "--color-screen-gradient-middle",
    "--color-screen-gradient-end"
  ]);
  return /* @__PURE__ */ jsxs(View$1, { className: "absolute inset-0", children: [
    /* @__PURE__ */ jsx(
      LinearGradient,
      {
        colors: [end, middle, start],
        locations: [0.05, 0.8, 0.98],
        style: { flex: 1 }
      }
    ),
    children
  ] });
}

const GradientScrollViewInner = forwardRef(({ children, ...scrollViewProps }, ref) => {
  const [gradientStart, gradientEnd] = useCSSVariable([
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
const GradientScrollView = forwardRef(({ semanticRole, children, ...scrollViewProps }, ref) => {
  return /* @__PURE__ */ jsx(SemanticScope, { semanticRole, children: /* @__PURE__ */ jsx(GradientScrollViewInner, { ref, ...scrollViewProps, children }) });
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

const useOpenExternalLink = () => {
  const [textSharp, bgSurface] = useCSSVariable([
    "--color-text-sharp",
    "--color-bg-surface"
  ]);
  return async (href, openLinkBehavior) => {
    switch (openLinkBehavior.native) {
      case "webBrowser": {
        return WebBrowser.openBrowserAsync(href, {
          controlsColor: textSharp,
          dismissButtonStyle: "close",
          presentationStyle: WebBrowserPresentationStyle.PAGE_SHEET,
          toolbarColor: bgSurface,
          secondaryToolbarColor: bgSurface,
          readerMode: false,
          enableBarCollapsing: false,
          showTitle: true,
          enableDefaultShareMenuItem: true
        });
      }
      case "linking": {
        return Linking.openURL(href);
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
  return /* @__PURE__ */ jsx(C, { ...props, onPress: handlePress });
}

export { AlouetteDecorator, AlouetteProvider, Box, BreakpointNameEnum, Breakpoints, Button, ConfirmationMessage, ExternalLink, ExternalLinkButton, GradientBackground, GradientScrollView, HStack, Icon, IconButton, InfoMessage, InputText, InteractiveBox, InternalLinkButton, Message, Paragraph, PressableBox, PressableListItem, SafeAreaBox, ScrollView, SemanticScope, Separator, Stack, Story, StoryContainer, StoryDecorator, StoryGrid, StoryTitle, Surface, Switch, SwitchBreakpointsUsingDisplayNone, SwitchBreakpointsUsingNull, Text, TextArea, VStack, View, WarningMessage, styled, useCurrentBreakpointName, useCurrentBreakpointNameFiltered, useDefaultThemeFromColorScheme };
//# sourceMappingURL=index-node22.mjs.map
