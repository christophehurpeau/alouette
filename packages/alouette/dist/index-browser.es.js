import { jsx, jsxs, Fragment } from 'react/jsx-runtime';
import { styled, View, useStyle, Text, useConfiguration, useMedia, TamaguiProvider, Stack as Stack$1 } from '@tamagui/core';
export { Theme, View, styled, withStaticProperties } from '@tamagui/core';
import { createContext, useContext, Children } from 'react';
import { InfoRegularIcon, WarningRegularIcon, CheckRegularIcon, WarningCircleRegularIcon, XRegularIcon } from 'alouette-icons/phosphor-icons';
import { TextInput, ScrollView as ScrollView$1, Platform } from 'react-native';

const fullscreenStyle = {
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0
};
const getBorderAdditionalInteraction = ({
  internalForcedPseudoState,
  disabled,
  interactive
}) => {
  const prefix = interactive === "text" ? "interactive.forms" : "interactive";
  if (disabled) {
    return {
      borderColor: `$${prefix}.borderColor:disabled`
    };
  }
  if (process.env.STORYBOOK && internalForcedPseudoState) {
    switch (internalForcedPseudoState) {
      case "hover":
        return {
          borderColor: `$${prefix}.borderColor:hover`
        };
      case `press`:
        return {
          borderColor: `$${prefix}.borderColor:press`
        };
      case `focus`:
        return {
          borderColor: `$${prefix}.borderColor:focus`
        };
    }
  }
  return {
    borderColor: `$${prefix}.borderColor`,
    hoverStyle: {
      borderColor: `$${prefix}.borderColor:hover`
    },
    pressStyle: {
      borderColor: `$${prefix}.borderColor:press`
    },
    focusStyle: {
      borderColor: `$${prefix}.borderColor:focus`
    }
  };
};
const getBackgroundAdditionalInteraction = ({
  internalForcedPseudoState,
  disabled,
  interactive,
  variant
}) => {
  const prefix = interactive === "text" ? "interactive.forms" : `interactive.${variant || "contained"}`;
  if (disabled) {
    return {
      backgroundColor: `$${prefix}.backgroundColor:disabled`
    };
  }
  if (process.env.STORYBOOK && internalForcedPseudoState) {
    switch (internalForcedPseudoState) {
      case "hover":
        return {
          backgroundColor: `$${prefix}.backgroundColor:hover`
        };
      case `press`:
        return {
          backgroundColor: `$${prefix}.backgroundColor:press`
        };
      case `focus`:
        return {
          backgroundColor: `$${prefix}.backgroundColor:focus`
        };
    }
  }
  return {
    backgroundColor: `$${prefix}.backgroundColor`,
    hoverStyle: {
      backgroundColor: `$${prefix}.backgroundColor:hover`
    },
    pressStyle: {
      backgroundColor: `$${prefix}.backgroundColor:press`
    },
    focusStyle: {
      backgroundColor: `$${prefix}.backgroundColor:focus`
    }
  };
};

const internalForcedPseudoState = (val) => ({});
const withBorder = (val, { props }) => {
  return {
    borderWidth: typeof val === "number" ? val : 1,
    borderColor: "$borderColor",
    ...props.interactive ? getBorderAdditionalInteraction(props) : void 0
  };
};
const withBackground = (val, { props }) => {
  const variant = props.interactive === "text" ? "text" : props.variant || "contained";
  if (!val) return {};
  if (!props.role && !props.outlineStyle && props.interactive) {
    throw new Error("A role prop is required while using interactive");
  }
  return {
    backgroundColor: props.interactive ? `$interactive.${variant}.backgroundColor` : "$mainColor",
    ...props.interactive ? getBackgroundAdditionalInteraction(props) : void 0
  };
};
const circularStyle = {
  borderRadius: 1e5,
  padding: 0
};
const size = (val) => {
  return { width: val, height: val };
};
const circular = {
  true: (val, { props, tokens }) => {
    if (!("size" in props)) {
      return circularStyle;
    }
    const sizePropValue = props.size;
    const sizeValue = tokens.size[sizePropValue];
    return {
      ...circularStyle,
      width: sizeValue,
      height: sizeValue,
      maxWidth: sizeValue,
      maxHeight: sizeValue,
      minWidth: sizeValue,
      minHeight: sizeValue
    };
  }
};
const interactive = (isInteractiveOrInteractiveCursorType, { props }) => isInteractiveOrInteractiveCursorType ? {
  cursor: props.disabled ? "not-allowed" : isInteractiveOrInteractiveCursorType === true ? "pointer" : isInteractiveOrInteractiveCursorType
} : null;
const centered = {
  true: {
    alignItems: "center",
    justifyContent: "center"
  }
};

const variants$1 = {
  __proto__: null,
  centered: centered,
  circular: circular,
  interactive: interactive,
  internalForcedPseudoState: internalForcedPseudoState,
  size: size,
  withBackground: withBackground,
  withBorder: withBorder
};

const Box = styled(View, {
  name: "Box",
  variants: variants$1,
  animation: "fast"
});

function Icon({
  icon,
  size = 20,
  align = "auto",
  contrast,
  color = contrast ? "$contrastTextColor" : "$textColor",
  ...props
}) {
  const style = useStyle({
    color
    // if needed for native
    // resolveValues: Platform.OS === 'web' ? undefined: 'value',
  });
  return /* @__PURE__ */ jsx(Box, { ...props, centered: true, alignSelf: align, size, style, children: icon });
}

const PressableBox = styled(Box, {
  interactive: true
});

const IconButtonFrame = styled(PressableBox, {
  name: "IconButtonFrame",
  role: "button",
  centered: true,
  withBorder: true,
  withBackground: true,
  size: 40,
  borderWidth: 1,
  borderRadius: 1e4
});
function IconButton({
  icon,
  disabled,
  size = 40,
  ...pressableProps
}) {
  return /* @__PURE__ */ jsx(IconButtonFrame, { size, disabled, ...pressableProps, children: /* @__PURE__ */ jsx(
    Icon,
    {
      size: size / 2,
      color: disabled ? "$contrastDisabled" : void 0,
      contrast: !disabled,
      icon
    }
  ) });
}

const variants = {
  fullscreen: {
    true: fullscreenStyle
  }
};
const Stack = styled(View, {
  name: "Stack",
  variants: {
    ...variants,
    type: {
      h: { flexDirection: "row" },
      v: { flexDirection: "column" }
    }
  }
});
const HStack = styled(Stack, {
  name: "HStack",
  flexDirection: "row",
  variants
});
const VStack = styled(Stack, {
  name: "VStack",
  flexDirection: "column"
});

const Typography = styled(Text, {
  name: "Typography",
  fontFamily: "$body",
  color: "$textColor",
  fontWeight: "$regular",
  variants: {
    size: {
      xl: { fontSize: "$xl", lineHeight: "$xl" },
      lg: { fontSize: "$lg", lineHeight: "$lg" },
      md: { fontSize: "$md", lineHeight: "$md" },
      sm: { fontSize: "$sm", lineHeight: "$sm" },
      xs: { fontSize: "$xs", lineHeight: "$xs" }
    },
    weight: {
      regular: { fontWeight: "$regular" },
      bold: { fontWeight: "$bold" },
      black: { fontWeight: "$black" }
    },
    family: {
      heading: { fontFamily: "$heading" },
      body: { fontFamily: "$body" }
    },
    contrast: {
      true: {
        color: "$contrastTextColor"
      }
    }
  },
  defaultVariants: {
    size: "md",
    weight: "regular",
    family: "body"
  }
});
const TypographyParagraph = styled(Typography, {
  name: "TypographyParagraph",
  tag: "p",
  userSelect: "auto",
  family: "body"
});
const TypographySizeContext = createContext(void 0);
const TypographyWithContext = Typography.styleable(
  ({ size, ...props }, ref) => {
    const ancestorSize = useContext(TypographySizeContext);
    const sizeOrAncestorSizeOrDefaultSize = size || ancestorSize;
    if (sizeOrAncestorSizeOrDefaultSize !== size) {
      return /* @__PURE__ */ jsx(TypographySizeContext.Provider, { value: sizeOrAncestorSizeOrDefaultSize, children: /* @__PURE__ */ jsx(Typography, { ref, size, ...props }) });
    }
    return /* @__PURE__ */ jsx(Typography, { ref, size, ...props });
  }
);
const TypographyParagraphWithContext = TypographyParagraph.styleable(
  ({ size, ...props }, ref) => {
    const ancestorSize = useContext(TypographySizeContext);
    const sizeOrAncestorSizeOrDefaultSize = size || ancestorSize;
    return /* @__PURE__ */ jsx(TypographySizeContext.Provider, { value: sizeOrAncestorSizeOrDefaultSize, children: /* @__PURE__ */ jsx(Typography, { ref, size, ...props }) });
  }
);

const ButtonFrame = styled(PressableBox, {
  name: "ButtonFrame",
  role: "button",
  centered: true,
  minHeight: 42,
  borderRadius: "$sm",
  paddingHorizontal: "$md",
  variants: {
    variant: {
      contained: {
        withBackground: true
      },
      outlined: {
        withBackground: true,
        withBorder: true
      }
    }
  },
  defaultVariants: {
    variant: "contained"
  }
});
function Button({
  icon,
  text,
  disabled,
  variant,
  ...pressableProps
}) {
  return /* @__PURE__ */ jsx(ButtonFrame, { disabled, variant, ...pressableProps, children: /* @__PURE__ */ jsxs(HStack, { gap: "$xs", alignItems: "center", children: [
    icon && /* @__PURE__ */ jsx(
      Icon,
      {
        color: disabled ? "$contrastDisabled" : void 0,
        contrast: variant === "contained" && !disabled,
        icon
      }
    ),
    /* @__PURE__ */ jsx(
      Typography,
      {
        size: "md",
        weight: "bold",
        paddingVertical: "$xs",
        color: disabled ? "$contrastDisabled" : void 0,
        contrast: variant === "contained" && !disabled,
        children: text
      }
    )
  ] }) });
}

function FeedbackIcon({ type }) {
  switch (type) {
    case "warning":
      return /* @__PURE__ */ jsx(WarningCircleRegularIcon, {});
    case "success":
      return /* @__PURE__ */ jsx(CheckRegularIcon, {});
    case "danger":
      return /* @__PURE__ */ jsx(WarningRegularIcon, {});
    default:
      return /* @__PURE__ */ jsx(InfoRegularIcon, {});
  }
}

const MessageFrame = styled(Box, {
  name: "MessageFrame",
  alignItems: "center",
  withBackground: true,
  borderRadius: "$md",
  paddingHorizontal: "$4",
  flexDirection: "row",
  gap: "$4"
});
const MessageText = styled(Typography, {
  name: "MessageText",
  contrast: true,
  size: "md",
  flexGrow: 1,
  paddingVertical: "$4",
  variants: {
    centered: {
      true: {
        textAlign: "center",
        paddingHorizontal: "$4"
      }
    }
  }
});
const MessageIconContainer = styled(View, {
  name: "MessageIconContainer",
  alignItems: "center"
});
const MessageDismissButtonContainer = styled(View, {
  name: "MessageDismissButtonContainer",
  marginRight: "$2"
});
function Message({
  theme,
  textCentered,
  children,
  onDismiss
}) {
  return /* @__PURE__ */ jsxs(MessageFrame, { theme, children: [
    textCentered ? null : /* @__PURE__ */ jsx(MessageIconContainer, { children: /* @__PURE__ */ jsx(Icon, { contrast: true, icon: /* @__PURE__ */ jsx(FeedbackIcon, { type: theme }) }) }),
    /* @__PURE__ */ jsx(MessageText, { centered: textCentered, children }),
    onDismiss ? /* @__PURE__ */ jsx(MessageDismissButtonContainer, { children: /* @__PURE__ */ jsx(IconButton, { icon: /* @__PURE__ */ jsx(XRegularIcon, {}), size: 40 }) }) : null
  ] });
}

const StyledInputText = styled(TextInput, {
  variants: variants$1,
  padding: "$xs",
  borderRadius: "$sm",
  // @ts-expect-error missing prop but seems to work
  color: "$forms.textColor",
  withBorder: true,
  withBackground: true,
  borderWidth: 1,
  borderBottomWidth: 3,
  // reset browser style
  outlineStyle: "none"
});
const InputText = styled(StyledInputText, {
  name: "InputText",
  interactive: "text",
  theme: "primary"
  // animation: "formElement", // remove all style ?
});
const TextArea = styled(InputText, {
  multiline: true
});

const ScrollView = styled(
  ScrollView$1,
  {
    name: "ScrollView",
    scrollEnabled: true,
    variants: {
      fullscreen: {
        true: fullscreenStyle
      }
    }
  },
  {
    accept: {
      contentContainerStyle: "style"
    }
  }
);

const StoryTitle = styled(Typography, {
  family: "heading",
  weight: "black",
  variants: {
    level: {
      1: { size: "xl", marginBottom: "$8" },
      2: { size: "lg", marginBottom: "$8" },
      3: { size: "md", marginBottom: "$3" },
      4: { size: "sm", marginBottom: "$3" }
    }
  },
  defaultVariants: {
    level: 1
  }
});

const InternalStorySection = styled(VStack, {
  marginBottom: "$8",
  paddingHorizontal: "$4",
  marginHorizontal: "$-4",
  variants: {
    withBackground: {
      true: {
        backgroundColor: "$backgroundColor"
      }
    }
  }
});
function StorySection({
  title,
  children,
  level = 1,
  withBackground,
  ...props
}) {
  return /* @__PURE__ */ jsxs(InternalStorySection, { withBackground, ...props, children: [
    /* @__PURE__ */ jsx(StoryTitle, { level: level + 1, children: title }),
    children
  ] });
}
function SubSection({
  title,
  children,
  withBackground,
  ...props
}) {
  return /* @__PURE__ */ jsxs(
    InternalStorySection,
    {
      marginBottom: "$4",
      withBackground,
      ...props,
      children: [
        /* @__PURE__ */ jsx(StoryTitle, { level: 3, children: title }),
        children
      ]
    }
  );
}
function Story({ preview, children }) {
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    preview && /* @__PURE__ */ jsx(StorySection, { title: "Preview", paddingBottom: "$12", children: preview }),
    children
  ] });
}
Story.Section = StorySection;
Story.SubSection = SubSection;

function StoryContainer({
  title,
  children
}) {
  return /* @__PURE__ */ jsxs(ScrollView, { theme: "light", background: "#fff", padding: "$4", children: [
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
          marginVertical: "$-1",
          marginBottom: "$4",
          flexWrap: flexWrap ? "wrap" : void 0,
          gap: flexWrap ? "$xs" : void 0
        }
      },
      children: Children.map(children, (child) => /* @__PURE__ */ jsx(
        View,
        {
          paddingTop: "$2",
          paddingBottom: "$4",
          ...{
            [`$${breakpoint}`]: {
              flexGrow: 1,
              flexBasis: flexWrap ? void 0 : 0,
              paddingTop: 0,
              paddingBottom: 0,
              marginVertical: "$2"
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

function WithTamaguiConfig({
  render
}) {
  const config = useConfiguration();
  return render(config);
}

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
        ...name === "base" ? void 0 : {
          display: "none",
          [`$${name}`]: { display: "flex" }
        },
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

function AlouetteProvider({
  children,
  tamaguiConfig
}) {
  return /* @__PURE__ */ jsx(TamaguiProvider, { config: tamaguiConfig, defaultTheme: "light", children });
}

const AlouetteDecorator = (storyFn, context) => /* @__PURE__ */ jsx(AlouetteProvider, { tamaguiConfig: context.parameters.tamaguiConfig, children: storyFn(context) });

const Separator = styled(Stack$1, {
  name: "Separator",
  flexGrow: 1,
  flexShrink: 0,
  height: 0,
  maxHeight: 0,
  borderColor: "$borderColor",
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

export { AlouetteDecorator, AlouetteProvider, Box, Button, HStack, Icon, IconButton, InputText, Message, PressableBox, ScrollView, Separator, Stack, Story, StoryContainer, StoryDecorator, StoryGrid, StoryTitle, SwitchBreakpointsUsingDisplayNone, SwitchBreakpointsUsingNull, TextArea, Typography, TypographyParagraph, TypographyParagraphWithContext, TypographyWithContext, VStack, WithTamaguiConfig, useCurrentBreakpointName };
//# sourceMappingURL=index-browser.es.js.map
