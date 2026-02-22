import { View, styled } from "@tamagui/core";
import type { ScrollViewProps } from "../primitives/ScrollView";
import { ScrollView } from "../primitives/ScrollView";
import { GradientBackground } from "./GradientBackground";

const TopScrollOffset = styled(View, {
  backgroundColor: "$bg-screen",
  position: "absolute",
  top: -600,
  left: 0,
  right: 0,
  height: 600,
});

// We could have used scrollview's background color if it was the same theme as the gradient, but this allows us to have a different theme for the scrollview and the gradient, but it's not always the case
const BottomScrollOffset = styled(View, {
  backgroundColor: "$bg-screen",
  position: "absolute",
  bottom: -600,
  left: 0,
  right: 0,
  height: 600,
});

export const GradientScrollView = ScrollView.styleable<{
  gradientTheme?: ScrollViewProps["theme"];
}>(({ gradientTheme, children, ...scrollViewProps }) => (
  <ScrollView {...scrollViewProps}>
    <TopScrollOffset
      theme={gradientTheme}
      backgroundColor="$bg-screen-gradient-start"
    />
    <BottomScrollOffset
      theme={gradientTheme}
      backgroundColor="$bg-screen-gradient-end"
    />
    <GradientBackground theme={gradientTheme} />
    {children}
  </ScrollView>
));
