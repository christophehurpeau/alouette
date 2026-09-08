import type { StoryObj } from "@storybook/react-vite";
import { Button } from "./Button";
type ThisStory = StoryObj<typeof Button>;
declare const _default: {
    title: string;
    component: typeof Button;
    parameters: {
        componentSubtitle: string;
        docs: {
            description: {
                component: string;
            };
        };
    };
};
export default _default;
export declare const PreviewButtonStory: ThisStory;
export declare const Variants: ThisStory;
/**
 * `accent="neutral"` renders the contained material on the grayscale palette:
 * the same fill steps and the same white label a colored accent gets, so the
 * secondary action of a confirmation is a real button rather than a pale one. It
 * is never an `outlined` or `ghost` button, which trade the material away.
 */
export declare const NeutralAccent: ThisStory;
//# sourceMappingURL=Button.stories.d.ts.map