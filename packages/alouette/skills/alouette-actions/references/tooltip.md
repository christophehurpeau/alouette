# Tooltip — describing an element on hover and focus

A disabled `Button`, `IconButton` or `ActionButton` takes `disabledReason`
and renders this itself. `Tooltip` is for any other element: an icon-only
button's label, a truncated value. It takes a `render` prop and hands it the
props to spread on the described element:

```tsx
import { Tooltip } from "alouette";

<Tooltip
  content="Archive the project"
  render={(triggerProps) => (
    <IconButton
      {...triggerProps}
      icon={<ArchiveRegularIcon />}
      aria-label="Archive"
    />
  )}
/>;
```

The trigger props carry the hover and focus handlers as well as
`aria-describedby`, so spread them last, or keep the element's own with
`mergeTooltipTriggerProps(ownProps, triggerProps)`, which joins the
descriptions and runs both handlers. `content={null}` renders the element
alone in the same tree, so toggling it never remounts the element. The panel
opens on hover (not on a tap) and on keyboard focus, above the element or below
it when there is no room above, and stays open while the pointer is on it.
Don't nest two tooltips around one element.

Native has no hover: `Tooltip` shows no panel there and only announces the
content as the element's accessibility hint.

Source: packages/alouette/src/ui/containers/Tooltip.tsx; ui/containers/Tooltip.web.tsx;
ui/containers/mergeTooltipTriggerProps.ts
