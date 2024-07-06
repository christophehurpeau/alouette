import {
  CheckRegularIcon,
  InfoRegularIcon,
  WarningCircleRegularIcon,
  WarningRegularIcon,
} from "alouette-icons/phosphor-icons";
import type { ReactNode } from "react";
import type { MessageProps } from "./Message";

interface FeedbackIconProps {
  type: MessageProps["theme"];
}

export function FeedbackIcon({ type }: FeedbackIconProps): ReactNode {
  switch (type) {
    case "warning":
      return <WarningCircleRegularIcon />;
    case "success":
      return <CheckRegularIcon />;
    case "danger":
      return <WarningRegularIcon />;
    default:
      return <InfoRegularIcon />;
  }
}
