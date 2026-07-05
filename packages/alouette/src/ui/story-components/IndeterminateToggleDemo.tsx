import type { ReactNode } from "react";
import { useState } from "react";
import { Button } from "../actions/Button";
import { Box } from "../containers/Box";
import { HStack } from "../stacks/stacks";

export interface IndeterminateToggleDemoProps {
  boxClassName: string;
  children: (loading: boolean) => ReactNode;
}

export function IndeterminateToggleDemo({
  boxClassName,
  children,
}: IndeterminateToggleDemoProps): ReactNode {
  const [loading, setLoading] = useState(false);
  return (
    <HStack className="items-center gap-sm">
      <Box className={boxClassName}>{children(loading)}</Box>
      <Button
        accent={loading ? "danger" : "success"}
        text={loading ? "Stop" : "Start"}
        onPress={() => {
          setLoading((prev) => !prev);
        }}
      />
    </HStack>
  );
}
