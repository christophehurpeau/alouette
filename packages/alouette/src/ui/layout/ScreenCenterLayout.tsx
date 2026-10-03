import type { ReactNode } from "react";
import { View } from "react-native";

export interface ScreenCenterLayoutProps {
  header: ReactNode;
  content: ReactNode;
  footer: ReactNode;
}

export function ScreenCenterLayout({
  header,
  content,
  footer,
}: ScreenCenterLayoutProps): ReactNode {
  return (
    <View className="grow gap-xl min-h-screen">
      {header}
      <View className="grow flex-center">{content}</View>
      {footer}
    </View>
  );
}
