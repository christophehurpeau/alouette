import type { ReactNode } from "react";
import { InsetsDemo } from "../InsetsDemo";

export default function NoHeaderScreen(): ReactNode {
  return <InsetsDemo withHeader={false} />;
}
