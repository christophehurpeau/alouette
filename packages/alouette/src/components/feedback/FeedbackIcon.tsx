import { CheckRegularIcon } from "alouette-icons/phosphor-icons/CheckRegularIcon";
import { InfoRegularIcon } from "alouette-icons/phosphor-icons/InfoRegularIcon";
import { WarningCircleRegularIcon } from "alouette-icons/phosphor-icons/WarningCircleRegularIcon";
import { WarningRegularIcon } from "alouette-icons/phosphor-icons/WarningRegularIcon";
import type { ReactNode } from "react";
import { Icon } from "../primitives/Icon";
import type { MessageProps } from "./Message";

interface FeedbackIconProps {
  type: MessageProps["theme"];
}

export function FeedbackIcon({ type }: FeedbackIconProps): ReactNode {
  switch (type) {
    case "warning":
      return <Icon icon={<WarningCircleRegularIcon />} />;
    case "success":
      return <Icon icon={<CheckRegularIcon />} />;
    case "danger":
      return <Icon icon={<WarningRegularIcon />} />;
    default:
      return <Icon icon={<InfoRegularIcon />} />;
  }
}
