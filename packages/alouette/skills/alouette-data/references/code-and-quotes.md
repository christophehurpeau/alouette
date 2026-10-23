# Code and quotes — Code, CodeBlock, Blockquote, Citation

## Code and CodeBlock

`Code` is an inline fragment — mono family on the highlight layer, `role="code"`
(a real `<code>` on web). It sets **no** size class, so nested in a `Text` or
`Paragraph` it inherits the surrounding size and never breaks the line rhythm.

```tsx
import { Code, CodeBlock, Paragraph } from "alouette";

<Paragraph>
  Run <Code>pnpm --filter alouette build:css</Code> after editing the palette.
</Paragraph>;
```

`CodeBlock` is the block form: a lowered surface holding mono text that scrolls
horizontally instead of wrapping, with an optional `title` (a file name or a
language) above it and `size` `"sm" | "md"` (default `"md"`) for the code text.

```tsx
<CodeBlock title="theme.ts">{`export const theme = {
  accent: "brand",
};`}</CodeBlock>
```

`wrap` wraps long lines instead of scrolling them, breaking a token longer than
the line (a URL, a path). Use it for content read end to end rather than
scanned by column — a shell command in a card; keep the default scroll for
source code and program output, whose columns wrapping would misalign.

```tsx
<CodeBlock wrap title="install.sh">
  {installCommand}
</CodeBlock>
```

Both are display-only. To offer copying, put an `IconButton` beside the block —
never wrap it in a pressable.

## Blockquote and Citation

`Blockquote` renders a quoted excerpt behind an accent rule on its leading edge
(`role="blockquote"` → a real `<blockquote>` on web). Use one or the other:

- `Blockquote` for a quote that is text: its `children` go into a `Paragraph`,
  sized by `size` `"sm" | "md"`, so they are inline content only.
- `BlockquoteFrame` for block content (several paragraphs, a list, a
  `CodeBlock`): its `children` render as they are, sized and laid out by the
  caller. Text there needs its own `Paragraph`: a bare string throws on native.

Both take attribution in the `citation` prop as a node — normally a `Citation`.

```tsx
<Blockquote accent="brand" citation={<Citation>Le Guin</Citation>}>
  Light is the left hand of darkness.
</Blockquote>;

<BlockquoteFrame>
  <Paragraph>Run it with:</Paragraph>
  <CodeBlock>pnpm install</CodeBlock>
</BlockquoteFrame>;
```

`Citation` is an em dash plus the source, muted, `size` `"sm" | "md"`. With
`href` the source becomes an `ExternalLinkText` (so `openLinkBehavior` applies);
without it, plain muted text. It stands alone under any excerpt, not only under a
`Blockquote`.

Source: packages/alouette/src/ui/data/Code.tsx; ui/data/CodeBlock.tsx; ui/data/Blockquote.tsx;
ui/data/Citation.tsx
