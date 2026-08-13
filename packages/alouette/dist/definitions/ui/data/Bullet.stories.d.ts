import type { StoryObj } from "@storybook/react-vite";
import { Bullet } from "./Bullet";
type ThisStory = StoryObj<typeof Bullet>;
declare const _default: {
    title: string;
    component: typeof Bullet;
    parameters: {
        componentSubtitle: string;
    };
    argTypes: {
        icon: {
            description: string;
            control: false;
        };
        children: {
            description: string;
            control: "text";
        };
    };
};
export default _default;
export declare const BulletPreviewStory: ThisStory;
export declare const BulletVariantsStory: ThisStory;
//# sourceMappingURL=Bullet.stories.d.ts.map