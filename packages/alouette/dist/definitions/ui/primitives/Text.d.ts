import { Text as RNText, type TextProps as RNTextProps } from "react-native";
import type { Accent } from "../../core/AlouetteConfig";
export interface TextProps extends RNTextProps {
    accent?: Accent;
}
export declare const Text: import("react").ForwardRefExoticComponent<TextProps & import("react").RefAttributes<RNText>>;
export type ParagraphProps = TextProps;
/**
 * A block of prose — `Text` with `role="paragraph"` (a real `<p>` on web) and
 * selectable content (`select-auto`, which native Text is not by default).
 *
 * It is the wrapper for sentences, never for a single value: a URL, a code
 * fragment, a label, a stat or a heading is a `Text` (or `Code` /
 * `ExternalLinkText` / `CodeBlock`), even when it stands alone on its line.
 * Reach for `Paragraph` when the content is one or more sentences the reader
 * may want to select and copy.
 *
 * Its children are inline only — `Text`, `Code`, `ExternalLinkText`. A `<p>`
 * takes no block content, so nesting another `Paragraph`, a `View` or a
 * `Surface` inside one is invalid DOM on web.
 */
export declare const Paragraph: import("react").ForwardRefExoticComponent<TextProps & import("react").RefAttributes<RNText>>;
//# sourceMappingURL=Text.d.ts.map