'use strict';

Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });

const jsxRuntime = require('react/jsx-runtime');
const react = require('react');
const uniwind = require('uniwind');
const reactNative = require('react-native');
const reactNativeSafeAreaContext = require('react-native-safe-area-context');
const tailwindMerge = require('tailwind-merge');
const tailwindVariants = require('tailwind-variants');
const CheckRegularIcon = require('alouette-icons/phosphor-icons/CheckRegularIcon');
const InfoRegularIcon = require('alouette-icons/phosphor-icons/InfoRegularIcon');
const WarningRegularIcon = require('alouette-icons/phosphor-icons/WarningRegularIcon');
const XRegularIcon = require('alouette-icons/phosphor-icons/XRegularIcon');
const CaretRightRegularIcon = require('alouette-icons/phosphor-icons/CaretRightRegularIcon');
const expoLinearGradient = require('expo-linear-gradient');
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

const useDefaultThemeFromColorScheme = () => {
  const colorScheme = reactNative.useColorScheme();
  return colorScheme || "light";
};
function AlouetteProvider({
  children,
  defaultTheme = "light"
}) {
  react.useEffect(() => {
    uniwind.Uniwind.setTheme(defaultTheme);
  }, [defaultTheme]);
  return children;
}

const AlouetteDecorator = (storyFn, context) => {
  const theme = context.globals.backgrounds?.value === "#000000" ? "dark" : "light";
  react.useEffect(() => {
    uniwind.Uniwind.setTheme(theme);
  }, [theme]);
  return /* @__PURE__ */ jsxRuntime.jsx(reactNativeSafeAreaContext.SafeAreaProvider, { children: /* @__PURE__ */ jsxRuntime.jsx(AlouetteProvider, { defaultTheme: theme, children: storyFn(context) }) });
};

const View = react.forwardRef((props, ref) => {
  return /* @__PURE__ */ jsxRuntime.jsx(reactNative.View, { ref, ...props });
});

const twMerge = tailwindMerge.extendTailwindMerge({
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
const Text = react.forwardRef(
  ({ className, ...props }, ref) => {
    return /* @__PURE__ */ jsxRuntime.jsx(
      reactNative.Text,
      {
        ref,
        className: twMerge("text-sharp", className),
        ...props
      }
    );
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

const stackVariants = tailwindVariants.tv({
  variants: {
    absoluteFill: {
      true: "absolute inset-0"
    }
  }
});
const Stack = react.forwardRef(
  ({ className, absoluteFill, ...props }, ref) => {
    return /* @__PURE__ */ jsxRuntime.jsx(
      reactNative.View,
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
const HStack = react.forwardRef(
  ({ className, absoluteFill, ...props }, ref) => {
    return /* @__PURE__ */ jsxRuntime.jsx(
      reactNative.View,
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

function SemanticScope({
  mode: forcedMode,
  semanticRole,
  children
}) {
  const { theme } = uniwind.useUniwind();
  if (!semanticRole) {
    return children;
  }
  const mode = theme.startsWith("dark") ? "dark" : "light";
  if (forcedMode && forcedMode !== mode) {
    return (
      // we need to set the mode first to initialize the correct shared variables
      /* @__PURE__ */ jsxRuntime.jsx(uniwind.ScopedTheme, { theme: forcedMode, children: /* @__PURE__ */ jsxRuntime.jsx(uniwind.ScopedTheme, { theme: `${forcedMode}_${semanticRole}`, children }) })
    );
  }
  return /* @__PURE__ */ jsxRuntime.jsx(uniwind.ScopedTheme, { theme: `${mode}_${semanticRole}`, children });
}

const boxBaseClasses = "shrink";
const boxVariants = tailwindVariants.tv(
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

const Box = react.forwardRef(
  ({ className, layer, shadow, tint, absoluteFill, center, ...props }, ref) => {
    if (process.env.NODE_ENV !== "production" && shadow === "lowered" && layer !== "lowered") {
      console.error(
        'alouette Box: shadow="lowered" must only be used with layer="lowered"'
      );
    }
    return /* @__PURE__ */ jsxRuntime.jsx(
      reactNative.View,
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
const interactiveBoxVariants = tailwindVariants.tv({
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
      }
    },
    defaultVariants: {
      size: "md"
    }
  },
  { twMerge: false }
);
const Surface = react.forwardRef(
  ({ className, size, variant, shadow, semanticRole, ...props }, ref) => {
    return /* @__PURE__ */ jsxRuntime.jsx(SemanticScope, { semanticRole, children: /* @__PURE__ */ jsxRuntime.jsx(
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
  semanticRole,
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
    return /* @__PURE__ */ jsxRuntime.jsx(uniwind.ScopedTheme, { theme: modeTheme, children: content });
  }
  if (semanticRole) {
    return /* @__PURE__ */ jsxRuntime.jsx(SemanticScope, { semanticRole, children: content });
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
  const content = /* @__PURE__ */ jsxRuntime.jsx(InternalStorySection, { className: "mb-m", children: withSurface ? /* @__PURE__ */ jsxRuntime.jsxs(Surface, { children: [
    /* @__PURE__ */ jsxRuntime.jsx(StoryTitle, { level: 3, children: title }),
    /* @__PURE__ */ jsxRuntime.jsx(VStack, { className: "gap-m", children })
  ] }) : /* @__PURE__ */ jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [
    /* @__PURE__ */ jsxRuntime.jsx(StoryTitle, { level: 3, children: title }),
    /* @__PURE__ */ jsxRuntime.jsx(VStack, { className: "gap-m", children })
  ] }) });
  if (modeTheme) {
    return /* @__PURE__ */ jsxRuntime.jsx(uniwind.ScopedTheme, { theme: modeTheme, children: content });
  }
  if (semanticRole) {
    return /* @__PURE__ */ jsxRuntime.jsx(SemanticScope, { semanticRole, children: content });
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
    documentation && /* @__PURE__ */ jsxRuntime.jsx(Surface, { semanticRole: "info", className: "mb-xxl", children: documentation }),
    ["light", ...noDarkMode ? [] : ["dark"]].map((mode) => /* @__PURE__ */ jsxRuntime.jsx(uniwind.ScopedTheme, { theme: mode, children: /* @__PURE__ */ jsxRuntime.jsx(View, { className: "bg-screen p-l", children }) }, mode))
  ] });
}
Story.Section = StorySection;
Story.SubSection = StorySubSection;

function StoryContainer({
  title,
  children
}) {
  return /* @__PURE__ */ jsxRuntime.jsx(uniwind.ScopedTheme, { theme: "light", children: /* @__PURE__ */ jsxRuntime.jsxs(ScrollView, { className: "bg-white p-3xl", children: [
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
  const color = uniwind.useCSSVariable(pickColorVar(tint, disabled, disabledSharp));
  return react.cloneElement(icon, {
    color,
    width: size,
    height: size
  });
}

const pressableBoxVariants = tailwindVariants.tv(
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
const PressableBox = react.forwardRef(
  ({ className, variant, ghost = false, forceStyle, semanticRole, ...props }, ref) => {
    return /* @__PURE__ */ jsxRuntime.jsx(SemanticScope, { semanticRole, children: /* @__PURE__ */ jsxRuntime.jsx(
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
const buttonFrameVariants = tailwindVariants.tv(
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
const buttonTextVariants = tailwindVariants.tv(
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
  return /* @__PURE__ */ jsxRuntime.jsxs(
    PressableBox,
    {
      semanticRole,
      variant,
      disabled,
      className: buttonFrameVariants({ size, className }),
      ...pressableProps,
      children: [
        icon ? /* @__PURE__ */ jsxRuntime.jsx(
          Icon,
          {
            icon,
            tint: onAccent ? "onAccent" : "sharp",
            disabled: disabled === true,
            disabledSharp: onAccent,
            size: size === "sm" ? 16 : 20
          }
        ) : null,
        /* @__PURE__ */ jsxRuntime.jsx(
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
  return /* @__PURE__ */ jsxRuntime.jsx(
    PressableBox,
    {
      variant,
      disabled,
      className: `shrink-0 items-center justify-center rounded-full ${className ?? ""}`,
      style: { width: diameter, height: diameter },
      ...pressableProps,
      children: /* @__PURE__ */ jsxRuntime.jsx(
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

const inputVariants = tailwindVariants.tv(
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
const InputText = react.forwardRef(
  ({ className, disabled, mode, multiline, forceStyle, ...props }, ref) => {
    const placeholderColor = uniwind.useCSSVariable("--color-form-placeholder");
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
  const [trackBg, thumb, disabledTrackBg, disabledThumb] = uniwind.useCSSVariable([
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
function Switch({ semanticRole, ...rest }) {
  return /* @__PURE__ */ jsxRuntime.jsx(SemanticScope, { semanticRole, children: /* @__PURE__ */ jsxRuntime.jsx(SwitchInner, { ...rest }) });
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
  semanticRole,
  children,
  onDismiss,
  dismissIconAriaLabel
}) {
  const dismissDiameter = DISMISS_BUTTON_SIZE[size];
  return /* @__PURE__ */ jsxRuntime.jsx(SemanticScope, { semanticRole, children: /* @__PURE__ */ jsxRuntime.jsxs(Box, { shadow: "m", className: messageFrameVariants({ size }), children: [
    /* @__PURE__ */ jsxRuntime.jsx(Icon, { icon, size: ICON_SIZE[size], tint: "accent" }),
    /* @__PURE__ */ jsxRuntime.jsx(Text, { className: "text-accent grow", children }),
    onDismiss ? /* @__PURE__ */ jsxRuntime.jsx(
      Box,
      {
        style: { width: dismissDiameter, height: dismissDiameter },
        className: "items-center justify-center",
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
  return /* @__PURE__ */ jsxRuntime.jsx(Message, { ...props, semanticRole: "info", icon: /* @__PURE__ */ jsxRuntime.jsx(InfoRegularIcon.InfoRegularIcon, {}) });
}
function ConfirmationMessage(props) {
  return /* @__PURE__ */ jsxRuntime.jsx(Message, { ...props, semanticRole: "success", icon: /* @__PURE__ */ jsxRuntime.jsx(CheckRegularIcon.CheckRegularIcon, {}) });
}
function WarningMessage(props) {
  return /* @__PURE__ */ jsxRuntime.jsx(Message, { ...props, semanticRole: "warning", icon: /* @__PURE__ */ jsxRuntime.jsx(WarningRegularIcon.WarningRegularIcon, {}) });
}

function PressableListItem({
  variant = "contained",
  role = "button",
  semanticRole,
  children,
  onPress
}) {
  return /* @__PURE__ */ jsxRuntime.jsxs(
    PressableBox,
    {
      variant,
      role,
      semanticRole,
      className: "flex-row items-center justify-between mx-xs my-xxs px-m py-m",
      onPress,
      children: [
        /* @__PURE__ */ jsxRuntime.jsx(reactNative.View, { className: "flex-1", children }),
        /* @__PURE__ */ jsxRuntime.jsx(reactNative.View, { className: "justify-center", children: /* @__PURE__ */ jsxRuntime.jsx(
          Icon,
          {
            tint: variant === "contained" ? "onAccent-muted" : "muted",
            icon: /* @__PURE__ */ jsxRuntime.jsx(CaretRightRegularIcon.CaretRightRegularIcon, {}),
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
  const [start, middle, end] = uniwind.useCSSVariable([
    "--color-screen-gradient-start",
    "--color-screen-gradient-middle",
    "--color-screen-gradient-end"
  ]);
  return /* @__PURE__ */ jsxRuntime.jsxs(reactNative.View, { className: "absolute inset-0", children: [
    /* @__PURE__ */ jsxRuntime.jsx(
      expoLinearGradient.LinearGradient,
      {
        colors: [end, middle, start],
        locations: [0.05, 0.8, 0.98],
        style: { flex: 1 }
      }
    ),
    children
  ] });
}

const GradientScrollViewInner = react.forwardRef(({ children, ...scrollViewProps }, ref) => {
  const [gradientStart, gradientEnd] = uniwind.useCSSVariable([
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
const GradientScrollView = react.forwardRef(({ semanticRole, children, ...scrollViewProps }, ref) => {
  return /* @__PURE__ */ jsxRuntime.jsx(SemanticScope, { semanticRole, children: /* @__PURE__ */ jsxRuntime.jsx(GradientScrollViewInner, { ref, ...scrollViewProps, children }) });
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
  const [textSharp, bgSurface] = uniwind.useCSSVariable([
    "--color-text-sharp",
    "--color-bg-surface"
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

exports.ScopedTheme = uniwind.ScopedTheme;
exports.Uniwind = uniwind.Uniwind;
exports.useCSSVariable = uniwind.useCSSVariable;
exports.SafeAreaProvider = reactNativeSafeAreaContext.SafeAreaProvider;
exports.useSafeAreaInsets = reactNativeSafeAreaContext.useSafeAreaInsets;
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
exports.PressableBox = PressableBox;
exports.PressableListItem = PressableListItem;
exports.SafeAreaBox = SafeAreaBox;
exports.ScrollView = ScrollView;
exports.SemanticScope = SemanticScope;
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
exports.styled = styled;
exports.useCurrentBreakpointName = useCurrentBreakpointName;
exports.useCurrentBreakpointNameFiltered = useCurrentBreakpointNameFiltered;
exports.useDefaultThemeFromColorScheme = useDefaultThemeFromColorScheme;
//# sourceMappingURL=index-node22.cjs.map
