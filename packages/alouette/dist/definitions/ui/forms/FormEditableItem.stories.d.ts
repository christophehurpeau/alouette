import type { StoryObj } from "@storybook/react-vite";
import { type ReactNode } from "react";
import type { EditableItemProps } from "../data/EditableItem";
import { type FormEditableItemProps } from "./FormEditableItem";
interface ProfileFormValues {
    displayName: string;
}
type SummaryVariant = "badge" | "mono" | "muted" | "none" | "text";
interface ProfileItemProps extends Partial<Pick<FormEditableItemProps<ProfileFormValues>, "accent" | "details" | "disabled" | "label" | "size" | "title">> {
    editAriaLabel?: string;
    editIcon?: EditableItemProps["editIcon"];
    variant?: EditableItemProps["variant"];
    initialValue?: string;
    summaryVariant?: SummaryVariant;
    /** Makes onSubmit reject, so the modal stays open on the error. */
    failing?: boolean;
}
/**
 * Stateful demo: the saved value drives the summary, so the play function can
 * tell a discarded edit from a saved one by reading the row.
 */
declare function ProfileItem({ label, editAriaLabel, initialValue, summaryVariant, failing, ...itemProps }: ProfileItemProps): ReactNode;
type ThisStory = StoryObj<typeof ProfileItem>;
declare const _default: {
    title: string;
    component: typeof ProfileItem;
    parameters: {
        componentSubtitle: string;
    };
    argTypes: {
        label: {
            control: "text";
        };
        title: {
            control: "text";
        };
        details: {
            control: "text";
        };
        size: {
            control: "select";
            options: string[];
        };
        accent: {
            control: "select";
            options: import("../..").Accent[];
        };
        variant: {
            control: "select";
            options: string[];
        };
        summaryVariant: {
            control: "select";
            options: string[];
        };
        disabled: {
            control: "boolean";
        };
    };
};
export default _default;
export declare const FormEditableItemPreviewStory: ThisStory;
export declare const FormEditableItemVariantsStory: ThisStory;
export declare const FormEditableItemTestsStory: ThisStory;
//# sourceMappingURL=FormEditableItem.stories.d.ts.map