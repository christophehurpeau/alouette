import { useTheme } from "@tamagui/core";
import * as WebBrowser from "expo-web-browser";
import { WebBrowserPresentationStyle } from "expo-web-browser";
import type { ComponentProps, FunctionComponent, ReactNode } from "react";
import { Linking } from "react-native";
import type { GestureResponderEvent } from "react-native";

export interface ExternalLinkRequiredComponentProps {
  onPress?: (event: GestureResponderEvent) => Promise<void> | void;
}

export interface ExternalOpenLinkBehavior {
  native: "linking" | "webBrowser";
  web: "targetBlank" | "targetSelf";
}
const useOpenExternalLink = () => {
  const theme = useTheme();
  return async (href: string, openLinkBehavior: ExternalOpenLinkBehavior) => {
    switch (openLinkBehavior.native) {
      case "webBrowser": {
        return WebBrowser.openBrowserAsync(href, {
          controlsColor: theme["$text-sharp"]!.val,
          dismissButtonStyle: "close",
          presentationStyle: WebBrowserPresentationStyle.PAGE_SHEET,
          toolbarColor: theme["$bg-surface"]!.val,
          secondaryToolbarColor: theme["$bg-surface"]!.val,
          readerMode: false,
          enableBarCollapsing: false,
          showTitle: true,
          enableDefaultShareMenuItem: true,
        });
      }
      case "linking": {
        return Linking.openURL(href);
      }
      default: {
        throw new Error(
          `Unsupported openLinkBehavior.native: ${openLinkBehavior.native as string}`,
        );
      }
    }
  };
};

export interface ExternalLinkProps<C extends FunctionComponent<any>> {
  as: C;
  href: string;
  onPress?: (event: GestureResponderEvent) => void;
  openLinkBehavior: ExternalOpenLinkBehavior;
}

type ExternalLinkSpreadProps<C extends FunctionComponent<any>> = Omit<
  ComponentProps<C>,
  keyof ExternalLinkProps<C>
>;

export function ExternalLink<C extends FunctionComponent<any>>({
  as: C,
  href,
  openLinkBehavior,
  onPress,
  ...props
}: ExternalLinkProps<C> & ExternalLinkSpreadProps<C>): ReactNode {
  const openExternalLink = useOpenExternalLink();
  const handlePress: ExternalLinkRequiredComponentProps["onPress"] = (e) => {
    if (onPress) {
      onPress(e);
      if (e?.defaultPrevented) return;
    }

    if (!href) return;

    return openExternalLink(href, openLinkBehavior);
  };

  return <C {...(props as any)} onPress={handlePress} />;
}
