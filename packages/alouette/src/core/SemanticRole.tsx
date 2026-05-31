import { createContext, useContext } from "react";
import type { SemanticRole } from "./AlouetteConfig";

export const SemanticRoleContext = createContext<SemanticRole | undefined>(
  undefined,
);

export const useSemanticRole = () => {
  return useContext(SemanticRoleContext);
};

export const useSemanticRoleFromParamOrContext = (
  param: SemanticRole | undefined,
): SemanticRole | undefined => {
  const contextValue = useSemanticRole();
  return param || contextValue;
};
