# Disclosure

`Disclosure` is the WAI-ARIA disclosure pattern: a caret row (a `button` with
`aria-expanded` / `aria-controls`) that shows or hides the content below it. The
caret rotates and the content animates with the `disclose-*` tokens; it mounts
only while expanded. Controlled (`expanded` + `onExpandedChange`) or not
(`defaultExpanded`).

```tsx
import { Disclosure } from "alouette";

<Disclosure label="5 tools used">
  <ToolList />
</Disclosure>;
```

## The label is inline text, and names the trigger

`label` renders inside a `Text`, so it takes a string or nested `Text` / `Code`
runs, which lay out as one styled line. The trigger's accessible name is that
text, on web (the button's content) and on native (one text node read by
VoiceOver and TalkBack): `<b>Breaking change</b> in <code>parseConfig</code>`
is announced "Breaking change in parseConfig".

- Never put a link or another pressable in the label: it would be an
  interactive element inside a button. A markdown renderer flattens the links
  of a `<summary>` to text.
- A label without text (an icon alone) needs `aria-label`.

## Inside running content

The default trigger is a control: 44px tall (`control-md`, which `DensityScope`
lowers), with a small muted label — right in a form or a settings panel. Among
paragraphs, as a markdown `<details>`, it reads as a heading of what it hides:

```tsx
import { Code, Disclosure, Paragraph, Text } from "alouette";

<Disclosure
  guide
  size="sm"
  labelClassName="text-base text-sharp"
  label={
    <>
      <Text className="font-body-bold">Breaking change</Text> in{" "}
      <Code>parseConfig</Code>
    </>
  }
>
  <Paragraph>The options object is now required.</Paragraph>
</Disclosure>;
```

- `size="sm"` sizes the trigger to a line of text, like a text link: its target
  stays above the 24px of WCAG 2.5.8.
- `labelClassName` sets the label's type (it defaults to `text-sm text-muted`).
  The disabled color is applied after it, so a color set there still dims.
- `guide` draws a line down the content's leading edge, under the caret, to
  show where long or nested content ends. Leave it off when the content is a
  surface: the card's own edge already frames it.

Source: packages/alouette/src/ui/containers/Disclosure.tsx
