import type { Variable } from "@tamagui/core";

export const groupTokens = (colorTokens: Record<any, Variable<any>>) => {
  const groupedEntriesMap = new Map<
    string,
    { key: string; variable: Variable }[]
  >();

  Object.entries(colorTokens).forEach(([key, variable]) => {
    // eslint-disable-next-line prefer-const
    let [keyGroup, keyValue1, keyValue2] = key.split(".") as [
      string,
      string,
      string,
      string,
    ];
    if (!keyValue1) {
      keyGroup = "default";
    } else if (keyValue2) {
      keyGroup = `${keyGroup}.${keyValue1}`;
    }

    let array = groupedEntriesMap.get(keyGroup);
    if (!array) {
      array = [];
      groupedEntriesMap.set(keyGroup, array);
    }
    array.push({ key, variable });
  });

  return [...groupedEntriesMap.entries()];
};
