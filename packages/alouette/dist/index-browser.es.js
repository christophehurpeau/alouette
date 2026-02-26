import { jsx, jsxs } from 'react/jsx-runtime';
import { styled, View, usePropsAndStyle, Text as Text$1, isWeb, useMedia, TamaguiProvider } from '@tamagui/core';
export { Theme, View, styled, withStaticProperties } from '@tamagui/core';
import { cloneElement, Fragment, Children, createContext, useState, useEffect } from 'react';
import 'alouette-icons/phosphor-icons/CheckRegularIcon';
import 'alouette-icons/phosphor-icons/InfoRegularIcon';
import 'alouette-icons/phosphor-icons/WarningRegularIcon';
import { XRegularIcon } from 'alouette-icons/phosphor-icons/XRegularIcon';
import { ScrollView as ScrollView$1, Platform, useColorScheme } from 'react-native-web';
import '@tamagui/core/reset.css';
import { CaretRightRegularIcon } from 'alouette-icons/phosphor-icons/CaretRightRegularIcon';

const useSafeAreaInsets = () => ({
  top: 0,
  bottom: 0,
  left: 0,
  right: 0
});

const absoluteFillStyle = {
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0
};

const getInteractionStyles = (name, {
  disabled,
  interactive,
  variant = name === "borderColor" ? "outlined" : "contained",
  tint
}) => {
  const isGhost = variant?.startsWith("ghost-");
  const prefix = interactive === "text" ? "interactive.forms" : (
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    `interactive${tint === "accent" ? "-accent" : ""}.${isGhost ? variant.slice(6) : variant}`
  );
  if (disabled) {
    return { [name]: `$${prefix}.${name}:disabled` };
  }
  if (name === "shadowColor") {
    return { [name]: `$${prefix}.${name}` };
  }
  if (name === "outlineColor") {
    return {
      focusVisibleStyle: {
        outlineWidth: interactive === "text" ? 0 : 2,
        outlineStyle: "solid",
        outlineOffset: variant === "outlined" || variant === "ghost-outlined" ? 2 : 0,
        outlineColor: `$${prefix}.${name}:focus`
      }
    };
  }
  return {
    [name]: isGhost ? "transparent" : `$${prefix}.${name}`,
    hoverStyle: { [name]: `$${prefix}.${name}:hover` },
    focusStyle: { [name]: `$${prefix}.${name}:focus` },
    pressStyle: { [name]: `$${prefix}.${name}:press` },
    disabledStyle: { [name]: `$${prefix}.${name}:disabled` }
  };
};

const absoluteFill = {
  true: absoluteFillStyle
};
const center = {
  true: {
    justifyContent: "center",
    alignItems: "center"
  }
};
const tint = {
  accent: {}
  // used in interactive variant
};
function interactive(isInteractiveOrInteractiveCursorType, { props }) {
  if (!isInteractiveOrInteractiveCursorType) return null;
  if (isInteractiveOrInteractiveCursorType === true) {
    return {
      cursor: "pointer",
      pressStyle: {
        transform: [{ scale: 0.975 }]
      },
      disabledStyle: {
        cursor: "not-allowed",
        opacity: "$opacity.disabled",
        transform: [{ scale: 1 }]
      }
    };
  }
  return {
    cursor: isInteractiveOrInteractiveCursorType,
    disabledStyle: {
      cursor: "not-allowed",
      opacity: "$opacity.disabled"
    }
  };
}
const layer = {
  surface: {
    backgroundColor: "$bg-surface"
  },
  highlight: {
    backgroundColor: "$bg-highlight"
  },
  "highlight-accent": {
    backgroundColor: "$bg-highlight-accent"
  },
  lowered: {
    backgroundColor: "$bg-lowered"
  },
  translucent: {
    backgroundColor: "$bg-translucent"
  }
};
const shadow = {
  none: {
    boxShadow: "none",
    elevationAndroid: 0
  },
  s: {
    boxShadow: "inset 0 1px 2px #ffffff40, 0 1px 2px #00000040, 0 2px 4px #00000025",
    elevationAndroid: 2
  },
  m: {
    boxShadow: "inset 0 1px 2px #ffffff40, 0 2px 4px #00000040, 0 4px 8px #00000025",
    elevationAndroid: 4
  },
  l: {
    boxShadow: "inset 0 1px 2px #ffffff40, 0 4px 6px #00000040, 0 6px 10px #00000025",
    elevationAndroid: 6
  },
  lowered: {
    boxShadow: "inset 0 1px 2px #00000040, inset 0 -2px 2px #ffffff15"
  }
};
const size = (val) => {
  return { width: val, height: val };
};
const withBorder = (val, { props }) => {
  if (props.shadow && props.shadow !== "lowered") {
    throw new Error("Cannot use border with shadow variant");
  }
  return {
    borderWidth: val,
    ...props.interactive ? getInteractionStyles("borderColor", props) : { borderColor: "$border-sharp" }
  };
};
const withFocusVisibleOutline = (val, { props }) => {
  if (!val) return null;
  return {
    ...props.interactive ? getInteractionStyles("outlineColor", props) : { outlineColor: "$outlineColor" },
    disabledStyle: {
      outlineWidth: 0
    }
  };
};
const withBackground = (val, { props }) => {
  return props.interactive && val === "interactive" ? getInteractionStyles("backgroundColor", props) : {
    backgroundColor: val === "surface" ? "$bg-surface" : "$bg-highlight"
  };
};

const containerVariants = /*#__PURE__*/Object.defineProperty({
  __proto__: null,
  absoluteFill,
  center,
  interactive,
  layer,
  shadow,
  size,
  tint,
  withBackground,
  withBorder,
  withFocusVisibleOutline
}, Symbol.toStringTag, { value: 'Module' });

const BoxFrame = styled(View, {
  // never apply overflow hidden here, as it will break shadows
  flexShrink: 1,
  // allow to shrink by default, as Box is often used in VSTack and HStack. See button for an example.
  variants: containerVariants
});
const InteractiveBoxFrame = styled(BoxFrame, {
  interactive: true,
  tabIndex: 0,
  transition: "fast",
  variants: {
    disabled: {
      true: {
        tabIndex: -1
      }
    }
  }
});
const Box = process.env.NODE_ENV !== "production" ? (props) => {
  if (process.env.NODE_ENV !== "production" && props.shadow === "lowered" && props.layer !== "lowered") {
    throw new Error(
      'shadow="lowered" must only be used with layer="lowered"'
    );
  }
  return /* @__PURE__ */ jsx(BoxFrame, { ...props });
} : BoxFrame;
const InteractiveBox = InteractiveBoxFrame;
const SafeAreaBox = BoxFrame.styleable((props) => {
  const insets = useSafeAreaInsets();
  return /* @__PURE__ */ jsx(
    Box,
    {
      ...props,
      paddingTop: insets.top,
      paddingBottom: insets.bottom,
      paddingLeft: insets.left,
      paddingRight: insets.right
    }
  );
});

const PressableBox = styled(InteractiveBox, {
  role: "button",
  overflow: "hidden",
  withFocusVisibleOutline: true,
  variants: {
    variant: {
      contained: {
        withBackground: "interactive",
        shadow: "s",
        borderRadius: "$sm"
      },
      outlined: {
        // withBackground: "highlight",
        withBorder: 1
      },
      "ghost-contained": {
        withBackground: "interactive",
        backgroundColor: "transparent"
      },
      "ghost-outlined": {
        // withBackground: "surface",
        withBorder: 1,
        backgroundColor: "transparent",
        borderColor: "transparent"
      }
    }
  },
  defaultVariants: {
    variant: "contained"
  }
});

const getDefaultColor = (disabled, disabledSharp, tint) => {
  if (disabled) {
    return disabledSharp ? "$text-disabled-sharp" : "$text-disabled-muted";
  }
  if (tint === "accent") return "$text-accent";
  if (tint === "accent-muted") return "$text-accent-muted";
  if (tint === "muted") return "$text-muted";
  if (tint === "onAccent") return "$text-onAccent";
  if (tint === "onAccent-muted") return "$text-onAccent-muted";
  return "$text-sharp";
};
function Icon({
  icon,
  // TODO should size be normalized ?
  size = 20,
  disabled,
  disabledSharp,
  tint
}) {
  const [props, style] = usePropsAndStyle(
    {
      color: getDefaultColor(disabled, disabledSharp, tint),
      width: size,
      height: size
    },
    { forComponent: Text$1 }
  );
  return cloneElement(icon, { style, ...props });
}

const IconButtonFrame = styled(PressableBox, {
  name: "IconButtonFrame",
  role: "button",
  center: true,
  borderRadius: 1e4
});
function IconButton({
  icon,
  disabled,
  size = 40,
  iconSize,
  variant = "contained",
  ...pressableBoxProps
}) {
  return /* @__PURE__ */ jsx(
    IconButtonFrame,
    {
      size,
      variant,
      disabled,
      ...pressableBoxProps,
      children: /* @__PURE__ */ jsx(
        Icon,
        {
          size: iconSize === "fill" ? size * 0.8 : size * 0.5,
          disabled,
          icon
        }
      )
    }
  );
}

const TextStyled = styled(Text$1, {
  variants: {
    inherit: {
      false: {
        size: "$md",
        weight: "$regular",
        fontFamily: "$body",
        tint: "sharp"
      }
    },
    size: {
      "...fontSize": (size) => ({
        fontSize: size,
        lineHeight: size
      })
    },
    weight: {
      $regular: { fontWeight: "$regular" },
      $bold: { fontWeight: "$bold" },
      $extraBold: { fontWeight: "$extraBold" }
    },
    family: {
      $heading: { fontFamily: "$heading" },
      $body: { fontFamily: "$body" },
      "$body-monospace": { fontFamily: "$body-monospace" }
    },
    tint: {
      sharp: {
        color: "$text-sharp",
        disabledStyle: {
          color: "$text-disabled-muted"
        }
      },
      muted: {
        color: "$text-muted",
        disabledStyle: {
          color: "$text-disabled-muted"
        }
      },
      accent: {
        color: "$text-accent"
      },
      onAccent: {
        color: "$text-onAccent"
      }
    },
    disabledSharp: {
      true: {
        disabledStyle: {
          color: "$text-disabled-sharp"
        }
      }
    }
  },
  defaultVariants: {
    inherit: false
  }
});
const Text = TextStyled;
const ParagraphStyled = styled(TextStyled, {
  render: "p",
  userSelect: "auto",
  inherit: false
});
const Paragraph = ParagraphStyled;

const ButtonFrame = styled(PressableBox, {
  name: "ButtonFrame",
  render: "button",
  // @ts-expect-error missing type definition
  type: "button",
  center: true,
  flexDirection: "row",
  variants: {
    size: {
      sm: {
        paddingHorizontal: "$0.5",
        gap: "$0.25",
        borderRadius: "$sm",
        minHeight: 38
      },
      md: {
        paddingHorizontal: "$1.0",
        gap: "$0.5",
        borderRadius: "$sm",
        minHeight: 44
      }
    }
  },
  defaultVariants: {
    size: "md"
  }
});
const ButtonText = styled(Text, {
  textAlign: "center",
  weight: "$bold",
  flexShrink: 1,
  variants: {
    "button-size": {
      sm: {
        paddingVertical: "$0.25",
        size: "$sm"
      },
      md: {
        paddingVertical: "$0.5",
        size: "$md"
      }
    }
  }
});
function Button({
  icon,
  text,
  disabled,
  variant = "contained",
  size = "md",
  ...pressableProps
}) {
  return /* @__PURE__ */ jsxs(
    ButtonFrame,
    {
      variant,
      size,
      disabled,
      ...pressableProps,
      children: [
        icon && /* @__PURE__ */ jsx(
          Icon,
          {
            tint: variant === "contained" ? "onAccent" : void 0,
            disabled,
            disabledSharp: variant === "contained",
            icon,
            size: size === "sm" ? 16 : 20
          }
        ),
        /* @__PURE__ */ jsx(
          ButtonText,
          {
            tint: variant === "contained" ? "onAccent" : void 0,
            "button-size": size,
            disabled,
            disabledSharp: variant === "contained",
            textAlign: icon ? "left" : "center",
            children: text
          }
        )
      ]
    }
  );
}
function ExternalLinkButton(props) {
  return /* @__PURE__ */ jsx(
    Button,
    {
      ...props,
      render: "a",
      role: "link",
      target: "_blank",
      rel: "noopener noreferrer",
      style: { textDecorationLine: "none" }
    }
  );
}
function InternalLinkButton(props) {
  return /* @__PURE__ */ jsx(Button, { ...props, render: "a", role: "link" });
}

const SurfaceFrame = styled(Box, {
  layer: "surface",
  shadow: "s",
  overflow: "hidden",
  // make sure the boxshadow respects the borderRadius.
  variants: {
    size: {
      sm: {
        padding: "$1.0",
        borderRadius: "$sm"
      },
      md: {
        padding: "$2.0",
        borderRadius: "$md"
      },
      lg: {
        padding: "$3.0",
        borderRadius: "$lg"
      }
    },
    lowered: {
      true: {
        layer: "lowered",
        shadow: "lowered"
      }
    }
  },
  defaultVariants: {
    size: "md"
  }
});
const Surface = SurfaceFrame;

const MessageFrame = styled(Surface, {
  name: "MessageFrame",
  alignItems: "center",
  flexDirection: "row",
  layer: "highlight-accent",
  variants: {
    size: {
      sm: {
        gap: "$0.5"
      },
      md: {
        gap: "$1.0"
      },
      lg: {
        gap: "$1.5"
      }
    }
  },
  defaultVariants: {
    size: "md"
  }
});
const MessageText = styled(Text, {
  size: "$md",
  flexGrow: 1,
  tint: "accent"
});
const MessageIconContainer = styled(View, {
  alignItems: "center"
});
const MessageDismissButtonContainer = styled(View, {
  position: "relative",
  alignItems: "center",
  justifyContent: "center",
  variants: {
    size: {
      sm: {
        height: 24,
        width: 24
      },
      md: {
        height: 40,
        width: 40
      },
      lg: {
        height: 40,
        width: 40
      }
    }
  },
  defaultVariants: {
    size: "md"
  }
});
function Message({
  icon,
  size = "md",
  theme,
  children,
  onDismiss,
  dismissIconAriaLabel
}) {
  return /* @__PURE__ */ jsxs(MessageFrame, { theme, size, children: [
    /* @__PURE__ */ jsx(MessageIconContainer, { children: /* @__PURE__ */ jsx(Icon, { size: size === "sm" ? 20 : 24, icon, tint: "accent" }) }),
    /* @__PURE__ */ jsx(MessageText, { children }),
    onDismiss ? /* @__PURE__ */ jsx(MessageDismissButtonContainer, { size, children: /* @__PURE__ */ jsx(
      IconButton,
      {
        icon: /* @__PURE__ */ jsx(XRegularIcon, {}),
        iconSize: size === "sm" ? "fill" : void 0,
        size: size === "sm" ? 24 : 40,
        variant: "outlined",
        tint: "accent",
        "aria-label": dismissIconAriaLabel
      }
    ) }) : null
  ] });
}

const inputStyle = {
  fontFamily: "$body",
  fontSize: "$md",
  color: "$text-sharp",
  paddingHorizontal: "$1.0",
  paddingVertical: "$0.5",
  borderRadius: "$md"
};

const PlatformInputTextFrame = styled(
  View,
  {
    ...inputStyle,
    transition: "formElement",
    // crash on native ?
    tabIndex: 0,
    variants: {
      disabled: {
        true: {
          tabIndex: -1
        }
      },
      multiline: {
        true: {
          rows: 3
        }
      },
      mode: {
        password: {
          type: "password"
        },
        number: {
          type: "number"
        },
        tel: {
          type: "tel"
        },
        email: {
          type: "email"
        },
        search: {
          type: "search"
        }
      }
    }
  },
  {
    isInput: true,
    validStyles: Text$1.staticConfig.validStyles
  }
);
const PlatformInputText = PlatformInputTextFrame.styleable(({ autoCorrect, ...rest }) => /* @__PURE__ */ jsx(
  PlatformInputTextFrame,
  {
    ...{
      autoCorrect: autoCorrect ? "on" : "off"
    },
    ...rest
  }
));

const NativeInputText = styled(PlatformInputText, {
  render: "input",
  theme: "brand",
  variants: {
    ...containerVariants,
    disabled: {
      true: {
        color: "$text-disabled-muted",
        cursor: "not-allowed",
        opacity: "$opacity.disabled"
      }
    }
  },
  // @ts-expect-error -- variants not working when isInput is true
  interactive: "text",
  withBackground: "interactive",
  withBorder: 1,
  outlineWidth: 1,
  outlineOffset: 0,
  outlineStyle: "solid",
  outlineColor: "transparent",
  focusVisibleStyle: {
    outlineWidth: 1,
    outlineOffset: 0,
    outlineStyle: "solid",
    outlineColor: "$interactive.forms.outlineColor:focus"
  },
  focusStyle: {
    outlineWidth: 1,
    outlineOffset: 0,
    outlineStyle: "solid",
    outlineColor: "$interactive.forms.outlineColor:focus"
  }
});
const InputText = NativeInputText;

const TextAreaFrame = styled(InputText, {
  render: "textarea",
  multiline: true,
  height: "auto",
  minHeight: 80,
  borderRadius: "$1.0",
  paddingHorizontal: "$0.75"
});
const TextArea = TextAreaFrame;

const ScrollView = styled(
  ScrollView$1,
  {},
  {
    accept: {
      contentContainerStyle: "style"
    }
  }
);

const variants = {
  absoluteFill: {
    true: absoluteFillStyle
  }
};
const Stack = styled(View, {
  name: "Stack",
  flexDirection: "row",
  flexWrap: "wrap",
  variants
});
const HStack = styled(View, {
  name: "HStack",
  flexDirection: "row",
  variants
});
const VStack = styled(View, {
  name: "VStack",
  flexDirection: "column"
});
styled(View, {
  justifyContent: "center",
  alignItems: "center",
  variants
});

const StoryTitle = styled(Text, {
  family: "$heading",
  weight: "$extraBold",
  variants: {
    level: {
      1: { size: "$xl", marginBottom: "$2.0" },
      2: { size: "$lg", marginBottom: "$2.0" },
      3: { size: "$md", marginBottom: "$1.0" },
      4: { size: "$sm", marginBottom: "$1.0" }
    }
  },
  defaultVariants: {
    level: 1
  }
});

const InternalStorySection = styled(VStack, {
  marginBottom: "$2.0",
  marginHorizontal: "$-1.0",
  paddingHorizontal: "$1.0"
});
function StorySection({
  title,
  children,
  level = 1,
  withSurface = false,
  ...props
}) {
  return /* @__PURE__ */ jsxs(InternalStorySection, { ...props, children: [
    /* @__PURE__ */ jsx(StoryTitle, { level: level + 1, children: title }),
    withSurface ? /* @__PURE__ */ jsx(Surface, { children }) : /* @__PURE__ */ jsx(VStack, { gap: "$1.0", children })
  ] });
}
function SubSection({
  title,
  children,
  withSurface = false,
  ...props
}) {
  return /* @__PURE__ */ jsxs(InternalStorySection, { marginBottom: "$1.0", ...props, children: [
    /* @__PURE__ */ jsx(StoryTitle, { level: 3, children: title }),
    withSurface ? /* @__PURE__ */ jsx(Surface, { children }) : /* @__PURE__ */ jsx(VStack, { gap: "$1.0", children })
  ] });
}
const ScrollViewNative = isWeb ? Fragment : ScrollView;
function Story({
  documentation,
  children,
  noDarkTheme
}) {
  return /* @__PURE__ */ jsxs(ScrollViewNative, { children: [
    documentation && /* @__PURE__ */ jsx(Surface, { layer: "highlight", shadow: "s", theme: "brand", marginBottom: "$3.0", children: documentation }),
    ["light", ...noDarkTheme ? [] : ["dark"]].map((theme) => /* @__PURE__ */ jsx(
      Box,
      {
        theme,
        backgroundColor: "$bg-screen",
        padding: "$2.0",
        children
      },
      theme
    ))
  ] });
}
Story.Section = StorySection;
Story.SubSection = SubSection;

function StoryContainer({
  title,
  children
}) {
  return /* @__PURE__ */ jsxs(ScrollView, { theme: "light", backgroundColor: "#fff", padding: "$4", children: [
    /* @__PURE__ */ jsx(StoryTitle, { level: 1, children: title }),
    children
  ] });
}

const StoryDecorator = (storyFn, { name, container }) => {
  if (container === false) return storyFn();
  return /* @__PURE__ */ jsx(StoryContainer, { title: name, children: storyFn() });
};

function StoryGridRow({
  children,
  breakpoint = "small",
  flexWrap
}) {
  return /* @__PURE__ */ jsx(
    View,
    {
      flexDirection: "column",
      ...{
        [`$${breakpoint}`]: {
          flexDirection: "row",
          marginBottom: "$2.0",
          flexWrap: flexWrap ? "wrap" : void 0,
          gap: flexWrap ? "$1.0" : void 0
        }
      },
      children: Children.map(children, (child) => /* @__PURE__ */ jsx(
        View,
        {
          paddingTop: "$1.0",
          paddingBottom: "$2.0",
          ...{
            [`$${breakpoint}`]: {
              flexGrow: 1,
              flexShrink: 1,
              flexBasis: flexWrap ? void 0 : 0,
              paddingTop: 0,
              paddingBottom: 0,
              marginVertical: "$0.25"
            }
          },
          children: child
        }
      ))
    }
  );
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

var BreakpointNameEnum = /* @__PURE__ */ ((BreakpointNameEnum2) => {
  BreakpointNameEnum2["BASE"] = "base";
  BreakpointNameEnum2["SMALL"] = "small";
  BreakpointNameEnum2["MEDIUM"] = "medium";
  BreakpointNameEnum2["LARGE"] = "large";
  BreakpointNameEnum2["WIDE"] = "wide";
  return BreakpointNameEnum2;
})(BreakpointNameEnum || {});

function useCurrentBreakpointName() {
  const media = useMedia();
  if (media.wide) return BreakpointNameEnum.WIDE;
  if (media.large) return BreakpointNameEnum.LARGE;
  if (media.medium) return BreakpointNameEnum.MEDIUM;
  if (media.small) return BreakpointNameEnum.SMALL;
  return BreakpointNameEnum.BASE;
}
function useCurrentBreakpointNameFiltered(names) {
  const media = useMedia();
  if (names.includes(BreakpointNameEnum.WIDE) && media.wide) {
    return BreakpointNameEnum.WIDE;
  }
  if (names.includes(BreakpointNameEnum.LARGE) && media.large) {
    return BreakpointNameEnum.LARGE;
  }
  if (names.includes(BreakpointNameEnum.MEDIUM) && media.medium) {
    return BreakpointNameEnum.MEDIUM;
  }
  if (names.includes(BreakpointNameEnum.SMALL) && media.small) {
    return BreakpointNameEnum.SMALL;
  }
  return BreakpointNameEnum.BASE;
}

function SwitchBreakpointsUsingDisplayNone({
  ...breakpoints
}) {
  const entries = Object.entries(breakpoints);
  return entries.map(([name, node], index) => {
    return /* @__PURE__ */ jsx(
      View,
      {
        display: name === "base" ? "flex" : "none",
        ...name === "base" ? void 0 : { display: "none", [`$${name}`]: { display: "flex" } },
        ...index + 1 in entries ? { [`$${entries[index + 1][0]}`]: { display: "none" } } : void 0,
        children: node
      },
      name
    );
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

const useDefaultThemeFromColorScheme = () => {
  const colorScheme = useColorScheme();
  return colorScheme || "light";
};
function AlouetteProvider({
  children,
  tamaguiConfig,
  defaultTheme = "light",
  disableInjectCSS
}) {
  return /* @__PURE__ */ jsx(
    TamaguiProvider,
    {
      config: tamaguiConfig,
      defaultTheme,
      disableInjectCSS,
      children
    }
  );
}

function SafeAreaProvider({ children }) {
  return children;
}

const AlouetteTamaguiConfigContext = createContext(null);
const AlouetteDecorator = (storyFn, context) => {
  const systemColorScheme = useColorScheme();
  const [theme, setTheme] = useState(systemColorScheme || "light");
  useEffect(() => {
    const backgroundColor = context.globals.backgrounds?.value;
    if (backgroundColor === "#000000") {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  }, [context.globals.backgrounds?.value]);
  return /* @__PURE__ */ jsx(SafeAreaProvider, { children: /* @__PURE__ */ jsx(
    AlouetteProvider,
    {
      tamaguiConfig: context.parameters.tamaguiConfig,
      defaultTheme: theme,
      children: /* @__PURE__ */ jsx(
        AlouetteTamaguiConfigContext.Provider,
        {
          value: context.parameters.tamaguiConfig,
          children: storyFn(context)
        }
      )
    }
  ) });
};

const Separator = styled(View, {
  flexGrow: 1,
  flexShrink: 0,
  height: 0,
  maxHeight: 0,
  borderColor: "$border-sharp",
  borderWidth: 0,
  borderBottomWidth: 1,
  y: -0.5,
  variants: {
    vertical: {
      true: {
        height: "auto",
        maxHeight: "auto",
        width: 0,
        maxWidth: 0,
        borderBottomWidth: 0,
        borderRightWidth: 1,
        y: 0,
        x: -0.5
      }
    }
  }
});

const PressableListItemFrame = styled(PressableBox, {
  variant: "contained",
  marginHorizontal: "$0.5",
  marginVertical: "$0.25",
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  paddingHorizontal: "$1.0",
  paddingVertical: "$1.0"
});
function PressableListItem({
  theme,
  role = "button",
  children,
  onPress
}) {
  return /* @__PURE__ */ jsxs(PressableListItemFrame, { theme, role, onPress, children: [
    /* @__PURE__ */ jsx(View, { flex: 1, children }),
    /* @__PURE__ */ jsx(VStack, { justifyContent: "center", children: /* @__PURE__ */ jsx(
      Icon,
      {
        tint: "onAccent-muted",
        icon: /* @__PURE__ */ jsx(CaretRightRegularIcon, {}),
        size: 18
      }
    ) })
  ] });
}

const GradientBackground = styled(Box, {
  absoluteFill: true,
  backgroundImage: "linear-gradient(0deg, $bg-screen-gradient-end 5%, $bg-screen-gradient-middle 80%, $bg-screen-gradient-start 98%)",
  position: "absolute"
  // needed to override "static" position for backgroundImage tamagui
});

const TopScrollOffset = styled(View, {
  backgroundColor: "$bg-screen",
  position: "absolute",
  top: -600,
  left: 0,
  right: 0,
  height: 600
});
const BottomScrollOffset = styled(View, {
  backgroundColor: "$bg-screen",
  position: "absolute",
  bottom: -600,
  left: 0,
  right: 0,
  height: 600
});
const GradientScrollView = ScrollView.styleable(({ gradientTheme, children, ...scrollViewProps }) => /* @__PURE__ */ jsxs(ScrollView, { ...scrollViewProps, children: [
  /* @__PURE__ */ jsx(
    TopScrollOffset,
    {
      theme: gradientTheme,
      backgroundColor: "$bg-screen-gradient-start"
    }
  ),
  /* @__PURE__ */ jsx(
    BottomScrollOffset,
    {
      theme: gradientTheme,
      backgroundColor: "$bg-screen-gradient-end"
    }
  ),
  /* @__PURE__ */ jsx(GradientBackground, { theme: gradientTheme }),
  children
] }));

const useControllableCheckedState = (checked, onChange, onValueChange) => {
  const [checkedState, setCheckedState] = useState(checked ?? false);
  return [
    checked !== void 0 ? checked : checkedState,
    (newChecked, e) => {
      setCheckedState((prevValue) => {
        if (prevValue !== newChecked) {
          onChange?.(e);
          onValueChange?.(newChecked);
        }
        return newChecked;
      });
    }
  ];
};
const SwitchFrame = styled(InteractiveBox, {
  theme: "brand",
  render: "button",
  role: "switch",
  layer: "lowered",
  shadow: "lowered",
  position: "relative",
  tabIndex: 0,
  borderRadius: 1e3,
  transition: "formElement",
  disabledStyle: {
    backgroundColor: "$interactive.forms.backgroundColor:disabled"
  },
  // TODO hover/focus
  focusVisibleStyle: {
    outlineColor: "$interactive.forms.outlineColor:focus",
    outlineWidth: 2,
    outlineStyle: "solid",
    outlineOffset: 2
  },
  variants: {
    size: {
      md: {
        height: 44,
        width: 66
      }
    }
  },
  defaultVariants: {
    size: "md"
  }
});
const thumbSize = 44 * 0.8;
const SwitchThumb = styled(Box, {
  withBackground: "highlight",
  position: "absolute",
  top: 44 * 0.1,
  borderRadius: 1e3,
  center: true,
  transition: "formElement",
  shadow: "s",
  variants: {
    size: {
      md: {
        height: thumbSize,
        width: thumbSize
      }
    },
    disabled: {
      true: {
        backgroundColor: "$text-disabled-muted",
        shadow: "none"
      }
    },
    checked: {
      false: {
        left: 44 * 0.1,
        hoverStyle: {
          width: thumbSize + 2
        },
        pressStyle: {
          width: thumbSize + 8
        }
      },
      true: {
        left: 44 * 0.6,
        hoverStyle: {
          left: 44 * 0.6 - 2,
          width: thumbSize + 2
        },
        pressStyle: {
          left: 44 * 0.6 - 8,
          width: thumbSize + 8
        }
      }
    }
  },
  defaultVariants: {
    size: "md"
  }
});
const Switch = SwitchFrame.styleable(
  ({ checked, disabled, onChange, onValueChange, ...rest }) => {
    const [currentChecked, setCurrentChecked] = useControllableCheckedState(
      checked,
      onChange,
      onValueChange
    );
    return /* @__PURE__ */ jsx(
      SwitchFrame,
      {
        "aria-checked": currentChecked,
        disabled,
        ...rest,
        onPress: (e) => {
          setCurrentChecked(!currentChecked, e);
        },
        children: /* @__PURE__ */ jsx(SwitchThumb, { checked: currentChecked, disabled })
      }
    );
  }
);

export { AlouetteDecorator, AlouetteProvider, Box, Button, ExternalLinkButton, GradientBackground, GradientScrollView, HStack, Icon, IconButton, InputText, InternalLinkButton, Message, Paragraph, PressableBox, PressableListItem, SafeAreaBox, SafeAreaProvider, ScrollView, Separator, Stack, Story, StoryContainer, StoryDecorator, StoryGrid, StoryTitle, Switch, SwitchBreakpointsUsingDisplayNone, SwitchBreakpointsUsingNull, Text, TextArea, VStack, useCurrentBreakpointName, useDefaultThemeFromColorScheme, useSafeAreaInsets };
//# sourceMappingURL=index-browser.es.js.map
