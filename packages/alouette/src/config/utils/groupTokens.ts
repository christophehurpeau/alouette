import type { Variable } from "@tamagui/core";

export const groupTokens = (colorTokens: Record<any, Variable<any>>) => {
  const groupedEntriesMap = new Map<
    string,
    { key: string; keyValue: string; variable: Variable }[]
  >();

  Object.entries(colorTokens).forEach(([key, variable]) => {
    let [keyGroup, keyValue] = key.split(".", 2) as [string, string];
    if (!keyValue) {
      keyGroup = "default";
      keyValue = keyGroup;
    } else {
      const [subKeyGroup, subKeyValue] = keyValue.split(":", 2) as [
        string,
        string,
      ];

      if (subKeyValue) {
        keyGroup = `${keyGroup}.${subKeyGroup}`;
        keyValue = subKeyValue;
      }
    }

    let array = groupedEntriesMap.get(keyGroup);
    if (!array) {
      array = [];
      groupedEntriesMap.set(keyGroup, array);
    }
    array.push({ key, keyValue, variable });
  });

  return [...groupedEntriesMap.entries()];
};
