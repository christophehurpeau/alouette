'use strict';

const jsxRuntime = require('react/jsx-runtime');
const core = require('@tamagui/core');
const react = require('react');
const phosphorIcons = require('alouette-icons/phosphor-icons');
const reactNative = require('react-native');

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
      case "press":
        return {
          borderColor: `$${prefix}.borderColor:press`
        };
      case "focus":
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
  const prefix = interactive === "text" ? "interactive.forms" : (
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    `interactive.${variant || "contained"}`
  );
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
      case "press":
        return {
          backgroundColor: `$${prefix}.backgroundColor:press`
        };
      case "focus":
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
    backgroundColor: props.interactive ? (
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      `$interactive.${variant}.backgroundColor`
    ) : "$mainColor",
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
const interactive = (isInteractiveOrInteractiveCursorType, { props }) => {
  if (!isInteractiveOrInteractiveCursorType) return null;
  if (props.disabled) {
    return { cursor: "not-allowed" };
  }
  return {
    cursor: isInteractiveOrInteractiveCursorType === true ? "pointer" : isInteractiveOrInteractiveCursorType
  };
};
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

const Box = core.styled(core.View, {
  name: "Box",
  variants: variants$1,
  animation: "fast"
});

const PressableBox = core.styled(Box, {
  interactive: true
});

function Icon({
  icon,
  size = 20,
  align = "auto",
  contrast,
  color = contrast ? "$contrastTextColor" : "$textColor",
  ...props
}) {
  const style = core.useStyle({
    color
    // if needed for native
    // resolveValues: Platform.OS === 'web' ? undefined: 'value',
  });
  return /* @__PURE__ */ jsxRuntime.jsx(Box, { ...props, centered: true, alignSelf: align, size, style, children: icon });
}

const IconButtonFrame = core.styled(PressableBox, {
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
  return /* @__PURE__ */ jsxRuntime.jsx(IconButtonFrame, { size, disabled, ...pressableProps, children: /* @__PURE__ */ jsxRuntime.jsx(
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
const Stack = core.styled(core.View, {
  name: "Stack",
  variants: {
    ...variants,
    type: {
      h: { flexDirection: "row" },
      v: { flexDirection: "column" }
    }
  }
});
const HStack = core.styled(Stack, {
  name: "HStack",
  flexDirection: "row",
  variants
});
const VStack = core.styled(Stack, {
  name: "VStack",
  flexDirection: "column"
});

const Typography = core.styled(core.Text, {
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
const TypographyParagraph = core.styled(Typography, {
  name: "TypographyParagraph",
  tag: "p",
  userSelect: "auto",
  family: "body"
});
const TypographySizeContext = react.createContext(void 0);
const TypographyWithContext = Typography.styleable(
  ({ size, ...props }, ref) => {
    const ancestorSize = react.useContext(TypographySizeContext);
    const sizeOrAncestorSizeOrDefaultSize = size || ancestorSize;
    if (sizeOrAncestorSizeOrDefaultSize !== size) {
      return /* @__PURE__ */ jsxRuntime.jsx(TypographySizeContext.Provider, { value: sizeOrAncestorSizeOrDefaultSize, children: /* @__PURE__ */ jsxRuntime.jsx(Typography, { ref, size, ...props }) });
    }
    return /* @__PURE__ */ jsxRuntime.jsx(Typography, { ref, size, ...props });
  }
);
const TypographyParagraphWithContext = TypographyParagraph.styleable(
  ({ size, ...props }, ref) => {
    const ancestorSize = react.useContext(TypographySizeContext);
    const sizeOrAncestorSizeOrDefaultSize = size || ancestorSize;
    return /* @__PURE__ */ jsxRuntime.jsx(TypographySizeContext.Provider, { value: sizeOrAncestorSizeOrDefaultSize, children: /* @__PURE__ */ jsxRuntime.jsx(Typography, { ref, size, ...props }) });
  }
);

const ButtonFrame = core.styled(PressableBox, {
  name: "ButtonFrame",
  role: "button",
  centered: true,
  minHeight: 42,
  variants: {
    size: {
      sm: {
        paddingHorizontal: "$sm",
        borderRadius: "$3",
        minHeight: 32
      },
      md: {
        paddingHorizontal: "$md",
        borderRadius: "$sm",
        minHeight: 42
      }
    },
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
    variant: "contained",
    size: "md"
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
  return /* @__PURE__ */ jsxRuntime.jsx(
    ButtonFrame,
    {
      disabled,
      variant,
      size,
      ...pressableProps,
      children: /* @__PURE__ */ jsxRuntime.jsxs(HStack, { gap: "$xs", alignItems: "center", children: [
        icon && /* @__PURE__ */ jsxRuntime.jsx(
          Icon,
          {
            color: disabled ? "$contrastDisabled" : void 0,
            contrast: variant === "contained" && !disabled,
            icon,
            size: size === "sm" ? 16 : 20
          }
        ),
        /* @__PURE__ */ jsxRuntime.jsx(
          Typography,
          {
            size,
            weight: "bold",
            paddingVertical: size === "sm" ? "$1" : "$xs",
            color: disabled ? "$contrastDisabled" : void 0,
            contrast: variant === "contained" && !disabled,
            children: text
          }
        )
      ] })
    }
  );
}

function FeedbackIcon({ type }) {
  switch (type) {
    case "warning":
      return /* @__PURE__ */ jsxRuntime.jsx(phosphorIcons.WarningCircleRegularIcon, {});
    case "success":
      return /* @__PURE__ */ jsxRuntime.jsx(phosphorIcons.CheckRegularIcon, {});
    case "danger":
      return /* @__PURE__ */ jsxRuntime.jsx(phosphorIcons.WarningRegularIcon, {});
    default:
      return /* @__PURE__ */ jsxRuntime.jsx(phosphorIcons.InfoRegularIcon, {});
  }
}

const MessageFrame = core.styled(Box, {
  name: "MessageFrame",
  alignItems: "center",
  withBackground: true,
  borderRadius: "$md",
  paddingHorizontal: "$4",
  flexDirection: "row",
  gap: "$4"
});
const MessageText = core.styled(Typography, {
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
const MessageIconContainer = core.styled(core.View, {
  name: "MessageIconContainer",
  alignItems: "center"
});
const MessageDismissButtonContainer = core.styled(core.View, {
  name: "MessageDismissButtonContainer",
  marginRight: "$2"
});
function Message({
  theme,
  textCentered,
  children,
  onDismiss
}) {
  return /* @__PURE__ */ jsxRuntime.jsxs(MessageFrame, { theme, children: [
    textCentered ? null : /* @__PURE__ */ jsxRuntime.jsx(MessageIconContainer, { children: /* @__PURE__ */ jsxRuntime.jsx(Icon, { contrast: true, icon: /* @__PURE__ */ jsxRuntime.jsx(FeedbackIcon, { type: theme }) }) }),
    /* @__PURE__ */ jsxRuntime.jsx(MessageText, { centered: textCentered, children }),
    onDismiss ? /* @__PURE__ */ jsxRuntime.jsx(MessageDismissButtonContainer, { children: /* @__PURE__ */ jsxRuntime.jsx(IconButton, { icon: /* @__PURE__ */ jsxRuntime.jsx(phosphorIcons.XRegularIcon, {}), size: 40 }) }) : null
  ] });
}

const StyledInputText = core.styled(reactNative.TextInput, {
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
const InputText = core.styled(StyledInputText, {
  name: "InputText",
  interactive: "text",
  theme: "primary"
  // animation: "formElement", // remove all style ?
});
const TextArea = core.styled(InputText, {
  multiline: true
});

const ScrollView = core.styled(
  reactNative.ScrollView,
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

const StoryTitle = core.styled(Typography, {
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

const InternalStorySection = core.styled(VStack, {
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
  return /* @__PURE__ */ jsxRuntime.jsxs(InternalStorySection, { withBackground, ...props, children: [
    /* @__PURE__ */ jsxRuntime.jsx(StoryTitle, { level: level + 1, children: title }),
    children
  ] });
}
function SubSection({
  title,
  children,
  withBackground,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntime.jsxs(
    InternalStorySection,
    {
      marginBottom: "$4",
      withBackground,
      ...props,
      children: [
        /* @__PURE__ */ jsxRuntime.jsx(StoryTitle, { level: 3, children: title }),
        children
      ]
    }
  );
}
function Story({ preview, children }) {
  return /* @__PURE__ */ jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [
    preview && /* @__PURE__ */ jsxRuntime.jsx(StorySection, { title: "Preview", paddingBottom: "$12", children: preview }),
    children
  ] });
}
Story.Section = StorySection;
Story.SubSection = SubSection;

function StoryContainer({
  title,
  children
}) {
  return /* @__PURE__ */ jsxRuntime.jsxs(ScrollView, { theme: "light", background: "#fff", padding: "$4", children: [
    /* @__PURE__ */ jsxRuntime.jsx(StoryTitle, { level: 1, children: title }),
    children
  ] });
}

const StoryDecorator = (storyFn, { name, container }) => {
  if (container === false) return storyFn();
  return /* @__PURE__ */ jsxRuntime.jsx(StoryContainer, { title: name, children: storyFn() });
};

function StoryGridRow({
  children,
  breakpoint = "small",
  flexWrap
}) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    core.View,
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
      children: react.Children.map(children, (child) => /* @__PURE__ */ jsxRuntime.jsx(
        core.View,
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

function WithTamaguiConfig({
  render
}) {
  const config = core.useConfiguration();
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
  const media = core.useMedia();
  if (media.wide) return BreakpointNameEnum.WIDE;
  if (media.large) return BreakpointNameEnum.LARGE;
  if (media.medium) return BreakpointNameEnum.MEDIUM;
  if (media.small) return BreakpointNameEnum.SMALL;
  return BreakpointNameEnum.BASE;
}
function useCurrentBreakpointNameFiltered(names) {
  const media = core.useMedia();
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
    return /* @__PURE__ */ jsxRuntime.jsx(
      core.View,
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
  return /* @__PURE__ */ jsxRuntime.jsx(core.TamaguiProvider, { config: tamaguiConfig, defaultTheme: "light", children });
}

const AlouetteDecorator = (storyFn, context) => (
  // eslint-disable-next-line react/destructuring-assignment
  /* @__PURE__ */ jsxRuntime.jsx(AlouetteProvider, { tamaguiConfig: context.parameters.tamaguiConfig, children: storyFn(context) })
);

const Separator = core.styled(core.Stack, {
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

function PressableListItem({
  children,
  onPress
}) {
  return /* @__PURE__ */ jsxRuntime.jsx(reactNative.Pressable, { onPress, children: /* @__PURE__ */ jsxRuntime.jsxs(
    HStack,
    {
      justifyContent: "space-between",
      paddingHorizontal: "$4",
      paddingVertical: "$3",
      children: [
        /* @__PURE__ */ jsxRuntime.jsx(core.View, { children }),
        /* @__PURE__ */ jsxRuntime.jsx(Stack, { justifyContent: "center", children: /* @__PURE__ */ jsxRuntime.jsx(Icon, { icon: /* @__PURE__ */ jsxRuntime.jsx(phosphorIcons.CaretRightRegularIcon, {}), size: 20 }) })
      ]
    }
  ) });
}

exports.Theme = core.Theme;
exports.View = core.View;
exports.styled = core.styled;
exports.withStaticProperties = core.withStaticProperties;
exports.AlouetteDecorator = AlouetteDecorator;
exports.AlouetteProvider = AlouetteProvider;
exports.Box = Box;
exports.Button = Button;
exports.HStack = HStack;
exports.Icon = Icon;
exports.IconButton = IconButton;
exports.InputText = InputText;
exports.Message = Message;
exports.PressableBox = PressableBox;
exports.PressableListItem = PressableListItem;
exports.ScrollView = ScrollView;
exports.Separator = Separator;
exports.Stack = Stack;
exports.Story = Story;
exports.StoryContainer = StoryContainer;
exports.StoryDecorator = StoryDecorator;
exports.StoryGrid = StoryGrid;
exports.StoryTitle = StoryTitle;
exports.SwitchBreakpointsUsingDisplayNone = SwitchBreakpointsUsingDisplayNone;
exports.SwitchBreakpointsUsingNull = SwitchBreakpointsUsingNull;
exports.TextArea = TextArea;
exports.Typography = Typography;
exports.TypographyParagraph = TypographyParagraph;
exports.TypographyParagraphWithContext = TypographyParagraphWithContext;
exports.TypographyWithContext = TypographyWithContext;
exports.VStack = VStack;
exports.WithTamaguiConfig = WithTamaguiConfig;
exports.useCurrentBreakpointName = useCurrentBreakpointName;
//# sourceMappingURL=index-node20.cjs.map
