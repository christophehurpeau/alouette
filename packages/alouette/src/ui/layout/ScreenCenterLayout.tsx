import type { ReactNode } from "react";
import { Center, VStack } from "../stacks/stacks";

interface ScreenCenterLayoutProps {
  header: ReactNode;
  content: ReactNode;
  footer: ReactNode;
}

export function ScreenCenterLayout({
  header,
  content,
  footer,
}: ScreenCenterLayoutProps) {
  return (
    <VStack flexGrow={1} gap="$2" minHeight="100vh">
      {header}
      <Center flexGrow={1}>{content}</Center>
      {footer}
    </VStack>
  );
}
