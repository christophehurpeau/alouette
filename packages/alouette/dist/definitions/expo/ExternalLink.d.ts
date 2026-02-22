import type { ComponentProps, FunctionComponent, ReactNode } from "react";
import type { GestureResponderEvent } from "react-native";
export interface ExternalLinkRequiredComponentProps {
    onPress?: (event: GestureResponderEvent) => Promise<void> | void;
}
export interface ExternalOpenLinkBehavior {
    native: "linking" | "webBrowser";
    web: "targetBlank" | "targetSelf";
}
export interface ExternalLinkProps<C extends FunctionComponent<any>> {
    as: C;
    href: string;
    onPress?: (event: GestureResponderEvent) => void;
    openLinkBehavior: ExternalOpenLinkBehavior;
}
type ExternalLinkSpreadProps<C extends FunctionComponent<any>> = Omit<ComponentProps<C>, keyof ExternalLinkProps<C>>;
export declare function ExternalLink<C extends FunctionComponent<any>>({ as: C, href, openLinkBehavior, onPress, ...props }: ExternalLinkProps<C> & ExternalLinkSpreadProps<C>): ReactNode;
export {};
//# sourceMappingURL=ExternalLink.d.ts.map