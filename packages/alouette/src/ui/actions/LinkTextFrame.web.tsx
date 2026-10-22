import { type ReactNode, use } from "react";
import { TextAncestorContext } from "../primitives/TextAncestorContext";
import { LinkTextBox, type LinkTextFrameProps } from "./LinkTextBox";

export function LinkTextFrame(props: LinkTextFrameProps): ReactNode {
  return <LinkTextBox {...props} inline={use(TextAncestorContext)} />;
}
