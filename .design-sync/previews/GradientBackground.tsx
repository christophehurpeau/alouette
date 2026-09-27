import * as React from "react";
import { View } from "alouette";
import * as S from "@ds-stories/packages/alouette/src/ui/layout/GradientBackground.stories";

function compose(S: any, key: string) {
  const meta: any = S.default ?? {};
  const st: any = S[key];
  const args: any = { ...(meta.args ?? {}), ...(st && st.args ? st.args : {}) };
  // Storybook resolves argTypes.mapping (control value -> real arg) before
  // rendering; mirror that so mapped args don't render raw.
  const at: any = {
    ...(meta.argTypes ?? {}),
    ...(st && st.argTypes ? st.argTypes : {}),
  };
  for (const k of Object.keys(args)) {
    const m = at[k] && at[k].mapping;
    if (m && typeof m === "object" && args[k] in m) args[k] = m[args[k]];
  }
  const title: string = typeof meta.title === "string" ? meta.title : "";
  const ctx: any = {
    args,
    name: key,
    title,
    kind: title,
    id: "",
    componentId: "",
    globals: {},
    viewMode: "story",
    parameters: (st && st.parameters) ?? meta.parameters ?? {},
  };
  let render: (() => any) | null = null;
  if (st && typeof st.render === "function")
    render = () => st.render(args, ctx);
  else if (typeof st === "function") render = () => st(args, ctx);
  else if (typeof meta.render === "function")
    render = () => meta.render(args, ctx);
  else {
    const C = (st && st.component) || meta.component;
    if (C) render = () => React.createElement(C, args);
  }
  if (!render) return () => null;
  // [].concat: a single function is legal CSF decorator shorthand. A
  // decorator returning undefined (stubbed addon) falls through to the inner
  // render — otherwise one unrecognized addon blanks the cell silently.
  const decorators: any[] = ([] as any[])
    .concat((st && st.decorators) ?? [])
    .concat(meta.decorators ?? []);
  return decorators.reduce(
    (inner: any, dec: any) => () => {
      const out = dec(inner, ctx);
      return out === undefined ? inner() : out;
    },
    render,
  );
}

const ComposedPreviewGradientBackgroundStory = compose(
  S,
  "PreviewGradientBackgroundStory",
);

// GradientBackground is `absolute inset-0`: it fills a sized ancestor, which
// Storybook's fullscreen canvas provides and the preview mount does not. Framed
// like the story's own Variants.
export const PreviewGradientBackgroundStory =
  /* GradientBackground Preview */ () => (
    <View className="relative h-[560px]">
      <ComposedPreviewGradientBackgroundStory />
    </View>
  );
export const VariantsGradientBackgroundStory =
  /* GradientBackground Variants */ compose(
    S,
    "VariantsGradientBackgroundStory",
  );
