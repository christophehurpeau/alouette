import type { GestureReponderEvent, GetProps } from "@tamagui/core";
import { styled } from "@tamagui/core";
// import { CheckRegularIcon } from "alouette-icons/phosphor-icons/CheckRegularIcon";
// import { XRegularIcon } from "alouette-icons/phosphor-icons/XRegularIcon";
import { useState } from "react";
import { Box, InteractiveBox } from "../containers/Box";
// import { Icon } from "../primitives/Icon";

const useControllableCheckedState = (
  checked: boolean | undefined,
  onChange?: (e: GestureReponderEvent) => void,
) => {
  const [checkedState, setCheckedState] = useState(checked ?? false);

  return [
    checked !== undefined ? checked : checkedState,
    (newChecked: boolean, e: GestureReponderEvent) => {
      setCheckedState((prevValue) => {
        if (prevValue !== newChecked) {
          onChange?.(e);
        }
        return newChecked;
      });
    },
  ] as const;
};

const SwitchFrame = styled(InteractiveBox, {
  theme: "brand",
  render: "button",
  role: "switch",
  layer: "lowered",
  shadow: "lowered",

  position: "relative",
  tabIndex: 0,
  borderRadius: 1000,

  transition: "formElement",

  disabledStyle: {
    backgroundColor: "$interactive.forms.backgroundColor:disabled",
  },

  // TODO hover/focus

  focusVisibleStyle: {
    outlineColor: "$interactive.forms.outlineColor:focus",
    outlineWidth: 2,
    outlineStyle: "solid",
    outlineOffset: 2,
  },

  variants: {
    size: {
      md: {
        height: 44,
        width: 66,
      },
    },
  } as const,

  defaultVariants: {
    size: "md",
  },
});

const thumbSize = 44 * 0.8;
const SwitchThumb = styled(Box, {
  withBackground: "highlight",
  position: "absolute",
  top: 44 * 0.1,
  borderRadius: 1000,
  center: true,
  transition: "formElement",
  shadow: "s",

  variants: {
    size: {
      md: {
        height: thumbSize,
        width: thumbSize,
      },
    },

    disabled: {
      true: {
        backgroundColor: "$text-disabled-muted",
        shadow: "none",
      },
    },

    checked: {
      false: {
        left: 44 * 0.1,
        hoverStyle: {
          width: thumbSize + 2,
        },
        pressStyle: {
          width: thumbSize + 8,
        },
      },
      true: {
        left: 44 * 0.6,
        hoverStyle: {
          left: 44 * 0.6 - 2,
          width: thumbSize + 2,
        },
        pressStyle: {
          left: 44 * 0.6 - 8,
          width: thumbSize + 8,
        },
      },
    },
  },

  defaultVariants: {
    size: "md",
  },
});

// const iconSize = 16;

// const SwitchIconContainer = styled(View, {
//   width: iconSize,
//   height: iconSize,
//   position: "absolute",
//   top: "50%",
//   transform: "translate(-50%, -50%)",
//   transition: "formElement",

//   variants: {
//     iconPosition: {
//       left: {
//         left: thumbSize / 2,
//       },
//       right: {
//         right: iconSize + 3 - thumbSize / 2,
//       },
//     },
//     showed: {
//       false: {
//         opacity: 0,
//       },
//       true: {
//         opacity: 1,
//       },
//     },
//   },
// });

interface SwitchAdditionalProps {
  checked: boolean;
  // checkedTheme?: GetProps<typeof SwitchFrame>["theme"];
  onChange: (e: GestureReponderEvent) => void;
}

export type SwitchProps = Pick<
  GetProps<typeof SwitchFrame>,
  "aria-labelledby" | "disabled"
> &
  SwitchAdditionalProps;

export const Switch = SwitchFrame.styleable<SwitchAdditionalProps>(
  ({ checked, disabled, onChange, ...rest }) => {
    const [currentChecked, setCurrentChecked] = useControllableCheckedState(
      checked,
      onChange,
    );
    return (
      <SwitchFrame
        aria-checked={currentChecked}
        disabled={disabled}
        {...rest}
        // {...(currentChecked && checkedTheme ? { theme: checkedTheme } : {})}
        onPress={(e) => {
          setCurrentChecked(!currentChecked, e);
        }}
      >
        <SwitchThumb checked={currentChecked} disabled={disabled}>
          {/* <SwitchIconContainer showed={!currentChecked} iconPosition="left">
              <Icon tint="accent" size={16} icon={<XRegularIcon />} />
            </SwitchIconContainer>
            <SwitchIconContainer showed={currentChecked} iconPosition="right">
              <Icon tint="accent" size={16} icon={<CheckRegularIcon />} />
            </SwitchIconContainer> */}
        </SwitchThumb>

        {/* <input
            aria-hidden
            value="true"
            type="checkbox"
            checked={checked}
            disabled={disabled}
            tabIndex={-1}
            style={{
              position: "absolute",
              pointerEvents: "none",
              opacity: 0,
              margin: 0,
            }}
          /> */}
      </SwitchFrame>
    );
  },
);
